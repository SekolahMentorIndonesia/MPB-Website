import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  CreditCard, 
  Package, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  Building,
  Users,
  Save,
  RefreshCcw
} from 'lucide-react';
import paymentService from '../services/paymentService';
import { ORDER_STATUS, PRODUCT_TYPE } from '../types/content';
import { toast } from 'sonner';

const OrderDetailModal = ({ order, onClose, onUpdate }) => {
  const [deliveryStatus, setDeliveryStatus] = useState(order.deliveryStatus || 'pending');
  const [deliveryNotes, setDeliveryNotes] = useState(order.deliveryNotes || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateDelivery = async () => {
    setLoading(true);
    try {
      // Mock API call - nanti diganti dengan API call yang sebenarnya
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedOrder = {
        ...order,
        deliveryStatus,
        deliveryNotes,
        deliveredAt: deliveryStatus === 'completed' ? new Date().toISOString() : order.deliveredAt
      };

      onUpdate(updatedOrder);
      toast.success('Delivery status updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update delivery status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      [ORDER_STATUS.PENDING]: { color: 'bg-amber-100 text-amber-700', label: 'Pending' },
      [ORDER_STATUS.PAID]: { color: 'bg-blue-100 text-blue-700', label: 'Paid' },
      [ORDER_STATUS.DELIVERY_PENDING]: { color: 'bg-purple-100 text-purple-700', label: 'Delivery Pending' },
      [ORDER_STATUS.DELIVERY_PROCESS]: { color: 'bg-indigo-100 text-indigo-700', label: 'On Process' },
      [ORDER_STATUS.COMPLETED]: { color: 'bg-green-100 text-green-700', label: 'Completed' },
      [ORDER_STATUS.CANCELLED]: { color: 'bg-red-100 text-red-700', label: 'Cancelled' }
    };

    const config = statusConfig[status] || statusConfig[ORDER_STATUS.PENDING];
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getPaymentMethodBadge = (method) => {
    if (!method) return <span className="text-neutral-500">-</span>;
    
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
        {paymentService.getPaymentMethodName(method)}
      </span>
    );
  };

  const renderUserData = () => {
    const { userData, productType } = order;

    if (productType === PRODUCT_TYPE.CORPORATE) {
      return (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Building className="w-5 h-5 text-neutral-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-700">Company Name</p>
              <p className="text-neutral-900">{userData.companyName}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-neutral-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-700">Business Email</p>
              <p className="text-neutral-900">{userData.businessEmail}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-neutral-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-700">Participants</p>
              <p className="text-neutral-900">{userData.participantCount} people</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-neutral-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-700">Mentoring Needs</p>
              <p className="text-neutral-900">{userData.mentoringNeeds}</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-neutral-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-700">Name</p>
            <p className="text-neutral-900">{userData.name}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-neutral-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-700">Email</p>
            <p className="text-neutral-900">{userData.email}</p>
          </div>
        </div>
        
        {userData.telegramUsername && (
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-neutral-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-700">Telegram Username</p>
              <p className="text-neutral-900">{userData.telegramUsername}</p>
            </div>
          </div>
        )}
        
        {userData.whatsapp && (
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-neutral-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-700">WhatsApp</p>
              <p className="text-neutral-900">{userData.whatsapp}</p>
            </div>
          </div>
        )}
        
        {userData.mentoringTopic && (
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-neutral-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-700">Mentoring Topic</p>
              <p className="text-neutral-900">{userData.mentoringTopic}</p>
            </div>
          </div>
        )}
        
        {userData.schedulePreference && (
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-700">Schedule Preference</p>
              <p className="text-neutral-900 capitalize">{userData.schedulePreference}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900">Order Details</h2>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Order Info */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-neutral-50 rounded-lg p-4">
                <h3 className="font-semibold text-neutral-900 mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Order ID</span>
                    <span className="text-sm font-medium text-neutral-900">{order.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Product</span>
                    <span className="text-sm font-medium text-neutral-900">{order.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Amount</span>
                    <span className="text-sm font-medium text-neutral-900">
                      {paymentService.formatCurrency(order.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Status</span>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Payment Method</span>
                    {getPaymentMethodBadge(order.paymentMethod)}
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">Customer Information</h3>
                {renderUserData()}
              </div>

              {/* Timeline */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">Order Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-neutral-700">Order Created</p>
                      <p className="text-sm text-neutral-600">
                        {new Date(order.createdAt).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                  {order.paidAt && (
                    <div className="flex items-start gap-3">
                      <CreditCard className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-neutral-700">Payment Confirmed</p>
                        <p className="text-sm text-neutral-600">
                          {new Date(order.paidAt).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  )}
                  {order.deliveredAt && (
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-neutral-700">Delivered</p>
                        <p className="text-sm text-neutral-600">
                          {new Date(order.deliveredAt).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Delivery Management */}
            <div className="space-y-6">
              {/* Delivery Status */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">Delivery Management</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Delivery Status
                    </label>
                    <select
                      value={deliveryStatus}
                      onChange={(e) => setDeliveryStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="on_process">On Process</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Delivery Notes
                    </label>
                    <textarea
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="Add notes about delivery progress..."
                      rows={4}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <button
                    onClick={handleUpdateDelivery}
                    disabled={loading}
                    className="w-full bg-brand-600 text-white py-2 rounded-lg font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <RefreshCcw className="w-4 h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Update Delivery
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-left">
                    Send Email to Customer
                  </button>
                  <button className="w-full px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-left">
                    Resend Invoice
                  </button>
                  <button className="w-full px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-left">
                    Download Invoice
                  </button>
                </div>
              </div>

              {/* Delivery Instructions */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Delivery Instructions</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  {order.productType === PRODUCT_TYPE.COMMUNITY && (
                    <>
                      <p>• Send Telegram invite link to @{order.userData.telegramUsername}</p>
                      <p>• Welcome message and onboarding guide</p>
                      <p>• Add to community group and introduce</p>
                    </>
                  )}
                  {order.productType === PRODUCT_TYPE.PRIVATE_MENTORING && (
                    <>
                      <p>• Contact via WhatsApp: {order.userData.whatsapp}</p>
                      <p>• Schedule mentoring session based on preference</p>
                      <p>• Prepare custom learning path</p>
                    </>
                  )}
                  {order.productType === PRODUCT_TYPE.CORPORATE && (
                    <>
                      <p>• Contact business email: {order.userData.businessEmail}</p>
                      <p>• Schedule consultation call</p>
                      <p>• Prepare corporate training proposal</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderDetailModal;
