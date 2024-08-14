import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../redux/ProductSlice';
import { FaStar } from 'react-icons/fa'; // Import the star icon

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query').toLowerCase();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchResults = async () => {
      // Fetch all products
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();

      // Filter products based on the query
      const filteredResults = data.filter(product =>
        product.category.toLowerCase().includes(query) ||
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );

      setSearchResults(filteredResults);
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  const isInCart = (id) => cartItems.some(item => item.id === id);

  // Function to handle adding to cart
  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login page if not logged in
    } else {
      dispatch(addItem(item)); // Add the whole item object to the cart
    }
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <div className="row">
        {searchResults.length > 0 ? (
          searchResults.map((item, index) => {
            const isInCart = items.some((cartItem) => cartItem.id === item.id);
            return (
              <div
                className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
                key={index}
              >
                <div
                  className="card product-card mb-4"
                  style={{
                    borderRadius: '15px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s',
                    width: '100%', // Ensure the card width is consistent
                    maxWidth: '300px', // Adjust the max width to control card size
                    position: 'relative', // Required for absolute positioning
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-img-top product-image"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '200px', // Control the image height for uniformity
                      objectFit: 'contain',
                      borderRadius: '15px 15px 0 0',
                    }}
                  />
                  <div
                    className="rating-badge"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: '#fff',
                      borderRadius: '50%',
                      padding: '5px',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                    }}
                  >
                    {item.rating.rate} <FaStar color="gold" />
                  </div>
                  <div
                    className="card-body p-2"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    <div className="card-info mt-3">
                      <h6 className="card-title">{item.title}</h6>
                      <p className="card-text">₹{item.price}</p>
                      <button
                        className={`btn ${isInCart ? 'btn-danger' : 'btn-primary'} mt-2`}
                        onClick={() =>
                          isInCart ? handleRemoveFromCart(item.id) : handleAddToCart(item)
                        }
                      >
                        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
