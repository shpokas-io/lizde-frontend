"use client";
import { useState } from "react";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { validatePassword } from "@/utils/password-validation";
import toast from "react-hot-toast";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const { updatePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const handlePasswordChange = (password: string) => {
    setNewPassword(password);
    const validation = validatePassword(password);
    setPasswordErrors(validation.errors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordErrors.length > 0) {
      toast.error("Prašome ištaisyti slaptažodžio klaidas");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Slaptažodžiai nesutampa");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await updatePassword(newPassword);
      
      if (!result.error) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordErrors([]);
        onClose();
      }
    } catch (error) {
      toast.error("Nepavyko pakeisti slaptažodžio");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-gray-200">Keisti slaptažodį</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Dabartinis slaptažodis
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-[#232323] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 pr-12"
                placeholder="Įveskite dabartinį slaptažodį"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Naujas slaptažodis
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-[#232323] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 pr-12"
                placeholder="Įveskite naują slaptažodį"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {passwordErrors.length > 0 && (
              <div className="mt-2 space-y-1">
                {passwordErrors.map((error, index) => (
                  <p key={index} className="text-red-400 text-sm">{error}</p>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Pakartokite naują slaptažodį
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-[#232323] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 pr-12"
                placeholder="Pakartokite naują slaptažodį"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {newPassword && confirmPassword && newPassword !== confirmPassword && (
              <p className="mt-2 text-red-400 text-sm">Slaptažodžiai nesutampa</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors disabled:opacity-50"
            >
              Atšaukti
            </button>
            <button
              type="submit"
              disabled={isLoading || passwordErrors.length > 0 || newPassword !== confirmPassword}
              className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Keičiama..." : "Keisti slaptažodį"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 