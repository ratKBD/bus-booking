import React, { useContext, useEffect, useState } from "react";

export const BusInfo = React.createContext();

export const BusInfoProvider = ({ children }) => {
  const [busData, setBusData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBusData = () => {
    fetch("http://localhost:8001/api/busInfo")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBusData(data.data.buses);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBusData();
  }, []);

  const updateBusData = (updatedData) => {
    setBusData(updatedData);
  };

  return (
    <BusInfo.Provider
      value={{
        busData,
        loading,
        error,
        updateBusData, // Provide a function to update bus data
      }}
    >
      {children}
    </BusInfo.Provider>
  );
};

export const useAllBusData = () => {
  const context = useContext(BusInfo);

  if (context === null) {
    throw new Error("useAllProduct must be used within a AllProductProvider");
  }

  return context;
};
