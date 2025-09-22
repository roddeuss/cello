// components/Timeline.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

// Parser untuk "DD-MM-YYYY"
export function parseDMY(s: string) {
  const [dd, mm, yyyy] = s.split("-").map(Number);
  return new Date(yyyy, (mm || 1) - 1, dd || 1);
}

export type TimelineItem = {
  title: string;
  date: string;     // "DD-MM-YYYY"
  photo?: string;   // "/photos/..."
  description?: string;
};

export default function Timeline({
  items,
  title = "Perjalanan Kita",
  onEndReach,
}: {
  items: TimelineItem[];
  title?: string;
  onEndReach?: () => void;
}) {
  const lastRef = useRef<HTMLLIElement | null>(null);
  const firedRef = useRef(false);

  // ====== LIGHTBOX STATE ======
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState<number>(0);

  // Siapkan daftar item yang punya foto (agar navigasi rapi)
  const photoItems = useMemo(
    () => items.map((it, i) => ({ ...it, _idx: i })).filter(it => !!it.photo),
    [items]
  );

  // buka modal pada foto index global "i" → konversi ke index pada photoItems
  const openAt = (globalIndex: number) => {
    const mapped = photoItems.findIndex(p => p._idx === globalIndex);
    if (mapped >= 0) {
      setIdx(mapped);
      setOpen(true);
      document.body.style.overflow = "hidden"; // lock scroll
    }
  };
  const close = () => {
    setOpen(false);
    document.body.style.overflow = ""; // restore scroll
  };
  const go = (dir: 1 | -1) => {
    setIdx((cur) => (cur + dir + photoItems.length) % photoItems.length);
  };

  // keyboard handler saat modal terbuka
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key === "ArrowRight") return go(1);
      if (e.key === "ArrowLeft") return go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // observe item terakhir → trigger onEndReach
  useEffect(() => {
    if (!onEndReach) return;
    const el = lastRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          onEndReach();
        }
      },
      { root: null, threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onEndReach, items.length]);

  return (
    <section className="mx-auto max-w-4xl px-6">
      <h2 className="mb-6 text-center text-2xl font-bold">{title}</h2>
      <ol className="relative border-s-2 border-rose-200">
        {items.map((item, i) => {
          const delay = 0.05 * i;
          const date = parseDMY(item.date);
          const pretty = date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });
          const isLast = i === items.length - 1;

          return (
            <motion.li
              ref={isLast ? lastRef : undefined}
              key={`${item.title}-${item.date}-${i}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay }}
              className="mb-10 ms-6"
            >
              <span className="timeline-dot"></span>

              <div className="timeline-card">
                <time className="text-xs uppercase tracking-wide text-rose-600">
                  {pretty}
                </time>
                <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                {item.description && (
                  <p className="mt-1 text-sm text-gray-600">
                    {item.description}
                  </p>
                )}

                {item.photo && (
                  <button
                    type="button"
                    onClick={() => openAt(i)}
                    className="mt-3 overflow-hidden rounded-lg outline-none ring-rose-300 transition hover:brightness-105 focus:ring"
                    aria-label={`Lihat foto ${item.title}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.photo}
                      alt={item.title}
                      loading="lazy"
                      className="h-40 w-64 rounded-md object-cover shadow-md transition-transform duration-300 hover:scale-105"
                    />
                  </button>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>

      {/* ====== LIGHTBOX MODAL ====== */}
      <AnimatePresence>
        {open && photoItems[idx] && (
          <motion.div
            key="lb-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="relative max-h-[92vh] max-w-[92vw]"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 220, damping: 22 } }}
              exit={{ scale: 0.98, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoItems[idx].photo!}
                alt={photoItems[idx].title}
                className="max-h-[78vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
              />

              {/* Caption */}
              <div className="mt-3 rounded-lg bg-white/95 p-4 text-center shadow">
                <div className="text-sm text-rose-600">
                  {parseDMY(photoItems[idx].date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="mt-0.5 text-lg font-semibold">
                  {photoItems[idx].title}
                </div>
                {photoItems[idx].description && (
                  <p className="mt-1 text-sm text-gray-700">
                    {photoItems[idx].description}
                  </p>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  {idx + 1} / {photoItems.length}
                </div>
              </div>

              {/* Close */}
              <button
                onClick={close}
                className="absolute -right-2 -top-2 rounded-full bg-white/90 p-2 text-sm shadow hover:bg-white"
                aria-label="Tutup"
              >
                ✕
              </button>

              {/* Prev / Next */}
              <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between">
                <button
                  onClick={() => go(-1)}
                  className="pointer-events-auto m-2 rounded-full bg-white/90 px-3 py-2 text-sm shadow hover:bg-white"
                  aria-label="Sebelumnya"
                >
                  ←
                </button>
                <button
                  onClick={() => go(1)}
                  className="pointer-events-auto m-2 rounded-full bg-white/90 px-3 py-2 text-sm shadow hover:bg-white"
                  aria-label="Selanjutnya"
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
