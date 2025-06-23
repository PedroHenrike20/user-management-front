const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4">
        Bem-vindo à People's Consultoria
      </h1>
      <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
        Esta é a página inicial do sistema de gestão de consultoria.
      </p>
      <p className="text-xs sm:text-sm text-gray-500">
        Use o menu para navegar pelas funcionalidades do sistema.
      </p>
    </div>
  );
};
export default Home;
