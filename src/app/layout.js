import AppShell from "./shell";
import "./styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="bg-gray-100 text-gray-900 dark:bg-black dark:text-white overflow-x-hidden" suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}