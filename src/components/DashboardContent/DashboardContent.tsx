import SectionHeading from '../../components/SectionHeading/SectionHeading';
import { useGetOrdersQuery } from "../../redux/features/orders/ordersApi";
import { useGetAllProductsQuery } from "../../redux/features/products/productApi";
import { useGetAllUsersQuery } from "../../redux/features/users/usersApi";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import { TOrder, TProduct, TUser } from '../../types/types';
import RecentActivityCard from './RecentActivityCard';
import InfoCard from './InfoCard';

const DashboardContent = () => {
  const {
    data: ordersData,
    isLoading: ordersLoading,
    isError: ordersError
  } = useGetOrdersQuery(undefined);
  
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError
  } = useGetAllUsersQuery(undefined);
  
  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError
  } = useGetAllProductsQuery(undefined);

  // Loading and error states
  const isLoading = ordersLoading || usersLoading || productsLoading;
  const isError = ordersError || usersError || productsError;

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    return <ErrorComponent refetch={null} />;
  }

  // Data extraction with fallbacks
  const recentOrders: TOrder[] = ordersData?.data?.slice(0, 5) || [];
  const recentUsers: TUser[] = usersData?.data?.slice(0, 5) || [];
  const recentProducts: TProduct[] = productsData?.data?.slice(0, 5) || [];


  const usersCount = usersData.data.length;
  const productsCount = productsData.data.length;
  const ordersCount = ordersData.data.length;

  return (
    <div className="space-y-8">
      <SectionHeading title="Admin Dashboard" subTitle="Overview and recent activities" />
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoCard 
          title="Total Products" 
          value={ productsCount || 0} 
          link="/admin/dashboard/manage-products" 
        />
        <InfoCard 
          title="Total Orders" 
          value={ordersCount || 0} 
          link="/admin/dashboard/manage-orders" 
        />
        <InfoCard 
          title="Total Users" 
          value={usersCount || 0} 
          link="/admin/dashboard/manage-users" 
        />
      </div>

      {/* Recent Activities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivityCard 
          title="Recently Joined"
          items={recentUsers}
          renderItem={(user: TUser) => (
            <div className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-8">
                  <span>{user.name?.charAt(0) || 'U'}</span>
                </div>
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">
                {user.createdAt ? new Date(user.createdAt as string).toLocaleDateString(): "N/A"}

                </p>
              </div>
            </div>
          )}
          viewAllLink="/admin/dashboard/manage-users"
        />

        <RecentActivityCard 
          title="Recent Products"
          items={recentProducts}
          renderItem={(product: TProduct) => (
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-12 rounded">
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">${product.price}</p>
              </div>
            </div>
          )}
          viewAllLink="/admin/dashboard/manage-cars"
        />

        <RecentActivityCard 
          title="Recent Orders"
          items={recentOrders}
          renderItem={(order: TOrder) => (
            <div>
              <p className="font-medium">Order #{order._id.slice(-6)}</p>
              <p className="text-sm">${order.totalPrice.toFixed(2)}</p>
              <p className="text-sm text-gray-500">
                {order.createdAt ? new Date(order.createdAt as string).toLocaleDateString(): "N/A"}
              </p>
              <span className="badge badge-info text-white">
                {order.deliveryStatus}
              </span>
            </div>
          )}
          viewAllLink="/admin/dashboard/manage-orders"
        />
      </div>
    </div>
  );
};




export default DashboardContent;