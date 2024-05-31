import React from "react";
import Advertise from "./Content/Advertisement/Advertise";
import Brand from "./Content/Brand/Brand";
import UseFull from "./Content/Useful/UseFull";
import FillterType from "./Content/Shopping/FillterType";
import HeaderPage from "../../utils/Header/Header";
import FooterPage from "../../utils/Footer/FooterPage";

export default function HomeScreen() {
  return (
    <div>
      <HeaderPage />
      <Advertise />
      <Brand />
      <UseFull />
      <FillterType />
      <FooterPage />
    </div>
  );
}
