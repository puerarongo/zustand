import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "./components/container/Container";
import List from "./pages/list/List";
import ItemDetail from "./pages/itemDetail/ItemDetail";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route index element={<List />} />
        <Route path="/:beerId" element={<ItemDetail />} />
      </Route>
    </Routes>
  );
};

export default App;
