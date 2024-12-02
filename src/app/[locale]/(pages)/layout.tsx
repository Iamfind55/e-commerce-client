import Header from "../components/header/page";
import Footer from "../components/footer/page";
import "../globals.css";

export const metadata = {
  title: "Okardcare",
  description:
    "We are the first online health consultant plate form in the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
