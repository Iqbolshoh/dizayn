import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Layout,
  ChevronDown,
  User,
  LogOut,
  Settings,
  CreditCard,
  Users,
  HelpCircle,
  Palette,
  Globe,
} from 'lucide-react';
import Support from '../pages/Support';

interface Language {
  code: string;
  name: string;
  flag: string;
  flagIcon?: string;
}

const CommonHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: i18n.language,
    name: t('header.language.english'),
    flag: '🇬🇧',
    flagIcon: '/images/flags/gb.svg'
  });

  const languages: Language[] = [
    { code: 'en', name: t('header.language.english'), flag: '🇬🇧', flagIcon: '/images/flags/gb.svg' },
    { code: 'ru', name: t('header.language.russian'), flag: '🇷🇺', flagIcon: '/images/flags/ru.svg' },
    { code: 'uz', name: t('header.language.uzbek'), flag: '🇺🇿', flagIcon: '/images/flags/uz.svg' },
    { code: 'tj', name: t('header.language.tajik'), flag: '🇹🇯', flagIcon: '/images/flags/tj.svg' },
  ];

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: Layout },
    { label: 'Templates', href: '/my-templates', icon: Palette },
    { label: 'Billing', href: '/billing', icon: CreditCard },
    { label: 'Team', href: '/team', icon: Users },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLanguageChange = (language: Language) => {
    i18n.changeLanguage(language.code);
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="relative">
                <img
                  src="/images/logo_2.png"
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl shadow-lg group-hover:shadow-glow-red transition-all duration-300 group-hover:scale-105"
                  alt="Logo"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="font-sans font-bold text-lg sm:text-2xl">
                <span className="bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">Templates</span>
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">.uz</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`relative px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group flex items-center gap-2 ${isActive(item.href)
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                      }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {item.label}
                    <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 group-hover:w-3/4 ${isActive(item.href) ? 'w-3/4' : ''
                      }`}></span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Language Selector & Profile */}
          <div className="hidden md:flex items-center space-x-3 sm:space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 px-2 sm:px-3 py-2 text-gray-700 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-50"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              >
                {selectedLanguage.flagIcon ? (
                  <img
                    src={selectedLanguage.flagIcon}
                    alt={selectedLanguage.name}
                    className="w-4 sm:w-5 h-3 sm:h-4 rounded-sm shadow-sm"
                  />
                ) : (
                  <span className="text-base sm:text-lg">{selectedLanguage.flag}</span>
                )}
                <span className="text-xs sm:text-sm font-medium">{selectedLanguage.name}</span>
                <ChevronDown
                  className={`w-3 sm:w-4 h-3 sm:h-4 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 backdrop-blur-lg">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className="flex items-center px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 w-full text-left transition-colors"
                      onClick={() => handleLanguageChange(language)}
                    >
                      {language.flagIcon ? (
                        <img
                          src={language.flagIcon}
                          alt={language.name}
                          className="w-4 sm:w-5 h-3 sm:h-4 mr-2 sm:mr-3 rounded-sm shadow-sm"
                        />
                      ) : (
                        <span className="mr-2 sm:mr-3">{language.flag}</span>
                      )}
                      {language.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 px-2 sm:px-3 py-2 text-gray-700 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-50"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown
                  className={`w-3 sm:w-4 h-3 sm:h-4 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 backdrop-blur-lg">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Link>

                  <Link
                    to="/support"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <HelpCircle className="w-4 h-4 mr-3" />
                    Support
                  </Link>

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 text-gray-700 hover:text-red-600 focus:outline-none focus:text-red-600 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CommonHeader;