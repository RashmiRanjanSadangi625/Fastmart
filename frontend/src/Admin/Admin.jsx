import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Dashboard from './components/Dashboard';
import CreateProductForm from './components/CreateProductForm';
import CustomersTable from './components/CustomersTable';
import OrdersTable from './components/OrdersTable';
import ProductsTable from './components/ProductsTable';
import LoginForm from './components/Auth/LoginForn';
import DashboardMenu from './components/DashboardMenu';
import Navigation from './components/Navigation/Navigation';

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);

    // Function to toggle sidebar
    const toggleSidebar = () => setCollapsed((prev) => !prev);

    return (
        <div className="relative flex h-screen">
            <CssBaseline />
            {/* Sidebar */}
            <DashboardMenu collapsed={collapsed} />

            {/* Main Content */}
            <div className={`h-full transition-all duration-300 ${collapsed ? "ml-[4rem]" : "ml-[14rem]"} w-full`}>
                {/* Pass toggleSidebar to Navigation */}
                <Navigation collapsed={collapsed} toggleSidebar={toggleSidebar} />
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/product/create' element={<CreateProductForm />} />
                    <Route path='/customers' element={<CustomersTable />} />
                    <Route path='/orders' element={<OrdersTable />} />
                    <Route path='/products' element={<ProductsTable />} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;
