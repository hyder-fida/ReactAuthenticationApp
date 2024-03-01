import React from 'react';
import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  // Get action data and navigation state using custom hooks
  const data = useActionData();
  const navigation = useNavigation();

  // Get URL parameters to determine if it's a login or signup form
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  // Determine if the form is currently submitting
  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      {/* Form component for handling form submission */}
      <Form method="post" className={classes.form}>
        {/* Title of the form based on login or signup mode */}
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {/* Render error messages if there are any */}
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {/* Render a success message if available */}
        {data && data.message && <p>{data.message}</p>}
        {/* Input field for email */}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        {/* Input field for password */}
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {/* Actions section */}
        <div className={classes.actions}>
          {/* Link to switch between login and signup mode */}
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          {/* Button for submitting the form */}
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
