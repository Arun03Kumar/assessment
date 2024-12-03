import "./App.css";
import { Header } from "./components/Header";
import Board from "./components/Board";
import { useEffect, useState } from "react";
import Notification from "./components/Notification";

function App() {
  const [displayType, setDisplayType] = useState(() => {
    return localStorage.getItem("displayType") || "Status";
  });
  const [orderType, setOrderType] = useState(() => {
    return localStorage.getItem("orderType") || "priority";
  });

  useEffect(() => {
    localStorage.setItem("displayType", displayType);
  }, [displayType]);

  useEffect(() => {
    localStorage.setItem("orderType", orderType);
  }, [orderType]);

  return (
    <div className="App">
      <Header
        displayType={displayType}
        orderType={orderType}
        setDisplayType={setDisplayType}
        setOrderType={setOrderType}
      />
      <Board displayType={displayType} orderType={orderType} />
      <Notification />
    </div>
  );
}

export default App;
