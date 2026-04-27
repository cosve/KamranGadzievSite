"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const MIN_VISIBLE_MS = 250;

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = useMemo(
    () => `${pathname}?${searchParams.toString()}`,
    [pathname, searchParams],
  );
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    window.dispatchEvent(new CustomEvent("routeLoadingStarted"));
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    window.setTimeout(() => {
      requestAnimationFrame(() => setVisible(false));
    }, MIN_VISIBLE_MS);
  }, []);

  useEffect(() => {
    const handleRouteStart = () => show();
    window.addEventListener("routeChangeStart", handleRouteStart);

    return () => {
      window.removeEventListener("routeChangeStart", handleRouteStart);
    };
  }, [show]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || isModifiedClick(event)) {
        return;
      }

      const target = event.target as Element | null;
      const link = target?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      const targetAttr = link.getAttribute("target");
      const download = link.hasAttribute("download");
      if (!href || href.startsWith("#") || targetAttr || download) return;

      const nextUrl = new URL(href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;

      const currentUrl = new URL(window.location.href);
      const samePath =
        nextUrl.pathname === currentUrl.pathname &&
        nextUrl.search === currentUrl.search;

      if (!samePath) {
        show();
      }
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [show]);

  useEffect(() => {
    hide();
  }, [routeKey, hide]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      id="loading-overlay"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a1521]"
      role="status"
      aria-live="polite"
      aria-label="Загрузка страницы"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="#ebe2c3"
          strokeWidth="2.5"
          strokeDasharray="50 20"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
