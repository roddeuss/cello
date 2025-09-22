"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function ApologyModal({
  open,
  onClose,
  waNumber,
  waMessage,
}: {
  open: boolean;
  onClose: () => void;
  waNumber: string;
  waMessage: string;
}) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const avoidRef = useRef<HTMLButtonElement | null>(null);

  const runAway = () => {
    const btn = avoidRef.current;
    const box = boxRef.current;
    if (!btn || !box) return;
    const boxRect = box.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const pad = 8;
    const maxLeft = boxRect.width - btnRect.width - pad;
    const maxTop = boxRect.height - btnRect.height - pad;
    const left = Math.max(pad, Math.min(maxLeft, Math.random() * maxLeft));
    const top = Math.max(pad, Math.min(maxTop, Math.random() * maxTop));
    btn.style.position = "absolute";
    btn.style.left = `${left}px`;
    btn.style.top = `${top}px`;
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(
      waMessage
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        ref={boxRef}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10 }}
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
        >
          ✕
        </button>

        <h3 className="pr-8 text-xl font-bold">Maaf ya…</h3>
        <p className="mt-2 text-gray-700">
          Aku sadar hubungan kita nggak selalu mulus. Ada sikap dan kata-kata
          yang membuatmu kecewa. Aku tulis di sini supaya jelas aku mau berubah.
        </p>

        {/* List kesalahan */}
        <div className="mt-4">
          <h4 className="font-semibold text-rose-600">Kesalahanku:</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
            <li>Terlalu sering egois dan tidak mendengarkan perasaanmu.</li>
            <li>Kadang emosi, ngomong dengan nada tinggi yang bikin kamu sakit hati.</li>
            <li>Sifat Ketidak Dewasaanku Dalam Mengatasi Masalah</li>
            <li>Pemberian Ucapan Yang Selalu, Membuat Dirimu Ketika Mendengarkan Kecewa</li>
            <li>Suka lalai memberi perhatian kecil yang penting buatmu.</li>
            <li>Terlambat minta maaf setelah aku salah.</li>
          </ul>
        </div>

        {/* List perubahan */}
        <div className="mt-5">
          <h4 className="font-semibold text-emerald-600">Aku akan berubah:</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
            <li>Belajar lebih sabar dan mengendalikan emosiku.</li>
            <li>Mendengarkanmu dengan hati, bukan hanya telinga.</li>
            <li>Belajar Dalam Berbicara Dengan Hati - Hati, Agar Tidak Mengecewakanmu</li>
            <li>Memberi perhatian kecil setiap hari supaya kamu merasa dihargai.</li>
            <li>Segera meminta maaf kalau aku salah, tanpa menunda.</li>
            <li>Menunjukkan lewat tindakan nyata kalau aku sayang kamu setiap hari. ❤️</li>
          </ul>
        </div>

        <div className="relative mt-6 flex min-h-[84px] items-center justify-center gap-3">
          <button
            onClick={openWhatsApp}
            className="rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white shadow hover:bg-emerald-700"
          >
            Maafkan Aku Cello
          </button>

          <button
            ref={avoidRef}
            onMouseEnter={runAway}
            onMouseMove={runAway}
            onClick={(e) => {
              e.preventDefault();
              runAway();
            }}
            className="relative rounded-xl bg-gray-200 px-5 py-3 font-medium text-gray-600"
            title="😅 Kok susah diklik ya?"
          >
            Tidak Dimaafkan
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-gray-500">
          Klik <b>Maafkan Aku</b> akan membuka WhatsApp ke {waNumber} dengan pesan otomatis.
        </p>
      </motion.div>
    </div>
  );
}
