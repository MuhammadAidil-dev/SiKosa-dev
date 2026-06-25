import React, { useEffect } from "react";
import Footer from "../components/Footer";
import AdminSidebar from "../components/admin/SidebarAdmin";
import { useAuth } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser || authUser?.role !== "admin") {
      navigate("/");
    }
  }, [authUser]);

  if (!authUser || authUser?.role !== "admin") {
    return null;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex flex-col lg:flex-row flex-1">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-h-0">
          <main className="flex-1 p-5">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
