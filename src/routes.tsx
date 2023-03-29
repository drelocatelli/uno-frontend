import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/login.component";

function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route index={true} path='/' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );

}

export default Router;