"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function SectionDivider({ sectionNumber }: { sectionNumber: string }) {
  const [inView, setInView] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center transition-opacity duration-1000",
        inView ? "opacity-100" : "opacity-0"
      )}
      aria-hidden="true"
    >
      <div className="flex-grow border-t border-border"></div>
      <span className="mx-4 flex-shrink font-headline text-xl text-text-hint">
        {sectionNumber}
      </span>
      <div className="flex-grow border-t border-border"></div>
    </div>
  );
}
