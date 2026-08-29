"use client";

import { useActionState } from "react";
import { loginAdminAction, type ActionResult } from "../actions";

const initialState: ActionResult = {};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAdminAction,
    initialState
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-12">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-semibold rounded-full uppercase tracking-wider">
            Yolfin Group CMS
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Admin Authentication
          </h1>
          <p className="text-slate-400 text-sm">
            Sign in to access the administrator management panel.
          </p>
        </div>

        {state?.error && (
          <div className="p-3.5 bg-red-950/80 border border-red-800 rounded-lg text-red-300 text-xs font-medium space-y-1">
            <p className="font-semibold text-red-200">Authentication Error</p>
            <p>{state.error}</p>
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5"
            >
              Admin Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue="yolfingroup@gmail.com"
              placeholder="yolfingroup@gmail.com"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-sm transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Authenticating...
              </span>
            ) : (
              "Sign In to Admin Panel"
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500">
          Single-Admin Identity Protection Active (yolfingroup@gmail.com)
        </div>
      </div>
    </div>
  );
}
