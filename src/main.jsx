import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ShoppingCart, ArrowRight, Plus, Minus, Trash2, Leaf, X } from 'lucide-react';
import './styles.css';

const products = [
  { id: 1, name: 'Snake Plant', category: 'Air Purifying', price: 24.99, image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2c2e?auto=format&fit=crop&w=700&q=80', description: 'A resilient beauty that thrives with little care.' },
  { id: 2, name: 'Peace Lily', category: 'Air Purifying', price: 29.99, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=80', description: 'Elegant white blooms and wonderfully fresh air.' },
  { id: 3, name: 'Boston Fern', category: 'Air Purifying', price: 19.99, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80', description: 'Lush, feathery fronds for a calm indoor oasis.' },
  { id: 4, name: 'Monstera Deliciosa', category: 'Tropical', price: 39.99, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80', description: 'Iconic split leaves with a bold tropical spirit.' },
  { id: 5, name: 'Calathea Orbifolia', category: 'Tropical', price: 34.99, image: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=700&q=80', description: 'Silvery striped leaves that brighten any room.' },
  { id: 6, name: 'Bird of Paradise', category: 'Tropical', price: 49.99, image: 'https://images.unsplash.com/photo-1597055181300-d7c5c7b3e3f0?auto=format&fit=crop&w=700&q=80', description: 'A statement plant made for sunny corners.' },
  { id: 7, name: 'Aloe Vera', category: 'Succulents', price: 14.99, image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d0f7d1?auto=format&fit=crop&w=700&q=80', description: 'A practical succulent with soothing natural gel.' },
  { id: 8, name: 'Jade Plant', category: 'Succulents', price: 18.99, image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?auto=format&fit=crop&w=700&q=80', description: 'A cheerful, long-lived classic for your windowsill.' },
  { id: 9, name: 'String of Pearls', category: 'Succulents', price: 22.99, image: 'https://images.unsplash.com/photo-1630595593732-9f9b5d0d3a5e?auto=format&fit=crop&w=700&q=80', description: 'Delicate trailing beads with plenty of personality.' }
];

function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [notice, setNotice] = useState('');
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product) => {
    setCart(current => {
      const found = current.find(item => item.id === product.id);
      return found ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
    });
    setNotice(`${product.name} added to your cart`);
    setTimeout(() => setNotice(''), 2200);
  };
  const updateQuantity = (id, amount) => setCart(current => current.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item).filter(item => item.quantity));
  const remove = (id) => setCart(current => current.filter(item => item.id !== id));

  return <>
    <header className="navbar">
      <button className="brand" onClick={() => setPage('home')}><Leaf size={25} /> <span>Paradise <b>Nursery</b></span></button>
      <nav><button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Home</button><button className={page === 'plants' ? 'active' : ''} onClick={() => setPage('plants')}>Plants</button></nav>
      <button className="cart-button" aria-label="Open cart" onClick={() => setPage('cart')}><ShoppingCart size={23} /> <span>Cart</span>{count > 0 && <i>{count}</i>}</button>
    </header>
    {notice && <div className="toast">✓ {notice}</div>}
    {page === 'home' && <Home onStart={() => setPage('plants')} />}
    {page === 'plants' && <Plants onAdd={addToCart} />}
    {page === 'cart' && <Cart cart={cart} onUpdate={updateQuantity} onRemove={remove} onShop={() => setPage('plants')} />}
    <footer><Leaf size={17} /> Paradise Nursery <span>•</span> Grown with care</footer>
  </>;
}

function Home({ onStart }) { return <main className="hero"><div className="hero-overlay"><div className="hero-copy"><p className="eyebrow">WELCOME TO YOUR NEW OASIS</p><h1>Bring a little<br /><em>paradise</em> home.</h1><p className="hero-text">Thoughtfully grown houseplants to transform your space into a place you love to live.</p><button className="primary" onClick={onStart}>Explore our plants <ArrowRight size={18} /></button></div></div></main>; }

function Plants({ onAdd }) { const categories = [...new Set(products.map(p => p.category))]; return <main className="catalog"><div className="catalog-heading"><div><p className="eyebrow">THE COLLECTION</p><h1>Plants for every space</h1></div><p>Find your perfect green companion.<br />Each plant arrives healthy and ready to grow.</p></div>{categories.map(category => <section className="category" key={category}><h2>{category}<span></span></h2><div className="product-grid">{products.filter(p => p.category === category).map(product => <Product key={product.id} product={product} onAdd={onAdd} />)}</div></section>)}</main>; }
function Product({ product, onAdd }) { return <article className="product-card"><div className="product-image"><img src={product.image} alt={product.name} /><span>{product.category}</span></div><div className="product-info"><h3>{product.name}</h3><p>{product.description}</p><div className="product-bottom"><strong>${product.price.toFixed(2)}</strong><button onClick={() => onAdd(product)}><Plus size={17} /> Add</button></div></div></article>; }

function Cart({ cart, onUpdate, onRemove, onShop }) { const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]); return <main className="cart-page"><div className="cart-title"><p className="eyebrow">YOUR SELECTION</p><h1>Shopping cart</h1></div>{cart.length === 0 ? <div className="empty"><div className="empty-icon"><ShoppingCart size={32} /></div><h2>Your cart is waiting for some green.</h2><p>Browse our collection and find a plant to bring home.</p><button className="primary" onClick={onShop}>Explore plants <ArrowRight size={18} /></button></div> : <div className="cart-layout"><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div className="cart-item-info"><h3>{item.name}</h3><p>{item.category}</p><strong>${item.price.toFixed(2)}</strong></div><div className="quantity"><button onClick={() => onUpdate(item.id, -1)} aria-label="Decrease quantity"><Minus size={15} /></button><b>{item.quantity}</b><button onClick={() => onUpdate(item.id, 1)} aria-label="Increase quantity"><Plus size={15} /></button></div><strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong><button className="remove" onClick={() => onRemove(item.id)} aria-label="Remove item"><Trash2 size={18} /></button></div>)}</div><aside className="summary"><h2>Order summary</h2><div><span>Items ({cart.reduce((s, i) => s + i.quantity, 0)})</span><b>${subtotal.toFixed(2)}</b></div><div><span>Delivery</span><b className="free">Free</b></div><hr /><div className="total"><span>Total</span><b>${subtotal.toFixed(2)}</b></div><button className="checkout" onClick={() => alert('Thank you for supporting Paradise Nursery!')}>Checkout <ArrowRight size={18} /></button></aside></div>}</main>; }

createRoot(document.getElementById('root')).render(<App />);
