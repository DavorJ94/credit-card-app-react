import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./styles/App.css";
import CreateCreditCard from "./CreateCreditCard";
import CardList from "./CardList";
function App() {
  const items = Object.keys({ ...localStorage });

  return (
    <Router>
      {items.length === 0 ? (
        <Redirect to="/cards/add" />
      ) : (
        <Redirect to="/cards" />
      )}
      <Switch>
        <Route exact path="/cards">
          <CardList />
        </Route>
        <Route path="/cards/add">
          <CreateCreditCard />
        </Route>
        <Route path="/cards/:id/edit">
          <CreateCreditCard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
