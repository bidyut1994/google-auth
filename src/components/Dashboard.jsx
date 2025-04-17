import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Routing will handle the redirect to home
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-6">
          {currentUser?.photoURL && (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">
              Welcome, {currentUser?.displayName || "User"}
            </h1>
            <p className="text-gray-600">{currentUser?.email}</p>
            <p className="text-gray-500">User ID: {currentUser?.uid}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Dashboard Content</h2>
          <p className="text-gray-700">
            This is your personalized dashboard. Add your application content
            here.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
