"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";

type Props = {
  title: string;
  paths?: string[];      // jika diberi, pakai ini
  folder?: string;       // jika tidak ada paths, generate dari folder
  count?: number;        // default 25
  heightClass?: string;  // tinggi thumbnail
  loop?: boolean;        // looping next/prev
};

export default function Gallery({
  title,
  paths,
  folder,
  count = 25,
  heightClass = "h-40",
  loop = true,
}: Props) {
  const imgs = useMemo(
    () =>
      (paths && paths.length > 0
        ? paths
        : Array.from({ length: count }).map(
            (_, i) => `/photos/${folder}/${String(i + 1).padStart(2, "0")}.jpeg`
          )
      ).filter(Boolean),
    [paths, folder, count]
  );

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = useCallback((i: number) => {
    setIdx(i);
    setOpen(true);
    document.body.style.overflow = "hidden"; // lock scroll
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = ""; // restore scroll
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIdx((cur) => {
        const next = cur + dir;
        if (loop) {
          return (next + imgs.length) % imgs.length;
        }
        return Math.min(Math.max(next, 0), imgs.length - 1);
      });
    },
    [imgs.length, loop]
  );

  // keyboard
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, go]);

  // swipe (mobile)
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) go(1);
      else go(-1);
    }
    startX.current = null;
  };

  return (
    <section className="mx-auto mt-14 max-w-6xl px-6">
      <h2 className="mb-6 text-center text-2xl font-bold">{title}</h2>

      {/* Grid thumbnails */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {imgs.map((src, i) => (
          <motion.button
            key={src + i}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, delay: i * 0.02 }}
            className="group overflow-hidden rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-rose-400"
            onClick={() => openAt(i)}
            aria-label={`Buka foto ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title}-${i + 1}`}
              loading="lazy"
              className={`${heightClass} w-full object-cover transition-transform duration-500 group-hover:scale-105`}
            />
          </motion.button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            {/* Stop backdrop click from closing when clicking content */}
            <motion.div
              className="relative max-h-[92vh] max-w-[92vw]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 220, damping: 20 } }}
              exit={{ scale: 0.98, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgs[idx]}
                alt={`preview-${idx + 1}`}
                className="max-h-[80vh] max-w-[92vw] rounded-lg shadow-2xl object-contain"
              />

              {/* Caption simple */}
              <div className="mt-2 text-center text-xs text-white/80">
                {idx + 1} / {imgs.length}
              </div>

              {/* Close button */}
              <button
                onClick={close}
                className="absolute -right-2 -top-2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
                aria-label="Tutup"
                title="Tutup (Esc)"
              >
                ✕
              </button>

              {/* Prev / Next */}
              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
                <button
                  onClick={() => go(-1)}
                  className="pointer-events-auto m-2 rounded-full bg-white/90 px-3 py-2 text-sm shadow hover:bg-white"
                  aria-label="Sebelumnya"
                  title="←"
                >
                  ←
                </button>
                <button
                  onClick={() => go(1)}
                  className="pointer-events-auto m-2 rounded-full bg-white/90 px-3 py-2 text-sm shadow hover:bg-white"
                  aria-label="Selanjutnya"
                  title="→"
                >
                  →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
