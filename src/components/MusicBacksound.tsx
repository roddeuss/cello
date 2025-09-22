"use client";
import { useEffect, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

type Props = {
  youtubeId: string;
  label?: string; // tidak dipakai, tapi disimpan kalau mau tampilkan tombol manual nanti
};

export default function MusicBacksound({ youtubeId }: Props) {
  // langsung putar (muted) saat mount
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setMounted(true); // trigger render iframe autoplay muted
  }, []);

  // build src dengan param mute dinamis
  const src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=${muted ? 1 : 0}&controls=0&loop=1&playlist=${youtubeId}&rel=0&playsinline=1`;

  return (
    <>
      {/* Iframe disembunyikan, tapi tetap memutar audio */}
      {mounted && (
        <iframe
          title="backsound"
          src={src}
          allow="autoplay"
          className="pointer-events-none absolute -left-[9999px] h-[1px] w-[1px] opacity-0"
        />
      )}

      {/* Tombol kecil mengambang untuk unmute/mute */}
      <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
        <button
          onClick={() => setMuted((m) => !m)}
          className="inline-flex items-center gap-2 rounded-full bg-rose-600/95 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-rose-700 focus:outline-none"
          title={muted ? "Nyalakan suara" : "Matikan suara"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {muted ? "Nyalakan Suara" : "Matikan Suara"}
        </button>
      </div>
    </>
  );
}
