import React, { useEffect } from "react";
import PsikologSidebar from "../components/psikolog/components/Sidebar";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";

const PsikologLayout = ({ children }) => {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }

    // cek jika bukan dokter
    if (authUser?.role !== "psikolog") {
      navigate("/");
    }
  }, [authUser]);

  if (!authUser) {
    return null;
  }

  if (authUser?.role !== "psikolog") {
    return null;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex flex-col lg:flex-row flex-1">
        <PsikologSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-5">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PsikologLayout;
