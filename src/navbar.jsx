import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TaskIcon from "@mui/icons-material/Task";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { state, setState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "./api/auth";

export default function MenuAppBar() {
  let navigate = useNavigate();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    logout();
    navigate("/login");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    navigate("/profile");
    setAnchorEl(null);
  };
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ bgcolor: "secondary.main", color: "white", padding: 5 }}>
        <ListItemText style={{ display: "flex", justifyContent: "center" }}>
          {localStorage.names}
        </ListItemText>
        <ListItemText style={{ display: "flex", justifyContent: "center" }}>
          {localStorage.email}
        </ListItemText>
        <ListItemText style={{ display: "flex", justifyContent: "center" }}>
          {localStorage.company}
        </ListItemText>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setOpen(false)}
            component={Link}
            to="/dashboard"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setOpen(false)}
            component={Link}
            to="/pending"
          >
            <ListItemIcon>
              <PendingActionsIcon />
            </ListItemIcon>
            <ListItemText primary="Pending Documents" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setOpen(false)}
            component={Link}
            to="/completed"
          >
            <ListItemIcon>
              <TaskIcon />
            </ListItemIcon>
            <ListItemText primary="Completed Documents" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AnyDoc
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="secondary"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>
                  {" "}
                  <FormControlLabel
                    control={
                      <Switch
                        color="secondary"
                        checked={auth}
                        onChange={handleChange}
                        aria-label="login switch"
                      />
                    }
                    label={auth ? "Logout" : "Login"}
                  />
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div>
        <Drawer open={open} onClose={() => setOpen(false)}>
          {list("left")}
        </Drawer>
      </div>
    </Box>
  );
}
