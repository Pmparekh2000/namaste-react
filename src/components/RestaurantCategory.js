import { useState } from "react";
import ItemCard from "./ItemCard";

const RestaurantCategory = ({itemCard, expanded, setShowItemsIndex}) => {
    // const [expanded, setExpanded] = useState(false);
    return (
        <div>
            <div className="flex flex-col w-6/12 mx-auto my-5 bg-gray-100 shadow-lg p-4">
                <div className="justify-items-start">
                    <span className="font-bold text-lg float-left hover:cursor-pointer" onClick={() => setShowItemsIndex()}>{itemCard.title} ({itemCard.itemCards.length})</span>
                    <span className="float-right hover:cursor-pointer" onClick={() => setShowItemsIndex()}>{expanded ? "🔼" : "🔽"}</span>
                </div>
                {
                    expanded ? (<div className="flex flex-col">
                        {
                            itemCard.itemCards.map((itemCard) => {
                                return <ItemCard key={itemCard.card.info.id} itemCard={itemCard.card.info} />
                            })
                        }
                    </div>) : (<></>)
                }
            </div>
        </div>
    );
};

export default RestaurantCategory;
