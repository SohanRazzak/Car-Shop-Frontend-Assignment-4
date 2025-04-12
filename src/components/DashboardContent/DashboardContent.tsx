import { toast } from "sonner";
import LayoutWrapper from "../../layouts/LayoutWrapper";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";
import { useGetAllUsersQuery } from "../../redux/features/users/usersApi";
import { Link } from "react-router";
import { TProduct, TUser } from "../../types/types";

const DashboardContent = () => {
  // Fetching Users and Products for Admin Dashboard
  const { data: users, isLoading, isError, error, refetch } = useGetAllUsersQuery(undefined);
  const { data: products, isLoading: dataLoading } = useGetAllProductsQuery(undefined);

  // Loading state for both users and products
  if (isLoading || dataLoading) {
    return <LoadingSpinner />;
  }

  // Error handling if fetching fails
  if (isError || error) {
    return <ErrorComponent refetch={refetch} />;
  }

  // Ensure users and products are defined before rendering
  const usersList = users ?? [];
  const productsList = products ?? [];

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <h2 className="text-3xl font-semibold">Admin Dashboard</h2>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stat shadow-lg p-4 rounded-lg">
            <div className="stat-title">Total Users</div>
            <div className="stat-value">{usersList.length}</div>
            <div className="stat-desc">Total number of registered users</div>
          </div>

          <div className="stat shadow-lg p-4 rounded-lg">
            <div className="stat-title">Total Products</div>
            <div className="stat-value">{productsList.length}</div>
            <div className="stat-desc">Total number of products listed</div>
          </div>

          <div className="stat shadow-lg p-4 rounded-lg">
            <div className="stat-title">Total Orders</div>
            <div className="stat-value">300</div> {/* Replace with actual order data */}
            <div className="stat-desc">Total number of orders placed</div>
          </div>
        </div>

        {/* User Management Section */}
        <div className="border p-4 rounded-lg shadow-md bg-white">
          <h3 className="text-2xl font-semibold mb-4">User Management</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center">No users available</td>
                  </tr>
                ) : (
                  usersList.map((user: TUser) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <Link to={`/admin/users/${user._id}`} className="btn btn-primary btn-sm">
                          Edit
                        </Link>
                        <button
                          className="btn btn-error btn-sm ml-2"
                          onClick={() => {
                            // Call delete function
                            toast.success(`User ${user.name} deleted`);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Management Section */}
        <div className="border p-4 rounded-lg shadow-md bg-white">
          <h3 className="text-2xl font-semibold mb-4">Product Management</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productsList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center">No products available</td>
                  </tr>
                ) : (
                  productsList.map((product: TProduct) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                      <td>
                        <Link to={`/admin/products/${product._id}`} className="btn btn-primary btn-sm">
                          Edit
                        </Link>
                        <button
                          className="btn btn-error btn-sm ml-2"
                          onClick={() => {
                            // Call delete function
                            toast.success(`Product ${product.name} deleted`);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links */}
        <div className="border p-4 rounded-lg shadow-md bg-white">
          <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
          <div className="space-y-4">
            <Link to="/admin/users" className="btn btn-neutral w-full">
              Manage Users
            </Link>
            <Link to="/admin/products" className="btn btn-neutral w-full">
              Manage Products
            </Link>
            <Link to="/admin/orders" className="btn btn-neutral w-full">
              Manage Orders
            </Link>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default DashboardContent;
