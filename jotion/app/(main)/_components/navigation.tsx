"use client";

import { ElementRef, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./user-item";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "./item";
import DocumentList from "./document-list";
import TrashBox from "./trash-box";
import { useSearch } from "@/hooks/use-search";
import { useSettings } from "@/hooks/use-settings";
import Navbar from "./navbar";

const Navigation = () => {
  const toast = useToast();
  const pathname = usePathname();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.documents.create);

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const onSearchOpen = useSearch((store) => store.onOpen);
  const onSettingsOpen = useSettings((store) => store.onOpen);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  }, []);

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      isResizingRef.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove]
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      isResizingRef.current = true;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);
      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100% - 240px)");

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("left", "0");
      navbarRef.current.style.setProperty("width", "100%");

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      loading: {
        title: "Note Create",
        description: "Creating a new note...",
      },
      success: {
        title: "Note Create Success",
        description: "Your note has been created.",
      },
      error: {
        title: "Note Create Failed",
        description: "Something went wrong while creating your note.",
      },
    });
  };

  return (
    <>
      <Flex
        ref={sidebarRef}
        className={classNames("group/sidebar", {
          "transition-all ease-in-out duration-300": isResetting,
        })}
        w={isMobile ? 0 : 60}
        as="aside"
        h="full"
        bg="bg.canvas"
        overflowY="auto"
        pos="relative"
        flexDir="column"
      >
        <IconButton
          className={classNames("opacity-0 group-hover/sidebar:opacity-100 transition", {
            "opacity-100": isMobile,
          })}
          variant="ghost"
          pos="absolute"
          top={2.5}
          right={3}
          size="sm"
          aria-label="Collapse sidebar"
          icon={<Icon as={ChevronsLeft} />}
          color="fg.muted"
          _hover={{
            bg: "bg.subtle",
          }}
          onClick={collapse}
        />
        <VStack spacing={0}>
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={onSearchOpen} />
          <Item label="Settings" icon={Settings} onClick={onSettingsOpen} />
          <Item label="New page" icon={PlusCircle} onClick={handleCreate} />
        </VStack>
        <Box mt={2}>
          <DocumentList />
          <Item label="Add a page" onClick={handleCreate} icon={Plus} />
          <Popover placement={isMobile ? "bottom" : "right"}>
            <PopoverTrigger>
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <TrashBox />
              </PopoverContent>
            </Portal>
          </Popover>
        </Box>
        <Flex
          className="opacity-0 group-hover/sidebar:opacity-100 transition"
          cursor="ew-resize"
          pos="absolute"
          h="full"
          w={1}
          right={0}
          top={0}
          bg="bg.subtle"
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
        />
      </Flex>
      <Box
        className={classNames("left-60 w-[calc(100%-240px)]", {
          "transition-all ease-in-out duration-300": isResetting,
          "left-0 w-full": isMobile,
        })}
        ref={navbarRef}
        pos="absolute"
        top={0}
        h={12}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <Box bg="transparent" px={3} py={2} w="full">
            {isCollapsed && (
              <IconButton
                variant="tertiary"
                color="fg.muted"
                _hover={{
                  bg: "bg.subtle",
                }}
                aria-label="Menu toggle"
                size="sm"
                icon={<Icon as={MenuIcon} />}
                onClick={resetWidth}
              />
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Navigation;
