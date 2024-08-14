import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/ProductSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Checkout = () => {
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const handlePayment = () => {
    alert(`Payment Successful using ${paymentMethod}!`);
    setPaymentSuccess(true);
    dispatch(clearCart());
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div style={styles.checkoutContainer}>
      <h1 style={styles.heading}>Checkout</h1>
      <div style={styles.paymentDetails}>
        {paymentSuccess ? (
          <div style={styles.orderSuccess}>
            <CheckCircleOutlineIcon style={styles.successIcon} />
            <h2 style={styles.successMessage}>Order Placed Successfully!</h2>
            <p style={styles.paymentMethodText}>Payment Method: <strong>{paymentMethod}</strong></p>
          </div>
        ) : (
          <>
            <p style={styles.amountToPay}>Amount to be paid: <strong>{totalAmount.toFixed(2)} rs</strong></p>
            
            <div style={styles.paymentMethods}>
              <h3 style={styles.paymentMethodHeading}><PaymentIcon style={styles.icon}/> Select Payment Method:</h3>
              <div style={styles.paymentOption}>
                <input
                  type="radio"
                  id="upi"
                  name="paymentMethod"
                  value="UPI"
                  checked={paymentMethod === 'UPI'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={styles.radioInput}
                />
                <label htmlFor="upi" style={styles.paymentLabel}>UPI</label>
              </div>
              <div style={styles.paymentOption}>
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={styles.radioInput}
                />
                <label htmlFor="cod" style={styles.paymentLabel}>Cash on Delivery</label>
              </div>
            </div>

            <button style={styles.confirmButton} onClick={handlePayment}>Confirm Payment</button>
          </>
        )}
      </div>
    </div>
  );
};

// Inline styles for the component
const styles = {
  checkoutContainer: {
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
    marginBottom: '25px',
    color: '#333',
  },
  paymentDetails: {
    textAlign: 'center',
    color: '#555',
  },
  orderSuccess: {
    textAlign: 'center',
    color: '#4caf50',
  },
  successIcon: {
    fontSize: '60px',
    color: 'green',
  },
  successMessage: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  paymentMethodText: {
    fontSize: '18px',
    marginTop: '10px',
  },
  amountToPay: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#ff3f6c',
    fontWeight: '600',
  },
  paymentMethods: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  paymentMethodHeading: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
  },
  paymentOption: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  },
  radioInput: {
    marginRight: '10px',
  },
  paymentLabel: {
    fontSize: '16px',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#ff3f6c',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  icon: {
    marginRight: '8px',
  }
};

export default Checkout;
