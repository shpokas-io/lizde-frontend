"use client";
import { useState } from "react";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({ isOpen, onClose }: DeleteAccountModalProps) {
  const { user, deleteAccount } = useAuth();
  const [confirmText, setConfirmText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (confirmText !== "IŠTRINTI") {
      toast.error("Prašome įvesti 'IŠTRINTI' patvirtinimui");
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await deleteAccount();
      
      if (!result.error) {
        onClose();
      }
    } catch (error) {
      toast.error("Nepavyko ištrinti paskyros");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] border border-red-500/20 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <FaExclamationTriangle className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-semibold text-red-400">Ištrinti paskyrą</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400 text-sm font-medium mb-2">
              ⚠️ Dėmesio! Šis veiksmas negrįžtamas.
            </p>
            <ul className="text-red-300 text-sm space-y-1 list-disc list-inside">
              <li>Jūsų paskyra bus visam laikui ištrinta</li>
              <li>Visi jūsų duomenys bus prarasti</li>
              <li>Kursų progresas bus ištrintas</li>
              <li>Šio veiksmo nebus galima atšaukti</li>
            </ul>
          </div>

          <div>
            <p className="text-gray-300 text-sm mb-2">
              Jūsų dabartinis el. paštas: <strong>{user?.email}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Įveskite <strong className="text-red-400">IŠTRINTI</strong> patvirtinimui:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-[#232323] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50"
                placeholder="Įveskite IŠTRINTI"
              />
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
                disabled={isLoading || confirmText !== "IŠTRINTI"}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Trinamas..." : "Ištrinti paskyrą"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 