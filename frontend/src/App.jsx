import "./index.css";
import Navbar from "./Components/Navbar.jsx";
import Board from "./Chess/Board.jsx";
import Login from "./Chess/Login.tsx";
import SignUp from "./Chess/SignUp.tsx";
import { store } from "./State/Store.ts";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className='bg-black min-h-screen'>
                    <Navbar />
                    <div className='flex justify-center mt-6 px-4'>
                        <Routes>
                            <Route path='/' element={<Board />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/signup' element={<SignUp />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
