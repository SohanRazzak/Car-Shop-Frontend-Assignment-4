import { useState } from "react";

const ProfileComponent = () => {
    const [user, setUser] = useState({
      _id: '67f7ecb9fb5b0c1ec1badfad',
      name: 'Admin',
      email: 'farhan@gmail.com',
      phone: '01623967146',
      address: '123 Main St, Apartment 4B',
      city: 'chittagondfdfdfg',
      status: 'deactive',
      image: 'https://example.com/profile.jpg',
      createdAt: '2025-04-10T16:07:21.028Z',
      updatedAt: '2025-04-12T18:12:05.031Z',
    });
  
    return (
      <div className="p-4">
        {/* Profile Card on larger devices */}
        <div className="lg:flex lg:space-x-6">
          {/* Profile Image and Info Section */}
          <div className="lg:w-1/3 w-full flex justify-center mb-4 lg:mb-0">
            <img
              src={user.image}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
            />
          </div>
          {/* User Info Section */}
          <div className="lg:w-2/3 w-full flex flex-col justify-center">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
            <p className="text-gray-600">{user.address}</p>
            <p className="text-gray-600">{user.city}</p>
            <p className={`text-gray-600 ${user.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
              Status: {user.status}
            </p>
            <div className="mt-4">
              <button className="btn btn-primary">Update Profile</button>
            </div>
          </div>
        </div>
  
        {/* Profile Card for smaller devices */}
        <div className="lg:hidden mt-4">
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>
              <p className="text-gray-600">{user.address}</p>
              <p className="text-gray-600">{user.city}</p>
              <p className={`text-gray-600 ${user.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                Status: {user.status}
              </p>
              <div className="mt-4">
                <button className="btn btn-primary">Update Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileComponent;
  