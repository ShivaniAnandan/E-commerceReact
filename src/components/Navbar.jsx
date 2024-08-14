import React  from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
const Navbar = () => {

    const totalQuantity= useSelector(state => state.cart.totalQuantity);

    return (
        <div>
             {/* <h1>Navbar Component</h1> */}
             <nav className="navbar navbar-expand-lg navbar-light bg-dark px-5 py-3">
                <div className="container-fluid d-flex justify-content-between">
                    <div className='left'>
                    <a className="navbar-brand text-light" href="#">Shoping App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/* setting path to home component using Link */}
                                <Link className="nav-link active text-light" aria-current="page" to="/">Home</Link>
                                {/* <a className="nav-link active text-light" aria-current="page" href="#">Home</a> */}
                            </li>
                            <li className="nav-item">
                                {/* setting path to products component using Link */}
                                <Link className="nav-link text-light" to="/products">Products</Link>
                                {/* <a className="nav-link text-light" href="#">Products</a> */}
                            </li>
                        </ul>
                    </div>
                    <button className="btn border-light text-light">
                        <i className="fa fa-shopping-cart mx-2" aria-hidden="true"></i>
                        {/* setting path to cart component using Link */}
                        <Link className='badge bg-dark text-white ms-1 rounded-pill' style={{textDecoration:"none"}} to="/cart">Cart ({totalQuantity})</Link>
                        {/* Cart <span className='badge bg-dark text-white ms-1 rounded-pill'>{cart}</span> */}
                    </button>
                    
                </div>
            </nav>
        </div>
    );
};

export default Navbar;