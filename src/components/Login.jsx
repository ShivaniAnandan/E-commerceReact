import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, InputAdornment, Typography } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/UserSlice';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // Import the spinner

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // State to manage the loader


  const profileImages = [
    'https://t3.ftcdn.net/jpg/02/40/30/56/240_F_240305699_X3ky3vcpPRDNBtg1qjmLW7ntzPGU0eGN.jpg',
    'https://t4.ftcdn.net/jpg/05/74/97/67/240_F_574976795_xGCzNlYpDw7wf6gSWFLVaFuTGhOMuaTV.jpg',
    'https://t3.ftcdn.net/jpg/06/01/50/96/240_F_601509638_jDwIDvlnryPRhXPsBeW1nXv90pdlbykC.jpg',
    'https://t4.ftcdn.net/jpg/05/80/60/33/240_F_580603305_ysEbDBvHCKM9TyzEINHyW614NWLdTe0b.jpg',
    'https://t4.ftcdn.net/jpg/05/47/35/41/240_F_547354169_c1lbO3x3Xw5rwr9WThaHUamGSEZI4IsP.jpg',
    'https://t4.ftcdn.net/jpg/07/31/57/43/240_F_731574325_KUHqpDJBMI4T4dIeoMS7GH0zDSQj0VlT.jpg',
    'https://t4.ftcdn.net/jpg/05/59/46/33/240_F_559463395_dBqVnSCQ479taoyYSaohffGOLQiI3x5w.jpg',
    'https://t4.ftcdn.net/jpg/07/57/31/69/240_F_757316903_KiJ2jGy5vQ0dB9ILtjFo6p48UZ7DAoxa.jpg',
    'https://t3.ftcdn.net/jpg/06/21/27/04/240_F_621270406_n7Vx7a5RuRJVmaI1AEltnsfA2SjkOrrr.jpg',
    'https://t4.ftcdn.net/jpg/03/28/94/79/240_F_328947974_26fQsrAPA5cLoL9fSfWZhLM58AQO6rCz.jpg',
  ];

  const getRandomProfileImage = () => {
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    return profileImages[randomIndex];
  };

  const handleLogin = async (values) => {
    setLoading(true); // Show loader when login request is initiated
    try {
      const response = await axios.post('https://e-commerce-backend-zxqf.onrender.com/api/users/login', {
        email: values.email,
        password: values.password,
      }, { withCredentials: true });

      const { token, user } = response.data;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Dispatch login action to store user data
      dispatch(login({
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: getRandomProfileImage(),
      }));

      // Navigate to the home page
      navigate('/');
    } catch (error) {
      alert('Invalid email or password');
      console.error('Login error:', error);
    }finally {
      setLoading(false); // Hide loader when request is completed
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ errors, touched }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: '0 auto' }}>
            <div>
              <label htmlFor="email">Email</label>
              <Field
                as={TextField}
                id="email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field
                as={TextField}
                id="password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Box textAlign="right" mt={1}>
                <Link to="/forget-password" style={{ textDecoration: 'none', color: '#3f51b5' }}>
                  <Typography variant="body2">Forgot password?</Typography>
                </Link>
              </Box>
            </div>
            {loading ? (
              // Show the spinner while loading
              <Box display="flex" justifyContent="center" alignItems="center">
                <ClipLoader color="#3f51b5" size={50} />
              </Box>
            ) : (
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            )}
            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link to="/register" style={{ textDecoration: 'none', color: '#3f51b5' }}>
                  Register
                </Link>
              </Typography>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
