/* eslint-disable no-restricted-globals */
import { Routes, Route } from "react-router-dom";
import { GraphProvider } from "./context/graphContext";
import GraphLayout from "./context/graphLayout";
import HomePage from "./pages/HomePage";
import SelectGraph from "./pages/SelectGraph";
import AddItems from "./pages/AddItems";
import ShowGraph from "./pages/ShowGraph";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.innerWidth < 998) {
        screen.orientation.lock("portrait");
      } else {
        screen.orientation.unlock();
      }
    };

    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      screen.orientation.unlock();
    };
  }, []);

  return (
    <GraphProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="selectgraph" element={<SelectGraph />} />
        <Route path="" element={<GraphLayout />}>
          <Route path="additems" element={<AddItems />} />
          <Route path="showgraph" element={<ShowGraph />} />
        </Route>
      </Routes>
    </GraphProvider>
  );
}
