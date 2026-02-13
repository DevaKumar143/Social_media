import { loginUser, signupUser, logoutUser } from "../services/auth.service";
import { useAuthStore } from "../stores/auth.store";
import { setToken } from "../utils/token";

export const useAuth = () => {
  const { setAuth, logout } = useAuthStore();

  const login = async (formData) => {
    const res = await loginUser(formData);

    const token = res.data.token;
    const user = res.data.user;

    setToken(token);
    setAuth(user, token);
  };

  const signup = async (formData) => {
    const res = await signupUser(formData);

    const token = res.data.token;
    const user = res.data.user;

    setToken(token);
    setAuth(user, token);
  };

  const handleLogout = () => {
    logoutUser();
    logout();
  };

  return { login, signup, handleLogout };
};
