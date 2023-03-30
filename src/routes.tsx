import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./components/index/index.component";
import Lobby from "./components/lobby/lobby.component";

function Router() {
    
    return(
        <BrowserRouter>
            <Routes>
                <Route index={true} path='/' element={<Index />} />
                <Route path='/lobby' element={<Lobby />} />
            </Routes>
        </BrowserRouter>
    );

}

export default Router;