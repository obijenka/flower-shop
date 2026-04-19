import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineX } from 'react-icons/hi'
import { setUser } from '../../store/slices/userSlice'
import { sendVerificationCode, verifyEmailCode } from '../../api/verification'
import { saveAuthData } from '../../utils/authStorage'
import {
  clearPendingVerificationEmail,
  getPendingVerificationEmail,
  setPendingVerificationEmail
} from './verificationFlow'

export default function VerifyCodeModal() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const inputsRef = useRef([])
  const didAutoSendRef = useRef(false)

  useEffect(() => {
    const emailFromState = location?.state?.email

    if (emailFromState) {
      setEmail(emailFromState)
      setPendingVerificationEmail(emailFromState)
      return
    }

    const stored = getPendingVerificationEmail()
    if (stored) setEmail(stored)
  }, [location?.state?.email])

  useEffect(() => {
    if (!email) return
    if (didAutoSendRef.current) return

    didAutoSendRef.current = true
    sendCode()
  }, [email])

  useEffect(() => {
    inputsRef.current?.[0]?.focus?.()
  }, [])

  const code = useMemo(() => digits.join(''), [digits])
  const isCodeComplete = useMemo(() => digits.every((d) => /^[0-9]$/.test(d)), [digits])

  const sendCode = async () => {
    setError('')
    setStatus('')
    setLoading(true)

    try {
      await sendVerificationCode(email)
      setStatus('Код отправлен на почту')
    } catch (e) {
      setError(e?.message || 'Ошибка')
    } finally {
      setLoading(false)
    }
  }

  const verifyCode = async () => {
    setError('')
    setStatus('')
    setLoading(true)

    try {
      const data = await verifyEmailCode({ email, code })
      setStatus('Почта подтверждена')

      if (data?.token && data?.user) {
        saveAuthData(data.token, data.user)
        clearPendingVerificationEmail()
        dispatch(setUser({ user: data.user, token: data.token }))
        navigate('/')
      }
    } catch (e) {
      setError(e?.message || 'Ошибка')
    } finally {
      setLoading(false)
    }
  }

  const setDigitAt = (idx, value) => {
    setDigits((prev) => {
      const next = [...prev]
      next[idx] = value
      return next
    })
  }

  const onChangeDigit = (idx, raw) => {
    const value = String(raw)

    if (!value) {
      setDigitAt(idx, '')
      return
    }

    const onlyDigits = value.replace(/\D/g, '')

    if (!onlyDigits) return

    if (onlyDigits.length === 1) {
      setDigitAt(idx, onlyDigits)
      inputsRef.current?.[idx + 1]?.focus?.()
      return
    }

    const spread = onlyDigits.slice(0, 6 - idx).split('')
    setDigits((prev) => {
      const next = [...prev]
      for (let i = 0; i < spread.length; i++) {
        next[idx + i] = spread[i]
      }
      return next
    })

    const nextIndex = Math.min(idx + spread.length, 5)
    inputsRef.current?.[nextIndex]?.focus?.()
  }

  const onKeyDownDigit = (idx, e) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputsRef.current?.[idx - 1]?.focus?.()
    }
  }

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50" onClick={() => navigate('/')} />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div className="font-bold text-custom-dark">Подтверждение почты</div>
            <button
              type="button"
              onClick={() => navigate('/')}
              aria-label="Закрыть"
              className="p-2"
            >
              <HiOutlineX size={20} />
            </button>
          </div>

          <div className="px-6 py-6">
            <p className="text-sm text-gray-600">
              Код приходит на твою почту после регистрации. Если письма нет — отправь код ещё раз.
            </p>

            {email ? (
              <div className="mt-3 text-sm text-gray-600">
                Почта для подтверждения:{' '}
                <span className="font-medium text-custom-dark">{email}</span>
              </div>
            ) : (
              <div className="mt-3 rounded-lg bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
                Не удалось определить email. Вернись на регистрацию и попробуй ещё раз.
              </div>
            )}

            {error ? (
              <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            ) : null}

            {status ? (
              <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{status}</div>
            ) : null}

            <div className="mt-6 space-y-4">
              <button
                type="button"
                onClick={sendCode}
                disabled={loading || !email}
                className="w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-50 disabled:opacity-50"
              >
                {loading ? 'Отправка...' : 'Отправить код'}
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Код</label>
                <div className="flex items-center justify-between gap-2">
                  {digits.map((d, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        inputsRef.current[idx] = el
                      }}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={1}
                      value={d}
                      onChange={(e) => onChangeDigit(idx, e.target.value)}
                      onKeyDown={(e) => onKeyDownDigit(idx, e)}
                      className="h-12 w-12 rounded-xl border border-gray-300 text-center text-xl font-semibold tracking-widest focus:outline-none focus:border-custom-purple"
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={verifyCode}
                disabled={loading || !email || !isCodeComplete}
                className="w-full bg-custom-purple text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Проверка...' : 'Подтвердить'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
