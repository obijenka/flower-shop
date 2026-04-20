export default function LoginForm({
  loginError,
  setLoginError,
  loginEmail,
  loginPassword,
  setLoginEmail,
  setLoginPassword,
  loginMutation,
  onLoginSuccess,
  onRequireVerification,
  onGoogleLogin,
  onSwitchToRegister
}) {
  const isPending = loginMutation?.isPending

  const handleSubmit = (e) => {
    e.preventDefault()

    setLoginError?.('')

    loginMutation.mutate(
      { email: loginEmail, password: loginPassword },
      {
        onSuccess: () => {
          onLoginSuccess?.()
        },
        onError: (error) => {
          if (error?.code === 'EMAIL_NOT_VERIFIED') {
            const nextEmail = error?.email || loginEmail
            onRequireVerification?.(nextEmail)
            return
          }

          setLoginError?.(error?.message || 'Ошибка входа')
        }
      }
    )
  }

  return (
    <>
      {loginError ? (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{loginError}</div>
      ) : null}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-custom-purple"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-custom-purple"
            required
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-custom-purple text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? 'Вход...' : 'Войти'}
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
        onClick={onGoogleLogin}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
      >
        <span className="text-xl">🟦</span>
        <span>Войти через Google</span>
      </button>

      <p className="text-center text-sm text-gray-600 mt-6">
        Нет аккаунта?{' '}
        <button type="button" onClick={onSwitchToRegister} className="text-custom-purple hover:underline">
          Зарегистрироваться
        </button>
      </p>
    </>
  )
}
