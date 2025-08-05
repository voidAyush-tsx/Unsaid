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
      <div className="flex flex-col p-50 items-center justify-center align-middle">
        <h1 className="font-unsaid font-extrabold mb-[64px]" style={{ color: "#A1CDD9", fontSize:"60px"}}>Our Story</h1>
        <p
          className="flex flex-col justify-center items-center text-center px-50 font-unsaid"
          style={{ color: "#736B66", fontSize: "20px" }}
        >
          At Unsaid, we believe that every emotion, every struggle, and every unspoken thought deserves to be acknowledged. Our journey began with a simple yet powerful idea—to create a safe and supportive platform for those navigating anxiety, stress, and mental well-being. We understand that sometimes, words fail us, but feelings remain. That's why we built Unsaid—a space where guidance, support, and healing come together.
        </p>
        <button className="bg-[#A1CDD9] rounded-full font-unsaid mt-10">
          <div className="px-5 py-2">Get In Touch</div>
        </button>

      </div>
    </div>
  );
}