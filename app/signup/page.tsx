import AuthCard from '@/components/auth/AuthCard'
import SignUpForm from '@/components/auth/SignUpForm'

export default function SignUpPage() {
  return (
    <AuthCard
      title="Hesap Oluştur"
      subtitle="Yeni hesabınızı oluşturun"
      gradientFrom="from-purple-50"
      gradientVia="via-white"
      gradientTo="to-blue-50"
    >
      <SignUpForm />
    </AuthCard>
  )
}
