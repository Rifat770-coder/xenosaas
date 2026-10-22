"use client";
import { useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
export default function DetailDialog({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button className="text-link" onClick={() => ref.current?.showModal()}>
        {label}
        <ArrowUpRight size={17} />
      </button>
      <dialog
        ref={ref}
        className="detail-dialog"
        aria-label={title}
        onClick={(e) => {
          if (e.target !== e.currentTarget) return;
          const bounds = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < bounds.left || e.clientX > bounds.right ||
            e.clientY < bounds.top || e.clientY > bounds.bottom
          ) ref.current?.close();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close details"
          onClick={() => ref.current?.close()}
        >
          <X />
        </button>
        <span className="eyebrow">XENOSAAS / DEMO PREVIEW</span>
        <h2>{title}</h2>
        <div>{children}</div>
        <a
          className="button primary"
          href="#contact"
          onClick={() => ref.current?.close()}
        >
          Discuss a similar idea
          <ArrowUpRight size={17} />
        </a>
      </dialog>
    </>
  );
}
