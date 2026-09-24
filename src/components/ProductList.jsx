import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import { addItem } from './CartSlice';

export function ProductList({ plantsArray, onAdded }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedToCart, setAddedToCart] = React.useState({});

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart((previous) => ({ ...previous, [product.name]: true }));
    onAdded?.(`${product.name} added to your cart`);
  };

  return <div className="product-grid">
    {plantsArray.map((category, index) => <section className="category" key={category.category || index}>
      <h2>{category.category}<span /></h2>
      <div className="product-list product-grid">
        {category.plants.map((plant, plantIndex) => {
          const alreadyInCart = addedToCart[plant.name] || cartItems.some((item) => item.name === plant.name);
          return <article className="product-card" key={plant.id || plant.name || plantIndex}>
            <div className="product-image"><img src={plant.image} alt={plant.name} /><span>{category.category}</span></div>
            <div className="product-info"><h3>{plant.name}</h3><p>{plant.description}</p><div className="product-bottom"><strong>${Number(plant.cost).toFixed(2)}</strong><button className="product-button" disabled={alreadyInCart} onClick={() => handleAddToCart(plant)}><Plus size={17} />{alreadyInCart ? 'Added to Cart' : 'Add to Cart'}</button></div></div>
          </article>;
        })}
      </div>
    </section>)}
  </div>;
}
