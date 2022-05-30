import {
  Box,
  AppBar,
  Toolbar,
  Container,
  Typography,
} from "@mui/material";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Link } from "react-router-dom";
import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';
import NewTaskButton from './NewTaskButton';

export default function Navbar() {
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              <Link style={{ textDecoration: "none", color: "#0D1321" }} to="/">
              <AutoFixHighIcon/> Intentions Booster 
              </Link>
            </Typography>
            <LoginButton/>
            <ProfileButton/>
            <NewTaskButton/>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
