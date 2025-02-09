import "./index.css";
import Navbar from "./Components/Navbar.jsx";
import Board from "./Chess/Board.jsx";
import { store } from "./State/Store.js";
import { Provider } from "react-redux";

function App() {
    return (
        <Provider store={store}>
            <div className='bg-black'>
                <Navbar></Navbar>
                <div className='flex justify-center mt-6 h-screen'>
                    <Board></Board>
                </div>
            </div>
        </Provider>
    );
}

export default App;
