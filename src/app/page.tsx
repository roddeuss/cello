"use client";

import Hero from "@/components/Hero";
import Timeline, { TimelineItem } from "@/components/Timeline";
import Gallery from "@/components/Gallery";
import ApologyModal from "@/components/ApologyModal";
import RomanticEndModal from "@/components/RomanticEndModal"; // <= baru
import { useRef, useState } from "react";


// === Konfigurasi konten ===
const START_DATE = new Date(2022, 9, 4); // 04 Oct 2022
const YT_VIDEO_ID = "GgDLuuiKVPs";
const WHATSAPP_NUMBER = "6281370925582";
const WA_MESSAGE = "Aku mau maafkan kamu, Andreas, dan mau bertemu.";

// Timeline (pakai DD-MM-YYYY sesuai request kamu)
const TIMELINE: TimelineItem[] = [
  { 
    title: "First Date", 
    date: "03-08-2022", 
    photo: "/photos/journey/00.jpeg",
    description: "Hari pertama kita jalan berdua, perasaan ini masih asing tapi begitu hangat. Aku deg-degan luar biasa, tapi di balik itu aku merasa bahagia karena akhirnya aku bisa merasakan momen spesial bersamamu. Dari situlah aku tahu, hatiku mulai menemukan rumahnya."
  },
  { 
    title: "Awal Jadian", 
    date: "04-10-2022", 
    photo: "/photos/journey/01.jpeg",
    description: "Hari kita resmi jadi pasangan. Awal mula perjalanan cinta yang penuh cerita, tawa, tangis, dan doa. Aku ingat betapa bahagianya aku saat itu, seolah dunia hanya punya kita berdua. Dari sini aku yakin, aku ingin melangkah bersamamu lebih jauh lagi."
  },
  { 
    title: "Wisuda Mikroskil", 
    date: "15-10-2022", 
    photo: "/photos/journey/02.jpeg",
    description: "Hari penuh pencapaian dan kebanggaan Kita, Kita Bisa Wisuda Bareng, Dan SukaCita hadir didalam kita, aku selalu berdoa agar kita bisa sukses bersama."
  },
  { 
    title: "Promnight Mikroskil", 
    date: "16-10-2022", 
    photo: "/photos/journey/03.jpeg",
    description: "Promnight pertama kita, di mana kita bisa berdandan rapi, tersenyum, dan bersenang-senang bersama. Di keramaian itu, aku hanya fokus pada kamu. Aku merasa dunia begitu indah saat aku bisa menggandeng tanganmu."
  },
  { 
    title: "Cello Birthday", 
    date: "19-10-2022", 
    photo: "/photos/journey/04.jpeg",
    description: "Hari ulang tahunmu, momen untuk merayakan keberadaanmu yang begitu berharga dalam hidupku. Aku bersyukur kamu ada, dan aku hanya ingin memastikan bahwa setiap ulang tahunmu dipenuhi dengan cinta, doa, dan kebahagiaan dariku."
  },
  { 
    title: "Happy Valentine Date", 
    date: "14-02-2023", 
    photo: "/photos/journey/05.jpeg",
    description: "Valentine pertama kita sebagai pasangan. Hari yang sederhana, tapi terasa begitu istimewa. Bukan tentang hadiah atau cokelat, tapi tentang bagaimana aku merasa dicintai dan bisa mencintaimu dengan tulus di setiap detik kebersamaan kita."
  },
  { 
    title: "Timezone Date", 
    date: "29-04-2023", 
    photo: "/photos/journey/06.jpeg",
    description: "Main bareng di Timezone jadi kenangan yang nggak pernah membosankan. Kita tertawa lepas, saling bersaing, dan di setiap tawa itu aku melihat betapa nyamannya aku bersamamu. Aku ingin selalu ada momen bahagia sederhana seperti ini."
  },
  { 
    title: "Pet Cafe Date", 
    date: "30-04-2023", 
    photo: "/photos/journey/07.jpeg",
    description: "Ngopi sambil main dengan hewan-hewan lucu. Aku bisa lihat senyum tulusmu, cahaya yang selalu bikin aku jatuh cinta lagi dan lagi. Saat itu aku sadar, kebahagiaan kita sering kali sederhana: hanya butuh kebersamaanmu."
  },
  { 
    title: "Golf Date", 
    date: "27-05-2023", 
    photo: "/photos/journey/08.jpeg",
    description: "Cobain hal baru bareng kamu, meski canggung dan kaku, tapi justru di situlah serunya. Aku belajar kalau selama ada kamu, semua hal baru terasa lebih menyenangkan dan penuh warna."
  },
  { 
    title: "Andreas Birthday", 
    date: "11-08-2023", 
    photo: "/photos/journey/09.jpeg",
    description: "Hari ulang tahunku jadi lebih bermakna karena ada kamu. Ucapan dan doamu adalah hadiah terindah yang selalu aku simpan dalam hati. Aku bersyukur bisa merayakan hari itu denganmu di sisiku."
  },
  { 
    title: "Cello Birthday", 
    date: "19-10-2023", 
    photo: "/photos/journey/10.jpeg",
    description: "Setiap ulang tahunmu selalu jadi pengingat betapa beruntungnya aku bisa mencintaimu. Aku ingin terus membuatmu tersenyum, bukan hanya di hari spesialmu, tapi di setiap hari kita bersama."
  },
  { 
    title: "Anniversary", 
    date: "28-10-2023", 
    photo: "/photos/journey/11.jpeg",
    description: "Hari jadi kita yang pertama. Setahun penuh perjalanan penuh suka dan duka, tapi kita tetap bertahan. Aku ingin terus merayakan anniversary ini, tahun demi tahun, sampai selamanya."
  },
  { 
    title: "Singapore Date", 
    date: "07-03-2024", 
    photo: "/photos/journey/12.jpeg",
    description: "Perjalanan pertama kita ke luar negeri bersama. Setiap langkah, setiap tempat yang kita kunjungi, semuanya terasa lebih indah karena kamu ada di sampingku."
  },
  { 
    title: "USS Date", 
    date: "09-03-2024", 
    photo: "/photos/journey/13.jpeg",
    description: "Seharian di Universal Studios Singapore penuh tawa, jeritan, dan foto-foto seru. Tapi yang paling aku ingat adalah genggaman tanganmu di setiap wahana, yang bikin aku merasa aman dan bahagia."
  },
  { 
    title: "Malaysia Date", 
    date: "10-03-2024", 
    photo: "/photos/journey/14.jpeg",
    description: "Jalan bareng ke Malaysia jadi pengalaman yang semakin mempererat kita. Rasanya seperti petualangan kecil yang selalu aku harap bisa kita ulang lagi dan lagi."
  },
  { 
    title: "Sushi Date", 
    date: "17-07-2024", 
    photo: "/photos/journey/15.jpeg",
    description: "Makan sushi favorit bareng kamu adalah momen sederhana tapi penuh arti. Ngobrol santai sambil tertawa kecil bikin aku semakin sadar: kebersamaan denganmu adalah hal yang paling aku nikmati."
  },
  { 
    title: "Andreas Birthday", 
    date: "11-08-2024", 
    photo: "/photos/journey/16.jpeg",
    description: "Ulang tahunku lagi, dan kamu tetap ada untuk merayakannya denganku. Kehadiranmu adalah hadiah yang nggak bisa dibandingkan dengan apapun. Aku hanya ingin kamu selalu ada di setiap ulang tahunku."
  },
  { 
    title: "Sunday to Church", 
    date: "05-10-2024", 
    photo: "/photos/journey/17.jpeg",
    description: "Ibadah Minggu bareng kamu bikin aku merasa lebih dekat dengan Tuhan sekaligus lebih dekat denganmu. Rasanya damai, tenang, dan penuh syukur."
  },
  { 
    title: "Birthday Sella and Anniversary", 
    date: "19-10-2024", 
    photo: "/photos/journey/18.jpeg",
    description: "Hari ulang tahunmu yang bertepatan dengan anniversary kita. Double celebration, double happiness. Aku ingin momen ini jadi tradisi kita yang penuh cinta dan doa."
  },
  { 
    title: "Christmas Date", 
    date: "25-12-2024", 
    photo: "/photos/journey/19.jpeg",
    description: "Natal bersamamu adalah hadiah terbaik. Suasananya hangat, penuh cinta, dan doa yang aku harap akan terus bersama kita selamanya."
  },
  { 
    title: "Bangkok Date", 
    date: "08-02-2025", 
    photo: "/photos/journey/20.jpeg",
    description: "Perjalanan ke Bangkok membuka cerita baru. Jalan-jalan, mencoba hal baru, semuanya lebih menyenangkan karena aku bisa berbagi pengalaman itu denganmu."
  },
  { 
    title: "Sunsite on Pattayaa", 
    date: "09-02-2025", 
    photo: "/photos/journey/21.jpeg",
    description: "Sunset di Pattaya bersama kamu jadi salah satu momen terindah. Saat matahari perlahan tenggelam, aku hanya ingin waktu berhenti supaya aku bisa lebih lama memandangmu."
  },
  { 
    title: "Malaysia Date Again", 
    date: "07-08-2025", 
    photo: "/photos/journey/22.jpeg",
    description: "Kembali ke Malaysia untuk mengulang kenangan manis kita. Rasanya nostalgia, tapi juga penuh semangat baru untuk menambah kisah yang lebih indah lagi."
  },
  { 
    title: "Andreas Birthday", 
    date: "11-08-2025", 
    photo: "/photos/journey/23.jpeg",
    description: "Setiap ulang tahunku, aku selalu berharap kamu ada di sampingku. Karena bersamamu, aku merasa lengkap, kuat, dan siap menjalani masa depan."
  },
];



