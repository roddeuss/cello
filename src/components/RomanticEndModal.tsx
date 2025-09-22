// components/RomanticEndModal.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function RomanticEndModal({
  open,
  onClose,
  waNumber,
}: {
  open: boolean;
  onClose: () => void;
  waNumber: string;
}) {
  const message =
    "Aku harap kita bisa terus menambahkan momen kita — dari sekarang sampai selamanya. " +
    "Terima kasih sudah berjalan sejauh ini bersamaku. Mari kita jaga, rawat, dan tumbuhkan cinta ini setiap hari. ❤️";

  const openWhatsApp = () => {
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent("Iya, aku juga mau tambah momen indah sama kamu. ❤️")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-lg rounded-2xl bg-white p-6 text-center shadow-2xl"
            initial={{ y: 20, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1, transition: { type: "spring", stiffness: 220, damping: 20 } }}
            exit={{ y: 10, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
              aria-label="Tutup"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold">Selamanya, Kita 💞</h3>
            <p className="mt-3 text-gray-700 leading-relaxed">
              {message}
            </p>

            <p className="mt-3 text-xs text-gray-500">
              *Modal ini muncul ketika kamu sudah melihat akhir timeline — tanda bab berikutnya baru saja dimulai.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
