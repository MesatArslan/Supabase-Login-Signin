'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { verifyOtpAndSignIn } from '@/lib/services/signin_service'
import { VerifyOtpSignInDto } from '@/lib/dto/signin-dto'

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(emailParam)
    } else {
      // Email yoksa sign in sayfasına yönlendir
      router.push('/signin')
    }
  }, [searchParams, router])

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!otp || otp.length !== 6) {
      setError('Lütfen 6 haneli OTP kodunu girin')
      return
    }

    if (!email) {
      setError('E-posta adresi bulunamadı')
      return
    }

    setLoading(true)

    const verifyOtpDto: VerifyOtpSignInDto = {
      email,
      token: otp,
      type: 'email',
    }

    const result = await verifyOtpAndSignIn(verifyOtpDto)

    if (!result.success) {
      setError(result.error || 'OTP doğrulanamadı')
      setLoading(false)
      return
    }

    // Başarılı!
    setSuccess(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              OTP Doğrulama
            </h1>
            <p className="text-gray-600">
              E-posta adresinize gönderilen OTP kodunu girin
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
                Giriş başarılı! Yönlendiriliyorsunuz...
              </p>
            </div>
          )}

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
                disabled={loading || success}
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Doğrulanıyor...' : 'OTP Doğrula ve Giriş Yap'}
            </button>

            <button
              type="button"
              onClick={() => router.push('/signin')}
              className="w-full text-gray-600 py-2 text-sm hover:text-gray-800 transition-all"
              disabled={loading || success}
            >
              Geri Dön
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

