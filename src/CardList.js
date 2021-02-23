import React from "react";
import { Link } from "react-router-dom";
import CreateCreditCard from "./CreateCreditCard";
import "./styles/CardList.css";
function CardList() {
  const items = Object.values({ ...localStorage });

  const allCards = items.map((item) => {
    let element = JSON.parse(item);
    return (
      <Link to={`/cards/${element.id}/edit`} className="links" key={element.id}>
        <CreateCreditCard
          elements={element}
          key={element.id}
          showHide={false}
        />
      </Link>
    );
  });
  return (
    <div>
      <div className="cards-container">
        {allCards}
        <Link to="/cards/add" className="links">
          <div className="add-card">
            <span>+</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CardList;
