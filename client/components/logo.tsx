import Image from "next/image";
const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        width={120}
        height={80}
        src="/logo.png"
        alt="Eneba Logo"
      />
    </div>
  );
}

export default Logo;