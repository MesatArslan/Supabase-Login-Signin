import { PROFESSIONS } from '@/lib/constants/User'

/**
 * Signup ile ilgili Data Transfer Object (DTO) tanımlamaları
 * Backend'e gönderilen veri yapılarını temsil eder
 */

// Constant dosyasındaki değerlerden otomatik tip türetir.
// Çıktısı: 'dietitian' | 'pt' | 'psychologist' ... olur.
export type ProfessionType = typeof PROFESSIONS[keyof typeof PROFESSIONS]

/**
 * OTP gönderme için kullanılan DTO
 */
export interface SendOtpDto {
  email: string
  fullName: string
  profession: ProfessionType
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
 * Şifre güncelleme ve kullanıcı bilgileri için kullanılan DTO
 */
export interface UpdatePasswordDto {
  email: string
  password: string
  fullName: string
  profession: ProfessionType
}

/**
 * Kayıt Ol Formu DTO'su (Supabase'e gidecek ham veri)
 */
export interface RegisterDTO {
  email: string
  password: string
  fullName: string
  profession: ProfessionType // Burası artık sadece string değil, kısıtlı bir tip.
}

