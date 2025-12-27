'use client';

import { useEffect } from "react";
import TopBar from "../components/top-bar";

export default function Home() {
  const initData = async () => {

  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <div className="bg-[#4517ab] text-white">
      <div className="w-[80%] mx-auto">
        <TopBar />
      </div>
      <div className="w-[80%] mx-auto mt-4">
        <h1 className="text-2xl font-bold">Home Page</h1>
      </div>
    </div>
  );
}
