import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Homepage from "../pages/Homepage/Homepage";
import DashboardLayout from "../layouts/DashboardLayout";

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
                element: <Homepage/>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout/>
    }
])