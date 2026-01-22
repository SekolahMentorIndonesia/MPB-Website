import { useState, useRef } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { User, Camera, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";
import UserGuard from "../../components/dashboard/UserGuard";

function ProfilePage() {
  const { user, logout, updateUser } = useAuthStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    title: user?.title || "",
    email: user?.email || "",
    phoneNumber: user?.phone_number || "",
    telegramUser: user?.telegram_user || ""
  });

  const handlePhotoUpload = async (file) => {
    if (!file) return;
    
    setIsEditing(true);
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append("photo", file);
      
      const token = useAuthStore.getState().token;
      const response = await fetch("http://localhost:5000/api/user/upload-photo", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        const photoUrl = `http://localhost:5000${result.photoUrl}`;
        
        updateUser({ ...user, photo_url: photoUrl });
        setSaveMessage("✅ Photo uploaded successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setSaveMessage("❌ Failed to upload photo");
      setTimeout(() => setSaveMessage(""), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handlePhotoUpload(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setSaveMessage("");
      
      const payload = {
        name: formData.name.trim(),
        title: formData.title.trim(),
        email: formData.email.trim(),
        phone_number: formData.phoneNumber.trim(),
        telegram_user: formData.telegramUser.trim()
      };
      
      const token = useAuthStore.getState().token;
      const response = await fetch("http://localhost:5000/api/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        const result = await response.json();
        updateUser(result);
        setSaveMessage("✅ Profile saved successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
        setIsEditing(false);
      } else {
        throw new Error("Save failed");
      }
    } catch (error) {
      console.error("Save error:", error);
      setSaveMessage("❌ Failed to save profile");
      setTimeout(() => setSaveMessage(""), 3000);
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      setFormData({
        name: user?.name || "",
        title: user?.title || "",
        email: user?.email || "",
        phoneNumber: user?.phone_number || "",
        telegramUser: user?.telegram_user || ""
      });
      setIsEditing(false);
      setSaveMessage("");
    } else {
      navigate("/sekolah-mentor-indonesia");
    }
  };

  return (
    <UserGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Profile Settings
                </h1>
                <p className="text-gray-600 text-lg">Manage your profile and personal information</p>
              </div>
              <div className="flex gap-3">
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={handleCancel}
                      className="px-6 py-3 bg-white border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Alert Message */}
          {saveMessage && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              saveMessage.includes("✅") 
                ? "bg-green-50 text-green-800 border border-green-200" 
                : "bg-red-50 text-red-800 border border-red-200"
            }`}>
              {saveMessage.includes("✅") ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="font-medium">{saveMessage}</span>
            </div>
          )}

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Personal Details */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Details</h2>
                
                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-900">
                        {user?.name || "Not set"}
                      </div>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+62 812-3456-7890"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-900">
                        {user?.phone_number || "Not set"}
                      </div>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-900">
                        {user?.email || "Not set"}
                      </div>
                    )}
                  </div>
                  
                  {/* Telegram Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telegram Username</label>
                    {isEditing ? (
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-3 py-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                          @
                        </span>
                        <input
                          type="text"
                          name="telegramUser"
                          value={formData.telegramUser}
                          onChange={handleInputChange}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="username"
                        />
                      </div>
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-100 rounded-xl text-gray-900">
                        {user?.telegram_user ? `@${user.telegram_user}` : "Not set"}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Profile Picture */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Picture</h2>
                
                <div className="space-y-6">
                  {/* Profile Image Display */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                        {user?.photo_url ? (
                          <img 
                            src={user.photo_url} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <User className="w-16 h-16 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      {/* Upload Button Overlay */}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-lg border-2 border-white"
                          title="Upload photo"
                        >
                          {isUploading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Camera className="w-5 h-5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Upload Button */}
                  {isEditing && (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {isUploading ? "Uploading..." : "Upload Photo"}
                      </button>
                      <p className="text-gray-400 text-xs mt-4">
                        Allowed formats: JPG, PNG, GIF (Max 5MB)
                      </p>
                    </div>
                  )}

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserGuard>
  );
}

export default ProfilePage;
