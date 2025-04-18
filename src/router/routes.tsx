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
import ManageUsers from "../pages/ManageUsers/ManageUsers";
import ChangePassword from "../pages/ChangePassWord/ChangePassword";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";
import ManageOrders from "../pages/ManageOrders/ManageOrders";
import OrderDetails from "../pages/OrderDetails/OrderDetails";
import MyCart from "../pages/MyCart/MyCart";
import MyOrders from "../pages/MyOrders/MyOrders";
import VerifyOrder from "../pages/VerifyOrder/VerifyOrder";

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
            {
                path: "my-cart",
                element: <MyCart />,
            },
            {
                path: "order-details/:orderId",
                element: <OrderDetails />,
            },
        ],
    },

    // Admin layout items
    {
        path: "/admin/dashboard",
        element: (
            <ProtectedRoute role="admin">
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
                path: "manage-cars",
                element: <ManageProducts />,
            },
            {
                path: "update-car/:id",
                element: <UpdateProduct />,
            },
            {
                path: "manage-users",
                element: <ManageUsers />,
            },
            {
                path: "manage-orders",
                element: <ManageOrders />,
            },
            {
                path: "order-details/:orderId",
                element: <OrderDetails />,
            },
            {
                path: "change-password",
                element: <ChangePassword />,
            },
            {
                path: "update-profile",
                element: <UpdateProfile />,
            },
        ],
    },

    // Customer accessible path
    {
        path: "/customer/dashboard",
        element: (
            <ProtectedRoute role="customer">
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <CustomerDashboardContent />,
            },
            {
                path: "change-password",
                element: <ChangePassword />,
            },
            {
                path: "update-profile",
                element: <UpdateProfile />,
            },
            {
                path: "my-orders",
                element: <MyOrders />,
            },
            {
                path: 'verify-order',
                element: <VerifyOrder/>
            }
        ],
    },
]);
