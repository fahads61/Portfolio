'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Award, TrendingUp, Video, Youtube, Search, Zap, ChevronRight, ChevronLeft, Menu, X, Star, CheckCircle, ArrowDown, BarChart3, DollarSign, Users, Target, Settings, Shield, Lightbulb, Clock, Facebook, Instagram, Linkedin, Download, ArrowLeft, Palette, Film, Sparkles, Layout, TrendingUp as Growth, PenTool } from 'lucide-react';

interface ReelType {
  title: string;
  views: string;
  thumbnail: string;
  duration: string;
  videoUrl: string;
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
  videoUrl: string;
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
  const [currentReelPage, setCurrentReelPage] = useState(0);
  const [autoScrollPosition, setAutoScrollPosition] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<ReelType | null>(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioType | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<Record<string, boolean>>({});
  const [showPortfolioPage, setShowPortfolioPage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement>>({});

  const reels: ReelType[] = [
    { 
      title: "Gaming Montage - 4K Edit", 
      views: "2.5M",
      thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
      duration: "0:45",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    { 
      title: "Tech Review - Pro Setup", 
      views: "1.8M",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=600&fit=crop",
      duration: "1:20",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    { 
      title: "Fitness Transformation Journey", 
      views: "3.2M",
      thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=600&fit=crop",
      duration: "0:58",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    { 
      title: "Travel Cinematic Vlog", 
      views: "1.5M",
      thumbnail: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=600&fit=crop",
      duration: "1:15",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    { 
      title: "Cooking Tutorial - Quick Recipe", 
      views: "2.1M",
      thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=600&fit=crop",
      duration: "0:35",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    { 
      title: "Business Growth Strategy", 
      views: "980K",
      thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=600&fit=crop",
      duration: "1:05",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    },
    { 
      title: "Lifestyle Content Creator", 
      views: "1.2M",
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=600&fit=crop",
      duration: "0:52",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
    },
    { 
      title: "Educational Tutorial Series", 
      views: "890K",
      thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=600&fit=crop",
      duration: "1:30",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
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

  const allPortfolio: PortfolioType[] = [
    // Video Editing
    { 
      title: "Gaming Montage Pro Edit", 
      result: "2.5M+ Views", 
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=350&fit=crop",
      description: "Professional gaming montage with color grading",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      category: "video-editing"
    },
    { 
      title: "Cinematic Travel Vlog", 
      result: "1.8M+ Views", 
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=350&fit=crop",
      description: "Cinematic storytelling with transitions",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      category: "video-editing"
    },
    { 
      title: "Tech Review Edit", 
      result: "1.5M+ Views", 
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=350&fit=crop",
      description: "Clean tech review with motion graphics",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      category: "video-editing"
    },
    { 
      title: "Fitness Transformation", 
      result: "3.2M+ Views", 
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=350&fit=crop",
      description: "Motivational fitness video editing",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      category: "video-editing"
    },
    
    // Thumbnail Design
    { 
      title: "Gaming Thumbnail Pack", 
      result: "15% CTR", 
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=350&fit=crop",
      description: "Eye-catching gaming thumbnails",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      category: "thumbnail"
    },
    { 
      title: "Tech Review Thumbnails", 
      result: "18% CTR", 
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=350&fit=crop",
      description: "Professional tech thumbnails",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      category: "thumbnail"
    },
    { 
      title: "Vlog Thumbnail Series", 
      result: "12% CTR", 
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=350&fit=crop",
      description: "Lifestyle vlog thumbnails",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      category: "thumbnail"
    },
    { 
      title: "Business Thumbnails", 
      result: "20% CTR", 
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&h=350&fit=crop",
      description: "Professional business thumbnails",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      category: "thumbnail"
    },
    
    // Graphic Design
    { 
      title: "Channel Banner Design", 
      result: "Modern & Clean", 
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&h=350&fit=crop",
      description: "Professional channel art",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      category: "graphic-design"
    },
    { 
      title: "Social Media Graphics", 
      result: "Complete Pack", 
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=350&fit=crop",
      description: "Instagram, Twitter, Facebook graphics",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      category: "graphic-design"
    },
    { 
      title: "Brand Identity Pack", 
      result: "Full Branding", 
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&h=350&fit=crop",
      description: "Logo, colors, typography",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      category: "graphic-design"
    },
    { 
      title: "Motion Graphics Pack", 
      result: "Animated Assets", 
      image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=500&h=350&fit=crop",
      description: "Intros, outros, lower thirds",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      category: "graphic-design"
    },
    
    // Logo Design
    { 
      title: "Gaming Logo Design", 
      result: "Esports Ready", 
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=350&fit=crop",
      description: "Modern gaming logo",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      category: "logo"
    },
    { 
      title: "Tech Channel Logo", 
      result: "Professional", 
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=350&fit=crop",
      description: "Tech-focused logo design",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      category: "logo"
    },
    { 
      title: "Business Logo Suite", 
      result: "Multi-format", 
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&h=350&fit=crop",
      description: "Complete logo package",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      category: "logo"
    },
    { 
      title: "Lifestyle Brand Logo", 
      result: "Minimal & Clean", 
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&h=350&fit=crop",
      description: "Elegant lifestyle logo",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      category: "logo"
    },
    
    // Channel Branding
    { 
      title: "Complete Channel Setup", 
      result: "5K to 50K Subs", 
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=350&fit=crop",
      description: "Full channel optimization",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      category: "branding"
    },
    { 
      title: "Gaming Channel Rebrand", 
      result: "10K to 100K", 
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=350&fit=crop",
      description: "Complete rebranding project",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      category: "branding"
    },
    { 
      title: "Tech Channel Launch", 
      result: "0 to 25K in 6mo", 
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=350&fit=crop",
      description: "New channel setup & growth",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      category: "branding"
    },
    { 
      title: "Business Channel Brand", 
      result: "Professional Setup", 
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&h=350&fit=crop",
      description: "Corporate branding package",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      category: "branding"
    },
    
    // SEO Optimization
    { 
      title: "SEO Boost - Gaming", 
      result: "500% Growth", 
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=350&fit=crop",
      description: "Complete SEO overhaul",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      category: "seo"
    },
    { 
      title: "SEO Strategy - Tech", 
      result: "Top 3 Rankings", 
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=350&fit=crop",
      description: "Keyword optimization success",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      category: "seo"
    },
    { 
      title: "Channel SEO Audit", 
      result: "300% More Views", 
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=350&fit=crop",
      description: "Full channel optimization",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      category: "seo"
    },
    { 
      title: "Viral SEO Strategy", 
      result: "1M+ Organic Views", 
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=350&fit=crop",
      description: "Viral content optimization",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      category: "seo"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: <Sparkles className="w-5 h-5" />, count: allPortfolio.length },
    { id: 'video-editing', name: 'Video Editing', icon: <Film className="w-5 h-5" />, count: allPortfolio.filter(p => p.category === 'video-editing').length },
    { id: 'thumbnail', name: 'Thumbnail Design', icon: <Palette className="w-5 h-5" />, count: allPortfolio.filter(p => p.category === 'thumbnail').length },
    { id: 'graphic-design', name: 'Graphic Design', icon: <PenTool className="w-5 h-5" />, count: allPortfolio.filter(p => p.category === 'graphic-design').length },
    { id: 'logo', name: 'Logo Design', icon: <Target className="w-5 h-5" />, count: allPortfolio.filter(p => p.category === 'logo').length },
    { id: 'branding', name: 'Channel Branding', icon: <Layout className="w-5 h-5" />, count: allPortfolio.filter(p => p.category === 'branding').length },
    { id: 'seo', name: 'SEO Optimization', icon: <Growth className="w-5 h-5" />, count: allPortfolio.filter(p => p.category === 'seo').length }
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

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoScrollPosition((prev) => {
        const newPosition = prev + 1;
        return newPosition >= reels.length ? 0 : newPosition;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [reels.length]);

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

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }

          .animate-scale-in {
            animation: scaleIn 0.5s ease-out forwards;
          }

          .animate-slide-in-left {
            animation: slideInLeft 0.5s ease-out forwards;
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
                  onClick={() => handlePortfolioClick(project)}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer border-2 border-gray-200 hover:border-emerald-400 transition-all duration-500 shadow-lg hover:shadow-2xl bg-white animate-fade-in-up"
                  style={{ animationDelay: `${(idx % 9) * 0.1}s`, opacity: 0 }}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <video
                      ref={el => {
                        if (el) videoRefs.current[`portfolio-${idx}`] = el;
                      }}
                      src={project.videoUrl}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loop
                      muted
                      playsInline
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLVideoElement;
                        target.play().catch((err: Error) => console.log('Play error:', err));
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLVideoElement;
                        target.pause();
                      }}
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <div className="text-emerald-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                        {categories.find(c => c.id === project.category)?.name}
                      </div>
                      <h3 className="text-white text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm">{project.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10">
                    {project.result}
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-20">
                    <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center animate-pulse shadow-2xl">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
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
        {selectedPortfolio && (
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
                <video
                  src={selectedPortfolio.videoUrl}
                  className="w-full aspect-video"
                  controls
                  autoPlay
                />
                <div className="p-6">
                  <div className="text-emerald-500 text-sm font-semibold mb-2 uppercase">
                    {categories.find(c => c.id === selectedPortfolio.category)?.name}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPortfolio.title}</h3>
                  <p className="text-emerald-500 font-semibold text-lg mb-2">{selectedPortfolio.result}</p>
                  <p className="text-gray-600">{selectedPortfolio.description}</p>
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
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-services {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-reels {
          display: flex;
          gap: 1.5rem;
          animation: scroll 40s linear infinite;
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

      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-bold text-gray-900">
                FAHAD<span className="text-gray-400">.</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-600 hover:text-gray-900 font-medium transition">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-gray-900 font-medium transition">About</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-600 hover:text-gray-900 font-medium transition">Services</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-gray-600 hover:text-gray-900 font-medium transition">Portfolio</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-600 hover:text-gray-900 font-medium transition">Testimonials</button>
              <a 
                href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-600 transition font-medium"
              >
                Hire Me
              </a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-900">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 pt-2 pb-4 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block text-gray-600 hover:text-gray-900 py-2 w-full text-left font-medium">Home</button>
              <button onClick={() => scrollToSection('about')} className="block text-gray-600 hover:text-gray-900 py-2 w-full text-left font-medium">About</button>
              <button onClick={() => scrollToSection('services')} className="block text-gray-600 hover:text-gray-900 py-2 w-full text-left font-medium">Services</button>
              <button onClick={() => scrollToSection('portfolio')} className="block text-gray-600 hover:text-gray-900 py-2 w-full text-left font-medium">Portfolio</button>
              <button onClick={() => scrollToSection('testimonials')} className="block text-gray-600 hover:text-gray-900 py-2 w-full text-left font-medium">Testimonials</button>
              <a 
                href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-emerald-500 text-white px-6 py-2.5 rounded-lg text-center font-medium"
              >
                Hire Me
              </a>
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
                <img 
                  src=".\profile.jpg" 
                  alt="Fahad"
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

      {/* Recent Work Section */}
      <section className="py-20 px-4 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-12">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Recent Work</h2>
            <p className="text-xl text-gray-600">Professional video editing and optimization</p>
          </div>
        </div>

        <div className="relative group overflow-hidden">
          <div 
            className="flex gap-6 animate-scroll-reels" 
            style={{
              width: 'fit-content'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = 'paused';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = 'running';
            }}
          >
            {[...reels, ...reels].map((reel, idx) => (
              <div 
                key={idx}
                onClick={() => handleVideoClick(reel)}
                className="group/card relative overflow-hidden rounded-2xl border-2 border-emerald-200 hover:border-emerald-500 transition-all duration-500 hover:scale-105 cursor-pointer flex-shrink-0 shadow-lg"
                style={{ width: '280px', height: '500px' }}
              >
                <video
                  ref={el => {
                    if (el) videoRefs.current[`reel-${idx}`] = el;
                  }}
                  src={reel.videoUrl}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLVideoElement;
                    target.play().catch((err: Error) => console.log('Play error:', err));
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLVideoElement;
                    target.pause();
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover/card:opacity-80 transition"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center animate-pulse">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <h3 className="text-white font-bold text-lg mb-1">{reel.title}</h3>
                  <div className="flex items-center justify-end">
                    <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-sm text-white">{reel.duration}</span>
                  </div>
                </div>
              </div>
            ))}
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
                <video
                  src={selectedVideo.videoUrl}
                  className="w-full aspect-video"
                  controls
                  autoPlay
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h3>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span>{selectedVideo.duration}</span>
                  </div>
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

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Complete YouTube Solutions</h2>
            <p className="text-xl text-gray-600">Everything you need to dominate YouTube in 2025</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {services.slice(0, 3).map((service, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 group cursor-pointer hover:transform hover:scale-105 hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-500 transition">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-emerald-500 font-bold text-xl">{service.price}</span>
                  <a 
                    href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition flex items-center space-x-1"
                  >
                    <span>Order Now</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="relative group/services overflow-hidden">
            <div 
              className="flex gap-6 scroll-services-container" 
              style={{
                width: 'fit-content'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.animationPlayState = 'paused';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.animationPlayState = 'running';
              }}
            >
              {[...services.slice(3), ...services.slice(3)].map((service, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 group/card cursor-pointer hover:transform hover:scale-105 hover:shadow-xl flex-shrink-0"
                  style={{ width: '350px' }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover/card:scale-110 group-hover/card:rotate-3 transition-all shadow-lg">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover/card:text-emerald-500 transition">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-emerald-500 font-bold text-xl">{service.price}</span>
                    <a 
                      href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition flex items-center space-x-1"
                    >
                      <span>Order Now</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Success Stories</h2>
            <p className="text-xl text-gray-600">Real results from real clients - proven track record</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {portfolio.map((project, idx) => (
              <div 
                key={idx}
                onClick={() => handlePortfolioClick(project)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer border-2 border-gray-200 hover:border-emerald-400 transition-all duration-500 shadow-lg"
              >
                <div className="aspect-video overflow-hidden relative">
                  <video
                    ref={el => {
                      if (el) videoRefs.current[`portfolio-home-${idx}`] = el;
                    }}
                    src={project.videoUrl}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loop
                    muted
                    playsInline
                    autoPlay
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-white text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-emerald-300 font-semibold text-lg mb-1">{project.result}</p>
                    <p className="text-gray-300 text-sm">{project.description}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10">
                  {project.result}
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-20">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center animate-pulse">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={openPortfolioPage}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105"
            >
              <Award className="w-6 h-6" />
              <span>View All Portfolio</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {selectedPortfolio && (
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
              <video
                src={selectedPortfolio.videoUrl}
                className="w-full aspect-video"
                controls
                autoPlay
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPortfolio.title}</h3>
                <p className="text-emerald-500 font-semibold text-lg mb-2">{selectedPortfolio.result}</p>
                <p className="text-gray-600">{selectedPortfolio.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Client Reviews</h2>
            <p className="text-xl text-gray-600">Don't just take my word for it - hear from satisfied clients</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-emerald-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 border-2 border-emerald-400 shadow-2xl">
            <div className="inline-block bg-emerald-500 text-white rounded-full px-6 py-2 mb-6 text-sm font-bold">
              🎯 Limited Slots Available
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Ready to <span className="text-emerald-500">10X</span> Your Channel?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join 200+ successful creators who transformed their channels into profitable businesses. Let's create your YouTube success story together!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105"
              >
                <span>Start Growing Today</span>
                <ChevronRight className="w-5 h-5" />
              </a>
              <a 
                href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 border-2 border-emerald-500 text-emerald-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition"
              >
                <span>Schedule Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">FAHAD<span className="text-gray-400">.</span></span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Professional YouTube Growth Specialist helping creators build successful channels since 2019.
              </p>
            </div>
            
            <div>
              <h3 className="text-gray-900 font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('services')} className="block text-gray-600 hover:text-emerald-500 transition">Services</button>
                <button onClick={openPortfolioPage} className="block text-gray-600 hover:text-emerald-500 transition">Portfolio</button>
                <button onClick={() => scrollToSection('testimonials')} className="block text-gray-600 hover:text-emerald-500 transition">Reviews</button>
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 font-bold mb-4">Connect</h3>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-500">
              © 2025 Fahad - YouTube Growth Specialist. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}