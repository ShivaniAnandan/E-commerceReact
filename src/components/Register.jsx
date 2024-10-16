import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, InputAdornment, Typography } from '@mui/material';
import { AccountCircle, Email, Lock, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // Import the spinner

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to manage the loader

  const handleRegister = async (values) => {
    setLoading(true); // Show loader when login request is initiated
    try {
      const response = await axios.post('https://e-commerce-backend-zxqf.onrender.com/api/users/register', {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (response.status === 201) {
        navigate('/login'); // Redirect to login after successful registration
      }
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data.message : error.message);
    }finally {
      setLoading(false); // Hide loader when request is completed
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleRegister(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: '0 auto' }}>
            <div>
              <label htmlFor="name">Name</label>
              <Field
                as={TextField}
                id="name"
                name="name"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </div>
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
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                as={TextField}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CheckCircle />
                    </InputAdornment>
                  ),
                }}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </div>
            {loading ? (
              // Show the spinner while loading
              <Box display="flex" justifyContent="center" alignItems="center">
                <ClipLoader color="#3f51b5" size={50} />
              </Box>
            ) : (
              <Button type="submit" variant="contained" color="primary" fullWidth>
                 Register
              </Button>
            )}

            <Typography sx={{ textAlign: 'center', mt: 2 }}>
              Already have an account?{' '}
              <Button onClick={() => navigate('/login')} variant="text" color="primary">
                Login
              </Button>
            </Typography>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
