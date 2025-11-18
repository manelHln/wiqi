import { createClient } from "@supabase/supabase-js"

export type AuthResult = {
  success: boolean
  data?: any
  error?: any
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing env vars:', { supabaseUrl, supabaseKey });
  throw new Error('Supabase environment variables are not set');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

export const handleGoogleLogin = async (cb?: (result: AuthResult) => void) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (cb) {
      if (error) {
        cb({ success: false, error })
      } else {
        cb({ success: true, data })
      }
    }

    return { data, error }
  } catch (err: any) {
    if (cb) {
      cb({ success: false, error: err })
    }
    return { data: null, error: err }
  }
}

export const handleAppleLogin = async (cb?: (result: AuthResult) => void) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (cb) {
      if (error) {
        cb({ success: false, error })
      } else {
        cb({ success: true, data })
      }
    }

    return { data, error }
  } catch (err: any) {
    if (cb) {
      cb({ success: false, error: err })
    }
    return { data: null, error: err }
  }
}

export type PasswordLogin = {
  email: string
  password: string
}

export type PasswordRegister = {
  email: string
  password: string
  firstName?: string
  lastName?: string
  gender?: string
}

export const handleLoginWithPassword = async (inputs: PasswordLogin) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: inputs.email,
    password: inputs.password,
  })
  return { data, error }
}

export const handleRegisterWithPassword = async (inputs: PasswordRegister) => {
  const { data, error } = await supabase.auth.signUp({
    email: inputs.email,
    password: inputs.password,
    options: {
      data: {
        first_name: inputs.firstName,
        last_name: inputs.lastName,
        gender: inputs.gender
      }
    }
  })
  return { data, error }
}

export const isAuthenticated = async () => {
  const res = await supabase.auth.getSession()
  const session = res?.data?.session
  return !!session
}

export const getCurrentUser = async () => {
  const res = await supabase.auth.getUser()
  return res?.data?.user
}

export const signOut = async () => {
  await supabase.auth.signOut()
  // Clear any additional local storage if needed
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.removeItem('supabase.auth.token')
  }
}

// Helper function to handle OAuth callback
export type OAuthCallbackResult = {
  success: boolean
  data?: any
  error?: any
}

// Helper function to handle OAuth callback
export const handleOAuthCallback = async (): Promise<OAuthCallbackResult> => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error('OAuth callback error:', error)
    return { success: false, error }
  }

  if (data?.session) {
    return { success: true, data }
  }

  return { success: false, error: 'No session found' }
}