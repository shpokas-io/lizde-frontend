import "../styles/globals.css";

export const metadata = {
  title: "Hello World App",
  description: "A simple Next.js app to test Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">{children}</body>
    </html>
  );
}
