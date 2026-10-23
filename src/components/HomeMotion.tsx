"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Homepage motion layer. Wraps server-rendered sections and animates
 * elements tagged with data attributes:
 *
 * - data-hero          hero items, staggered in on load
 * - data-blob          soft background shapes that drift slowly
 * - data-reveal        fades up when scrolled into view
 * - data-stagger       its direct children fade up one after another
 * - data-count="40"    number counts up from 0 when visible
 * - data-progress      a line that fills as its section scrolls by
 *
 * Content is hidden by CSS only while JS is running and motion is allowed
 * (see globals.css), so reduced-motion users and crawlers see it as-is.
 */
export default function HomeMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const ease = "power3.out";

        gsap
          .timeline({ defaults: { ease, duration: 0.9 } })
          .fromTo(
            "[data-hero]",
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, stagger: 0.12 },
          );

        gsap.utils.toArray<HTMLElement>("[data-blob]").forEach((blob, i) => {
          gsap.to(blob, {
            x: i % 2 ? -40 : 40,
            y: i % 2 ? 30 : -30,
            scale: 1.08,
            duration: 7 + i * 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 32 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease,
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          gsap.fromTo(
            group.children,
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease,
              stagger: 0.14,
              scrollTrigger: { trigger: group, start: "top 82%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          if (!Number.isFinite(target)) return;
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(counter.value));
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: line.parentElement ?? line,
                start: "top 80%",
                end: "bottom 60%",
                scrub: 0.6,
              },
            },
          );
        });
      });

      document.documentElement.classList.add("motion-ready");
      return () => mm.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
