import { Link } from 'react-router';
import { 
  setMyCart,
  clearCart,
  removeCartItem,
  selectCartItems
} from '../../redux/features/orders/orderSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const MyCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
//   const cartTotal = useAppSelector(selectCartTotal);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(setMyCart({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">🛒</div>
        <h3 className="text-xl font-semibold">Your cart is empty</h3>
        <p className="text-gray-500">Add some items to get started</p>
        <Link to="/products" className="btn btn-primary mt-4">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button 
          onClick={handleClearCart}
          className="btn btn-sm btn-error"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.productId} className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    // src={item.productDetails?.image || '/placeholder-product.jpg'} 
                    // alt={item.productDetails?.name} 
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-grow">
                  <h3 className="font-bold text-lg">
                    <Link to={`/products/${item.productId}`}>
                      {/* {item.productDetails?.name || 'Product'} */}
                    </Link>
                  </h3>
                  <p className="text-gray-500">
                    {/* ${item.price.toFixed(2)} each */}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4">
                  <div className="join">
                    <button 
                      className="join-item btn btn-square btn-sm"
                      onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="join-item btn btn-sm btn-disabled no-animation">
                      {item.quantity}
                    </span>
                    <button 
                      className="join-item btn btn-square btn-sm"
                      onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => handleRemoveItem(item.productId)}
                    className="btn btn-sm btn-error"
                  >
                    Remove
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-lg font-bold">
                  {/* ${(item.price * item.quantity).toFixed(2)} */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Order Summary</h3>
            <span className="badge badge-primary">
              {cartItems.reduce((total, item) => total + item.quantity, 0)} items
            </span>
          </div>

          <div className="divider"></div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              {/* <span>${cartTotal.toFixed(2)}</span> */}
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <div className="divider"></div>

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            {/* <span>${cartTotal.toFixed(2)}</span> */}
          </div>

          <div className="card-actions justify-end mt-4">
            <Link to="/checkout" className="btn btn-primary w-full">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;