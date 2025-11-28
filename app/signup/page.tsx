'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendOtp, verifyOtpAndSignup } from '@/lib/services/signup_service'
import { SendOtpDto, VerifyOtpDto, UpdatePasswordDto } from '@/lib/dto/signup-dto'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  // OTP Gönderme - İlk form gönderildiğinde
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Validation
    if (!email || !password || !confirmPassword) {
      setError('Lütfen tüm alanları doldurun')
      return
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır')
      return
    }

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor')
      return
    }

    setLoading(true)

    const sendOtpDto: SendOtpDto = {
      email,
    }

    const result = await sendOtp(sendOtpDto)

    if (!result.success) {
      setError(result.error || 'OTP gönderilemedi')
      setLoading(false)
      return
    }

    // OTP gönderildi, formu göster
    setOtpSent(true)
    setShowOtpForm(true)
    setLoading(false)
  }

  // OTP Doğrulama ve Kayıt
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!otp || otp.length !== 6) {
      setError('Lütfen 6 haneli OTP kodunu girin')
      return
    }

    setOtpLoading(true)

    const verifyOtpDto: VerifyOtpDto = {
      email,
      token: otp,
      type: 'email',
    }

    const updatePasswordDto: UpdatePasswordDto = {
      password,
    }

    const result = await verifyOtpAndSignup(verifyOtpDto, updatePasswordDto)

    if (!result.success) {
      setError(result.error || 'OTP doğrulanamadı')
      setOtpLoading(false)
      return
    }

    // Başarılı!
    setSuccess(true)
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Hesap Oluştur
            </h1>
            <p className="text-gray-600">
              Yeni hesabınızı oluşturun ve başlayın
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">
                Kayıt başarılı! Yönlendiriliyorsunuz...
              </p>
            </div>
          )}


          {!showOtpForm ? (
            // İlk Form: Email, Şifre, Şifre Tekrar
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  E-posta Adresi
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Şifre
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="En az 6 karakter"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Şifre Tekrar
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Şifrenizi tekrar girin"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'OTP Gönderiliyor...' : 'OTP Gönder'}
              </button>
            </form>
          ) : (
            // OTP Doğrulama Formu
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm text-center">
                  <strong>{email}</strong> adresine gönderilen 6 haneli OTP kodunu girin
                </p>
              </div>

              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  OTP Kodu
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-center text-2xl font-mono tracking-widest"
                  required
                  disabled={otpLoading}
                />
              </div>

              <button
                type="submit"
                disabled={otpLoading || success}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {otpLoading ? 'Doğrulanıyor...' : 'OTP Doğrula ve Kayıt Ol'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowOtpForm(false)
                  setOtp('')
                  setOtpSent(false)
                }}
                className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-all"
                disabled={otpLoading}
              >
                Geri Dön
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Zaten hesabınız var mı?{' '}
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Giriş Yap
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

