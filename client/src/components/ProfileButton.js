import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const ProfileButton = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    isAuthenticated && (
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/profile")}
      >
        Profile
      </Button>
    )
  );
};

export default ProfileButton;
