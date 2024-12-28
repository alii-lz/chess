import "./index.css";
import Navbar from "./Components/Navbar.jsx";
import Board from "./Chess/Board.jsx";

function App() {
    return (
        <div className='bg-black'>
            <Navbar></Navbar>
            <div className='flex justify-center mt-6 h-screen'>
                <Board></Board>
            </div>
        </div>
    );
}

export default App;
