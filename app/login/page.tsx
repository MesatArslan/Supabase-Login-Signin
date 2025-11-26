import AuthCard from '@/components/auth/AuthCard'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <AuthCard
      title="Hoş Geldiniz"
      subtitle="Hesabınıza giriş yapın"
      gradientFrom="from-blue-50"
      gradientVia="via-white"
      gradientTo="to-purple-50"
    >
      <LoginForm />
    </AuthCard>
  )
}
