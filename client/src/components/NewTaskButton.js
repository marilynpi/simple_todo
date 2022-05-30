import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const NewTaskButton = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    isAuthenticated && (
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/task/new")}
      >
        New Intention
      </Button>
    )
  );
};

export default NewTaskButton;
