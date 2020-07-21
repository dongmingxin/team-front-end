import React from 'react';
import '../../../style/layout/menuBody.scss';

const RenderCard = ({cardList, handleSelect}) => {
    return ( 
        <div className="category__cardContianer">
            {cardList.map(card => (
                <div className="card" key={card._id}>
                    <img src={card.avatar} alt={`${card}Img`}/>
                    <div className="card__title">{card.name}</div>
                    <div className="card__body">
                        <div>{`From $${card.price}`}</div>
                        <div>{`${card.calorie}kj^`}</div>
                    </div>
                    <button onClick={() => handleSelect(card._id)}>Select</button>
                </div>
            ))}
        </div>
     );
}

export default RenderCard;