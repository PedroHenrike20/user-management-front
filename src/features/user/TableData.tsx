import { Trash } from "lucide-react";
import type { UserDto } from "../../types/User";
import { Modal, type ModalType } from "../../components/Modal";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { getAllUsers } from "../../services/userService";
import { Delete } from "./Delete";
import { toast } from "react-toastify";

export const TableData = () => {
  const [userSelected, setUserSelected] = useState<UserDto | null>(null);
  const [typeModalOpen, setTypeModalOpen] = useState<ModalType>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      const filteredUsers = response.filter((u: UserDto) => u.id !== user?.id);
      setUsers(filteredUsers);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao carregar usuários"
      );
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type: ModalType, userSelected: UserDto) => {
    setTypeModalOpen(type);
    setUserSelected(userSelected);
  };
  const closeModal = async () => {
    setTypeModalOpen(null);
    setUserSelected(null);
    await fetchUsers();
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-md">
        <thead>
          <tr className="bg-gray-50 text-left text-gray-700 text-sm">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Tipo usuario</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Ações</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {loading ? (
            <tr>
              <td colSpan={5} className="border-t px-4 py-6 text-center">
                <span role="status" className="inline-flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="size-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700"
                  />
                  Carregando registros...
                </span>
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={5} className="border-t px-4 py-6 text-center">
                Não há registros.
              </td>
            </tr>
          ) : (
            users.map((rowUser, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-3">{rowUser.name}</td>
                <td className="px-4 py-3">{rowUser.email}</td>
                <td className="px-4 py-3">
                  {rowUser.role === "admin"
                    ? "Administrador"
                    : "Usuário comum"}
                </td>
                <td className="px-4 py-3">
                  {rowUser.isEnable ? "Ativo" : "Inativo"}
                </td>
                <td className="px-4 py-3">
                  {rowUser.id !== user?.id && (
                    <button
                      onClick={() => openModal("delete", rowUser)}
                      className="cursor-pointer"
                    >
                      <Trash size={20} color="red" />
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Modal
        isOpen={typeModalOpen === "delete"}
        onClose={closeModal}
        title="Excluir usuário"
      >
        <Delete user={userSelected!} close={closeModal} />
      </Modal>
    </div>
  );
};
