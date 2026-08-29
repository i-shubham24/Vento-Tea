import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import OrderTrackingStub from '../components/OrderTrackingStub';
import { Navigate } from 'react-router-dom';

export default function Account() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-[70vh]">
      <SEO title="My Account" description="Manage your Vento Tea orders and account details." keywords="my account" />
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-serif text-vento-forest mb-2">My Account</h1>
          <p className="text-gray-600">Welcome back, {user.name || user.phone}</p>
        </div>
        <button 
          onClick={logout}
          className="text-red-500 hover:text-red-700 font-medium underline"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="col-span-1 lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-serif text-vento-forest border-b border-gray-200 pb-4">Recent Orders</h2>
          <OrderTrackingStub />
        </div>
        
        <div className="space-y-8">
          <h2 className="text-2xl font-serif text-vento-forest border-b border-gray-200 pb-4">Account Details</h2>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Phone Number</p>
            <p className="font-medium text-vento-forest mb-4">+91 {user.phone}</p>
            
            <p className="text-sm text-gray-500 mb-1">Default Address</p>
            <p className="font-medium text-vento-forest mb-4">No address saved yet.</p>
            
            <button className="text-vento-gold hover:text-vento-gold-dark font-medium underline">
              Edit Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
