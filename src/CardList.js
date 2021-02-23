import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateCreditCard from "./CreateCreditCard";
import "./styles/CardList.css";
function CardList() {
  const [storage, setStorage] = useState(Object.values({ ...localStorage }));

  const removeCard = (e) => {
    localStorage.removeItem(e.target.id);
    setTimeout(() => {
      setStorage(Object.values({ ...localStorage }));
    }, 200);
  };

  const items = storage;
  const allCards = items.map((item) => {
    let element = JSON.parse(item);
    return (
      <div className="card-and-btn-container" key={element.id}>
        <Link
          to={`/cards/${element.id}/edit`}
          className="links"
          key={element.id}
        >
          <CreateCreditCard
            elements={element}
            key={element.id}
            showHide={false}
          />
        </Link>
        <button className="btn" onClick={removeCard}>
          <i id={element.id} className="fas fa-trash-alt"></i>
        </button>
      </div>
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
