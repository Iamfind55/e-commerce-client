import Header from "../components/header/page";
import Footer from "../components/footer/page";
import "../globals.css";

export const metadata = {
  title: "Tiktokshop",
  description:
    "We are the represent of tiktok for selling best product to you.",
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
