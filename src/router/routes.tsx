import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Homepage from "../pages/Homepage/Homepage";
import DashboardLayout from "../layouts/DashboardLayout";
import AllProducts from "../pages/AllProducs/AllProducts";
import DashboardContent from "../components/DashboardContent/DashboardContent";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Homepage/>
            },
            {
                path: '/all-cars',
                element: <AllProducts/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <SignUp/>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout/>,
        children: [
            {
                index: true,
                element: <DashboardContent/>
            }
        ]
    }
])