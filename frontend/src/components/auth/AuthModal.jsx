import { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { useRegister, useLogin } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { setPendingVerificationEmail } from "./verificationFlow";
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

function getBackendAuthGoogleUrl() {
  const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
  const normalized = String(base).replace(/\/+$/, '')
  return `${normalized}/auth/google`
}

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
    window.location.href = getBackendAuthGoogleUrl();
  };

  const openVerification = (email) => {
    setPendingVerificationEmail(email)
    onClose()
    navigate('/verify', { state: { email } })
  }

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
              <LoginForm
                loginError={loginError}
                setLoginError={setLoginError}
                loginEmail={loginEmail}
                loginPassword={loginPassword}
                setLoginEmail={setLoginEmail}
                setLoginPassword={setLoginPassword}
                loginMutation={loginMutation}
                onLoginSuccess={() => onClose()}
                onRequireVerification={(email) => openVerification(email)}
                onGoogleLogin={handleGoogleLogin}
                onSwitchToRegister={() => {
                  setLoginError("");
                  setRegisterError("");
                  setMode("register");
                }}
              />
            ) : (
              <RegisterForm
                registerError={registerError}
                setRegisterError={setRegisterError}
                regEmail={regEmail}
                regName={regName}
                regPassword={regPassword}
                regConfirmPassword={regConfirmPassword}
                setRegEmail={setRegEmail}
                setRegName={setRegName}
                setRegPassword={setRegPassword}
                setRegConfirmPassword={setRegConfirmPassword}
                registerMutation={registerMutation}
                onRegisterSuccess={(email) => openVerification(email)}
                onRequireVerification={(email) => openVerification(email)}
                onGoogleLogin={handleGoogleLogin}
                onSwitchToLogin={() => {
                  setLoginError("");
                  setRegisterError("");
                  setMode("login");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}