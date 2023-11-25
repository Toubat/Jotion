import { useEffect, useState } from "react";
import { useIsMounted } from "usehooks-ts";

const useOrigin = () => {
  const mounted = useIsMounted();
  const origin =
    typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

  if (!mounted) {
    return "";
  }

  return origin;
};

export default useOrigin;
