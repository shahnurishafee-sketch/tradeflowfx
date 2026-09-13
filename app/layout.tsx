// app/layout.tsx
import "./globals.css"; // Make sure your Tailwind styles load here

export const metadata = {
  title: "TFF Dashboard",
  description: "Trading Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Remove any hardcoded bg classes here so document.documentElement controls the color */}
      <body className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200 antialiased">
        {children}
      </body>
    </html>
  );
}
