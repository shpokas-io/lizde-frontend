"use client";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangeEmailModal({ isOpen, onClose }: ChangeEmailModalProps) {
  const { user, updateEmail } = useAuth();
  const [newEmail, setNewEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEmail || newEmail === user?.email) {
      toast.error("Prašome įvesti naują el. pašto adresą");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await updateEmail(newEmail);
      
      if (!result.error) {
        setNewEmail("");
        onClose();
      }
    } catch (error) {
      toast.error("Nepavyko pakeisti el. pašto");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 min-h-screen">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-gray-200">Keisti el. paštą</h2>
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
              Dabartinis el. paštas
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Naujas el. paštas
            </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-[#232323] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50"
              placeholder="Įveskite naują el. pašto adresą"
            />
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <p className="text-orange-400 text-sm">
              <strong>Pastaba:</strong> Po el. pašto keitimo gausite patvirtinimo laišką nauju adresu. 
              Jums reikės patvirtinti pakeitimą paspaudus nuorodą laiške.
            </p>
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
              disabled={isLoading || !newEmail || newEmail === user?.email}
              className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Keičiama..." : "Keisti el. paštą"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 