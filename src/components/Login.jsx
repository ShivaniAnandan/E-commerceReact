import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, InputAdornment, Typography } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/UserSlice';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profileImages = [
    // Add random profile image URLs here...
  ];

  const getRandomProfileImage = () => {
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    return profileImages[randomIndex];
  };

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://localhost:4000/api/users/login', {
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
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
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
