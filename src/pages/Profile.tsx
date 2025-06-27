import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Edit } from "lucide-react";
import { Modal } from "../components/Modal";
import UpdateForm from "../features/user/UpdateForm";
import { useState } from "react";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [showEditModal, setShowEditModal] = useState(false);

  const openModal = () => setShowEditModal(true);
  const closeModal = () => setShowEditModal(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <section>
          <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
            <h3 className="text-xl font-semibold">Meus dados</h3>
            <button
              className="inline-flex items-center gap-2 bg-transparent text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 px-3 py-1.5 rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 self-start sm:self-auto"
              onClick={openModal}
            >
              <Edit size={16} />
              Editar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Nome</p>
              <p className="text-base font-medium text-gray-900">
                {user?.name}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base font-medium text-gray-900">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Tipo de usuário
              </p>
              <p className="text-base font-medium text-gray-900">
                {user?.role === "admin" ? "Administrador" : "Usuário comum"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Data criação</p>
              <p className="text-base font-medium text-gray-900">
                {new Date(user!.createdAt).toLocaleString() || "Não informado!"}
              </p>
            </div>
          </div>
        </section>
      </div>

      <Modal isOpen={showEditModal} onClose={closeModal} title="Editar usuário">
        <UpdateForm user={user!} close={closeModal} />
      </Modal>
    </main>
  );
};
export default Profile;
