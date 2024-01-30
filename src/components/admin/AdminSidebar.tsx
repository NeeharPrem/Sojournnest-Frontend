import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import PeopleIcon from '@mui/icons-material/People';

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  link: string;
}

const menuItems: MenuItem[] = [
  { text: "Dashboard", icon: <DashboardIcon />, link: "/admin/dashboard" },
  { text: "Listings", icon: <ChecklistOutlinedIcon />, link: "/admin/listings" },
  { text: "Users", icon: <PeopleIcon />, link: "/admin/users" },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (link: string) => {
    navigate(link);
  };

  return (
    <div>
      {menuItems.map((item, index) => (
        <ListItemButton key={index} onClick={() => handleNavigation(item.link)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
    </div>
  );
}

export default AdminSidebar;