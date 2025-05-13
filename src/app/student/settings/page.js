"use client";
import { useState } from 'react';

export default function StudentSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    notifications: true,
    theme: "light",
    twoFactor: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Add your update logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Student Settings</h1>

        {/* Account Settings Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Account Information</h2>
              <p className="text-gray-600">Manage your basic account details</p>
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={userData.email}
                  className="w-full p-3 rounded-lg border-2 border-gray-200 bg-gray-100"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                  disabled={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Security Settings Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Security</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-800">Password</h3>
                <p className="text-sm text-gray-600">Last changed 2 weeks ago</p>
              </div>
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                Change Password
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">
                  {userData.twoFactor ? 'Enabled' : 'Add extra security to your account'}
                </p>
              </div>
              <button 
                onClick={() => setUserData({...userData, twoFactor: !userData.twoFactor})}
                className={`px-4 py-2 rounded-lg ${userData.twoFactor ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
              >
                {userData.twoFactor ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Preferences</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Notifications</h3>
                <p className="text-sm text-gray-600">Manage how we notify you</p>
              </div>
              <select
                value={userData.notifications ? 'enabled' : 'disabled'}
                onChange={(e) => setUserData({...userData, notifications: e.target.value === 'enabled'})}
                className="px-4 py-2 border border-gray-200 rounded-lg"
              >
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Theme</h3>
                <p className="text-sm text-gray-600">Choose interface appearance</p>
              </div>
              <select
                value={userData.theme}
                onChange={(e) => setUserData({...userData, theme: e.target.value})}
                className="px-4 py-2 border border-gray-200 rounded-lg"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danger Zone Card */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-4">Danger Zone</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-red-800">Delete Account</h3>
              <p className="text-sm text-red-600">Permanently remove your account and data</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}