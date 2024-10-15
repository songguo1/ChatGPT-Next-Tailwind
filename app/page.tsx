import Main from "@/components/home/Main/Menu";
import Navigation from "@/components/home/Navigation/index";

export default function Home() {
  return (
   <div className="h-full flex">
    <Navigation/>
    <Main/>
    </div>
  );
}
