import React from 'react';
import { addItem, removeItem, updateQuantity } from '../redux/ProductSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  // const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to remove item from cart
  const removeFromCart = (id) => {
    dispatch(removeItem(id));
  };

  // Function to handle dropdown change
  const handleDropdownChange = (id, value) => {
    dispatch(updateQuantity({ id, quantity: value }));
  };

  // // Function to handle adding to cart
  // const handleAddToCart = (item) => {
  //   if (!isLoggedIn) {
  //     navigate('/login'); // Redirect to login page if not logged in
  //   } else {
  //     dispatch(addItem(item)); // Add the whole item object to the cart
  //   }
  // };

  return (
    <div className='cart'>
      <h1 className='text-left'>Cart</h1>
      {items.length === 0 ? (
        <div className="empty-cart text-center">
          <h3>Your cart is empty</h3>
        </div>
      ) : (
        <>
          {items.map((item, index) => (
            <div key={index} className="card mb-3 mx-5 px-3" style={{ width: "100%" }}>
              <div className="row g-0 justify-content-around align-items-center">
                <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                  <img src={item.image} className="rounded-start" alt={item.title} style={{ height: "100px", padding: "0px" }} />
                </div>
                <div className="col-lg-6 col-md-5 col-sm-6 col-12">
                  <div className="card-body text-dark">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">{item.price} rs</p>
                    {/* Add to Cart Button */}
                    {/* <button 
                      className="btn btn-primary mt-3" 
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button> */}
                  </div>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-2 col-6'>
                  <span> Quantity: </span>
                  <select value={item.quantity || 1} onChange={(e) => handleDropdownChange(item.id, parseInt(e.target.value))}>
                    {[...Array(5).keys()].map(num => (
                      <option key={num + 1} value={num + 1}>{num + 1}</option>
                    ))}
                  </select>
                  <span className="card-text mx-3">{(item.price || 0) * (item.quantity || 1)} rs</span>
                  <button onClick={() => removeFromCart(item.id)} style={{ border: "none" }}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="price-details mx-5">
            <h1 className='text-left'>Price Details</h1>
            <p className='d-flex justify-content-around'>Total Quantity :  <span>{totalQuantity}</span></p>
            <p className='d-flex justify-content-around'>Subtotal : <span>{totalAmount.toFixed(2)} rs</span></p>
            <p className='d-flex justify-content-around'>Shipping : <span>Free</span></p>
            <p className='d-flex justify-content-around'>Total :  <span>{totalAmount.toFixed(2)} rs</span></p>
            <div className="d-flex justify-content-center">
            <button className="btn checkout mt-3" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
