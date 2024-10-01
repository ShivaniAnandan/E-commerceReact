import React, { useEffect } from 'react';
import PaymentIcon from '@mui/icons-material/Payment';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/cart'); // Navigate back to the checkout page
  };

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate('/cart');
    }, 5000);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      <PaymentIcon style={styles.failureIcon} />
      <h1 style={styles.heading}>Payment Failed!</h1>
      <p style={styles.message}>We are sorry, but your payment could not be processed. You will be redirected shortly Please try again.</p>
      {/* <button style={styles.button} onClick={handleRetry}>
        Retry Payment
      </button> */}
    </div>
  );
};

// Inline styles for the PaymentFailure component
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
    color: '#ff3f6c',
  },
  message: {
    fontSize: '18px',
    color: '#555',
  },
  failureIcon: {
    fontSize: '60px',
    color: 'red',
  },
  button: {
    backgroundColor: '#ff3f6c',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default PaymentFailure;
