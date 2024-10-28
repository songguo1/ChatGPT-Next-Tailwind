import ModelSelect from "@/components/home/Main/ModelSelect";

export default function Welcome() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 pt-20 pb-8">
        <ModelSelect></ModelSelect>
        <img src="/images/logo.png" className="w-[600px] " alt="" />
    </div>
  );
}
