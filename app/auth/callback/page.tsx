"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { handleOAuthCallback } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function AuthCallback() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const processCallback = async () => {
      try {
        const result = await handleOAuthCallback()
        
        if (result.success) {
          setStatus('success')
          setTimeout(() => {
            router.push('/profile')
          }, 1500)
        } else {
          setStatus('error')
          const msg = (result.error && (result.error as any).message) || String(result.error) || 'Authentication failed'
          setErrorMessage(msg)
          toast.error(msg)
        }
      } catch (error) {
        setStatus('error')
        const msg = (error as any)?.message || 'An unexpected error occurred'
        setErrorMessage(msg)
        toast.error(msg)
      }
    }

    processCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Completing authentication...</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600">Authentication successful! Redirecting...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-red-600 mb-4">{errorMessage}</p>
            <button
              onClick={() => router.push('/auth/register')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Return to Register
            </button>
          </>
        )}
      </div>
    </div>
  )
}