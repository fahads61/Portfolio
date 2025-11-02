'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, Award, TrendingUp, Video, Search, Zap, ChevronRight, Menu, X, Star, CheckCircle, BarChart3, DollarSign, Users, Target, Settings, Shield, Lightbulb, Clock, ArrowLeft, Palette, Film, Sparkles } from 'lucide-react';

// ============================================
// GOOGLE DRIVE VIDEO CONFIGURATION
// Yahan apni Google Drive video IDs add karein
// ============================================
const GOOGLE_DRIVE_VIDEOS = {
  // Video Editing Category
  'gaming-montage': '1wSgNJXuHYdslD2ceqZfok5Bq5rrdPCDI',
  'cinematic-travel': '1n_ML6T6B7ng3kUjHOTWazKmASInzcey9',
  'tech-review': '1fKpa29ouQXKKAtzJufAGzoJXqWxhwjbB',
  'fitness-transformation': '1hyhNq7WxLfIgNwSp_uTcn3tZTMMAZGFk',

  // Thumbnail Design Category
  'gaming-thumbnails': '1iS2B5DiFuOIbpYniVtg-gplzFdMOagj-',
  'tech-thumbnails': '1mZuylZPAQgOHCdWIps0z-K_87dqfVcNU',
  'vlog-thumbnails': '1_QkmgiLfA8UxDgLdKsmu7WQ1ckS7z1eZ',
  'business-thumbnails': '1_yb1oPepUFpDKOwY5_-Hf_Nr-Z2KhTYA',

  // Graphic Design Category
  'channel-banner': '1h5AG2hXGshhfhsfZEsYf_YWCcqBc15lT',
  'social-media-graphics': '18Q5r2g4fiCQn90b1JrTZQAI7iWP0iRjT',
  'brand-identity': '1-PGTGBv5LNmga-U7vKWmWd2uJ8p8uB6f',
  'motion-graphics': '1wSgNJXuHYdslD2ceqZfok5Bq5rrdPCDI',

  // Logo Design Category
  'gaming-logo': '1n_ML6T6B7ng3kUjHOTWazKmASInzcey9',
  'tech-logo': '1fKpa29ouQXKKAtzJufAGzoJXqWxhwjbB',
  'business-logo': '1hyhNq7WxLfIgNwSp_uTcn3tZTMMAZGFk',
  'lifestyle-logo': '1iS2B5DiFuOIbpYniVtg-gplzFdMOagj-',

  // Channel Branding Category
  'complete-setup': '1mZuylZPAQgOHCdWIps0z-K_87dqfVcNU',
  'gaming-rebrand': '1_QkmgiLfA8UxDgLdKsmu7WQ1ckS7z1eZ',
  'tech-launch': '1_yb1oPepUFpDKOwY5_-Hf_Nr-Z2KhTYA',
  'business-brand': '1h5AG2hXGshhfhsfZEsYf_YWCcqBc15lT',

  // SEO Optimization Category
  'seo-gaming': '18Q5r2g4fiCQn90b1JrTZQAI7iWP0iRjT',
  'seo-tech': '1-PGTGBv5LNmga-U7vKWmWd2uJ8p8uB6f',
  'seo-audit': '1wSgNJXuHYdslD2ceqZfok5Bq5rrdPCDI',
  'viral-seo': '1n_ML6T6B7ng3kUjHOTWazKmASInzcey9'
};

// Helper function to generate Google Drive embed URL
const getGDriveEmbedUrl = (videoId: string) => {
  return `https://drive.google.com/file/d/${videoId}/preview`;
};

// Helper function to generate Google Drive thumbnail URL
const getGDriveThumbnail = (videoId: string) => {
  return `https://drive.google.com/thumbnail?id=${videoId}&sz=w1000`;
};

interface ReelType {
  title: string;
  thumbnail: string;
  videoId: string;
}

interface ServiceType {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  price: string;
}

interface PortfolioType {
  title: string;
  result: string;
  image: string;
  description: string;
  videoId: string;
  category: string;
}

