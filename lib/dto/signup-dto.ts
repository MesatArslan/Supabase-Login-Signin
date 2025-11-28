/**
 * Signup ile ilgili Data Transfer Object (DTO) tanımlamaları
 * Backend'e gönderilen veri yapılarını temsil eder
 */

/**
 * OTP gönderme için kullanılan DTO
 */
export interface SendOtpDto {
  email: string
}

/**
 * OTP doğrulama ve kayıt için kullanılan DTO
 */
export interface VerifyOtpDto {
  email: string
  token: string // OTP kodu
  type: 'email' | 'email_change' // Email OTP için geçerli tipler
}

/**
 * Şifre güncelleme için kullanılan DTO
 */
export interface UpdatePasswordDto {
  password: string
}

