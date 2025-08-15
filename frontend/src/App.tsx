import "./index.css";
import React from "react";
import Navbar from "./components/Navbar.jsx";
import Board from "./chess/Board.jsx";
import { store } from "./state/Store.ts";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <div className="bg-black">
        <Navbar></Navbar>
        <div className="flex justify-center mt-6 h-screen">
          <Board></Board>
        </div>
      </div>
    </Provider>
  );
};

export default App;
