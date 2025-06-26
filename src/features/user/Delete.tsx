import { toast } from "react-toastify";
import { deleteUser } from "../../services/userService";
import type { UserDto } from "../../types/User";
import LoadingButton from "../../components/LoadingButton";
import { useState } from "react";

type DeleteProps = {
  user: UserDto;
  close: () => void;
};

export const Delete = ({ user, close }: DeleteProps) => {
  const [loading, setLoading] = useState(false);
  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      await deleteUser(user.id);
      toast.success("Usuário removido com sucesso!");
      close();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao excluir usuário"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <p className="mb-4">
        Deseja confirmar a exclusão do usuário <strong>{user?.name}</strong>?
      </p>

      <LoadingButton
        className="bg-red-600 hover:bg-red-700 text-white"
        loading={loading}
        onClick={handleDeleteUser}
      >
        Confirmar
      </LoadingButton>
    </div>
  );
};
