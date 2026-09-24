import React, { useMemo } from 'react';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { CartItem } from './CartItem';

export function Cart({ onContinueShopping }) {
  const items = useSelector((state) => state.cart.items);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + parseFloat(String(item.cost).replace('$', '')) * item.quantity, 0), [items]);
  const handleContinueShopping = (event) => { event?.preventDefault(); onContinueShopping(); };
  const handleCheckoutShopping = () => alert('Coming Soon — checkout functionality will be added in a future update.');

  return <main className="cart-page"><div className="cart-title"><p className="eyebrow">YOUR SELECTION</p><h1>Shopping cart</h1></div>{items.length === 0 ? <div className="empty"><div className="empty-icon"><ShoppingCart size={32} /></div><h2>Your cart is waiting for some green.</h2><p>Browse our collection and find a plant to bring home.</p><button className="primary" onClick={onContinueShopping}>Continue shopping <ArrowRight size={18} /></button></div> : <div className="cart-layout"><div className="cart-items">{items.map((item) => <CartItem item={item} key={item.name} />)}<button className="continue-shopping" onClick={handleContinueShopping}>← Continue shopping</button></div><aside className="summary"><h2>Order summary</h2><div><span>Items ({items.reduce((sum, item) => sum + item.quantity, 0)})</span><b>${subtotal.toFixed(2)}</b></div><div><span>Delivery</span><b className="free">Free</b></div><hr /><div className="total"><span>Total</span><b>${subtotal.toFixed(2)}</b></div><button className="checkout" onClick={handleCheckoutShopping}>Checkout <ArrowRight size={18} /></button></aside></div>}</main>;
}
