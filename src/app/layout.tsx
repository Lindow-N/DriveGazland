import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "../context/UserContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Catamaran:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-gray-100">
        <UserProvider>{children}</UserProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
