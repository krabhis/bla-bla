import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-6">
      <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
      <p className="mt-2 text-gray-600">
        You do not have permission to access this page.
      </p>
      <Link
        to="/"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Take me home
      </Link>
    </div>
  );
};

export default AccessDenied;
