import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/UserSlice';
import { FaShoppingCart } from 'react-icons/fa'; // Import your cart icon

const Navbars = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const user = useSelector(state => state.user.user);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Redirect to the search results page with the search query
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    };

    const handleLogout = () => {
        // Implement logout logic
        dispatch(logout());
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <img src="https://w7.pngwing.com/pngs/516/816/png-transparent-ecommerce-online-shopping-app-icon.png" alt="logo" className='logo-image' />
                    <a className="navbar-brand" href="#"><b>Eshop</b></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
                            <li className="nav-item">
                                <Link className="nav-link active text-dark" aria-current="page" to="/"><b>Home</b></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/products"><b>Products</b></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/myorders"><b>My Orders</b></Link>
                            </li>
                        </ul>
                        <form className="d-flex ms-2" onSubmit={handleSearchSubmit}>
                            <div className="input-group search-field">
                                <span className="input-group-text" id="basic-addon1"><i className="fa fa-search" aria-hidden="true"></i></span>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search for Products" 
                                    aria-label="Search" 
                                    aria-describedby="basic-addon1" 
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </form>
                        <div className="d-flex gap-3 ms-2">
                            {isLoggedIn ? (
                                <div className="dropdown">
                                    <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img 
                                            src={user.profileImage} 
                                            alt="Profile" 
                                            className="rounded-circle" 
                                            style={{ width: '40px', height: '40px' }}
                                        />
                                        <p className="mb-0">{user.name}</p>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </div>
                            ) : (
                                <>
                                    <button className="btn btn-outline-success" type="button"><Link to="/login" className='text-decoration-none text-dark'>Login</Link></button>
                                    <button className="btn btn-outline-success mx-2" type="button"><Link to="/register" className='text-decoration-none text-dark'>Register</Link></button>
                                </>
                            )}
                        </div>
                        {/* <button className="btn btn-outline-success text-dark mx-3">
                            <i className="fa fa-shopping-cart mx-2" aria-hidden="true"></i>
                            <Link className='badge  text-dark ms-1 rounded-pill' style={{ textDecoration: "none" }} to="/cart">Cart ({totalQuantity})</Link>
                        </button> */}
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                        <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <FaShoppingCart size={24} />
                            {totalQuantity > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-10px',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    borderRadius: '50%',
                                    padding: '2px 6px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                }}>
                                    {totalQuantity}
                                </span>
                                )}
                            </Link>
                            </div>
                </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbars;
