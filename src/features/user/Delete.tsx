import { deleteUser } from "../../services/userService";
import type { UserDto } from "../../types/User";

type DeleteProps = {
  user: UserDto;
  close: () => void;
};

export const Delete = ({ user, close }: DeleteProps) => {
  const handleDeleteUser = async () => {
    try {
      await deleteUser(user.id);
      alert("Usuário removido com sucesso!");
      close();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao deletar usuário");
    }
  };

  return (
    <div className="p-4">
      <p className="mb-4">
        Tem certeza que deseja excluir o usuário <strong>{user?.name}</strong>?
      </p>
      <button
        onClick={handleDeleteUser}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
      >
        Confirmar exclusão
      </button>
    </div>
  );
};
