import { Link } from 'react-router';
import SectionHeading from '../../components/SectionHeading/SectionHeading';

const DashboardContent = () => {
  return (
    <div className="space-y-8">
      <SectionHeading title="Admin Dashboard" subTitle="Manage your store" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Products Card */}
        <Link to="/admin/dashboard/manage-products" className="card bg-base-100 shadow hover:shadow-lg transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-lg">Products</h2>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">125</span>
              <span className="badge badge-primary">Manage</span>
            </div>
          </div>
        </Link>

        {/* Orders Card */}
        <Link to="/admin/dashboard/manage-orders" className="card bg-base-100 shadow hover:shadow-lg transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-lg">Orders</h2>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">42</span>
              <span className="badge badge-primary">View All</span>
            </div>
          </div>
        </Link>

        {/* Users Card */}
        <Link to="/admin/dashboard/manage-users" className="card bg-base-100 shadow hover:shadow-lg transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-lg">Users</h2>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">89</span>
              <span className="badge badge-primary">Manage</span>
            </div>
          </div>
        </Link>

        {/* Revenue Card */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title text-lg">Revenue</h2>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">$12,345</span>
              <span className="badge badge-primary">This Month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ORD-78945</td>
                  <td>John Doe</td>
                  <td>2023-05-15</td>
                  <td>$125.99</td>
                  <td><span className="badge badge-primary">Processing</span></td>
                </tr>
                <tr>
                  <td>ORD-78944</td>
                  <td>Jane Smith</td>
                  <td>2023-05-14</td>
                  <td>$89.50</td>
                  <td><span className="badge badge-primary">Shipped</span></td>
                </tr>
                <tr>
                  <td>ORD-78943</td>
                  <td>Robert Johnson</td>
                  <td>2023-05-13</td>
                  <td>$225.00</td>
                  <td><span className="badge badge-primary">Delivered</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card-actions justify-end mt-4">
            <Link to="/admin/dashboard/manage-orders" className="btn btn-primary">
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;