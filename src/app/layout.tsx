// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: { default: "Cello I Love You" },
  description: "Perjalanan cinta kita 💛",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
