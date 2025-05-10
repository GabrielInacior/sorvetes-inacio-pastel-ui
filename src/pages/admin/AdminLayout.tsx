
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const AdminLayout = () => {
  return (
    <ProtectedRoute requiredRole="funcionario">
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
