import TopBar from "./components/top-bar";

export default function Home() {
  return (
    <div>
      <div className="w-[80%] mx-auto">
        <TopBar />
      </div>
      <div className="w-[80%] mx-auto mt-4">
        <h1 className="text-2xl font-bold">Home Page</h1>
      </div>
    </div>
  );
}
