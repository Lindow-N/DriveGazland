import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "../context/UserContext";
import { TagProvider } from "../context/TagContext";
import { FilesProvider } from "../context/FilesContext";

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
        <UserProvider>
          <TagProvider>
            <FilesProvider>{children}</FilesProvider>
          </TagProvider>
        </UserProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
