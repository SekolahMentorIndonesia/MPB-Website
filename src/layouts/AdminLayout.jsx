import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  ShoppingCart,
  Menu,
  X,
  LogOut,
  Home,
  ChevronDown,
  UserCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminGuard from "../components/admin/AdminGuard";

// Layout utama untuk halaman Admin dengan sidebar yang bisa ditutup/buka
export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/dashboard')) setActiveMenu('dashboard');
    else if (path.includes('/orders')) setActiveMenu('orders');
    else if (path.includes('/products')) setActiveMenu('products');
    else if (path.includes('/admins')) setActiveMenu('admins');
    else if (path.includes('/settings')) setActiveMenu('settings');
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
      roles: ['admin', 'superadmin']
    },
    {
      id: 'orders',
      label: 'Kelola Order',
      icon: ShoppingCart,
      path: '/admin/orders',
      roles: ['admin', 'superadmin']
    },
    {
      id: 'products',
      label: 'Kelola Produk',
      icon: Package,
      path: '/admin/products',
      roles: ['admin', 'superadmin']
    },
    {
      id: 'admins',
      label: 'Kelola Admin',
      icon: Users,
      path: '/admin/admins',
      roles: ['superadmin']
    },
    {
      id: 'settings',
      label: 'Pengaturan',
      icon: Settings,
      path: '/admin/settings',
      roles: ['superadmin']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role?.toLowerCase())
  );

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Mobile Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            width: isCollapsed ? 80 : 280,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
          className={`
            fixed lg:relative bg-white shadow-xl border-r border-gray-200 z-50
            h-screen flex flex-col
            ${isCollapsed ? 'items-center' : ''}
          `}
        >
          {/* Header */}
          <div className={`
            p-4 border-b border-gray-200 
            ${isCollapsed ? 'justify-center' : ''}
            flex items-center justify-between
          `}>
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-gray-900 text-lg">SMI Admin</h1>
                  <p className="text-xs text-gray-500">
                    {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                  </p>
                </div>
              </div>
            )}
            
            {/* Toggle Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </motion.div>
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              {filteredMenuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      navigate(item.path);
                      setIsSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all duration-200 group relative overflow-hidden
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                        : 'hover:bg-gray-100 text-gray-700'
                      }
                      ${isCollapsed ? 'justify-center px-3' : ''}
                    `}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    <Icon className={`
                      w-5 h-5 relative z-10
                      ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-900'}
                    `} />
                    
                    {!isCollapsed && (
                      <span className={`
                        font-medium relative z-10
                        ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}
                      `}>
                        {item.label}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </nav>

          {/* User Section */}
          <div className={`
            p-4 border-t border-gray-200
            ${isCollapsed ? 'justify-center' : ''}
          `}>
            {!isCollapsed ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <UserCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 text-sm">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Kembali ke Website"
                  >
                    <Home className="w-4 h-4 text-gray-600" />
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate('/')}
                  className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                  title="Kembali ke Website"
                >
                  <Home className="w-5 h-5 text-gray-600" />
                </button>
                
                <button
                  onClick={handleLogout}
                  className="p-3 hover:bg-red-50 rounded-xl transition-colors group"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                </button>
              </div>
            )}
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className={`
          flex-1 flex flex-col
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}
        `}>
          {/* Mobile Header */}
          <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full capitalize">
                  {user?.role}
                </span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
