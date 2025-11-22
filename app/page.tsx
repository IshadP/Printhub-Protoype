import Image from "next/image";
import TopBar from "./components/TopBar";
import MobileLayout from "./components/MobileLayoutWrapper";
import NavBar from "./components/NavBar";
import Button from "./components/Button";
import Switch from "./components/Swtich";
import IconToggle from "./components/IconToggle";
import OrientationToggle from "./components/OrientationIcon";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
     <IconToggle icon="add"/>
     <OrientationToggle orientation="portrait"/>
    </div>
  );
}
