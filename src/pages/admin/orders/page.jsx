import { useState, useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Calendar,
  User,
  CreditCard,
  Package,
  RefreshCcw,
  ChevronDown,
  Download,
  Send,
  MessageSquare,
  Edit,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import { adminService } from '../../../services/adminService';

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Load orders
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const data = await adminService.getEnrollments();
        setOrders(data.enrollments || []);
        setFilteredOrders(data.enrollments || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders
  useEffect(() => {
    let filtered = [...orders];

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order.request_id?.toLowerCase().includes(search) ||
        order.User?.name?.toLowerCase().includes(search) ||
        order.User?.email?.toLowerCase().includes(search)
      );
    }

    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchTerm]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-amber-100 text-amber-700', icon: Clock, label: 'Pending' },
      approved: { color: 'bg-blue-100 text-blue-700', icon: CheckCircle, label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'Rejected' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const getDeliveryStatusBadge = (status) => {
    const statusConfig = {
      not_started: { color: 'bg-gray-100 text-gray-700', icon: Clock, label: 'Not Started' },
      in_progress: { color: 'bg-blue-100 text-blue-700', icon: RefreshCcw, label: 'In Progress' },
      completed: { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'Completed' }
    };
    
    const config = statusConfig[status] || statusConfig.not_started;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  const updateDeliveryStatus = async (orderId, status) => {
    try {
      await adminService.updateDeliveryStatus(orderId, status);
      // Refresh data
      const data = await adminService.getEnrollments();
      setOrders(data.enrollments || []);
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  const sendInvite = async (orderId) => {
    try {
      await adminService.sendInvite(orderId, {
        type: 'telegram',
        message: 'Selamat bergabung dengan komunitas SMI!'
      });
      alert('Invite berhasil dikirim!');
    } catch (error) {
      console.error('Error sending invite:', error);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <RefreshCcw className="animate-spin text-blue-600" size={40} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-500 mt-1">Manage and track all customer orders</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders by ID, name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="lg:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Delivery
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOrderClick(order)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.request_id}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(order.created_at).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.User?.name}</p>
                        <p className="text-xs text-gray-500">{order.User?.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                        {order.product_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">
                        {order.MentorPackage?.price ? `Rp ${order.MentorPackage.price.toLocaleString('id-ID')}` : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4">
                      {getDeliveryStatusBadge(order.telegram_sent ? 'completed' : 'not_started')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOrderClick(order);
                          }}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        
                        {order.product_type === 'komunitas' && order.status === 'approved' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              sendInvite(order.id);
                            }}
                            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                            title="Send Invite"
                          >
                            <Send size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Detail Modal */}
        {showOrderDetail && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                    <p className="text-gray-500">Order ID: {selectedOrder.request_id}</p>
                  </div>
                  <button
                    onClick={() => setShowOrderDetail(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 text-lg">Customer Information</h3>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                      <div><strong>Name:</strong> {selectedOrder.User?.name}</div>
                      <div><strong>Email:</strong> {selectedOrder.User?.email}</div>
                      <div><strong>Phone:</strong> {selectedOrder.User?.phone_number}</div>
                      <div><strong>Product:</strong> {selectedOrder.product_type}</div>
                      <div><strong>Amount:</strong> {selectedOrder.MentorPackage?.price ? `Rp ${selectedOrder.MentorPackage.price.toLocaleString('id-ID')}` : 'N/A'}</div>
                    </div>
                  </div>

                  {/* Order Status */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 text-lg">Order Status</h3>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <strong>Payment Status:</strong>
                        {getStatusBadge(selectedOrder.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <strong>Delivery Status:</strong>
                        {getDeliveryStatusBadge(selectedOrder.telegram_sent ? 'completed' : 'not_started')}
                      </div>
                      <div><strong>Order Date:</strong> {new Date(selectedOrder.created_at).toLocaleString('id-ID')}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                  {selectedOrder.status === 'approved' && (
                    <>
                      <button
                        onClick={() => updateDeliveryStatus(selectedOrder.id, 'in_progress')}
                        className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Mark In Progress
                      </button>
                      <button
                        onClick={() => updateDeliveryStatus(selectedOrder.id, 'completed')}
                        className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Completed
                      </button>
                    </>
                  )}
                  
                  {selectedOrder.product_type === 'komunitas' && selectedOrder.status === 'approved' && (
                    <button
                      onClick={() => sendInvite(selectedOrder.id)}
                      className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Invite
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
