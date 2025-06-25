import AppRoutes from "./routes/AppRoutes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <AppRoutes />
      </PersistGate>
    </>
  );
}

export default App;
