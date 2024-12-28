import "./globals.css";

export const metadata = {
  title: "My Journal App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className="bg-slate-100">
        {children}
      </body>
    </html>
  );
}
