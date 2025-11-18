'use client'

import { Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { handleGoogleLogin, handleLoginWithPassword } from "@/lib/supabase"
import toast from 'react-hot-toast'

type Inputs = {
  email: string
  password: string
}

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [showPassword, setShowPassword] = useState(false)
  const [loadingGoogleInvite, setLoadingGoogleInvite] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    try {
      const { data, error } = await handleLoginWithPassword(inputs)
      
      if (error) {
        toast.error(error?.message || "error")
      } else {
        toast.success("Welcome back")
        onSuccess?.()
      }
    } catch (error) {
      toast.error("Registration failed")
    }
  }

  const onGoogleSubmit = () => {
    setLoadingGoogleInvite(true)
    
    handleGoogleLogin((result) => {
      if (result.success) {
        onSuccess?.()
      }
    })
  }

  return (
    <>
      <div>
        {/* Social Login Buttons */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          <button
            onClick={onGoogleSubmit}
            disabled={loadingGoogleInvite}
            className="h-12 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {loadingGoogleInvite ? (
              <div className="w-5 h-5 border-2 border-[#2cbab5] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-400">OR</span>
          </div>
        </div>

        {/* Form Fields */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              E-Mail Address
            </label>
            <input
              type="email"
              placeholder="Enter your email..."
              className="w-full h-12 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && (
              <p role="alert" className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                className="w-full h-12 px-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be 8+ chars, include uppercase, lowercase, number & special character"
                  }
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p role="alert" className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full h-12 bg-secondary text-white rounded-3xl mb-4 disabled:opacity-50 font-medium transition-all">
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/auth/register"
              className="font-semibold text-gray-900 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  )
}