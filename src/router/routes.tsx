import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Homepage from "../pages/Homepage/Homepage";

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
        element: <Homepage/>
    }
])