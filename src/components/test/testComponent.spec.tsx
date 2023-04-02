import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import store from "../../store/store";
import { BrowserRouter as Router } from "react-router-dom";

export function TestComponent({children}: PropsWithChildren) {
    return(
        <Provider store={store}>
            <Router>
                {children}
            </Router>
        </Provider>
    );
}