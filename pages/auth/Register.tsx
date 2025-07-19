import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Mail, Lock, User, Check, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const ApiUrl = import.meta.env.VITE_API_BASE_URL;

        try {
            const response = await axios.post(`${ApiUrl}/register`, {
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.confirmPassword
            }, {
                headers: {
                    'Accept': 'application/json'
                },
                withCredentials: true
            });

            console.log('✅ Registered:', response.data);

            localStorage.setItem('authToken', response.data.token);
            // localStorage.setItem('user', JSON.stringify(response.data.user));

            toast.success('Welcome back, you are logged in!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });

            navigate('/dashboard');
        } catch (error: any) {
            console.error('Registration failed:', error.response?.data || error.message);

            toast.error(error.response?.data || error.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
        } finally {
            setLoading(false);
        }
    };

    const passwordRequirements = [
        { met: formData.password.length >= 8, text: 'At least 8 characters' },
        { met: /[A-Z]/.test(formData.password), text: 'One uppercase letter' },
        { met: /[a-z]/.test(formData.password), text: 'One lowercase letter' },
        { met: /\d/.test(formData.password), text: 'One number' }
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden py-12">
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

            {/* Back to Home Button */}
            <Link
                to="/"
                className="absolute top-6 left-6 z-20 group inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
                <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Home
            </Link>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-md mx-auto px-6">
                <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl p-8 shadow-2xl animate-fade-in-up">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-black bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent mb-2">
                            Create Account
                        </h2>
                        <p className="text-gray-600">Join us and start building amazing websites</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

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
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                    placeholder="Create a strong password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-red-600 transition-colors duration-300"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>

                            {/* Password Requirements */}
                            {formData.password && (
                                <div className="mt-2 space-y-1">
                                    {passwordRequirements.map((req, index) => (
                                        <div key={index} className="flex items-center text-xs">
                                            <Check
                                                className={`h-3 w-3 mr-2 ${req.met ? 'text-green-500' : 'text-gray-300'
                                                    }`}
                                            />
                                            <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                                                {req.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-red-600 transition-colors duration-300"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="text-xs text-red-600">Passwords do not match</p>
                            )}
                        </div>

                        {/* Terms & Conditions */}
                        <div className="flex items-start">
                            <input
                                id="acceptTerms"
                                name="acceptTerms"
                                type="checkbox"
                                required
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded transition-colors duration-300 mt-1"
                            />
                            <label htmlFor="acceptTerms" className="ml-3 block text-sm text-gray-700">
                                I agree to the{' '}
                                <Link to="/terms" className="text-red-600 hover:text-red-700 font-medium transition-colors duration-300">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link to="/privacy" className="text-red-600 hover:text-red-700 font-medium transition-colors duration-300">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!formData.acceptTerms || formData.password !== formData.confirmPassword}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg hover:shadow-glow-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform hover:scale-105 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10">Create Account</span>
                            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-semibold text-red-600 hover:text-red-700 transition-colors duration-300"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    {/* Social Login */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="group relative inline-flex w-full justify-center rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm py-3 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span className="ml-2">Google</span>
                            </button>

                            <button className="group relative inline-flex w-full justify-center rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm py-3 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="ml-2">Facebook</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;