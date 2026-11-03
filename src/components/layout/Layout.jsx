import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Checkout from "./Checkout";
import CarritoModal from "./CarritoModal";
import { STORE_ENABLED } from "../../config/features";


export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      {STORE_ENABLED && (
        <>
          <Checkout />
          <CarritoModal />
        </>
      )}
      <Footer />
    </>
  )
}
