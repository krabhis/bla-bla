import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();    
    navigate("/login");     
  };

  return (
    <div className="relative min-h-screen">
      {/* Top Right Button */}
      <div className="absolute top-4 right-6 flex items-center space-x-4">
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      {/* Page Content */}
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        Welcome to the Home Page...
      </div>
    </div>
  );
}
