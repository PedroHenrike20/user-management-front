import { Trash } from "lucide-react";
import type { UserDto } from "../../types/User";
import { Modal, type ModalType } from "../../components/Modal";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { getAllUsers } from "../../services/userService";
import { Delete } from "./Delete";

export const TableData = () => {
  const [userSelected, setUserSelected] = useState<UserDto | null>(null);
  const [typeModalOpen, setTypeModalOpen] = useState<ModalType>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const [users, setUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      const filteredUsers = response.filter((u: UserDto) => u.id !== user?.id);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
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
          {users.map((rowUser, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-3">{rowUser.name}</td>
              <td className="px-4 py-3">{rowUser.email}</td>
              <td className="px-4 py-3">
                {rowUser.role === "admin" ? "Administrador" : "Usuário comum"}
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
          ))}
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
