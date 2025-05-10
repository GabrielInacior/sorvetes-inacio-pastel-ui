
import React, { useEffect } from "react";
import HomePage from "./HomePage";
import { initializeData } from "@/utils/localStorageDB";

const Index: React.FC = () => {
  // Initialize LocalStorage database on first load
  useEffect(() => {
    initializeData();
  }, []);
  
  return <HomePage />;
};

export default Index;
