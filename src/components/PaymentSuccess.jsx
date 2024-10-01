import React, { useEffect } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/ProductSlice';
import { useDispatch } from 'react-redux';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear the cart and remove it from localStorage
    dispatch(clearCart());
    localStorage.removeItem('cart');

    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div style={styles.container}>
      <CheckCircleOutlineIcon style={styles.successIcon} />
      <h1 style={styles.heading}>Payment Successful!</h1>
      <p style={styles.message}>Thank you for your purchase. You will be redirected to the home page shortly.</p>
    </div>
  );
};

// Inline styles for the PaymentSuccess component
const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '26px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#4caf50',
  },
  message: {
    fontSize: '18px',
    color: '#555',
  },
  successIcon: {
    fontSize: '60px',
    color: 'green',
  },
};

export default PaymentSuccess;
