import AppContextProvider from "@/components/AppContext";
import "@/public/style/globals.css";
import "@/public/style/Markdown.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
