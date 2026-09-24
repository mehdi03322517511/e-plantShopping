import React from 'react';
import { useDispatch } from 'react-redux';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { removeItem, updateQuantity } from './CartSlice';

export function CartItem({ item }) {
  const dispatch = useDispatch();
  const unitCost = parseFloat(String(item.cost).replace('$', ''));
  const calculateTotalCost = () => unitCost * item.quantity;
  const handleIncrement = () => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  const handleDecrement = () => {
    if (item.quantity > 1) dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    else dispatch(removeItem(item.name));
  };
  const handleRemove = () => dispatch(removeItem(item.name));

  return <div className="cart-item">
    <img src={item.image} alt={item.name} />
    <div className="cart-item-info"><h3>{item.name}</h3><p>Plant selection</p><strong>${unitCost.toFixed(2)}</strong></div>
    <div className="quantity"><button onClick={handleDecrement} aria-label={`Decrease ${item.name}`}><Minus size={15} /></button><b>{item.quantity}</b><button onClick={handleIncrement} aria-label={`Increase ${item.name}`}><Plus size={15} /></button></div>
    <strong className="line-total">${calculateTotalCost().toFixed(2)}</strong>
    <button className="remove" onClick={handleRemove} aria-label={`Remove ${item.name}`}><Trash2 size={18} /></button>
  </div>;
}
