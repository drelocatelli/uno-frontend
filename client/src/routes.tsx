import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./components/index/index.component";
import Lobby from "./components/lobby/index/lobby";
import AnimationLoading from "./components/loading/animation.component";

function Router() {
    
    return(
        <BrowserRouter>
            <Routes>
                <Route index={true} path='/' element={<Index />} />
                <Route path='/lobby' element={<Lobby />} />
                <Route path='/debug' element={<AnimationLoading isLoading={true} />} />
            </Routes>
        </BrowserRouter>
    );

}

export default Router;