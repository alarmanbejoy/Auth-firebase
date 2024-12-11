import React from 'react';
import { useCart } from '../context/CartContext';


function CartPage() {
  const { cart, dispatch } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-700">Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="border-b py-4 flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain mr-4"
                />
                <div className="flex-grow">
                  <h2 className="font-bold">{item.title}</h2>
                  <p>${item.price}</p>
                  <p>Category: {item.category}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="px-2 bg-gray-200"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="px-2 bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 ml-4"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold text-right mt-4">
            Total: ${totalPrice.toFixed(2)}
          </h2>
        </div>
      )}
    </div>
  );
}

export default CartPage;
