import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 2000);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-red-400/15 to-red-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-red-400/10 to-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-4 sm:left-10 w-3 sm:w-4 h-3 sm:h-4 bg-red-500 rounded-full animate-float opacity-60"></div>
                    <div className="absolute top-40 right-10 sm:right-20 w-4 sm:w-6 h-4 sm:h-6 bg-red-500 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-40 left-10 sm:left-20 w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute bottom-20 right-4 sm:right-10 w-3 sm:w-5 h-3 sm:h-5 bg-red-500 rounded-full animate-float opacity-30" style={{ animationDelay: '3s' }}></div>
                </div>

                {/* Back to Login Button */}
                <Link
                    to="/login"
                    className="absolute top-6 left-6 z-20 group inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
                    Back to Login
                </Link>

                {/* Success Message */}
                <div className="relative z-10 w-full max-w-md mx-auto px-6">
                    <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl p-8 shadow-2xl animate-fade-in-up text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>

                        <h2 className="text-3xl font-black bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent mb-4">
                            Check Your Email
                        </h2>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            We've sent a password reset link to <strong>{email}</strong>.
                            Please check your inbox and follow the instructions to reset your password.
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                            <p className="text-sm text-blue-800">
                                <strong>Didn't receive the email?</strong> Check your spam folder or try again in a few minutes.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={() => {
                                    setIsSubmitted(false);
                                    setEmail('');
                                }}
                                className="w-full py-3 px-4 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors duration-300"
                            >
                                Send Another Email
                            </button>

                            <Link
                                to="/login"
                                className="block w-full py-3 px-4 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors duration-300"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-red-400/15 to-red-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-red-400/10 to-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-4 sm:left-10 w-3 sm:w-4 h-3 sm:h-4 bg-red-500 rounded-full animate-float opacity-60"></div>
                <div className="absolute top-40 right-10 sm:right-20 w-4 sm:w-6 h-4 sm:h-6 bg-red-500 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-40 left-10 sm:left-20 w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-20 right-4 sm:right-10 w-3 sm:w-5 h-3 sm:h-5 bg-red-500 rounded-full animate-float opacity-30" style={{ animationDelay: '3s' }}></div>
            </div>

            {/* Back to Login Button */}
            <Link
                to="/login"
                className="absolute top-6 left-6 z-20 group inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
                <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Login
            </Link>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-md mx-auto px-6">
                <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl p-8 shadow-2xl animate-fade-in-up">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-black bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent mb-2">
                            Forgot Password?
                        </h2>
                        <p className="text-gray-600">
                            No worries! Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg hover:shadow-glow-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform hover:scale-105 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {isLoading ? (
                                <div className="relative z-10 flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </div>
                            ) : (
                                <span className="relative z-10">Send Reset Link</span>
                            )}
                            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </button>
                    </form>

                    {/* Additional Info */}
                    <div className="mt-8">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-start">
                                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-800 mb-1">Security Notice</h4>
                                    <p className="text-xs text-blue-700">
                                        For your security, the reset link will expire in 1 hour. If you don't receive the email within a few minutes, please check your spam folder.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Remember your password?{' '}
                            <Link
                                to="/login"
                                className="font-semibold text-red-600 hover:text-red-700 transition-colors duration-300"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;