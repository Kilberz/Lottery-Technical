// components/SSOButtons.js
import { useLogto } from '@logto/react';
import { useEffect } from 'react';
import { Button } from "react-bootstrap";

const SSOButtons = () => {

  const { isAuthenticated, signIn, signOut, userInfo } = useLogto();

  useEffect(() => {
    if (isAuthenticated) {
      //console.log('User info:', userInfo);
    }
  }, [isAuthenticated, userInfo]);

  const handleSignIn = () => {
    // Debugging to ensure the function is called
    //console.log('Signing in...');
    signIn().catch((err) => console.error('Error during sign-in:', err));
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <a className="" onClick={() => signOut()}><i className="fa-solid text-danger fa-right-from-bracket fa-lg"></i></a>
        </>
      ) : (
        <div className="d-grid">
          <Button onClick={() => signIn('https://lottery.jasonkilby.co.uk/callback')}>Login</Button>
          <Button href="#" className="mt-3" variant="outline-primary">Register Account</Button>
        </div>
      )}
    </div>
  );
};

export default SSOButtons;
