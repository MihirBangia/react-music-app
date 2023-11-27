import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const drawerWidth = 240;


function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = useNavigate()

  const notify = (message, condition) => {
    condition(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const checkLoggedIn = async () => {
    let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/checklogin`, { withCredentials: true, baseURL: process.env.REACT_APP_BACKEND_URL })
    if (data === 'LOGGED_IN') {
      notify("Already Logged In", toast.warning);
    } else {
      navigate("/login")
    }
  }

  const navItems = [<LibraryMusicIcon onClick={() => navigate('/playlist')} />, <AccountCircleIcon onClick={() => checkLoggedIn()} />];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }} onClick={() => navigate('/')}>
        Music Player
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ backgroundColor: "#080747" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              
            >
              <p style={{display:"inline", cursor:"pointer"}} onClick={() => navigate('/')}>Music Player</p>
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              {navItems.map((item, index) => (
                <Button key={index} sx={{ color: "#fff" }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
          <input
            type="text"
            className="form"
            name="search"
            placeholder="Search Your Song Here.."
            onChange={(event) => props.onSubmit(event)}
          />
        </AppBar>
        <nav style={{ marginBottom: "100px", backgroundColor: "#080747" }}>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
              backgroundColor: "#080747",
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;