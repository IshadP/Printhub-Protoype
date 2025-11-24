import Image from "next/image";
import TopBar from "./components/TopBar";
import MobileLayout from "./components/MobileLayoutWrapper";
import NavBar from "./components/NavBar";
import Button from "./components/Button";
import Switch from "./components/Swtich";
import IconToggle from "./components/IconToggle";
import OrientationIcon from "./components/OrientationIcon";
import OrientationToggle from "./components/OrientationToggle";
import DoubleSided from "./components/Doublesided";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center flex-col justify-center bg-zinc-50 font-sans px-4">
     <IconToggle icon="add"/>
     <OrientationIcon orientation="portrait"/>
     <OrientationToggle options="portrait"/>
     <DoubleSided/>
    </div>
  );
}
