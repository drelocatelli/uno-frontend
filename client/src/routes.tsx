import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimationLoading from "./components/loading/animation.component";
import IndexPage from "./pages";
import LobbyPage from "./pages/lobby";

function Router() {
    
    return(
        <BrowserRouter>
            <Routes>
                <Route index={true} path='/' element={<IndexPage />} />
                <Route path='/lobby' element={<LobbyPage />} />
                <Route path='/debug' element={<AnimationLoading isLoading={true} />} />
            </Routes>
        </BrowserRouter>
    );

}

export default Router;