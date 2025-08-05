import Image from "next/image";
import Navbar from "../components/navBar_v1";

export default function Home() {
  return (
    <>
      <Navbar/>
      <div style={{ width: "100%" }}>
        <Image
          src="/home/home_page_1.png"
          alt="Full width image"
          layout="responsive"
          width={1920}
          height={1080}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>
    </>
  );
}
