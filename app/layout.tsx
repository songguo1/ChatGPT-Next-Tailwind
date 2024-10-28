
import AppContextProvider from "@/components/AppContext";
import EventBusContextProvider from "@/components/EventBusContext";
import "@/style/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <EventBusContextProvider>
            {children}
          </EventBusContextProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
