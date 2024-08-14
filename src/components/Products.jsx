import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, setProducts } from '../redux/ProductSlice';
import { FaStar } from 'react-icons/fa'; // Import the star icon
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [filter, setFilter] = useState({
    category: 'all',
    price: [],
    rating: 'all',
  });

  const products = useSelector((state) => state.cart.products);
  const items = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch products from the API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        dispatch(setProducts(data));
        console.log(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  // Read category filter from query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category') || 'all';
    setFilter((prevFilter) => ({
      ...prevFilter,
      category,
    }));
  }, [location.search]);

  // Handle category and rating filters
  const handleFilterChange = (name, value) => {
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  // Handle price filter with checkboxes
  const handlePriceChange = (e) => {
    const value = e.target.value;
    const newPrice = filter.price.includes(value)
      ? filter.price.filter((price) => price !== value)
      : [...filter.price, value];

    setFilter({ ...filter, price: newPrice });
  };

  // // Function to add item to cart
  // const addToCart = (product) => {
  //   dispatch(addItem(product));
  // };

  // Function to handle adding to cart
  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login page if not logged in
    } else {
      dispatch(addItem(item)); // Add the whole item object to the cart
    }
  };

  // Function to remove item from cart
  const removeFromCart = (id) => {
    dispatch(removeItem(id));
  };

  const filteredProducts = products.filter((product) => {
    const { category, price, rating } = filter;
  
    // Ensure that the filter categories match the product category correctly
    const matchesCategory =
      category === 'all' || 
      (category === 'men' && product.category.toLowerCase() === "men's clothing") ||
      (category === 'women' && product.category.toLowerCase() === "women's clothing") ||
      (category === 'accessories' && product.category.toLowerCase() === "jewelery") ||
      (category === 'electronics' && product.category.toLowerCase() === "electronics");
  
      const matchesPrice =
      price.length === 0 ||
      price.some((priceRange) => {
        if (priceRange === 'below-100') {
          return product.price <= 100;
        } else if (priceRange === '100-500') {
          return product.price > 100 && product.price <= 500;
        } else if (priceRange === '500-1000') {
          return product.price > 500 && product.price <= 1000;
        }
        return false;
      });
  
    const matchesRating =
      rating === 'all' || product.rating.rate >= parseFloat(rating);
  
    return matchesCategory && matchesPrice && matchesRating;
  });

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Filter Section */}
        {/* <div className={`col-lg-3 ${window.innerWidth < 600 ? 'row' : ''}`}> */}
        <div className="col-lg-3">
          <h4>Filter By</h4>

          {/* Category Filter with Images */}
          <div className="mb-4">
            <h5>Category</h5>
            <div className="d-flex flex-wrap">
              <div className="d-flex align-items-center mb-2">
                <button
                  className={`btn ${filter.category === 'all' ? 'btn-primary' : 'btn-outline-primary'} m-1`}
                  onClick={() => handleFilterChange('category', 'all')}
                >
                  <img
                    src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEwL2xhdXJhc3RlZmFubzI2Nl8zZF9yZW5kZXJpbmdfb2ZfYV9zYWxlX3Nob3BwaW5nX3Bvc3Rlcl9vcl9iYW5uZV8yM2M4ODVkMi01ZWY1LTQ3MjQtYWI3Ni00OTIyYzY5OTM0NGJfMS5wbmc.png"
                    alt="All"
                    style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                  />
                  <span className="ms-2">All</span>
                </button>
              </div>

              <div className="d-flex align-items-center mb-2">
                <button
                  className={`btn ${filter.category === 'men' ? 'btn-primary' : 'btn-outline-primary'} m-1`}
                  onClick={() => handleFilterChange('category', 'men')}
                >
                  <img
                    src="https://w7.pngwing.com/pngs/105/805/png-transparent-printed-t-shirt-crew-neck-sleeve-cotton-casual-man-tshirt-shopping-centre-arm.png"
                    alt="Men"
                    style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                  />
                  <span className="ms-2">Men</span>
                </button>
              </div>

              <div className="d-flex align-items-center mb-2">
                <button
                  className={`btn ${filter.category === 'women' ? 'btn-primary' : 'btn-outline-primary'} m-1`}
                  onClick={() => handleFilterChange('category', 'women')}
                >
                  <img
                    src="https://img0.junaroad.com/uiproducts/19660220/zoom_5-1684579173.jpg"
                    alt="Women"
                    style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                  />
                  <span className="ms-2">Women</span>
                </button>
              </div>

              <div className="d-flex align-items-center mb-2">
                <button
                  className={`btn ${filter.category === 'accessories' ? 'btn-primary' : 'btn-outline-primary'} m-1`}
                  onClick={() => handleFilterChange('category', 'accessories')}
                >
                  <img
                    src="https://www.orra.co.in/media/catalog/product/cache/a062e776095ada03f265202079309f18/o/s/osn22134_1_rlhqrrrq2k79mcll.jpg"
                    alt="Accessories"
                    style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                  />
                  <span className="ms-2">Accessories</span>
                </button>
              </div>

              <div className="d-flex align-items-center mb-2">
                <button
                  className={`btn ${filter.category === 'electronics' ? 'btn-primary' : 'btn-outline-primary'} m-1`}
                  onClick={() => handleFilterChange('category', 'electronics')}
                >
                  <img
                    src="https://rukminim2.flixcart.com/image/850/1000/xif0q/smartwatch/q/g/g/44-t55-android-ios-zwero-yes-original-imagmrxg8fznyqkg.jpeg?q=90&crop=false"
                    alt="Electronics"
                    style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                  />
                  <span className="ms-2">Electronics</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h5>Price</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="below-100"
                onChange={handlePriceChange}
                id="price1"
              />
              <label className="form-check-label" htmlFor="price1">
                Below ₹100
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="100-500"
                onChange={handlePriceChange}
                id="price2"
              />
              <label className="form-check-label" htmlFor="price2">
                ₹100 to ₹500
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="500-1000"
                onChange={handlePriceChange}
                id="price3"
              />
              <label className="form-check-label" htmlFor="price3">
                ₹500 to ₹1000
              </label>
            </div>
          </div>

          <div className="mb-4">
            <h5>Rating</h5>
            {[1, 2, 3, 4].map((starCount) => (
              <div className="form-check" key={starCount}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="rating"
                  value={starCount}
                  onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
                  id={`rating${starCount}`}
                />
                <label className="form-check-label" htmlFor={`rating${starCount}`}>
                  {starCount} <FaStar color="gold" /> & Above
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* </div> */}

       
    {/* Products Section */}
    <div className="col-lg-9">
          <div className="row">
            {filteredProducts.map((item, index) => {
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
                            isInCart ? removeFromCart(item.id) : handleAddToCart(item)
                          }
                        >
                          {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
