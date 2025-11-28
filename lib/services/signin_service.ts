import { createClient } from '@/lib/supabase/client'
import { SignInDto, VerifyOtpSignInDto } from '@/lib/dto/signin-dto'

export interface SignInResponse {
  success: boolean
  error?: string
}

export interface VerifyOtpSignInResponse {
  success: boolean
  error?: string
  user?: any
}

/**
 * Sign in servisi - Email ve password ile kullanıcı kontrolü yapar ve OTP gönderir
 * @param signInDto - Sign in için gerekli veriler
 * @returns Sign in sonucu
 */
export async function signInAndSendOtp(signInDto: SignInDto): Promise<SignInResponse> {
  try {
    const supabase = createClient()

    // Önce email ve password ile giriş yapmayı dene (kullanıcının var olup olmadığını kontrol et)
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: signInDto.email,
      password: signInDto.password,
    })

    if (signInError) {
      return {
        success: false,
        error: signInError.message || 'Kullanıcı bulunamadı veya şifre hatalı',
      }
    }

    // Kullanıcı var ve şifre doğru, oturumu kapat ve OTP gönder
    await supabase.auth.signOut()

    // OTP gönder
    const { data: otpData, error: otpError } = await supabase.auth.signInWithOtp({
      email: signInDto.email,
      options: {
        shouldCreateUser: false, // Kullanıcı zaten var, oluşturma
      },
    })

    if (otpError) {
      return {
        success: false,
        error: otpError.message || 'OTP gönderilemedi',
      }
    }

    return {
      success: true,
    }
  } catch (err) {
    console.error('Sign in hatası:', err)
    return {
      success: false,
      error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    }
  }
}

/**
 * OTP doğrulama ve sign in servisi
 * @param verifyOtpDto - OTP doğrulama için gerekli veriler
 * @returns OTP doğrulama ve sign in sonucu
 */
export async function verifyOtpAndSignIn(
  verifyOtpDto: VerifyOtpSignInDto
): Promise<VerifyOtpSignInResponse> {
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

    if (verifyData.user) {
      return {
        success: true,
        user: verifyData.user,
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

