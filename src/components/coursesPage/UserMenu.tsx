"use client";
import { useState, useRef, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaChevronDown, FaCog, FaKey, FaEnvelope, FaTrash } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import ChangePasswordModal from "./ChangePasswordModal";
import ChangeEmailModal from "./ChangeEmailModal";
import DeleteAccountModal from "./DeleteAccountModal";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user, signOut } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const handleMenuItemClick = (action: () => void) => {
    setIsOpen(false);
    action();
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#232323] hover:bg-[#2a2a2a] border border-gray-800 transition-colors"
        >
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <FaUser className="w-4 h-4 text-white" />
          </div>
          <span className="text-gray-200 text-sm">
            {user.email}
          </span>
          <FaChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-lg z-50">
            <div className="p-2">
              <div className="px-3 py-2 border-b border-gray-800 mb-2">
                <p className="text-xs text-gray-500">Prisijungęs kaip</p>
                <p className="text-sm text-gray-200">{user.email}</p>
              </div>
              
              <div className="space-y-1">
                <div className="px-3 py-1">
                  <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
                    <FaCog className="w-3 h-3" />
                    Paskyros nustatymai
                  </p>
                </div>
                
                <button
                  onClick={() => handleMenuItemClick(() => setShowPasswordModal(true))}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-200 hover:bg-[#232323] rounded-md transition-colors"
                >
                  <FaKey className="w-4 h-4" />
                  <span>Keisti slaptažodį</span>
                </button>
                
                <button
                  onClick={() => handleMenuItemClick(() => setShowEmailModal(true))}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-200 hover:bg-[#232323] rounded-md transition-colors"
                >
                  <FaEnvelope className="w-4 h-4" />
                  <span>Keisti el. paštą</span>
                </button>
                
                <div className="border-t border-gray-800 my-2"></div>
                
                <button
                  onClick={() => handleMenuItemClick(() => setShowDeleteModal(true))}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                >
                  <FaTrash className="w-4 h-4" />
                  <span>Ištrinti paskyrą</span>
                </button>
                
                <div className="border-t border-gray-800 my-2"></div>
                
                <button
                  onClick={() => handleMenuItemClick(signOut)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-200 hover:bg-[#232323] rounded-md transition-colors"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span>Atsijungti</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ChangePasswordModal 
        isOpen={showPasswordModal} 
        onClose={() => setShowPasswordModal(false)} 
      />
      <ChangeEmailModal 
        isOpen={showEmailModal} 
        onClose={() => setShowEmailModal(false)} 
      />
      <DeleteAccountModal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
      />
    </>
  );
} 