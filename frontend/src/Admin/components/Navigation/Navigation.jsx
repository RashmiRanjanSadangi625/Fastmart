import { useEffect, useState } from "react";
import { Avatar, Menu, MenuItem, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../State/Admin/Auth/Action";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Navigation({ collapsed, toggleSidebar }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const openUserMenu = Boolean(anchorEl);
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);
    const dispatch = useDispatch();

    const handleUserClick = (event) => setAnchorEl(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorEl(null);
    const handleLogin = () => navigate('/admin/login');
    const handleLogout = () => {
        dispatch(logout(navigate));
        handleCloseUserMenu();
    };

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, auth?.jwt]);

    return (
        <header className={`relative bg-blue-950 text-white transition-all duration-300`}>
            <nav className="mx-auto">
                <div className="border-b border-gray-200 flex justify-between  h-16">
                    {/* Sidebar Toggle Button */}
                    <IconButton onClick={toggleSidebar} sx={{ color: "white" }}>
                        {collapsed ? <ChevronRightIcon className='bg-blue-950 rounded-4xl text-3xl' /> : <ChevronLeftIcon />}
                    </IconButton>

                    {/* User Profile Section */}
                    <div className="ml-auto flex items-center">
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                            {auth?.user?.firstName ? (
                                <div>
                                    <Avatar
                                        className="text-white mr-15"
                                        onClick={handleUserClick}
                                        sx={{ bgcolor: "white", color: "black", cursor: "pointer" }}
                                    >
                                        {auth?.user?.firstName[0].toUpperCase()}
                                    </Avatar>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={openUserMenu}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={() => navigate("/admin/account")}> Account</MenuItem>
                                        <MenuItem onClick={() => navigate("/admin")}>
                                            {auth?.user?.role === "ADMIN" ? "Admin Dashboard" : "All Orders"}
                                        </MenuItem>

                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            ) : (
                                <Button onClick={handleLogin} sx={{ color: "white" }}>Login</Button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
