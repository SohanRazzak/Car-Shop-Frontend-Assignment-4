
import { Link } from "react-router";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import ManageProducts from "../../pages/ManageProducts/ManageProducts";
import ManageUsers from "../../pages/ManageUsers/ManageUsers";
// import { useAppSelector } from "../../redux/hooks";
// import { TProduct } from "../../types/types";

const DashboardContent = () => {

    // const usersList = useAppSelector(state => state.users);
    // const productsList = useAppSelector(state => state.product)

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <h2 className="text-3xl font-semibold">Admin Dashboard</h2>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stat shadow-lg p-4 rounded-lg">
            <div className="stat-title">Total Users</div>
            <div className="stat-value">354</div>
            <div className="stat-desc">Total number of registered users</div>
          </div>

          <div className="stat shadow-lg p-4 rounded-lg">
            <div className="stat-title">Total Products</div>
            <div className="stat-value">24</div>
            <div className="stat-desc">Total number of products listed</div>
          </div>

          <div className="stat shadow-lg p-4 rounded-lg">
            <div className="stat-title">Total Orders</div>
            <div className="stat-value">300</div>
            <div className="stat-desc">Total number of orders placed</div>
          </div>
        </div>

        {/* User Management Section */}
        <div className="border p-4 rounded-lg shadow-md bg-white">
          <ManageUsers/>
        </div>

        {/* Product Management Section */}
        <div className="border p-4 rounded-lg shadow-md bg-white">
          <ManageProducts/>
        </div>

        {/* Quick Links */}
        <div className="border p-4  rounded-lg shadow-md bg-white">
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/admin/dashboard/manage-users" className="btn btn-neutral w-full">
              Manage Users
            </Link>
            <Link to="/admin/dashboard/manage-car" className="btn btn-neutral w-full">
              Manage Products
            </Link>
            <Link to="/admin/dashboard/manage-orders" className="btn btn-neutral w-full">
              Manage Orders
            </Link>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default DashboardContent;
