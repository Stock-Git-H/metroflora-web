export const metadata = {
  title: "Sanity Studio — Vinařství Metroflora",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
