import { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { useRegister, useLogin } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { setPendingVerificationEmail } from "./verificationFlow";

export default function AuthModal({ isOpen, onClose, defaultMode = "login" }) {
  const [mode, setMode] = useState(defaultMode);

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [regEmail, setRegEmail] = useState("");
  const [regName, setRegName] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  const registerMutation = useRegister();
  const loginMutation = useLogin();

  useEffect(() => {
    if (!isOpen) return;
    setMode(defaultMode);
    setLoginError("");
    setRegisterError("");
  }, [defaultMode, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    setLoginError("");
    
    loginMutation.mutate(
      { email: loginEmail, password: loginPassword },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          if (error?.code === 'EMAIL_NOT_VERIFIED') {
            const nextEmail = error?.email || loginEmail;
            setPendingVerificationEmail(nextEmail);
            onClose();
            navigate('/verify', { state: { email: nextEmail } });
            return;
          }
          setLoginError(error?.message || "Ошибка входа");
        }
      }
    );
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    setRegisterError("");
    
    if (regPassword !== regConfirmPassword) {
      setRegisterError("Пароли не совпадают");
      return;
    }

    registerMutation.mutate(
      { email: regEmail, name: regName, password: regPassword },
      {
        onSuccess: () => {
          setPendingVerificationEmail(regEmail);
          onClose();
          navigate("/verify", { state: { email: regEmail } });
        },
        onError: (error) => {
          if (error?.code === 'EMAIL_NOT_VERIFIED') {
            const nextEmail = error?.email || regEmail;
            setPendingVerificationEmail(nextEmail);
            onClose();
            navigate('/verify', { state: { email: nextEmail } });
            return;
          }
          setRegisterError(error?.message || "Ошибка регистрации");
        }
      }
    );
  };

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div className="font-bold text-custom-dark">
              {mode === "login" ? "Вход в FlowerShop" : "Регистрация"}
            </div>
            <button type="button" onClick={onClose} aria-label="Закрыть" className="p-2">
              <HiOutlineX size={20} />
            </button>
          </div>

          <div className="px-6 py-6">
            {mode === "login" ? (
              <>
                {loginError ? (
                  <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    {loginError}
                  </div>
                ) : null}
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-custom-purple"
                      required
                      disabled={loginMutation.isPending}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Пароль
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-custom-purple"
                      required
                      disabled={loginMutation.isPending}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full bg-custom-purple text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
                  >
                    {loginMutation.isPending ? "Вход..." : "Войти"}
                  </button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">или</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
                >
                  <span className="text-xl">🟦</span>
                  <span>Войти через Google</span>
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                  Нет аккаунта?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setLoginError("");
                      setRegisterError("");
                      setMode("register");
                    }}
                    className="text-custom-purple hover:underline"
                  >
                    Зарегистрироваться
                  </button>
                </p>
              </>
            ) : (
              <>
                {registerError ? (
                  <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    {registerError}
                  </div>
                ) : null}
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Имя
                    </label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-custom-purple"
                      disabled={registerMutation.isPending}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-custom-purple"
                      required
                      disabled={registerMutation.isPending}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Пароль
                    </label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-custom-purple"
                      required
                      disabled={registerMutation.isPending}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Подтвердите пароль
                    </label>
                    <input
                      type="password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-custom-purple"
                      required
                      disabled={registerMutation.isPending}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="w-full bg-custom-purple text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
                  >
                    {registerMutation.isPending ? "Регистрация..." : "Зарегистрироваться"}
                  </button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">или</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
                >
                  <span className="text-xl">🟦</span>
                  <span>Зарегистрироваться через Google</span>
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                  Уже есть аккаунт?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setLoginError("");
                      setRegisterError("");
                      setMode("login");
                    }}
                    className="text-custom-purple hover:underline"
                  >
                    Войти
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}