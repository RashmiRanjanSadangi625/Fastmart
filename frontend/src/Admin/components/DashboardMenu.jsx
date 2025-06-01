import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GradingIcon from '@mui/icons-material/Grading';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const menu = [
    { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { name: "Products", path: "/admin/products", icon: <CategoryIcon /> },
    { name: "Customers", path: "/admin/customers", icon: <PeopleAltIcon /> },
    { name: "Orders", path: "/admin/orders", icon: <GradingIcon /> },
    { name: "Add Product", path: "/admin/product/create", icon: <ProductionQuantityLimitsIcon /> },
];

const DashboardMenu = ({ collapsed }) => {
    const navigate = useNavigate();

    return (
        <div className={`h-full bg-blue-950 text-white transition-all duration-300 ${collapsed ? "w-[4rem]" : "w-[14rem]"} fixed top-0 flex flex-col justify-between`}>
            <div>
                {/* Admin Profile Section */}
                <div className="flex items-center py-4 px-3 border-b-1">
                    <Avatar 
                        sx={{ 
                            bgcolor: "white", 
                            color: "#1E3A8A", 
                            width: collapsed ? 30 : 50, 
                            height: collapsed ? 30 : 50, 
                            transition: "width 0.3s, height 0.3s"
                        }} 
                    />
                    {!collapsed && <p className="text-white">&nbsp; Hello, Admin</p>}
                </div>

                {/* Menu Items */}
                <List>
                    {menu.map((item) => (
                        <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
                            <ListItemButton>
                                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                                {!collapsed && <ListItemText>{item.name}</ListItemText>}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </div>

            {/* Account Section - Positioned at the Bottom */}
            <Box>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon sx={{ color: "white" }}>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            {!collapsed && <ListItemText>Account</ListItemText>}
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </div>
    );
};

export default DashboardMenu;
