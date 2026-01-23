import { Header } from '../Header.jsx';
import React from "react";
import "./Compare.css";
import { CompareCard } from './CompareCard.jsx';


export default function Compare() {
  return (
    <>
      <Header />

      {/* CARD CONTAINER */}
      <div className="cards-container">
        <CompareCard />
        <CompareCard />
      </div>
    </>
  );
}
