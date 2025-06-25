import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "react-redux";
import api from "./services/api";
import App from "./App";
import { setupInterceptors } from "./services/interceptors";

const InterceptorWrapper = () => {
  const navigate = useNavigate();
  const store = useStore();

  useEffect(() => {
    setupInterceptors(api, store, navigate);
  }, [navigate, store]);

  return <App />;
};

export default InterceptorWrapper;
