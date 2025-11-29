'use client'

import { Eye, EyeOff } from "lucide-react"
import React, { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm, Controller } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation"

import { handleGoogleLogin, handleRegisterWithPassword } from "@/lib/supabase"

type Inputs = {
  firstName: string
  lastName: string
  email: string
  password: string
  gender: string
}

export default function Register() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loadingGoogleInvite, setLoadingGoogleInvite] = useState(false)
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    try {
      const { data, error } = await handleRegisterWithPassword(inputs)
      
      if (error) {
        toast.error(error.message || "error")
      } else {
        toast.success("Welcome!")
        router.push("/")
      }
    } catch (error) {
      toast.error("Registration failed")
    }
  }

  const onGoogleSubmit = () => {
    setLoadingGoogleInvite(true)
    
    handleGoogleLogin((result) => {
      setLoadingGoogleInvite(false)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm">
        {/* Welcome Text */}
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-2">
          Register
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Please enter your details to register.
        </p>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          <button
            onClick={onGoogleSubmit}
            disabled={loadingGoogleInvite}
            className="h-12 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors disabled:opacity-50">
            {loadingGoogleInvite ? (
              <div className="w-5 h-5 border-2 rounded-full animate-spin"></div>
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

        <div>
          {/* First Name and Last Name Row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                First Name
              </label>
              <input
                type="text"
                placeholder="First name"
                className="w-full h-12 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("firstName", {
                  required: "First name is required"
                })}
              />
              {errors.firstName && (
                <p role="alert" className="text-red-600 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last name"
                className="w-full h-12 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("lastName", {
                  required: "Last name is required"
                })}
              />
              {errors.lastName && (
                <p role="alert" className="text-red-600 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary mb-2">
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

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary mb-2">
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

          {/* Gender Select */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary mb-2">
              Gender
            </label>
            {/* <Select
              {...register("gender", {
                required: "Please select a gender"
              })}
              >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select> */}
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Please select a gender" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
        <SelectGroup>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="other">Other</SelectItem>
          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )}
/>
            {errors.gender && (
              <p role="alert" className="text-red-600 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full h-12 bg-secondary cursor-pointer text-white rounded-lg mb-4 disabled:opacity-50 font-medium transition-all">
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            ) : (
              "Register"
            )}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="font-semibold text-secondary hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}