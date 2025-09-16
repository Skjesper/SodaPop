import "./../styles/globals.css";

export const metadata = {
  title: "3D Configurator App",
  description:
    "Interactive 3D model configurator built with Next.js and Three.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
