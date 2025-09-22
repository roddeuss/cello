"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Image as ImageIcon, MessageCircleHeart, Timer, BookOpen, AlertCircle } from "lucide-react";
import MusicBacksound from "./MusicBacksound";

function diffYMD(from: Date, to: Date) {
  let y = to.getFullYear() - from.getFullYear();
  let m = to.getMonth() - from.getMonth();
  let d = to.getDate() - from.getDate();
  if (d < 0) { const pm = new Date(to.getFullYear(), to.getMonth(), 0).getDate(); d += pm; m -= 1; }
  if (m < 0) { m += 12; y -= 1; }
  return { y, m, d };
}

export default function Hero({
  startDate,
  youtubeId,
}: {
  startDate: Date;
  youtubeId: string;
}) {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);
  const { y, m, d } = useMemo(() => diffYMD(startDate, now), [startDate, now]);

  // ===== ayat (boleh tetap pakai versi kamu) =====
  const verses = [
    { ref: "Amsal 19:14", text: "Rumah dan harta adalah warisan dari nenek moyang, tetapi istri yang berakal budi adalah karunia TUHAN." },
    { ref: "Kidung Agung 8:6–7", text: "Taruhlah aku seperti meterai pada hatimu... air yang banyak tak dapat memadamkan cinta." },
    { ref: "1 Yohanes 4:18–19", text: "Di dalam kasih tidak ada ketakutan... Kita mengasihi, karena Allah lebih dahulu mengasihi kita." },
    { ref: "Filipi 2:2–4", text: "Sehati sepikir, satu kasih, satu tujuan... perhatikan juga kepentingan orang lain." },
    { ref: "Kolose 3:14", text: "Dan di atas semuanya itu: kenakanlah kasih, sebagai pengikat yang mempersatukan dan menyempurnakan." },
  ];
  const [vIdx, setVIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setVIdx((i) => (i + 1) % verses.length), 6000);
    return () => clearInterval(t);
  }, []);

  // ===== banner: minta user klik tombol musik =====
  const [showMusicBanner, setShowMusicBanner] = useState(true);
  useEffect(() => {
    // opsi tambahan kalau mau pakai alert native:
    // alert("Untuk alasan kebijakan browser, audio tidak bisa autoplay. Silakan tekan 'Putar musik kita' ya 🎶");
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
        {/* Banner ajakan putar musik */}
        <AnimatePresence>
          {showMusicBanner && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-auto mb-4 max-w-xl rounded-xl bg-rose-100 px-4 py-3 text-rose-800 shadow"
            >
              <div className="flex items-start justify-between gap-3 text-left">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <p className="text-sm">
                    Tolong Dengar Lagu, Dan Aktifkan Suaranya dibutton nyalakan Audio
                  </p>
                </div>
                <button
                  onClick={() => setShowMusicBanner(false)}
                  className="rounded-md px-2 py-1 text-xs text-rose-700 hover:bg-rose-200"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-rose-700"
        >
          <Heart className="h-4 w-4" />
          <span>Perjalanan Cinta Kita</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl"
        >
          {y} tahun, {m} bulan, {d} hari bersama
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-4 max-w-2xl text-lg text-gray-700"
        >
          Kita sudah melewati suka dan duka: ketawa yang kita bagi, air mata yang kita seka,
          perbedaan yang kita jembatani, dan mimpi yang kita rawat bersama. Aku belajar memelukmu
          bukan hanya saat mudah, tapi juga saat sulit—saling menguatkan, saling memaafkan,
          dan bertumbuh jadi versi terbaik kita berdua. Tujuan kita jelas: melangkah serius,
          membangun rumah yang hangat, dan menua dalam kasih yang sama. 💍
        </motion.p>

        {/* tombol musik */}
        <MusicBacksound youtubeId={youtubeId} />

        {/* badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow">
            <Timer className="h-4 w-4" /> Sejak 04 Oktober 2022
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow">
            <ImageIcon className="h-4 w-4" /> Galeri & Animasi
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow">
            <MessageCircleHeart className="h-4 w-4" /> Permintaan Maaf
          </span>
        </motion.div>

        {/* kartu ayat (auto-rotate) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mx-auto mt-8 max-w-2xl"
        >
          <div className="rounded-2xl bg-white/80 p-5 shadow ring-1 ring-rose-100">
            <div className="mb-2 text-rose-700">
              <span className="text-sm font-semibold">Ayat untuk pasangan yang serius menuju pernikahan</span>
            </div>

            <div className="relative min-h-[88px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={vIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45 }}
                  className="text-gray-700"
                >
                  <p className="text-base leading-relaxed">“{verses[vIdx].text}”</p>
                  <p className="mt-1 text-right text-sm text-rose-600">— {verses[vIdx].ref}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-3 flex justify-center gap-1.5">
              {verses.map((_, i) => (
                <span key={i} className={`h-1.5 w-6 rounded-full ${i === vIdx ? "bg-rose-600" : "bg-rose-200"}`} />
              ))}
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-600">
            Kiranya kasih kita sabar, setia, dan bertumbuh—hingga kelak kita mengucap janji di hadapan Tuhan dan keluarga. 🤍
          </p>
        </motion.div>
      </div>
    </section>
  );
}
