import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Homepage from "../pages/Homepage/Homepage";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import AllProducts from "../pages/AllProducs/AllProducts";
import DashboardContent from "../components/DashboardContent/DashboardContent";
import CustomerDashboardContent from "../components/CustomerDashboardContent/CustomerDashboardContent";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ProtectedRoute from "../layouts/ProtectedRoute";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AddProduct from "../pages/AddProduct/AddProduct";
import AboutUs from "../pages/AboutUs/AboutUs";
import ManageProducts from "../pages/ManageProducts/ManageProducts";
import UpdateProduct from "../pages/UpdateProduct/UpdateProduct";
import ManageUser from "../pages/ManageUser/ManageUser";

export const routes = createBrowserRouter([
    // Mainlayout items
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Homepage />,
            },
            {
                path: "all-cars",
                element: <AllProducts />,
            },
            {
                path: "car/:id",
                element: <ProductDetails />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "about-us",
                element: <AboutUs />,
            },
        ],
    },

    // Admin layout items
    {
        path: "/admin/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardContent />,
            },
            {
                path: "add-car",
                element: <AddProduct />,
            },
            {
                path: "manage-car",
                element: <ManageProducts />,
            },
            {
                path: "update-car/:id",
                element: <UpdateProduct/>,
            },
            {
                path: "manage-user",
                element: <ManageUser/>,
            },
        ],
    },

    // Customer accessible path
    {
        path: "/customer/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <CustomerDashboardContent />,
            },
        ],
    },
]);
