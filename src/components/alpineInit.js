"use client";

import { useEffect } from "react";

export default function AlpineInit() {
  useEffect(() => {
    (async () => {
      const Alpine = (await import("alpinejs")).default;
      window.Alpine = Alpine;
      Alpine.start();
    })();
  }, []);

  return null;
}
