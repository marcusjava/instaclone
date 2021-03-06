import React, { useEffect } from "react";
import { Header, Timeline, Sidebar } from "../components";
import useUser from "../hooks/use-user";

// import { Container } from './styles';

function Dashboard({ user }) {
  useEffect(() => {
    document.title = "Instagram";
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg ">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}

export default Dashboard;
