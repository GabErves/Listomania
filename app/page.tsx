"use client"
import './globals.css';

import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";


export default function Home() {
  console.log("!!!!");

  return (
    <main>
      {/* <Header /> */}
      <HomePage/>
      {/* <Login />
      <Register /> */}
    </main>
  );
}
