import { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { adminService } from '../../../services/adminService';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  RefreshCcw, 
  UsersRound, 
  Wallet, 
  BarChart3,
  ShoppingCart,
  Package,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Activity,
  DollarSign,
  UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getStats();
      
      // Map backend data ke frontend format
      const mappedStats = {
        totalOrders: data.total || 0,
        pendingOrders: data.pending || 0,
        paidOrders: data.approved || 0,
        completedOrders: data.approved || 0,
        totalRevenue: data.totalRevenue || 0,
        totalUsers: data.adminsCount || 0,
        communityOrders: Math.floor((data.approved || 0) * 0.6), // Mock calculation
        privateOrders: Math.floor((data.approved || 0) * 0.3), // Mock calculation
        corporateOrders: Math.floor((data.approved || 0) * 0.1), // Mock calculation
        monthlyGrowth: 23.5, // Mock data
        avgOrderValue: data.totalRevenue > 0 && data.approved > 0 ? 
          Math.floor(data.totalRevenue / data.approved) : 0
      };
      
      setStats(mappedStats);
    } catch (err) {
      console.error('Error fetching stats:', err.response || err);
      setError(`Failed to fetch statistics: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Format currency IDR
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const statCards = [
    { 
      label: 'Total Orders', 
      value: stats?.totalOrders || 0, 
      icon: <ShoppingCart className="text-blue-600" />, 
      bg: 'bg-blue-50',
      change: '+12%',
      changeType: 'positive',
      trend: <ArrowUp className="w-4 h-4 text-green-600" />
    },
    { 
      label: 'Pending Orders', 
      value: stats?.pendingOrders || 0, 
      icon: <Clock className="text-amber-600" />, 
      bg: 'bg-amber-50',
      change: '-5%',
      changeType: 'negative',
      trend: <ArrowDown className="w-4 h-4 text-red-600" />
    },
    { 
      label: 'Completed Orders', 
      value: stats?.completedOrders || 0, 
      icon: <CheckCircle2 className="text-emerald-600" />, 
      bg: 'bg-emerald-50',
      change: '+18%',
      changeType: 'positive',
      trend: <ArrowUp className="w-4 h-4 text-green-600" />
    },
    { 
      label: 'Total Revenue', 
      value: formatCurrency(stats?.totalRevenue || 0), 
      icon: <Wallet className="text-green-600" />, 
      bg: 'bg-green-50',
      change: '+23%',
      changeType: 'positive',
      trend: <ArrowUp className="w-4 h-4 text-green-600" />
    },
    { 
      label: 'Total Users', 
      value: stats?.totalUsers || 0, 
      icon: <Users className="text-purple-600" />, 
      bg: 'bg-purple-50',
      change: '+8%',
      changeType: 'positive',
      trend: <ArrowUp className="w-4 h-4 text-green-600" />
    },
    { 
      label: 'Avg Order Value', 
      value: formatCurrency(stats?.avgOrderValue || 0), 
      icon: <TrendingUp className="text-indigo-600" />, 
      bg: 'bg-indigo-50',
      change: '+3%',
      changeType: 'positive',
      trend: <ArrowUp className="w-4 h-4 text-green-600" />
    }
  ];

  // Chart data for order stats
  const chartData = [
    { label: 'Community', value: stats?.communityOrders || 0, color: 'bg-blue-500', icon: <Users className="w-4 h-4" /> },
    { label: 'Private Mentoring', value: stats?.privateOrders || 0, color: 'bg-purple-500', icon: <UserCheck className="w-4 h-4" /> },
    { label: 'Corporate', value: stats?.corporateOrders || 0, color: 'bg-green-500', icon: <Package className="w-4 h-4" /> },
  ];

  // Calculate max value for chart scaling
  const maxChartValue = Math.max(...chartData.map(item => item.value), 1);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Real-time order statistics and revenue tracking</p>
          </div>
          <button 
            onClick={fetchStats}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-600 shadow-sm"
            title="Refresh Data"
          >
            <RefreshCcw size={20} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>

        {isLoading && !stats ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100">
            {error}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {statCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mb-4`}>
                    {card.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-2">{card.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    {card.change && (
                      <div className="flex items-center gap-1">
                        {card.trend}
                        <span className={`text-sm font-medium ${
                          card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {card.change}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Distribution Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Order Distribution</h2>
                  <BarChart3 className="text-gray-400" size={24} />
                </div>
                
                <div className="space-y-4">
                  {/* Chart Bars */}
                  <div className="space-y-3">
                    {chartData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center text-white`}>
                              {item.icon}
                            </div>
                            <span className="font-medium text-gray-700">{item.label}</span>
                          </div>
                          <span className="text-gray-600 font-medium">{item.value}</span>
                        </div>
                        <div className="h-6 w-full bg-gray-100 rounded-xl overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.value / maxChartValue) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className={`h-full ${item.color} rounded-xl`}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Quick Stats</h2>
                  <Activity className="text-gray-400" size={24} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-xs text-blue-600 font-medium">Revenue Growth</p>
                        <p className="text-lg font-bold text-blue-900">+23%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-xs text-green-600 font-medium">New Orders</p>
                        <p className="text-lg font-bold text-green-900">+12</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <UsersRound className="w-8 h-8 text-purple-600" />
                      <div>
                        <p className="text-xs text-purple-600 font-medium">Active Users</p>
                        <p className="text-lg font-bold text-purple-900">{stats?.totalUsers || 0}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Clock className="w-8 h-8 text-amber-600" />
                      <div>
                        <p className="text-xs text-amber-600 font-medium">Pending</p>
                        <p className="text-lg font-bold text-amber-900">{stats?.pendingOrders || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
