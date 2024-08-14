// src/Login.jsx

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/UserSlice';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = ({ email, password, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const storedUser = JSON.parse(localStorage.getItem('user'));

  return (
    <Formik
      initialValues={{ email: '', password: '' , name:''}}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (storedUser && values.email === storedUser.email && values.password === storedUser.password) {
          const profileImage = getRandomProfileImage();
          dispatch(login({ name: storedUser.name, email: values.email, profileImage }));
          navigate('/');
        } else {
          alert('Invalid email or password');
        }
      }}
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
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
