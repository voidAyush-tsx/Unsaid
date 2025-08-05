import Image from "next/image";
import Navbar from "../components/navBar_v1";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col m-0">
      <div className="fixed w-full">
        <Navbar/>
      </div>
      <div style={{ width: "100%" }}>
        <Image
          src="/home/home_page_1.png"
          alt="Landing Page"
          layout="responsive"
          width={1920}
          height={1080}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>
    </div>
  );
}