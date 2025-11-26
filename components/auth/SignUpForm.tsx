'use client'

import { useState } from 'react'
import Link from 'next/link'
import Input from '../ui/Input'
import Button from '../ui/Button'
import GoogleButton from './GoogleButton'

export default function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Password validation
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır')
      setLoading(false)
      return
    }

    // TODO: Supabase signup işlemi buraya eklenecek
    console.log('Signup:', { email, password })

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleGoogleSignUp = () => {
    // TODO: Google OAuth işlemi buraya eklenecek
    console.log('Google signup')
  }

  return (
    <>
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="email"
          type="email"
          label="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ornek@email.com"
          required
        />

        <Input
          id="password"
          type="password"
          label="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="En az 6 karakter"
          required
          minLength={6}
        />

        <Input
          id="confirmPassword"
          type="password"
          label="Şifre Tekrar"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Şifrenizi tekrar girin"
          required
          minLength={6}
        />

        {/* Terms Checkbox */}
        <div className="flex items-start">
          <input
            id="terms"
            type="checkbox"
            required
            className="mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
          />
          <label
            htmlFor="terms"
            className="ml-2 text-sm text-gray-600 dark:text-gray-400"
          >
            <Link
              href="/terms"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
            >
              Kullanım şartlarını
            </Link>{' '}
            ve{' '}
            <Link
              href="/privacy"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
            >
              gizlilik politikasını
            </Link>{' '}
            kabul ediyorum
          </label>
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="secondary" loading={loading}>
          {loading ? 'Kayıt oluşturuluyor...' : 'Kayıt Ol'}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        <span className="px-4 text-sm text-gray-500 dark:text-gray-400">veya</span>
        <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      {/* Google Sign Up Button */}
      <GoogleButton onClick={handleGoogleSignUp} text="Google ile Kayıt Ol" />

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Zaten hesabınız var mı?{' '}
          <Link
            href="/login"
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-semibold"
          >
            Giriş Yap
          </Link>
        </p>
      </div>
    </>
  )
}

