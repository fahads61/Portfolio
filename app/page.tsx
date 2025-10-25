'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Award, TrendingUp, Video, Youtube, Search, Zap, ChevronRight, ChevronLeft, Menu, X, Star, CheckCircle, ArrowDown, BarChart3, DollarSign, Users, Target, Settings, Shield, Lightbulb, Clock } from 'lucide-react';

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

  const portfolio: PortfolioType[] = [
    { 
      title: "Video Editing", 
      result: "Professional Edits", 
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=350&fit=crop",
      description: "High-quality video editing",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    { 
      title: "Thumbnail Design", 
      result: "Eye-Catching Designs", 
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=350&fit=crop",
      description: "Professional thumbnails",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    { 
      title: "Graphic Designing", 
      result: "Creative Graphics", 
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&h=350&fit=crop",
      description: "Custom graphics & branding",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    { 
      title: "Channel Branding", 
      result: "Complete Branding", 
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=350&fit=crop",
      description: "Channel art & assets",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    { 
      title: "SEO Optimization", 
      result: "Top Rankings", 
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&h=350&fit=crop",
      description: "YouTube SEO services",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    },
    { 
      title: "Content Strategy", 
      result: "Growth Strategy", 
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&h=350&fit=crop",
      description: "Strategic planning",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
    }
  ];

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

  const toggleVideoPlay = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      if (video.paused) {
        video.play().catch((err: Error) => console.log('Play error:', err));
        setIsVideoPlaying(prev => ({ ...prev, [id]: true }));
      } else {
        video.pause();
        setIsVideoPlaying(prev => ({ ...prev, [id]: false }));
      }
    }
  };

  const reelsPerPage = 3;
  const totalPages = Math.ceil(reels.length / reelsPerPage);
  const currentReels = reels.slice(currentReelPage * reelsPerPage, (currentReelPage + 1) * reelsPerPage);

  const nextReelPage = () => {
    setCurrentReelPage((prev) => (prev + 1) % totalPages);
  };

  const prevReelPage = () => {
    setCurrentReelPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

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

        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-scroll-reels {
          display: flex;
          gap: 1.5rem;
          animation: scroll 40s linear infinite;
        }

        .scroll-services-container {
          animation: scroll-services 30s linear infinite;
        }
      `}</style>

      <nav className="fixed w-full z-50 bg-black/98 backdrop-blur-xl border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 2C13.5 2 15 3.5 15 6C15 8.5 13.5 10 13.5 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M21 6L3 2L5 12L3 22L21 18V6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                  <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="text-2xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Fahad</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-500 hover:text-cyan-400 transition">Home</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-gray-500 hover:text-cyan-400 transition">Portfolio</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-500 hover:text-cyan-400 transition">Services</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-500 hover:text-cyan-400 transition">Reviews</button>
              <a 
                href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition transform hover:scale-105 font-semibold"
              >
                Hire Me Now
              </a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-cyan-400">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-zinc-950 border-t border-cyan-500/10">
            <div className="px-4 pt-2 pb-4 space-y-3">
              <button onClick={() => scrollToSection('home')} className="block text-gray-500 hover:text-cyan-400 py-2 w-full text-left">Home</button>
              <button onClick={() => scrollToSection('portfolio')} className="block text-gray-500 hover:text-cyan-400 py-2 w-full text-left">Portfolio</button>
              <button onClick={() => scrollToSection('services')} className="block text-gray-500 hover:text-cyan-400 py-2 w-full text-left">Services</button>
              <button onClick={() => scrollToSection('testimonials')} className="block text-gray-500 hover:text-cyan-400 py-2 w-full text-left">Reviews</button>
              <a 
                href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg text-center font-semibold"
              >
                Hire Me Now
              </a>
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center py-20">
          <div className="inline-block mb-8 relative">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-1 shadow-2xl shadow-cyan-500/50 animate-pulse flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-6xl font-bold text-white">
                F
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full px-4 py-2 text-sm font-bold shadow-lg">
              ⭐ Top Rated
            </div>
          </div>

          <div className="mb-6">
            <div className="inline-block bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full px-6 py-2 mb-6 border border-cyan-500/30">
              <span className="text-cyan-400 font-semibold">🚀 YouTube Growth Specialist</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your Channel Into
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient">
              A Revenue Machine
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-8 leading-relaxed">
            Professional YouTube services with <span className="text-cyan-400 font-semibold">5+ years experience</span> and <span className="text-cyan-400 font-semibold">800+ successful projects</span>. From zero to monetization, I'll handle everything while you focus on creating content.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a 
              href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Start Your Growth Journey</span>
              <ChevronRight className="w-5 h-5" />
            </a>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="border-2 border-cyan-500/50 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cyan-500/10 hover:border-cyan-400 transition flex items-center space-x-2 backdrop-blur-sm"
            >
              <span>View Success Stories</span>
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto mb-12 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Recent Work</span>
            </h2>
            <p className="text-xl text-gray-500">Professional video editing and optimization</p>
          </div>
        </div>

        <div className="relative z-10 group overflow-hidden">
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
                className="group/card relative overflow-hidden rounded-2xl border-2 border-cyan-500/20 hover:border-cyan-400 transition-all duration-500 hover:scale-105 cursor-pointer flex-shrink-0"
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
                  <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center animate-pulse">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <h3 className="text-white font-bold text-lg mb-1">{reel.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-semibold">{reel.views} views</span>
                    <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-sm">{reel.duration}</span>
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
                className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="bg-zinc-950 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-2xl shadow-cyan-500/50">
                <video
                  src={selectedVideo.videoUrl}
                  className="w-full aspect-video"
                  controls
                  autoPlay
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h3>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <span className="text-cyan-400 font-semibold">{selectedVideo.views} views</span>
                    <span>{selectedVideo.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto mt-20 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-zinc-950 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition text-center">
              <div className="text-cyan-400 mb-2 flex justify-center"><CheckCircle className="w-6 h-6" /></div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1">800+</div>
              <div className="text-gray-500 text-sm">Projects Delivered</div>
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition text-center">
              <div className="text-cyan-400 mb-2 flex justify-center"><TrendingUp className="w-6 h-6" /></div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1">200+</div>
              <div className="text-gray-500 text-sm">Channels Grown</div>
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition text-center">
              <div className="text-cyan-400 mb-2 flex justify-center"><Clock className="w-6 h-6" /></div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1">5+</div>
              <div className="text-gray-500 text-sm">Years Experience</div>
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition text-center">
              <div className="text-cyan-400 mb-2 flex justify-center"><Star className="w-6 h-6" /></div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1">100%</div>
              <div className="text-gray-500 text-sm">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Complete YouTube Solutions</span>
            </h2>
            <p className="text-xl text-gray-500">Everything you need to dominate YouTube in 2025</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {services.slice(0, 3).map((service, idx) => (
              <div 
                key={idx}
                className="bg-black rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 group cursor-pointer hover:transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg shadow-cyan-500/50">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition">{service.title}</h3>
                <p className="text-gray-500 mb-4">{service.description}</p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-400 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-cyan-500/20">
                  <span className="text-cyan-400 font-bold text-xl">{service.price}</span>
                  <a 
                    href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition flex items-center space-x-1"
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
                  className="bg-black rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 group/card cursor-pointer hover:transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 flex-shrink-0"
                  style={{ width: '350px' }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover/card:scale-110 group-hover/card:rotate-3 transition-all shadow-lg shadow-cyan-500/50">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover/card:text-cyan-400 transition">{service.title}</h3>
                  <p className="text-gray-500 mb-4">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <span className="text-gray-400 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-cyan-500/20">
                    <span className="text-cyan-400 font-bold text-xl">{service.price}</span>
                    <a 
                      href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition flex items-center space-x-1"
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

      <section id="portfolio" className="py-20 px-4 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-500">Real results from real clients - proven track record</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.map((project, idx) => (
              <div 
                key={idx}
                onClick={() => handlePortfolioClick(project)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer border-2 border-cyan-500/20 hover:border-cyan-400 transition-all duration-500"
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
                    autoPlay
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-white text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-cyan-300 font-semibold text-lg mb-1">{project.result}</p>
                    <p className="text-gray-400 text-sm">{project.description}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10">
                  {project.result}
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-20">
                  <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center animate-pulse">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
              </div>
            ))}
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
              className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-zinc-950 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-2xl shadow-cyan-500/50">
              <video
                src={selectedPortfolio.videoUrl}
                className="w-full aspect-video"
                controls
                autoPlay
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedPortfolio.title}</h3>
                <p className="text-cyan-400 font-semibold text-lg mb-2">{selectedPortfolio.result}</p>
                <p className="text-gray-400">{selectedPortfolio.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Client Reviews</span>
            </h2>
            <p className="text-xl text-gray-500">Don't just take my word for it - hear from satisfied clients</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className="bg-black rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-400 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-zinc-950 rounded-3xl p-12 border-2 border-cyan-400/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5"></div>
            <div className="relative z-10">
              <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full px-6 py-2 mb-6 text-sm font-bold">
                🎯 Limited Slots Available
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">10X</span> Your Channel?
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Join 200+ successful creators who transformed their channels into profitable businesses. Let's create your YouTube success story together!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition transform hover:scale-105"
                >
                  <span>Start Growing Today</span>
                  <ChevronRight className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.upwork.com/freelancers/~01b4bda82598a073e9" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 border-2 border-cyan-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cyan-500/10 transition"
                >
                  <span>Schedule Consultation</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 bg-black border-t border-cyan-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 2C13.5 2 15 3.5 15 6C15 8.5 13.5 10 13.5 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M21 6L3 2L5 12L3 22L21 18V6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <circle cx="8" cy="12" r="1.5" fill="currentColor"/>
                    <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Fahad</span>
              </div>
              <p className="text-gray-500 leading-relaxed">
                Professional YouTube Growth Specialist helping creators build successful channels since 2019.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('services')} className="block text-gray-500 hover:text-cyan-400 transition">Services</button>
                <button onClick={() => scrollToSection('portfolio')} className="block text-gray-500 hover:text-cyan-400 transition">Portfolio</button>
                <button onClick={() => scrollToSection('testimonials')} className="block text-gray-500 hover:text-cyan-400 transition">Reviews</button>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Connect</h3>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-400 hover:text-black transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-400 hover:text-black transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-400 hover:text-black transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-cyan-500/10 pt-8 text-center">
            <p className="text-gray-600">
              © 2025 Fahad - YouTube Growth Specialist. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}