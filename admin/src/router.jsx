import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import NotFound from "./views/components/core/NotFound.jsx";
import AuthLayout from "./views/components/AuthLayout.jsx";
import AdminLayout from "./views/components/AdminLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Profile from "./views/user/Profile.jsx";
import Settings from "./views/user/Settings.jsx";
import ResetPassword from "./views/ResetPassword.jsx";
import RequestPassword from "./views/RequestPassword.jsx";
import Categories from "./views/Categories.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Navigate to="/" />
            },
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/settings',
                element: <Settings />
            },
            {
                path: '/categories',
                element: <Categories />
            }
        ]
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/reset-password',
                element: <ResetPassword />
            },
            {
                path: '/request-new-password',
                element: <RequestPassword />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router;
