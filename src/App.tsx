
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clubs from "./pages/Clubs";
import RiderManagement from "./pages/RiderManagement";
import RiderProfile from "./pages/RiderProfile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import StickerVerification from "./pages/StickerVerification";
import PublicRiderProfile from "./pages/PublicRiderProfile";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000000",
          colorError: "#D32F2F",
          colorSuccess: "#4CAF50",
          borderRadius: 8,
        },
      }}
    >
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sticker" element={<StickerVerification />} />
            <Route path="/sticker/profile/:code" element={<PublicRiderProfile />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/clubs" element={<ProtectedRoute><Clubs /></ProtectedRoute>} />
            <Route path="/riders" element={<ProtectedRoute><RiderManagement /></ProtectedRoute>} />
            <Route path="/riders/:id" element={<ProtectedRoute><RiderProfile /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  </QueryClientProvider>
);

export default App;
