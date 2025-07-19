import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Edit3,
  Share2,
  Globe,
  Eye,
  Layout
} from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { useTheme } from '../contexts/ThemeContext';
import SectionRenderer from '../components/SectionRenderer';

const Preview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { projects, currentProject, setCurrentProject } = useProject();
  const { currentTheme } = useTheme();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    if (id) {
      const project = projects.find(p => p.id === id);
      if (project) {
        setCurrentProject(project);
      } else {
        console.log('Project not found for preview:', id);
      }
    }
  }, [id, projects, setCurrentProject, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePublish = () => {
    alert(`🎉 Your website has been published!\n\nYou can access it at: ${currentProject?.name.toLowerCase().replace(/\s+/g, '-')}.templates.uz`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentProject?.name,
        text: `Check out my website: ${currentProject?.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!currentProject) {
    const projectExists = id && projects.some(p => p.id === id);

    if (id && !projectExists) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Globe className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">Website Not Found</h2>
            <p className="text-gray-600 mb-6">
              The website with ID "{id}" doesn't exist.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors shadow-elegant font-display"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate(`/editor/${id}`)}
                className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-glow font-display"
              >
                Create Website
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">{t('common.loading')} preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative font-sans">
      {/* Floating Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: showHeader ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 left-4 right-4 z-50 bg-white/98 rounded-2xl shadow-elegant-lg border border-gray-200 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/editor/${currentProject.id}`)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-glow">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 font-display">{currentProject.name}</h1>
                <p className="text-sm text-gray-600 font-sans">{t('preview.livePreviewMode')}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/editor/${currentProject.id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-glow font-display"
            >
              <Edit3 className="w-4 h-4" />
              {t('preview.edit')}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium shadow-elegant font-display"
            >
              <Share2 className="w-4 h-4" />
              {t('preview.share')}
            </button>

            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium shadow-glow font-display"
            >
              <Globe className="w-4 h-4" />
              {t('preview.publish')}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Website Content */}
      <div className="pt-20">
        {currentProject.sections.length === 0 ? (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-lg">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gray-200 rounded-3xl flex items-center justify-center mx-auto shadow-elegant">
                  <Globe className="w-12 h-12 text-gray-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center animate-bounce">
                  <Layout className="w-4 h-4 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">
                {t('preview.emptyState.title')}
              </h2>
              <p className="text-gray-600 mb-8 text-lg font-sans">
                {t('preview.emptyState.description')}
              </p>
              <button
                onClick={() => navigate(`/editor/${currentProject.id}`)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all font-semibold shadow-glow text-lg font-display"
              >
                {t('preview.emptyState.startBuilding')}
              </button>
            </div>
          </div>
        ) : (
          currentProject.sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <SectionRenderer
                key={section.id}
                section={section}
                isSelected={false}
                onSelect={() => { }}
                isPreview={true}
                theme={currentTheme}
                isEditing={false}
                onEdit={() => { }}
              />
            ))
        )}
      </div>

      {/* Preview Mode Indicator */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary-600 rounded-2xl px-6 py-3 text-white flex items-center gap-3 shadow-glow"
        >
          <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          <span className="font-medium font-sans">{t('preview.previewModeActive')}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Preview;