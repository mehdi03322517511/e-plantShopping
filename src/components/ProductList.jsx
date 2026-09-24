import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { addItem } from './CartSlice';

export const ProductList = ({ plantsArray, dispatch }) => {
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((prevState) => ({ ...prevState, [product.name]: true }));
  };

  return <div className="product-grid">
    {plantsArray.map((category, index) => <section className="category" key={category.category || index}>
      <h2>{category.category}<span /></h2>
      <div className="product-list product-grid">
        {category.plants.map((plant, plantIndex) => <article className="product-card" key={plant.id || plant.name || plantIndex}>
          <div className="product-image"><img src={plant.image} alt={plant.name} /><span>{category.category}</span></div>
          <div className="product-info"><h3>{plant.name}</h3><p>{plant.description}</p><div className="product-bottom"><strong>${Number(plant.cost).toFixed(2)}</strong><button className="product-button" onClick={() => handleAddToCart(plant)}><Plus size={17} />{addedToCart[plant.name] ? 'Added' : 'Add to Cart'}</button></div></div>
        </article>)}
      </div>
    </section>)}
  </div>;
};
