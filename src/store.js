import { createStore } from "redux";
import reducer from "./reducers";

const store = createStore(reducer);
window.__DEBUG_REDUX_STORE__ = store;
export default store;
