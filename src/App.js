import React from "react";
import ReactDOM from "react-dom";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";
import Accueil from "./Pages/AnimeList/";
import { Provider } from "react-redux";
import store from "./store";
import styled from "styled-components";
import myImage from "./_assets/img/Background2.jpg";
import Anime from "./Pages/Anime";

const App = () =>
  ReactDOM.render(
    <StyledComp>
      <Router history={useHistory()}>
        <Provider store={store}>
          <Route path="/" exact component={Accueil} />
          <Route path="/anime/:id" component={Anime} />
        </Provider>
      </Router>
    </StyledComp>,

    document.getElementById("root")
  );
const StyledComp = styled.div`
  background-image: url(${myImage});
  width: 100%;
`;
export default App;
