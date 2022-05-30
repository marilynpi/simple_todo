import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithPopup, isAuthenticated, logout } = useAuth0();

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={( isAuthenticated ) ? () => logout() : () => loginWithPopup()}
    >
      {( isAuthenticated )? 'Logout' : 'Login' } 
    </Button>
  );
}

export default LoginButton;
