import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import ScrollToHash from "@/components/ScrollToHash";
import { useMaintenanceMode } from "@/hooks/useMaintenanceMode";
import MaintenancePage from "@/components/MaintenancePage";
import Index from "./pages/Index.tsx";
import Courses from "./pages/Courses.tsx";
import CourseDetails from "./pages/CourseDetails.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import AdminCourses from "./pages/admin/AdminCourses.tsx";
import AdminCategories from "./pages/admin/AdminCategories.tsx";
import AdminInstructors from "./pages/admin/AdminInstructors.tsx";
import AdminTestimonials from "./pages/admin/AdminTestimonials.tsx";
import AdminBlog from "./pages/admin/AdminBlog.tsx";

const queryClient = new QueryClient();

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isMaintenanceMode, isLoading } = useMaintenanceMode();
  if (isLoading) return null;
  if (isMaintenanceMode) return <MaintenancePage />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<PublicRoute><Index /></PublicRoute>} />
            <Route path="/cursos" element={<PublicRoute><Courses /></PublicRoute>} />
            <Route path="/cursos/:slug" element={<PublicRoute><CourseDetails /></PublicRoute>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="cursos" element={<AdminCourses />} />
              <Route path="categorias" element={<AdminCategories />} />
              <Route path="instrutores" element={<AdminInstructors />} />
              <Route path="depoimentos" element={<AdminTestimonials />} />
              <Route path="blog" element={<AdminBlog />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
