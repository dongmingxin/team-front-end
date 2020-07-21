import React from 'react';
import '../../../style/layout/order.scss';


const RenderOrderCard = ({ cardList, handleRemove }) => {
    return (
        <div>
            {cardList && cardList.map(item => (
                <div className="order__card" key={item._id}>
                    <div className="order__card--info">
                        <div className="order__card--name">{`${item.productId.name}\u00A0\u00A0X\u00A0\u00A0${item.quantity}`}</div>
                        <div className="order__card--price">{`$${item.totalPrice}`}</div>
                    </div>
                    <div className="order__card--removeButton">
                        <button onClick={() => handleRemove(item._id)}>REMOVE</button>
                    </div>
                 </div>
            ))}
        </div> 
     );
}
 
export default RenderOrderCard;