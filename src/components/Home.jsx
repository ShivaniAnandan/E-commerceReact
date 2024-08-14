import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
             {/* <div className="home d-flex justify-content-around">
                <h1 className="mt-5 px-5 py-5"  style={{fontSize:"80px" ,fontWeight:"bolder", width:"50%"}}>Welcome to <br></br>My Shoping App</h1>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhSjuzexY2IdS01YjsrygVZ7qKgpJoHGslcsdLlpfifpXxIQRvLqeCWGtsSvnU5PRDB5s&usqp=CAU"  alt="shopimg" className='img' style={{width:"60%"}} />
            </div> */}
            {/* Carousel Section */}
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src="https://mercury.akamaized.net/i/b9eb95acf58613601c0d982e6e3d9b93_102354_0.png" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-08082024-TopBanner-Z3-P3-DAMILANO-HIDESIGN-UPTO60.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://mercury.akamaized.net/i/f613dd3e3d2e5e314b4b0f2ed9f63eea_102399_0.png" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src="https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2/mediafiles/ecomm/misc/1723012324_aclt_combos-of-the-day-web.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2/mediafiles/ecomm/misc/1722928818_saleislive_web-4.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src="https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2/mediafiles/ecomm/misc/1723094952_bestsellerfreebie_web-1.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2/mediafiles/ecomm/misc/1722979564_cyfg_web-min.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src="https://assets.ajio.com/cms/AJIO/WEB/1440x128-%20UHP%20web%20RRL_SBI.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://assets.ajio.com/cms/AJIO/WEB/1440x128v.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://assets.ajio.com/cms/AJIO/WEB/1440x128%202%20new%20federal%20bank%20comp.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Categories Section */}
            <h1 className='text-center fw-bold my-5'>Shop By Category</h1>
            <div className="category-box d-flex justify-content-around">
                <div className="category-item text-center">
                    <Link to="/products?category=men" className='text-decoration-none'>
                        <img src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-10082024-AjioExclusives-Z1-P22-brooksbrothers-min40.jpg" alt="Men's Clothing" className='img-fluid' />
                        <h5 className="mt-2">Men's Clothing</h5>
                    </Link>
                </div>
                <div className="category-item text-center">
                    <Link to="/products?category=women" className='text-decoration-none'>
                        <img src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-02082024-AjioExclusives-Z1-P1-Avaasa-min60.jpg" alt="Women's Clothing" className='img-fluid' />
                        <h5 className="mt-2">Women's Clothing</h5>
                    </Link>
                </div>
                <div className="category-item text-center">
                    <Link to="/products?category=accessories" className='text-decoration-none'>
                        <img src="https://images.meesho.com/images/products/427848837/w4qge_512.webp" alt="Accessories" className='img-fluid jewelery' />
                        <h5 className="mt-2">Accessories For Women</h5>
                    </Link>
                </div>
                <div className="category-item text-center">
                    <Link to="/products?category=electronics" className='text-decoration-none'>
                        <img src="https://m.media-amazon.com/images/I/4143CSktumL._SX300_SY300_QL70_FMwebp_.jpg" alt="Electronics" className='img-fluid' />
                        <h5 className="mt-2">Electronics</h5>
                    </Link>
                </div>
            </div>
        </div>
      
    );
};

export default Home;





