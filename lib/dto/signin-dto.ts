/**
 * Sign in ile ilgili Data Transfer Object (DTO) tanımlamaları
 * Backend'e gönderilen veri yapılarını temsil eder
 */

/**
 * Sign in için kullanılan DTO
 */
export interface SignInDto {
  email: string
  password: string
}

/**
 * OTP doğrulama için kullanılan DTO (sign in için)
 */
export interface VerifyOtpSignInDto {
  email: string
  token: string // OTP kodu
  type: 'email' | 'email_change' // Email OTP için geçerli tipler
}

