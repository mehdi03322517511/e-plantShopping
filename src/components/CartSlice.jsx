export const addItem = (product) => ({ type: 'cart/addItem', payload: product });
export const updateItem = (id, amount) => ({ type: 'cart/updateItem', payload: { id, amount } });
export const removeItem = (id) => ({ type: 'cart/removeItem', payload: id });

export function cartReducer(state, action) {
  switch (action.type) {
    case 'cart/addItem': {
      const product = action.payload;
      const id = product.id || product.name;
      const existing = state.find((item) => item.id === id);
      if (existing) return state.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...state, { ...product, id, price: Number(product.price ?? product.cost), quantity: 1 }];
    }
    case 'cart/updateItem':
      return state.map((item) => item.id === action.payload.id ? { ...item, quantity: Math.max(0, item.quantity + action.payload.amount) } : item).filter((item) => item.quantity > 0);
    case 'cart/removeItem':
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}