interface TestimonialType {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<ReelType | null>(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioType | null>(null);
  const [showPortfolioPage, setShowPortfolioPage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Updated Reels with Google Drive videos
  const reels: ReelType[] = [
    {
      title: "Video Sample 1",
      thumbnail: "",
      videoId: '1iS2B5DiFuOIbpYniVtg-gplzFdMOagj-'
    },
    {
      title: "Video Sample 2",
      thumbnail: "",
      videoId: '1mZuylZPAQgOHCdWIps0z-K_87dqfVcNU'
    },
    {
      title: "Video Sample 3",
      thumbnail: "",
      videoId: '1_QkmgiLfA8UxDgLdKsmu7WQ1ckS7z1eZ'
    },
    {
      title: "Video Sample 4",
      thumbnail: "",
      videoId: '1_yb1oPepUFpDKOwY5_-Hf_Nr-Z2KhTYA'
    },
    {
      title: "Video Sample 5",
      thumbnail: "",
      videoId: '1h5AG2hXGshhfhsfZEsYf_YWCcqBc15lT'
    },
    {
      title: "Video Sample 6",
      thumbnail: "",
      videoId: '18Q5r2g4fiCQn90b1JrTZQAI7iWP0iRjT'
    },
    {
      title: "Video Sample 7",
      thumbnail: "",
      videoId: '1-PGTGBv5LNmga-U7vKWmWd2uJ8p8uB6f'
    }
  ];

  const services: ServiceType[] = [
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Channel Setup & Optimization",
      description: "Complete professional channel creation and branding",
      features: ["Channel Art & Logo", "About Section", "Verification Setup", "Monetization Ready"],
      price: "From $50"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "YouTube SEO & Growth",
      description: "Rank higher and dominate search results organically",
      features: ["Keyword Research", "Tag Optimization", "Description Writing", "Thumbnail Design"],
      price: "From $30"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Optimization",
      description: "Professional video editing and enhancement services",
      features: ["High-CTR Titles", "Pro Thumbnails", "Subtitle Creation", "Shorts Repurposing"],
      price: "From $20"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Channel Management",
      description: "Complete hands-free channel operations and growth",
      features: ["Daily Uploading", "Community Management", "Analytics Reports", "Content Calendar"],
      price: "From $50"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Monetization Services",
      description: "Maximize revenue with multiple income streams",
      features: ["AdSense Setup", "Sponsorship Deals", "Affiliate Marketing", "Revenue Boost"],
      price: "From $300"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Audience Growth Strategies",
      description: "Organic growth campaigns that actually work",
      features: ["Subscriber Growth", "Engagement Boost", "Viral Strategy", "Cross-Platform"],
      price: "From $40"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "YouTube Shorts Services",
      description: "Leverage shorts for explosive viral growth",
      features: ["Shorts Creation", "Viral Optimization", "Hashtag Research", "Shorts Monetization"],
      price: "From $20"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Channel Recovery & Fixing",
      description: "Resolve issues and restore your channel's health",
      features: ["Strike Appeals", "Copyright Claims", "Shadowban Fix", "Account Recovery"],
      price: "From $60"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Content Strategy",
      description: "Data-driven content planning for sustainable growth",
      features: ["Niche Research", "Upload Schedule", "Viral Ideation", "Seasonal Planning"],
      price: "From $50"
    }
  ];

  // Updated Portfolio with Google Drive videos and local thumbnails
  const allPortfolio: PortfolioType[] = [
    // Video Editing
    {
      title: "Video Sample 1",
      result: "",
      image: "",
      description: "",
      videoId: GOOGLE_DRIVE_VIDEOS['gaming-montage'],
      category: "video-editing"
    },
    {
      title: "Video Sample 2",
      result: "",
      image: "",
      description: "",
      videoId: GOOGLE_DRIVE_VIDEOS['cinematic-travel'],
      category: "video-editing"
    },
    {
      title: "Video Sample 3",
      result: "",
      image: "",
      description: "",
      videoId: GOOGLE_DRIVE_VIDEOS['tech-review'],
      category: "video-editing"
    },
    {
      title: "Video Sample 4",
      result: "",
      image: "",
      description: "",
      videoId: GOOGLE_DRIVE_VIDEOS['fitness-transformation'],
      category: "video-editing"
    },
    {
      title: "Video Sample 5",
      result: "",
      image: "",
      description: "",
      videoId: GOOGLE_DRIVE_VIDEOS['gaming-thumbnails'],
      category: "video-editing"
    },
    {
      title: "Video Sample 6",
      result: "",
      image: "",
      description: "",
      videoId: GOOGLE_DRIVE_VIDEOS['tech-thumbnails'],
      category: "video-editing"
    },
    {
      title: "Video Sample 7",
      result: "",
      image: "",
      description: "",
      videoId: GOOGLE_DRIVE_VIDEOS['vlog-thumbnails'],
      category: "video-editing"
    },

    // Thumbnail Design
    {
      title: "Thumbnail 1",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0001.jpg",
      description: "",
      videoId: "",
      category: "thumbnail"
    },
    {
      title: "Thumbnail 2",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0002.jpg",
      description: "",
      videoId: "",
      category: "thumbnail"
    },
    {
      title: "Thumbnail 3",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0003.jpg",
      description: "",
      videoId: "",
      category: "thumbnail"
    },
    {
      title: "Thumbnail 4",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0004.jpg",
      description: "",
      videoId: "",
      category: "thumbnail"
    },
    {
      title: "Thumbnail 5",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0005.jpg",
      description: "",
      videoId: "",
      category: "thumbnail"
    },
    {
      title: "Thumbnail 6",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0006.jpg",
      description: "",
      videoId: "",
      category: "thumbnail"
    },
    {
      title: "Thumbnail 7",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0007.jpg",
      description: "",
      videoId: "",
      category: "thumbnail"
    },
    {
      title: "Thumbnail 8",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0008.jpg",
      description: "",
      videoId: "",
      category: "thumbnail"
    },
    {
      title: "Thumbnail 9",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0009.jpg",
      description: "",
      videoId: "",
      category: "thumbnail"
    },
    {
      title: "Thumbnail 10",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0010.jpg",
      description: "",
      videoId: "",
      category: "thumbnail"
    },

    // Logo Design
    {
      title: "Logo 1",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0001.jpg",
      description: "",
      videoId: "",
      category: "logo"
    },
    {
      title: "Logo 2",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0002.jpg",
      description: "",
      videoId: "",
      category: "logo"
    },
    {
      title: "Logo 3",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0003.jpg",
      description: "",
      videoId: "",
      category: "logo"
    },
    {
      title: "Logo 4",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0004.jpg",
      description: "",
      videoId: "",
      category: "logo"
    },
    {
      title: "Logo 5",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0005.jpg",
      description: "",
      videoId: "",
      category: "logo"
    },
    {
      title: "Logo 6",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0006.jpg",
      description: "",
      videoId: "",
      category: "logo"
    },
    {
      title: "Logo 7",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0007.jpg",
      description: "",
      videoId: "",
      category: "logo"
    },
    {
      title: "Logo 8",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0008.jpg",
      description: "",
      videoId: "",
      category: "logo"
    },
    {
      title: "Logo 9",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0009.jpg",
      description: "",
      videoId: "",
      category: "logo"
    },
    {
      title: "Logo 10",
      result: "",
      image: "/thumbnails/PREVIOUS_WORKs_page-0010.jpg",
      description: "",
      videoId: "",
      category: "logo"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: <Sparkles className="w-5 h-5" />, count: allPortfolio.length },
    { id: 'video-editing', name: 'Video Editing', icon: <Film className="w-5 h-5" />, count: allPortfolio.filter(p => p.category === 'video-editing').length },
    { id: 'thumbnail', name: 'Thumbnail Design', icon: <Palette className="w-5 h-5" />, count: allPortfolio.filter(p => p.category === 'thumbnail').length },
    { id: 'logo', name: 'Logo Design', icon: <Target className="w-5 h-5" />, count: allPortfolio.filter(p => p.category === 'logo').length }
  ];

  const portfolio: PortfolioType[] = allPortfolio.slice(0, 6);

  const testimonials: TestimonialType[] = [
    { 
      name: "Alex Martinez", 
      role: "Tech YouTuber • 250K Subs", 
      content: "Fahad transformed my channel from 5K to 150K in just 6 months! His SEO strategies and content planning are incredible.", 
      rating: 5,
      avatar: "AM"
    },
    { 
      name: "Sarah Johnson", 
      role: "Business Coach • 180K Subs", 
      content: "Best editor and strategist! Fast turnaround and amazing quality. My engagement doubled within weeks.", 
      rating: 5,
      avatar: "SJ"
    },
    { 
      name: "Mike Chen", 
      role: "Finance Creator • 95K Subs", 
      content: "Cash cow service tripled my income! Professional, reliable, and results-driven. Highly recommend!", 
      rating: 5,
      avatar: "MC"
    }
  ];

  const handlePortfolioClick = (project: PortfolioType) => {
    setSelectedPortfolio(project);
  };

  const closePortfolioPopup = () => {
    setSelectedPortfolio(null);
  };

  const handleVideoClick = (reel: ReelType) => {
    setSelectedVideo(reel);
  };

  const closeVideoPopup = () => {
    setSelectedVideo(null);
  };

  const filteredPortfolio = selectedCategory === 'all' 
    ? allPortfolio 
    : allPortfolio.filter(p => p.category === selectedCategory);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const openPortfolioPage = () => {
    setShowPortfolioPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closePortfolioPage = () => {
    setShowPortfolioPage(false);
    setSelectedCategory('all');
  };

  if (showPortfolioPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-50">
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }

          .animate-scale-in {
            animation: scaleIn 0.5s ease-out forwards;
          }

          .stagger-1 { animation-delay: 0.1s; opacity: 0; }
          .stagger-2 { animation-delay: 0.2s; opacity: 0; }
          .stagger-3 { animation-delay: 0.3s; opacity: 0; }
          .stagger-4 { animation-delay: 0.4s; opacity: 0; }
          .stagger-5 { animation-delay: 0.5s; opacity: 0; }
          .stagger-6 { animation-delay: 0.6s; opacity: 0; }
        `}</style>

        {/* Header */}
        <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <button 
                onClick={closePortfolioPage}
                className="flex items-center space-x-3 text-gray-900 hover:text-emerald-500 transition group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center group-hover:bg-emerald-600 transition">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Back to</div>
                  <div className="text-lg font-bold">Home</div>
                </div>
              </button>
              
              <div className="text-2xl font-bold text-gray-900">
                My <span className="text-emerald-500">Portfolio</span>
              </div>

              <a 
                href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition font-medium"
              >
                Hire Me
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              My Creative <span className="text-emerald-500">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up stagger-1">
              Explore my work across various categories - from video editing to SEO optimization. Each project represents dedication, creativity, and results-driven excellence.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 animate-scale-in ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 border-2 border-gray-200'
                  }`}
                  style={{ animationDelay: `${idx * 0.1}s`, opacity: 0 }}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedCategory === cat.id ? 'bg-white/20' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {filteredPortfolio.map((project, idx) => (
                <div
                  key={idx}
                  onClick={() => project.videoId && handlePortfolioClick(project)}
                  className="group relative overflow-hidden rounded-xl cursor-pointer border-2 border-gray-200 hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-2xl bg-white animate-fade-in-up transform hover:scale-105"
                  style={{ animationDelay: `${(idx % 9) * 0.1}s`, opacity: 0 }}
                >
                  <div className="aspect-video overflow-hidden relative bg-gray-900">
                    {project.videoId ? (
                      <div className="relative w-full h-full">
                        <img
                          src={getGDriveThumbnail(project.videoId)}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&h=350&fit=crop';
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition">
                          <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center group-hover:scale-110 transition shadow-xl">
                            <Play className="w-8 h-8 text-white ml-1" fill="white" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredPortfolio.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600">Try selecting a different category</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-emerald-50 mb-8">
              Let's create something amazing together. Get in touch and bring your vision to life!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105"
              >
                <span>Hire Me Now</span>
                <ChevronRight className="w-5 h-5" />
              </a>
              <button 
                onClick={closePortfolioPage}
                className="inline-flex items-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </section>

        {/* Video Popup */}
        {selectedPortfolio && selectedPortfolio.videoId && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closePortfolioPopup}
          >
            <div
              className="relative w-full max-w-4xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closePortfolioPopup}
                className="absolute -top-12 right-0 text-white hover:text-emerald-400 transition"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="bg-white rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-2xl">
                <div className="aspect-video bg-black">
                  <iframe
                    src={getGDriveEmbedUrl(selectedPortfolio.videoId)}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={selectedPortfolio.title}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <style>{`
        @keyframes scroll-services {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .scroll-services-container {
          animation: scroll-services 30s linear infinite;
        }

        .hero-circle {
          position: absolute;
          border-radius: 50%;
          background: #4ade80;
        }

        .hero-brush {
          position: absolute;
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          filter: blur(40px);
          opacity: 0.6;
        }
      `}</style>

      {/* iPhone Notch-Style Navbar */}
      <nav className={`fixed top-3 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        scrollDirection === 'down' && isScrolled
          ? 'scale-90'
          : 'scale-100'
      }`}>
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-full px-10 py-2.5 shadow-2xl border border-gray-700/50">
          <div className="flex items-center space-x-10">
            <div className="text-lg font-bold text-white mr-2">
              FAHAD<span className="text-emerald-400">.</span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-white hover:text-emerald-400 font-medium text-sm transition-colors duration-300">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-white hover:text-emerald-400 font-medium text-sm transition-colors duration-300">About</button>
              <button onClick={() => scrollToSection('services')} className="text-white hover:text-emerald-400 font-medium text-sm transition-colors duration-300">Services</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-white hover:text-emerald-400 font-medium text-sm transition-colors duration-300">Portfolio</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-white hover:text-emerald-400 font-medium text-sm transition-colors duration-300">Testimonials</button>
            </div>

            <a
              href="https://www.upwork.com/freelancers/~01b4bda82598a073e9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-2 rounded-full hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-bold text-sm shadow-lg hover:shadow-emerald-500/50 hover:scale-105 whitespace-nowrap inline-flex items-center"
            >
              Hire Me
            </a>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white ml-2">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-4 bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
            <div className="px-6 py-4 space-y-3">
              <button onClick={() => { scrollToSection('home'); setIsMenuOpen(false); }} className="block text-white hover:text-emerald-400 py-3 w-full text-left font-medium transition-colors">Home</button>
              <button onClick={() => { scrollToSection('about'); setIsMenuOpen(false); }} className="block text-white hover:text-emerald-400 py-3 w-full text-left font-medium transition-colors">About</button>
              <button onClick={() => { scrollToSection('services'); setIsMenuOpen(false); }} className="block text-white hover:text-emerald-400 py-3 w-full text-left font-medium transition-colors">Services</button>
              <button onClick={() => { scrollToSection('portfolio'); setIsMenuOpen(false); }} className="block text-white hover:text-emerald-400 py-3 w-full text-left font-medium transition-colors">Portfolio</button>
              <button onClick={() => { scrollToSection('testimonials'); setIsMenuOpen(false); }} className="block text-white hover:text-emerald-400 py-3 w-full text-left font-medium transition-colors">Testimonials</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white">
        {/* Decorative Elements */}
        <div className="hero-circle" style={{
          top: '10%',
          left: '8%',
          width: '80px',
          height: '80px',
          background: '#4ade80'
        }}></div>
        
        <div className="hero-brush" style={{
          top: '15%',
          right: '5%',
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-gray-600 text-lg">YouTube Growth Specialist</p>
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  Hi, I'm <span className="text-emerald-500">Fahad</span>
                </h1>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                I'm a dedicated YouTube Growth Specialist helping content creators and businesses achieve explosive growth through professional YouTube services. From channel management to SEO optimization and monetization strategies, I turn channels into thriving online businesses.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={openPortfolioPage}
                  className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-medium flex items-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  View All Portfolio
                </button>
                <a 
                  href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-900 hover:text-white transition font-medium flex items-center gap-2"
                >
                  Hire Me
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-6 pt-6">
                <div>
                  <div className="text-3xl font-bold text-gray-900">800+</div>
                  <div className="text-gray-600 text-sm">Projects Done</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">200+</div>
                  <div className="text-gray-600 text-sm">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">5+</div>
                  <div className="text-gray-600 text-sm">Years Experience</div>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop"
                  alt="Fahad"
                  width={500}
                  height={600}
                  priority
                  className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
                />
              </div>
              {/* Green brush stroke behind image */}
              <div className="absolute top-10 -right-10 w-80 h-96 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full opacity-20 blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gradient-to-tr from-emerald-300 to-emerald-400 rounded-full opacity-20 blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-emerald-500 text-white rounded-full px-6 py-2 mb-4 text-sm font-bold">
              ⭐ TOP-RATED YOUTUBE SPECIALIST
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Why Work With <span className="text-emerald-500">Me?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              I'm a dedicated YouTube Growth Specialist helping content creators and businesses achieve explosive growth through professional YouTube services. From channel management to SEO optimization and monetization strategies, I turn channels into thriving online businesses.
            </p>
          </div>

          {/* Industries Section */}
          <div className="bg-gradient-to-br from-gray-50 to-emerald-50/30 rounded-3xl p-8 md:p-12 border-2 border-emerald-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Industries I <span className="text-emerald-500">Specialize</span> In
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Tech & Gaming', 'Education & How-To', 'Business & Finance', 'Lifestyle & Vlog', 'Health & Fitness', 'Entertainment'].map((industry, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 border border-emerald-200 hover:border-emerald-400 transition text-center font-semibold text-gray-700 hover:text-emerald-600 hover:shadow-lg">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Work Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Recent Work</h2>
            <p className="text-xl text-gray-600">Professional video editing, thumbnails, and creative design</p>
          </div>

          {/* Video Editing Section */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Video Editing</h3>
                  <p className="text-gray-600">Professional video editing and production</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reels.slice(0, 4).map((reel, idx) => (
                <div
                  key={idx}
                  onClick={() => handleVideoClick(reel)}
                  className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-emerald-500 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
                >
                  <div className="aspect-video relative bg-gray-900">
                    <img
                      src={getGDriveThumbnail(reel.videoId)}
                      alt={reel.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-all duration-500">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center group-hover:scale-125 transition-all duration-500 shadow-2xl">
                        <Play className="w-10 h-10 text-white ml-1" fill="white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">{reel.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thumbnail Design Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Thumbnail Design</h3>
                  <p className="text-gray-600">Eye-catching, high-CTR thumbnail designs</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "/thumbnails/PREVIOUS_WORKs_page-0001.jpg",
                "/thumbnails/PREVIOUS_WORKs_page-0002.jpg",
                "/thumbnails/PREVIOUS_WORKs_page-0003.jpg",
                "/thumbnails/PREVIOUS_WORKs_page-0004.jpg"
              ].map((thumbnail, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-purple-500 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
                >
                  <div className="aspect-video relative bg-gray-900">
                    <img
                      src={thumbnail}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-purple-300" />
                          <span className="text-white font-bold text-lg">Thumbnail Design {idx + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeVideoPopup}
          >
            <div
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeVideoPopup}
                className="absolute -top-12 right-0 text-white hover:text-emerald-400 transition"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="bg-white rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-2xl">
                <div className="aspect-video bg-black">
                  <iframe
                    src={getGDriveEmbedUrl(selectedVideo.videoId)}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={selectedVideo.title}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 border-2 border-emerald-200 hover:border-emerald-400 transition text-center shadow-lg">
              <div className="text-emerald-500 mb-2 flex justify-center"><CheckCircle className="w-6 h-6" /></div>
              <div className="text-4xl font-bold text-gray-900 mb-1">800+</div>
              <div className="text-gray-600 text-sm">Projects Delivered</div>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-emerald-200 hover:border-emerald-400 transition text-center shadow-lg">
              <div className="text-emerald-500 mb-2 flex justify-center"><TrendingUp className="w-6 h-6" /></div>
              <div className="text-4xl font-bold text-gray-900 mb-1">200+</div>
              <div className="text-gray-600 text-sm">Channels Grown</div>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-emerald-200 hover:border-emerald-400 transition text-center shadow-lg">
              <div className="text-emerald-500 mb-2 flex justify-center"><Clock className="w-6 h-6" /></div>
              <div className="text-4xl font-bold text-gray-900 mb-1">5+</div>
              <div className="text-gray-600 text-sm">Years Experience</div>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-emerald-200 hover:border-emerald-400 transition text-center shadow-lg">
              <div className="text-emerald-500 mb-2 flex justify-center"><Star className="w-6 h-6" /></div>
              <div className="text-4xl font-bold text-gray-900 mb-1">100%</div>
              <div className="text-gray-600 text-sm">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section - Success Stories */}
      <section id="portfolio" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full px-6 py-2 mb-4 text-sm font-bold">
              ⭐ SUCCESS STORIES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Real Results from <span className="text-emerald-500">Real Clients</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Proven track record of transforming channels and delivering measurable growth. See how I've helped creators achieve their YouTube dreams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {portfolio.map((project, idx) => (
              <div
                key={idx}
                onClick={() => project.videoId && handlePortfolioClick(project)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer border-2 border-gray-200 hover:border-emerald-500 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-[1.03] bg-white"
              >
                <div className="aspect-video overflow-hidden relative bg-gray-900">
                  {project.videoId ? (
                    <div className="relative w-full h-full">
                      <img
                        src={getGDriveThumbnail(project.videoId)}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&h=350&fit=crop';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-all duration-500">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center group-hover:scale-125 transition-all duration-500 shadow-2xl">
                          <Play className="w-10 h-10 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-white font-semibold">View Project</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={openPortfolioPage}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-10 py-5 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <Award className="w-6 h-6" />
              <span>View Complete Portfolio</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {selectedPortfolio && selectedPortfolio.videoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={closePortfolioPopup}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePortfolioPopup}
              className="absolute -top-12 right-0 text-white hover:text-emerald-400 transition"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-white rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-2xl">
              <div className="aspect-video bg-black">
                <iframe
                  src={getGDriveEmbedUrl(selectedPortfolio.videoId)}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={selectedPortfolio.title}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-emerald-100 text-emerald-700 rounded-full px-6 py-2 mb-4 text-sm font-bold">
              💼 PROFESSIONAL SERVICES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Complete YouTube <span className="text-emerald-500">Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to dominate YouTube in 2025 - from setup to monetization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-400 transition-all duration-500 group cursor-pointer hover:transform hover:scale-[1.03] hover:shadow-2xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg">
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-500 transition min-h-[60px]">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t-2 border-gray-100">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Starting at</div>
                    <span className="text-emerald-500 font-bold text-2xl">{service.price}</span>
                  </div>
                  <a
                    href="https://www.upwork.com/freelancers/~01b4bda82598a073e9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 flex items-center space-x-2 group-hover:scale-105"
                  >
                    <span>Order</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-emerald-100 text-emerald-700 rounded-full px-6 py-2 mb-4 text-sm font-bold">
              ⭐ CLIENT TESTIMONIALS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              What My <span className="text-emerald-500">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take my word for it - hear from satisfied clients who've experienced real growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-400 transition-all duration-500 transform hover:scale-[1.03] hover:shadow-2xl group"
              >
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>

                <p className="text-gray-700 mb-8 italic leading-relaxed text-lg">"{testimonial.content}"</p>

                <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-gray-900 font-bold text-lg">{testimonial.name}</p>
                    <p className="text-emerald-600 text-sm font-semibold">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-sm text-white rounded-full px-6 py-2 mb-6 text-sm font-bold border border-white/30">
            🎯 Limited Slots Available
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to <span className="text-emerald-200">10X</span> Your Channel?
          </h2>
          <p className="text-xl text-emerald-50 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join 200+ successful creators who transformed their channels into profitable businesses. Let's create your YouTube success story together!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.upwork.com/freelancers/~01b4bda82598a073e9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white text-emerald-600 px-10 py-5 rounded-xl text-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span>Start Growing Today</span>
              <ChevronRight className="w-5 h-5" />
            </a>
            <a
              href="https://www.upwork.com/freelancers/~01b4bda82598a073e9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 border-2 border-white text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <span>Schedule Consultation</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-4xl font-bold text-white">FAHAD<span className="text-emerald-400">.</span></span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Professional YouTube Growth Specialist helping creators build successful channels since 2019. Transforming visions into viral realities.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 text-sm font-semibold">Available for new projects</span>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-xl">Quick Links</h3>
              <div className="space-y-3">
                <button onClick={() => scrollToSection('services')} className="block text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium">→ Services</button>
                <button onClick={openPortfolioPage} className="block text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium">→ Portfolio</button>
                <button onClick={() => scrollToSection('testimonials')} className="block text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium">→ Reviews</button>
                <button onClick={() => scrollToSection('about')} className="block text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium">→ About</button>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-xl">Let's Connect</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">Ready to grow your YouTube channel? Let's make it happen together.</p>
              <a
                href="https://www.upwork.com/freelancers/~01b4bda82598a073e9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 font-bold"
              >
                <span>Hire on Upwork</span>
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2025 Fahad - YouTube Growth Specialist. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                Crafted with <span className="text-emerald-400">♥</span> for YouTube creators worldwide
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}