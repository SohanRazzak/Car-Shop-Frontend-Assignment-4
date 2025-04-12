import { NavLink } from "react-router";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const Sidebar = () => {

    const user = useAppSelector(selectCurrentUser);
    const userRole = user?.role;

    const adminSidebarItems = (
        <>
            {/* Sidebar content here */}
            <li>
                <NavLink  className="!bg-rose-600 text-white uppercase" to="/admin/dashboard/">Dashboard</NavLink>
            </li>
            <li>
                <NavLink to="/admin/dashboard/update-profile">Update Profile</NavLink>
            </li>
            <li>
                <NavLink to="/admin/dashboard/change-password">Change Password</NavLink>
            </li>
            <li>
                <NavLink to="/admin/dashboard/manage-users">Manage Users</NavLink>
            </li>
            <li>
                <NavLink to="/admin/dashboard/add-car">Add New Car</NavLink>
            </li>
            <li>
                <NavLink to="/admin/dashboard/manage-car">Manage Car</NavLink>
            </li>
        </>
    );


    const customerSidebarItems = (
        <>
            {/* Sidebar content here */}
            <li>
                <NavLink className="!bg-rose-600 text-white uppercase" to="/customer/dashboard">Dashboard</NavLink>
            </li>
            <li>
                <NavLink to="/customer/dashboard/update-profile">Update Profile</NavLink>
            </li>
            <li>
                <NavLink to="/customer/dashboard/change-password">Change Password</NavLink>
            </li>
            <li>
                <NavLink to="/customer/dashboard">Dashboard</NavLink>
            </li>
        </>
    );
    return (
        <ul
            className="menu gap-2 rounded-box z-1 w-full px-2 shadow font-semibold"
        >
            {userRole === 'admin' &&adminSidebarItems}
            {userRole === 'customer' && customerSidebarItems}
        </ul>
    );
};

export default Sidebar;
