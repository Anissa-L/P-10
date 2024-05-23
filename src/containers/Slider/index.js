import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) => (new Date(evtA.date) > new Date(evtB.date) ? -1 : 1)
    // eslint-disable-next-line
    // changement de sens '>' date en ordre décroissant
  );
  const nextCard = () => {
    setTimeout(
      // eslint-disable-next-line
      // vérification de la valeur de byDateDesc avec l'opérateur de coalescence nullish
      // ajout d'un "- 1", comme la l'indice est à 0 le dernier event(i = 2) sera toujours plus petit que la longueur du tableau (3)
      () => setIndex(index < (byDateDesc?.length ?? 0) - 1 ? index + 1 : 0),
      5000
    );
  };

  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={uuid()}>
          {/* eslint-disable-next-line */}
          {/* création de clé unique avec paquage uuid */}
          <div
            key={uuid()}
            // eslint-disable-next-line
            // création de clé unique avec paquage uuid
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={uuid()}
                  // eslint-disable-next-line
                  // création de clé unique avec paquage uuid
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  // eslint-disable-next-line
                  // remplacé "idx" par "index"
                  readOnly="readonly"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
