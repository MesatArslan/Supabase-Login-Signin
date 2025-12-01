import { createClient } from '@/lib/supabase/client'
import { SendOtpDto, VerifyOtpDto, UpdatePasswordDto } from '@/lib/dto/signup-dto'

export interface SendOtpResponse {
  success: boolean
  error?: string
}

export interface VerifyOtpResponse {
  success: boolean
  error?: string
  user?: any
}

/**
 * OTP gönderme servisi
 * @param sendOtpDto - OTP gönderme için gerekli veriler
 * @returns OTP gönderme sonucu
 */
export async function sendOtp(sendOtpDto: SendOtpDto): Promise<SendOtpResponse> {
  try {
    const supabase = createClient()

    const { data, error: otpError } = await supabase.auth.signInWithOtp({
      email: sendOtpDto.email,
      options: {
        shouldCreateUser: true, // Kullanıcı yoksa oluştur
        // emailRedirectTo eklemezsek OTP gönderir, ekler isek magic link gönderir
      },
    })

    console.log('OTP Response:', { data, error: otpError })

    if (otpError) {
      return {
        success: false,
        error: otpError.message,
      }
    }

    console.log('OTP gönderildi, form açılıyor...')
    return {
      success: true,
    }
  } catch (err) {
    console.error('OTP gönderme hatası:', err)
    return {
      success: false,
      error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    }
  }
}

/**
 * OTP doğrulama ve şifre kaydetme servisi
 * @param verifyOtpDto - OTP doğrulama için gerekli veriler
 * @param updatePasswordDto - Şifre güncelleme için gerekli veriler
 * @returns OTP doğrulama ve kayıt sonucu
 */
export async function verifyOtpAndSignup(
  verifyOtpDto: VerifyOtpDto,
  updatePasswordDto: UpdatePasswordDto
): Promise<VerifyOtpResponse> {
  try {
    const supabase = createClient()

    // OTP'yi doğrula
    const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
      email: verifyOtpDto.email,
      token: verifyOtpDto.token,
      type: verifyOtpDto.type,
    })

    if (verifyError) {
      return {
        success: false,
        error: verifyError.message,
      }
    }

    // OTP doğrulandı, şimdi signUp ile kullanıcıyı kaydet
    if (verifyData.user) {
      const { data, error } = await supabase.auth.signUp({
        email: updatePasswordDto.email,
        password: updatePasswordDto.password,
        // DÜZELTME BURADA:
        options: {
          data: {
            full_name: updatePasswordDto.fullName,
            profession: updatePasswordDto.profession,
          }
        }
      })

      if (error) {
        return {
          success: false,
          error: error.message,
        }
      }

      return {
        success: true,
        user: data.user,
      }
    }

    return {
      success: false,
      error: 'Kullanıcı bilgisi alınamadı.',
    }
  } catch (err) {
    console.error('OTP doğrulama hatası:', err)
    return {
      success: false,
      error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    }
  }
}