export default function Page() {
  const [openApology, setOpenApology] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const endShownRef = useRef(false);

  const handleEndReach = () => {
    if (endShownRef.current) return; // hanya sekali
    endShownRef.current = true;
    // delay kecil biar nyaman
    setTimeout(() => setOpenEnd(true), 800);
  };

  return (
    <main className="pb-24">
      <Hero startDate={START_DATE} youtubeId={YT_VIDEO_ID} />

      <Timeline items={TIMELINE} onEndReach={handleEndReach} />

      <Gallery title="Foto Kenangan" folder="kenangan" count={25} />

      {/* CTA Permintaan Maaf */}
      <section className="mx-auto mt-16 max-w-3xl px-6 text-center">
        <button
          onClick={() => setOpenApology(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-6 py-3 text-white shadow-lg hover:bg-rose-700"
        >
          💬 Permintaan Maaf
        </button>
      </section>

      <ApologyModal
        open={openApology}
        onClose={() => setOpenApology(false)}
        waNumber={WHATSAPP_NUMBER}
        waMessage={WA_MESSAGE}
      />

      {/* Modal Romantis setelah akhir timeline */}
      <RomanticEndModal
        open={openEnd}
        onClose={() => setOpenEnd(false)}
        waNumber={WHATSAPP_NUMBER}
      />
    </main>
  );
}
