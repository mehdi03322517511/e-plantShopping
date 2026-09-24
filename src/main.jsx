import React, { useState } from 'react';
import { ArrowRight, Leaf, ShoppingCart } from 'lucide-react';
import { plantsArray } from './data/plants';
import { ProductList } from './components/ProductList';
import cartReducer from './components/CartSlice';
import { Cart } from './components/Cart';
import './styles.css';

function App() {
  const [page, setPage] = useState('home');
  const [cart, dispatch] = React.useReducer(cartReducer, { items: [] });
  const [notice, setNotice] = useState('');
  const cartCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch({ type: 'cart/addItem', payload: plant });
    setNotice(`${plant.name} added to your cart`);
    window.setTimeout(() => setNotice(''), 2200);
  };

  return <>
    <header className="navbar">
      <button className="brand" onClick={() => setPage('home')}><Leaf size={25} /><span>Paradise <b>Nursery</b></span></button>
      <nav><button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Home</button><button className={page === 'plants' ? 'active' : ''} onClick={() => setPage('plants')}>Plants</button></nav>
      <button className="cart-button" onClick={() => setPage('cart')} aria-label="Open cart"><ShoppingCart size={23} /><span>Cart</span>{cartCount > 0 && <i>{cartCount}</i>}</button>
    </header>
    {notice && <div className="toast">✓ {notice}</div>}
    {page === 'home' && <main className="hero"><div className="hero-overlay"><div className="hero-copy"><p className="eyebrow">WELCOME TO YOUR NEW OASIS</p><h1>Bring a little<br /><em>paradise</em> home.</h1><p className="hero-text">Thoughtfully grown houseplants to transform your space into a place you love to live.</p><button className="primary" onClick={() => setPage('plants')}>Explore our plants <ArrowRight size={18} /></button></div></div></main>}
    {page === 'plants' && <main className="catalog"><div className="catalog-heading"><div><p className="eyebrow">THE COLLECTION</p><h1>Plants for every space</h1></div><p>Find your perfect green companion.<br />Each plant arrives healthy and ready to grow.</p></div><ProductList plantsArray={plantsArray} dispatch={dispatch} /></main>}
    {page === 'cart' && <Cart cart={cart} dispatch={dispatch} onShop={() => setPage('plants')} />}
    <footer><Leaf size={17} /> Paradise Nursery <span>•</span> Grown with care</footer>
  </>;
}

export default App;
