import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

// Validation schema for the form using Yup
const validationSchema = Yup.object().shape({
  newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
});

const ResetPassword = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams(); // Extract the token from the URL
  const navigate = useNavigate(); // To navigate to login page after password reset

  const handleResetPassword = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`https://e-commerce-backend-zxqf.onrender.com/api/users/reset-password/${token}`, {
        newPassword: values.newPassword,
      });

      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/login'); // Redirect to login after successful password reset
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ newPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleResetPassword}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: '0 auto', mt: 4 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Reset Password
            </Typography>

            {message && <Typography color="green">{message}</Typography>}
            {error && <Typography color="error">{error}</Typography>}

            <Field
              as={TextField}
              id="newPassword"
              name="newPassword"
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              error={touched.newPassword && Boolean(errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;
