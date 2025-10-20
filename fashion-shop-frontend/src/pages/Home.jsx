import React, { useState } from "react";
import Hero from "../components/Hero";
import DressGrid from "../components/DressGrid";
import DressModal from "../components/DressModal";

export default function Home() {
  const [selectedDress, setSelectedDress] = useState(null);
  const [showOrder, setShowOrder] = useState(false);

  const handleDressClick = (dress) => {
    setSelectedDress(dress);
    setShowOrder(false);
  };

  const closeModal = () => {
    setSelectedDress(null);
    setShowOrder(false);
  };

  return (
    <>
      <Hero />
      <div id="collection" className="max-w-6xl mx-auto px-4 py-10">
        <DressGrid onDressClick={handleDressClick} />
      </div>

      {selectedDress && (
        <DressModal
          dress={selectedDress}
          showOrder={showOrder}
          onClose={closeModal}
          onOrder={() => setShowOrder(true)}
        />
      )}
    </>
  );
}
