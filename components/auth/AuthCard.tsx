import React from 'react'

interface AuthCardProps {
  title: string
  subtitle: string
  children: React.ReactNode
  gradientFrom?: string
  gradientVia?: string
  gradientTo?: string
}

export default function AuthCard({
  title,
  subtitle,
  children,
  gradientFrom = 'from-blue-50',
  gradientVia = 'via-white',
  gradientTo = 'to-purple-50',
}: AuthCardProps) {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${gradientFrom} ${gradientVia} ${gradientTo} dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4`}
    >
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}

