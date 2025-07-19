"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Icon, Icons } from "./icon";
import { cn } from "@/lib/utils";

function LinkedInPreview() {
  const [screenSize, setScreenSize] = React.useState<
    "mobile" | "tablet" | "desktop"
  >("desktop");
  const [processedContent, setProcessedContent] = React.useState<string>(
    "What do you want to post"
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const checkContentOverflow = () => {
    setTimeout(() => {
      const contentElement = contentRef.current;
      if (contentElement) {
        const lineHeight = Number.parseInt(
          window.getComputedStyle(contentElement).lineHeight
        );
        const maxHeight = lineHeight * 3;
        setShowMoreButton(contentElement.scrollHeight > maxHeight);
      }
    }, 0);
  };

  const containerWidth = {
    mobile: "w-[320px]",
    tablet: "w-[480px]",
    desktop: "w-[655px]",
  };

  return (
    <div className="flex flex-1 flex-col items-center gap-5 overflow-y-auto bg-gray-50 py-5">
      <div
        className={cn(
          "mx-auto transition-all duration-300",
          containerWidth[screenSize]
        )}
      ></div>
      <div className="md:w-[555px] sm:w-[480px] w-[320px] font-system overflow-hidden rounded-lg bg-white shadow ring-1 ring-inset ring-gray-200">
        <div className="py-5 pl-4 pr-6">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <span className="relative inline-block shrink-0">
                  <Image
                    alt=""
                    loading="lazy"
                    width={140}
                    height={140}
                    className="size-14 rounded-full object-cover"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij4KICA8cGF0aCBmaWxsPSIjZTdlMmRjIiBkPSJNMCAwaDEyOHYxMjhIMHoiLz4KICA8cGF0aCBkPSJNODguNDEgODQuNjdhMzIgMzIgMCAxMC00OC44MiAwIDY2LjEzIDY2LjEzIDAgMDE0OC44MiAweiIgZmlsbD0iIzc4OGZhNSIvPgogIDxwYXRoIGQ9Ik04OC40MSA4NC42N2EzMiAzMiAwIDAxLTQ4LjgyIDBBNjYuNzkgNjYuNzkgMCAwMDAgMTI4aDEyOGE2Ni43OSA2Ni43OSAwIDAwLTM5LjU5LTQzLjMzeiIgZmlsbD0iIzlkYjNjOCIvPgogIDxwYXRoIGQ9Ik02NCA5NmEzMS45MyAzMS45MyAwIDAwMjQuNDEtMTEuMzMgNjYuMTMgNjYuMTMgMCAwMC00OC44MiAwQTMxLjkzIDMxLjkzIDAgMDA2NCA5NnoiIGZpbGw9IiM1NjY4N2EiLz4KPC9zdmc+Cg=="
                  />
                  <span className="absolute bottom-0 right-0 inline-flex size-4 items-center justify-center rounded-full bg-[#1052B8] text-white ring-2 ring-white">
                    <Icon name="linkedinLogo" className="size-2.5" />
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    John Abhishek
                  </p>
                  <p className="truncate text-xs font-normal text-gray-500">
                    Founder @ Prmise
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-normal text-gray-500">
                      Now
                    </span>
                    <span className="text-xs font-normal text-gray-500">•</span>
                    <Icon
                      name="linkedInVisibility"
                      className="size-4 text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            ref={contentRef}
            className={cn(
              "relative mt-5 whitespace-pre-wrap text-sm",
              !isExpanded && "line-clamp-3"
            )}
          >
            {processedContent}
          </div>
          {showMoreButton && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-sm font-semibold text-gray-500 hover:text-gray-700"
            >
              {isExpanded ? "...less" : "...more"}
            </button>
          )}
        </div>
        <div className="relative">
          <div className="overflow-hidden"></div>
        </div>
        <div className="py-3 pl-4 pr-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-2">
              <Image
                alt="post reactions"
                loading="lazy"
                width={24}
                height={24}
                className="h-5 w-auto"
                src="/images/post-reactions.svg"
              />
              <span
                className={cn(
                  "mt-1 font-medium text-gray-500",
                  screenSize === "mobile" ? "hidden" : "text-xs"
                )}
              >
                Paul Augustine and 88 others
              </span>
            </div>
            <div className="flex items-center justify-end gap-2">
              {["4 comments", "•", "1 repost"].map((text) => (
                <span
                  key={text}
                  className={cn(
                    "font-medium text-gray-500",
                    screenSize === "mobile" ? "text-[10px]" : "text-xs"
                  )}
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
          <hr className="mt-3 border-gray-200" />
          <div
            className={cn(
              "mt-2 flex items-center",
              screenSize === "mobile" ? "justify-between" : "justify-around"
            )}
          >
            {["Like", "Comment", "Share", "Send"].map((action) => (
              <div
                key={action}
                className={cn(
                  "flex items-center justify-center rounded-lg px-1.5 py-2 font-semibold text-gray-500 hover:bg-gray-100",
                  screenSize === "mobile"
                    ? "flex-col text-[10px]"
                    : "flex-row gap-1.5 text-sm"
                )}
              >
                <Icon
                  name={`linkedIn${action}` as keyof typeof Icons}
                  className={cn(
                    screenSize === "mobile" ? "size-5 mb-1" : "size-5"
                  )}
                />
                <span className={cn(screenSize === "mobile" ? "mt-1" : "")}>
                  {action}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkedInPreview;
