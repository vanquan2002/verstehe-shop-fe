import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ShopSection from "../components/homeComponents/ShopSection";
import CalltoActionSection from "../components/homeComponents/CalltoActionSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import { useParams } from "react-router-dom";

export default function HomeScreen() {
  const { keyword } = useParams();
  const { pageNumber } = useParams();

  return (
    <div>
      <Header />
      <ShopSection pageNumber={pageNumber} keyword={keyword} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
}
