"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote, darkDefaultTheme, lightDefaultTheme } from "@blocknote/react";
import "@blocknote/core/style.css";
import { Flex, useColorMode } from "@chakra-ui/react";

import { useEdgeStore } from "@/libs/edgestore";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { useMutation } from "convex/react";

interface EditableProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor: React.FC<EditableProps> = ({ onChange, initialContent, editable }) => {
  const { colorMode } = useColorMode();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  const themes = {
    light: {
      ...lightDefaultTheme,
      colors: {
        ...lightDefaultTheme.colors,
        editor: {
          text: "#343a40",
          background: "#FFFFFF",
        },
      },
    },
    dark: {
      ...darkDefaultTheme,
      colors: {
        ...darkDefaultTheme.colors,
        editor: {
          text: "white",
          background: "#1A1B1E",
        },
      },
    },
  };

  return (
    <Flex>
      <BlockNoteView className="w-full" editor={editor} theme={themes[colorMode]} />
    </Flex>
  );
};

export default Editor;
