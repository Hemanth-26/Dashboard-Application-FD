import React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const dashboard = [
  {
    name: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    url: "/dashboard",
  },
  {
    name: "Todos",
    icon: <PlaylistAddIcon />,
    url: "/todos",
  },
  {
    name: "Profile",
    icon: <AccountCircleOutlinedIcon />,
    url: "/profile",
  },
];

function SidebarList({ open }) {
  const navigate = useNavigate();

  const location = window.location.pathname.split("/").slice(-1)[0];
  //   console.log(location);

  return (
    <>
      <List>
        {dashboard.map((data, index) => (
          <ListItem key={data.name} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              selected={data.url === `/${location}`}
              onClick={() => navigate(data.url)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {data.icon}
              </ListItemIcon>
              <ListItemText
                primary={data.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
    </>
  );
}

export default SidebarList;
