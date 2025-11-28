import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Hoş Geldiniz
        </h1>
        <div className="flex gap-4 justify-center">
          <Link
            href="/signin"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg"
          >
            Giriş Yap
          </Link>
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all shadow-lg"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  )
}

