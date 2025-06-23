import { TableData } from "../features/user/TableData";

const Dashboard = () => {
  return (
    <div className="px-4 py-10 sm:px-8 lg:px-16 xl:px-32 min-h-screen ">
      <h1 className="text-2xl sm:text-3xl font-bold mt-20">Usuários</h1>
      <div className="overflow-x-auto">
        <TableData />
      </div>
    </div>
  );
};

export default Dashboard;
