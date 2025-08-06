"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { use, useEffect } from "react";

export default function SignInPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  console.log(
    "User:",
    user,
    "Is Signed In:",
    isSignedIn,
    "Is Loaded:",
    isLoaded
  );
  useEffect(() => {
    const role = user?.publicMetadata?.role;
    if (isSignedIn && isLoaded && role) {
      router.push(`/${role}`);
    }
  }, [user]);
  return (
    <div className="h-screen flex items-center justify-center bg-[#EDF9FD]">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="" width={24} height={24} />
            SchooLama
          </h1>
          <h2 className="text-gray-400 text-md mb-3">
            Sign in to your account
          </h2>
          <Clerk.GlobalError className="text-sm text-red-400" />
          <Clerk.Field name="identifier" className="flex flex-col gap-2 mb-3">
            <Clerk.Label className="text-xs text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
          <Clerk.Connection
            name="google"
            className="flex items-center justify-center gap-3 p-3 mb-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 cursor-pointer min-w-[300px] mx-auto"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </Clerk.Connection>
          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] mt-3 cursor-pointer"
          >
            Sign In
          </SignIn.Action>
          <div className="text-center mt-2">
            <SignIn.Action
              navigate="forgot-password"
              className="text-blue-500 text-sm hover:underline cursor-pointer"
            >
              Forgot your password?
            </SignIn.Action>
          </div>
        </SignIn.Step>
        <SignIn.Step
          name="forgot-password"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
        >
          <h2 className="text-lg font-semibold mb-4">Reset your password</h2>
          <Clerk.Field name="identifier">
            <Clerk.Label className="text-xs text-gray-500">
              Email address
            </Clerk.Label>
            <Clerk.Input
              type="email"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="bg-blue-500 text-white rounded-md text-sm p-[10px] mt-3 cursor-pointer"
          >
            Send reset email
          </SignIn.Action>
          <SignIn.Action
            navigate="start"
            className="text-center text-blue-500 text-sm hover:underline cursor-pointer mt-2"
          >
            Back to sign in
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}
