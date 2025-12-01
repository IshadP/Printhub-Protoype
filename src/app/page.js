import Image from "next/image";
import Navbar from "./components/navbar";
import TopBar from "./components/topbar"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="aspect-270/600 border-2 h-[90vh] rounded-3xl overflow-hidden relative flex flex-col bg-primary-container">
      <TopBar />
      <div className="flex-1 overflow-y-auto">
        
      </div>
      <Navbar/>
      </div>
    </div>
  );
}
