import React, { useMemo } from 'react';
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

export function CartItem({ item }) {
  const dispatch = useDispatch();
  const unitCost = parseFloat(String(item.cost).replace('$', ''));
  const calculateTotalCost = () => unitCost * item.quantity;
  const handleIncrement = () => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  const handleDecrement = () => item.quantity > 1 ? dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })) : dispatch(removeItem(item.name));
  const handleRemove = () => dispatch(removeItem(item.name));

  return <div className="cart-item"><img src={item.image} alt={item.name} /><div className="cart-item-info"><h3>{item.name}</h3><p>Plant selection</p><strong>${unitCost.toFixed(2)}</strong></div><div className="quantity"><button onClick={handleDecrement} aria-label={`Decrease ${item.name}`}><Minus size={15} /></button><b>{item.quantity}</b><button onClick={handleIncrement} aria-label={`Increase ${item.name}`}><Plus size={15} /></button></div><strong className="line-total">${calculateTotalCost().toFixed(2)}</strong><button className="remove" onClick={handleRemove} aria-label={`Remove ${item.name}`}><Trash2 size={18} /></button></div>;
}

export function Cart({ onContinueShopping }) {
  const items = useSelector((state) => state.cart.items);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + parseFloat(String(item.cost).replace('$', '')) * item.quantity, 0), [items]);
  const handleContinueShopping = (event) => { event?.preventDefault(); onContinueShopping(); };
  const handleCheckoutShopping = () => alert('Functionality to be added for future reference');

  return <main className="cart-page"><div className="cart-title"><p className="eyebrow">YOUR SELECTION</p><h1>Shopping cart</h1></div>{items.length === 0 ? <div className="empty"><div className="empty-icon"><ShoppingCart size={32} /></div><h2>Your cart is waiting for some green.</h2><p>Browse our collection and find a plant to bring home.</p><button className="primary" onClick={onContinueShopping}>Continue shopping <ArrowRight size={18} /></button></div> : <div className="cart-layout"><div className="cart-items">{items.map((item) => <CartItem item={item} key={item.name} />)}<button className="continue-shopping" onClick={handleContinueShopping}>← Continue shopping</button></div><aside className="summary"><h2>Order summary</h2><div><span>Items ({items.reduce((sum, item) => sum + item.quantity, 0)})</span><b>${subtotal.toFixed(2)}</b></div><div><span>Delivery</span><b className="free">Free</b></div><hr /><div className="total"><span>Total</span><b>${subtotal.toFixed(2)}</b></div><button className="checkout" onClick={handleCheckoutShopping}>Checkout <ArrowRight size={18} /></button></aside></div>}</main>;
}
