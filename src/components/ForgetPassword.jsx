import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ForgetPassword = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgetPassword = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post('https://e-commerce-backend-zxqf.onrender.com/api/users/forget-password', {
        email: values.email,
      });

      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      onSubmit={handleForgetPassword}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: '0 auto', mt: 4 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Forget Password
            </Typography>

            {message && <Typography color="green">{message}</Typography>}
            {error && <Typography color="error">{error}</Typography>}

            <Field
              as={TextField}
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ForgetPassword;
