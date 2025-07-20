'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SuccessStoriesPage() {
  const [scrollY, setScrollY] = useState(0);
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [storyForm, setStoryForm] = useState<{
    name: string;
    position: string;
    hospital: string;
    period: string;
    story: string;
    courses: string[];
    images: File[];
    videos: File[];
    isVerified: boolean;
  }>({
    name: '',
    position: '',
    hospital: '',
    period: '',
    story: '',
    courses: [],
    images: [],
    videos: [],
    isVerified: false
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showFindId, setShowFindId] = useState(false);
  const [showFindPassword, setShowFindPassword] = useState(false);
  const [findIdForm, setFindIdForm] = useState({
    name: '',
    phone: ''
  });
  const [findPasswordForm, setFindPasswordForm] = useState({
    email: '',
    name: '',
    phone: ''
  });
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: '일반 문의'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // 컴포넌트 마운트 시 localStorage에서 로그인 상태 확인
  useEffect(() => {
    const checkLoginState = () => {
      const savedLoginState = localStorage.getItem('isLoggedIn');
      const savedUserName = localStorage.getItem('userName');
      if (savedLoginState === 'true' && savedUserName) {
        setIsLoggedIn(true);
        setUserName(savedUserName);
      }
    };
    checkLoginState();
  }, []);
  const [stories, setStories] = useState([
    {
      name: "김민정",
      position: "서울대학교병원 간호사",
      period: "3개월",
      image: "👩‍⚕️",
      story: "간호학과를 졸업하고 취업 준비를 하던 중 AKUnurse를 알게 되었습니다. 체계적인 커리큘럼과 실무 중심의 강의 덕분에 단 3개월 만에 서울대학교병원에 합격할 수 있었어요. 특히 면접 준비 과정에서 많은 도움을 받았습니다.",
      courses: ["기본간호학", "간호관리학", "면접 특강"],
      result: "서울대학교병원 합격",
      images: [] as string[]
    },
    {
      name: "박수영",
      position: "삼성서울병원 중환자실",
      period: "4개월",
      image: "👨‍⚕️",
      story: "중환자실 간호사가 되고 싶어서 AKUnurse의 중환자 간호 전문과정을 수강했습니다. 실제 케이스 스터디와 시뮬레이션 교육이 정말 도움이 되었어요. 면접에서도 배운 내용을 바탕으로 자신감 있게 답변할 수 있었습니다.",
      courses: ["중환자간호학", "응급간호학", "심전도 판독"],
      result: "삼성서울병원 중환자실 합격",
      images: [] as string[]
    },
    {
      name: "이지현",
      position: "연세세브란스병원 간호사",
      period: "2개월",
      image: "👩‍⚕️",
      story: "다른 병원에서 근무하다가 더 큰 병원으로 이직하고 싶어서 AKUnurse를 선택했습니다. 최신 간호 트렌드와 실무 노하우를 배울 수 있어서 좋았고, 이직 준비 과정에서 많은 도움을 받았어요. 결국 꿈에 그리던 세브란스병원에 합격했습니다!",
      courses: ["최신간호동향", "간호연구", "리더십"],
      result: "연세세브란스병원 합격",
      images: [] as string[]
    },
    {
      name: "정현우",
      position: "아산병원 응급실",
      period: "5개월",
      image: "👨‍⚕️",
      story: "응급실 간호사를 꿈꾸며 AKUnurse에서 체계적으로 준비했습니다. 응급상황 대처법부터 의료진과의 협업까지, 실무에서 바로 활용할 수 있는 내용들을 배웠어요. 교수님들의 풍부한 경험담도 큰 도움이 되었습니다.",
      courses: ["응급간호학", "외상간호", "심폐소생술"],
      result: "서울아산병원 응급실 합격",
      images: [] as string[]
    },
    {
      name: "최은아",
      position: "강남세브란스병원 수술실",
      period: "3개월",
      image: "👩‍⚕️",
      story: "수술실 간호사로 전문성을 키우고 싶어서 AKUnurse를 선택했습니다. 수술 간호의 기초부터 고급 과정까지 단계별로 학습할 수 있어서 좋았어요. 실제 수술실에서 근무하면서도 배운 내용이 많은 도움이 되고 있습니다.",
      courses: ["수술간호학", "마취간호", "감염관리"],
      result: "강남세브란스병원 수술실 합격",
      images: [] as string[]
    },
    {
      name: "홍길동",
      position: "분당서울대병원 간호사",
      period: "4개월",
      image: "👨‍⚕️",
      story: "남자 간호사로서 취업에 대한 고민이 많았는데, AKUnurse에서 체계적으로 준비할 수 있었습니다. 개인별 맞춤 상담과 면접 코칭이 특히 도움이 되었어요. 지금은 분당서울대병원에서 보람차게 근무하고 있습니다.",
      courses: ["기본간호학", "간호윤리", "의사소통"],
      result: "분당서울대병원 합격",
      images: [] as string[]
    }
  ]);

  useEffect(() => {
    // 스크롤 이벤트 리스너
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for smooth animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.animate-on-scroll');
    animatableElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 이미지 파일을 URL로 변환
    const imageUrls = storyForm.images.map(file => URL.createObjectURL(file));
    
    // 새 성공스토리 생성
    const newStory = {
      name: storyForm.name,
      position: storyForm.position,
      period: storyForm.period,
      image: "👤", // 기본 아이콘
      story: storyForm.story,
      courses: storyForm.courses,
      result: `${storyForm.hospital} 합격`,
      images: imageUrls
    };
    
    // 스토리 목록 맨 앞에 새 스토리 추가
    setStories(prevStories => [newStory, ...prevStories]);
    
    // 폼 초기화 및 모달 닫기
    setShowStoryForm(false);
    setStoryForm({
      name: '',
      position: '',
      hospital: '',
      period: '',
      story: '',
      courses: [],
      images: [],
      videos: [],
      isVerified: false
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setStoryForm({...storyForm, images: [...storyForm.images, ...files]});
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setStoryForm({...storyForm, videos: [...storyForm.videos, ...files]});
  };

  const removeImage = (index: number) => {
    const newImages = storyForm.images.filter((_, i) => i !== index);
    setStoryForm({...storyForm, images: newImages});
  };

  const removeVideo = (index: number) => {
    const newVideos = storyForm.videos.filter((_, i) => i !== index);
    setStoryForm({...storyForm, videos: newVideos});
  };

  const courseOptions = [
    '기본간호학 마스터 코스',
    '중환자실 간호 전문과정',
    '간호관리학 실무과정',
    '모성간호학 심화과정',
    '응급간호 전문과정',
    '정신간호학 전문과정',
    '수술간호 전문과정',
    '종양간호 전문과정'
  ];

  const toggleCourse = (course: string) => {
    const newCourses = storyForm.courses.includes(course)
      ? storyForm.courses.filter(c => c !== course)
      : [...storyForm.courses, course];
    setStoryForm({...storyForm, courses: newCourses});
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const subject = encodeURIComponent(`[AKUnurse 문의] ${contactForm.category}: ${contactForm.subject}`);
      const body = encodeURIComponent(
        `이름: ${contactForm.name}\n` +
        `이메일: ${contactForm.email}\n` +
        `연락처: ${contactForm.phone}\n` +
        `문의 유형: ${contactForm.category}\n` +
        `제목: ${contactForm.subject}\n\n` +
        `내용:\n${contactForm.message}\n\n` +
        `---\n` +
        `AKUnurse 홈페이지에서 전송된 문의입니다.`
      );
      
      window.location.href = `mailto:contact@akunurse.com?subject=${subject}&body=${body}`;
      
      alert('문의 내용이 이메일 클라이언트로 전송되었습니다. 메일을 확인하여 전송해주세요.');
      
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: '일반 문의'
      });
      setShowContactModal(false);
      
    } catch (error) {
      alert('문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsContactLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (loginForm.email && loginForm.password) {
        // 이메일에서 사용자 이름 추출 (@ 앞 부분)
        const name = loginForm.email.split('@')[0];
        setUserName(name);
        setIsLoggedIn(true);
        // localStorage에 로그인 상태 저장
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', name);
        alert(`환영합니다! ${name}님`);
        setShowLoginModal(false);
        setLoginForm({ email: '', password: '', rememberMe: false });
      } else {
        alert('이메일과 비밀번호를 입력해주세요.');
      }
    } catch (error) {
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindId = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`${findIdForm.name}님의 아이디는 user***@example.com 입니다.`);
      setShowFindId(false);
      setFindIdForm({ name: '', phone: '' });
    } catch (error) {
      alert('아이디 찾기 실패. 입력 정보를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('임시 비밀번호가 이메일로 발송되었습니다.');
      setShowFindPassword(false);
      setFindPasswordForm({ email: '', name: '', phone: '' });
    } catch (error) {
      alert('비밀번호 찾기 실패. 입력 정보를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 page-enter">
      {/* Netflix 스타일 애니메이션 CSS */}
      <style jsx global>{`
        /* 페이지 진입 애니메이션 */
        .page-enter {
          animation: pageEnter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        @keyframes pageEnter {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        /* 페이지 전환 시 부드러운 효과 */
        .page-transition {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        ::-webkit-scrollbar {
          width: 12px !important;
          -webkit-appearance: none !important;
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(148, 163, 184, 0.5) !important;
          border-radius: 4px !important;
          background: rgba(148, 163, 184, 0.3);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #0ea5e9, #3b82f6) !important;
          border-radius: 4px !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          background: linear-gradient(to bottom, #0ea5e9, #3b82f6);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0284c7, #2563eb) !important;
          background: linear-gradient(to bottom, #0284c7, #2563eb);
        }
        
        html {
          overflow-y: scroll !important;
          scroll-behavior: smooth;
        }
        
        .netflix-fade-in {
          opacity: 0;
          transform: translateY(60px) scale(0.95);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .netflix-fade-in.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        
        .netflix-slide-in {
          opacity: 0;
          transform: translateX(-100px);
          transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .netflix-slide-in.animate-in {
          opacity: 1;
          transform: translateX(0);
        }
        
        .netflix-zoom-in {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .netflix-zoom-in.animate-in {
          opacity: 1;
          transform: scale(1);
        }
        
        .netflix-card {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        
        .netflix-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .netflix-nav {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        
        .netflix-nav:hover {
          transform: translateY(-2px);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #0ea5e9, #3b82f6, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .netflix-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .netflix-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .netflix-button:hover::before {
          left: 100%;
        }
        
        .netflix-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {/* 네비게이션 바 */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 netflix-fade-in animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-16">
            <Link href="/" className="text-2xl font-bold gradient-text netflix-nav -ml-8">
              AKUnurse
            </Link>
            
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-sky-700 hover:text-sky-900 transition-colors netflix-nav font-semibold">홈</Link>
                <Link href="/professors" className="text-sky-700 hover:text-sky-900 transition-colors netflix-nav font-semibold">교수 소개</Link>
                <Link href="/courses" className="text-sky-700 hover:text-sky-900 transition-colors netflix-nav font-semibold">강의 신청</Link>
                <Link href="/reviews" className="text-sky-700 hover:text-sky-900 transition-colors netflix-nav font-semibold">강의 리뷰</Link>
                <Link href="/success-stories" className="text-sky-900 font-bold netflix-nav">합격 후기</Link>
                <Link href="/my-class" className="text-sky-700 hover:text-sky-900 transition-colors netflix-nav font-semibold">My Class</Link>
              </div>
            </div>
            
            <div className="ml-auto flex items-center space-x-4 -mr-8">
              <Link href="/cart" className="relative netflix-nav">
                <div className="w-6 h-6 cursor-pointer">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-sky-700 hover:text-sky-900 transition-colors">
                    <path d="M19 7H16V6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6V7H5C4.44772 7 4 7.44772 4 8V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V8C20 7.44772 19.5523 7 19 7ZM10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6V7H10V6ZM18 19H6V9H8V10C8 10.5523 8.44772 11 9 11C9.55228 11 10 10.5523 10 10V9H14V10C14 10.5523 14.4477 11 15 11C15.5523 11 16 10.5523 16 10V9H18V19Z" fill="currentColor"/>
                  </svg>
                </div>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              
              {/* 로그인 상태 표시 */}
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sky-700 font-semibold">
                    {userName}님
                  </span>
                  <button 
                    onClick={() => {
                      setIsLoggedIn(false);
                      setUserName('');
                      // localStorage에서 로그인 상태 제거
                      localStorage.removeItem('isLoggedIn');
                      localStorage.removeItem('userName');
                      alert('로그아웃되었습니다.');
                    }}
                    className="text-gray-600 hover:text-gray-800 transition-colors font-bold text-sm"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                    className="text-gray-600 hover:text-gray-800 transition-colors font-bold text-sm"
              >
                로그인
              </button>
              )}
              
              <button 
                onClick={() => setShowContactModal(true)}
                className="text-gray-600 hover:text-gray-800 transition-colors font-bold text-sm"
              >
                문의
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="relative py-20 px-4 overflow-hidden" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-sky-400/5 via-blue-500/5 to-indigo-600/5"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold text-sky-900 mb-6 gradient-text netflix-fade-in animate-on-scroll">
            합격후기
          </h1>
          <p className="text-xl text-sky-700 mb-8 max-w-3xl mx-auto netflix-slide-in animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            AKUnurse와 함께 꿈을 이룬 수강생들의 진솔한 이야기를 들어보세요. <br />
            여러분의 성공 스토리가 다음 주인공이 될 수 있습니다.
          </p>
        </div>
        
        {/* 플로팅 요소들 */}
        <div className="absolute top-10 left-8 w-16 h-16 bg-sky-200/20 rounded-full blur-xl animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 right-12 w-24 h-24 bg-blue-200/15 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }}></div>
      </section>

      {/* 성공 사례 통계 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
            {[
              { number: "1,247", label: "총 합격자 수", delay: "0s" },
              { number: "94.2%", label: "합격률", delay: "0.1s" },
              { number: "3.2개월", label: "평균 합격 기간", delay: "0.2s" },
              { number: "98%", label: "만족도", delay: "0.3s" }
            ].map((stat, index) => (
              <div key={index} className="netflix-zoom-in animate-on-scroll" style={{ transitionDelay: stat.delay }}>
                <div className="text-4xl font-bold gradient-text mb-2 netflix-card">{stat.number}</div>
                <div className="text-sky-700 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 성공 스토리 */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-sky-900 mb-6 gradient-text netflix-fade-in animate-on-scroll">
            당신의 합격 후기를 남겨주세요
          </h2>
          <p className="text-lg text-sky-700 mb-8 netflix-slide-in animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            성공 경험을 공유하여 다른 학습자들에게 용기를 주세요
          </p>
          <button 
            onClick={() => setShowStoryForm(true)}
            className="bg-sky-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-sky-700 transition-colors netflix-button netflix-zoom-in animate-on-scroll" 
            style={{ transitionDelay: '0.4s' }}
          >
            합격후기 작성하기
          </button>
        </div>
      </section>

      {/* 실제 합격 스토리 */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-12 text-center gradient-text netflix-fade-in animate-on-scroll">
            실제 합격 스토리
          </h2>

          <div className="space-y-12">
            {stories.map((story, index) => (
              <div 
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all netflix-card netflix-fade-in animate-on-scroll"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 bg-sky-100 rounded-full flex items-center justify-center text-4xl">
                        {story.image}
                      </div>
                      <h3 className="text-xl font-bold text-sky-900 mb-2">{story.name}</h3>
                      <p className="text-sky-600 mb-2">{story.position}</p>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {story.period} 만에 합격
                      </span>
                    </div>
                  </div>
                  
                  <div className="lg:w-2/3">
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-sky-900 mb-3">합격 스토리</h4>
                      <p className="text-sky-700 leading-relaxed">{story.story}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-sky-900 mb-3">수강 과목</h4>
                      <div className="flex flex-wrap gap-2">
                        {story.courses.map((course, i) => (
                          <span key={i} className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-green-800 mb-2">🎉 합격 결과</h4>
                      <p className="text-green-700 font-semibold">{story.result}</p>
                    </div>
                    
                    {/* 이미지 표시 */}
                    {story.images && story.images.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold text-sky-900 mb-3">📷 사진</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {story.images.map((imageUrl, imageIndex) => (
                            <div key={imageIndex} className="relative">
                              <img
                                src={imageUrl}
                                alt={`${story.name}의 합격 사진 ${imageIndex + 1}`}
                                className="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 성공 비결 섹션 */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-12 text-center gradient-text netflix-fade-in animate-on-scroll">
            합격의 비결
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📚",
                title: "체계적인 학습",
                description: "기초부터 심화까지 단계별 커리큘럼으로 확실한 실력 향상"
              },
              {
                icon: "👨‍🏫",
                title: "전문가 멘토링",
                description: "현직 간호사 출신 교수진의 실무 중심 지도"
              },
              {
                icon: "🎯",
                title: "맞춤형 전략",
                description: "개인별 목표에 맞는 학습 계획과 취업 전략 수립"
              },
              {
                icon: "💡",
                title: "최신 트렌드",
                description: "간호 분야의 최신 동향과 실무 노하우 제공"
              },
              {
                icon: "🤝",
                title: "네트워킹",
                description: "동기들과의 스터디 그룹 및 정보 공유"
              },
              {
                icon: "🏆",
                title: "실전 연습",
                description: "모의면접과 실습을 통한 실전 감각 향상"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white/70 transition-all netflix-card netflix-zoom-in animate-on-scroll"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-sky-900 mb-3">{item.title}</h3>
                <p className="text-sky-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 px-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 netflix-fade-in animate-on-scroll">
            당신도 성공할 수 있습니다!
          </h2>
          <p className="text-xl mb-8 opacity-90 netflix-slide-in animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            1,200명 이상의 합격생들이 증명한 AKUnurse의 노하우를 경험해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-sky-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors netflix-button netflix-zoom-in animate-on-scroll" style={{ transitionDelay: '0.4s' }}>
              무료 상담 신청
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-sky-600 transition-colors netflix-button netflix-zoom-in animate-on-scroll" style={{ transitionDelay: '0.6s' }}>
              강의 둘러보기
            </button>
          </div>
        </div>
      </section>

      {/* 합격후기 작성 모달 */}
      {showStoryForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-sky-900">✍️ 합격후기 작성하기</h3>
                <button
                  onClick={() => setShowStoryForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <p className="text-sky-600 mt-2">여러분의 소중한 합격 경험을 후배들과 공유해주세요!</p>
            </div>

            <form onSubmit={handleStorySubmit} className="p-6 space-y-6">
              {/* 기본 정보 */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-sky-900 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    value={storyForm.name}
                    onChange={(e) => setStoryForm({...storyForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="실명을 입력해주세요"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-sky-900 mb-2">
                    합격 직책 *
                  </label>
                  <input
                    type="text"
                    value={storyForm.position}
                    onChange={(e) => setStoryForm({...storyForm, position: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="예: 서울대학교병원 간호사"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-sky-900 mb-2">
                    합격 병원/기관 *
                  </label>
                  <input
                    type="text"
                    value={storyForm.hospital}
                    onChange={(e) => setStoryForm({...storyForm, hospital: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="예: 서울대학교병원"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-sky-900 mb-2">
                    준비 기간 *
                  </label>
                  <input
                    type="text"
                    value={storyForm.period}
                    onChange={(e) => setStoryForm({...storyForm, period: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="예: 3개월"
                    required
                  />
                </div>
              </div>

              {/* 수강 과목 선택 */}
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  수강한 과목 (복수 선택 가능)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {courseOptions.map((course) => (
                    <label key={course} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={storyForm.courses.includes(course)}
                        onChange={() => toggleCourse(course)}
                        className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                      />
                      <span className="text-sm text-sky-700">{course}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 합격 스토리 */}
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  합격 스토리 * (최소 10자)
                </label>
                <textarea
                  value={storyForm.story}
                  onChange={(e) => setStoryForm({...storyForm, story: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  rows={6}
                  placeholder="AKUnurse에서 어떻게 공부했는지, 어떤 도움을 받았는지, 합격까지의 과정을 자세히 써주세요. 후배들에게 도움이 되는 구체적인 팁이나 경험담을 포함해주시면 더욱 좋습니다."
                  minLength={10}
                  required
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {storyForm.story.length}/10자 이상
                </div>
              </div>

              {/* 사진 업로드 */}
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  사진 첨부 (선택사항)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-sky-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="text-4xl mb-2">📷</div>
                    <p className="text-sky-600 font-medium">클릭하여 사진을 업로드하세요</p>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG, GIF 파일 지원 (최대 10MB)</p>
                  </label>
                </div>
                
                {storyForm.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-sky-900 mb-2">업로드된 사진:</p>
                    <div className="flex flex-wrap gap-2">
                      {storyForm.images.map((file, index) => (
                        <div key={index} className="relative bg-sky-50 px-3 py-2 rounded-lg">
                          <span className="text-sm text-sky-700">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 영상 업로드 */}
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  영상 첨부 (선택사항)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-sky-400 transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <div className="text-4xl mb-2">🎥</div>
                    <p className="text-sky-600 font-medium">클릭하여 영상을 업로드하세요</p>
                    <p className="text-sm text-gray-500 mt-1">MP4, MOV, AVI 파일 지원 (최대 100MB)</p>
                  </label>
                </div>
                
                {storyForm.videos.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-sky-900 mb-2">업로드된 영상:</p>
                    <div className="flex flex-wrap gap-2">
                      {storyForm.videos.map((file, index) => (
                        <div key={index} className="relative bg-sky-50 px-3 py-2 rounded-lg">
                          <span className="text-sm text-sky-700">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeVideo(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 동의 체크박스 */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={storyForm.isVerified}
                    onChange={(e) => setStoryForm({...storyForm, isVerified: e.target.checked})}
                    className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 mt-1"
                    required
                  />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium text-sky-900 mb-1">개인정보 수집 및 이용 동의 *</p>
                    <p>
                      • 수집 목적: 합격후기 게시 및 검증<br/>
                      • 수집 항목: 이름, 연락처, 합격 정보, 첨부 파일<br/>
                      • 보유 기간: 게시 종료 시까지<br/>
                      • 위 내용에 동의하며, 허위 정보 작성 시 게시가 거부될 수 있음을 이해합니다.
                    </p>
                  </div>
                </label>
              </div>

              {/* 제출 버튼 */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowStoryForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all transform hover:scale-105 font-semibold"
                >
                  합격후기 제출하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 로그인 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-sky-900">로그인</h3>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <p className="text-sky-600 mt-2">AKUnurse에 오신 것을 환영합니다!</p>
            </div>

            <form onSubmit={handleLogin} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="이메일을 입력해주세요"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  비밀번호 *
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="비밀번호를 입력해주세요"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={loginForm.rememberMe}
                    onChange={(e) => setLoginForm({...loginForm, rememberMe: e.target.checked})}
                    className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                  />
                  <span className="ml-2 text-sm text-sky-700">로그인 상태 유지</span>
                </label>
                <div className="flex space-x-2 text-sm">
                  <button 
                    type="button"
                    onClick={() => setShowFindId(true)}
                    className="text-sky-600 hover:text-sky-800"
                  >
                    아이디 찾기
                  </button>
                  <span className="text-gray-300">|</span>
                  <button 
                    type="button"
                    onClick={() => setShowFindPassword(true)}
                    className="text-sky-600 hover:text-sky-800"
                  >
                    비밀번호 찾기
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  계정이 없으신가요?{' '}
                  <Link href="/signup" className="text-sky-600 hover:text-sky-800 font-semibold">
                    회원가입
                  </Link>
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">또는</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center"
                >
                  <span className="mr-2">🔍</span>
                  Google로 로그인
                </button>
                <button
                  type="button"
                  className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-semibold flex items-center justify-center"
                >
                  <span className="mr-2">💬</span>
                  카카오로 로그인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 아이디 찾기 모달 */}
      {showFindId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-sky-900">아이디 찾기</h3>
                <button
                  onClick={() => setShowFindId(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <p className="text-sky-600 mt-2">가입 시 입력한 정보로 아이디를 찾아드립니다.</p>
            </div>

            <form onSubmit={handleFindId} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  value={findIdForm.name}
                  onChange={(e) => setFindIdForm({...findIdForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="가입 시 입력한 이름"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  휴대폰 번호 *
                </label>
                <input
                  type="tel"
                  value={findIdForm.phone}
                  onChange={(e) => setFindIdForm({...findIdForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="010-0000-0000"
                  required
                />
              </div>

              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-sky-500 mt-0.5">ℹ️</div>
                  <div className="text-sm text-sky-700">
                    <p className="font-semibold mb-1">안내사항</p>
                    <ul className="space-y-1 text-xs">
                      <li>• 가입 시 입력한 정보와 일치해야 합니다</li>
                      <li>• 아이디의 일부만 표시됩니다</li>
                      <li>• 개인정보 보호를 위해 마스킹 처리됩니다</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowFindId(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? '찾는 중...' : '아이디 찾기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 비밀번호 찾기 모달 */}
      {showFindPassword && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-sky-900">비밀번호 찾기</h3>
                <button
                  onClick={() => setShowFindPassword(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <p className="text-sky-600 mt-2">임시 비밀번호를 이메일로 발송해드립니다.</p>
            </div>

            <form onSubmit={handleFindPassword} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  value={findPasswordForm.email}
                  onChange={(e) => setFindPasswordForm({...findPasswordForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="가입 시 사용한 이메일"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  value={findPasswordForm.name}
                  onChange={(e) => setFindPasswordForm({...findPasswordForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="가입 시 입력한 이름"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  휴대폰 번호 *
                </label>
                <input
                  type="tel"
                  value={findPasswordForm.phone}
                  onChange={(e) => setFindPasswordForm({...findPasswordForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="010-0000-0000"
                  required
                />
              </div>

              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-sky-500 mt-0.5">🔒</div>
                  <div className="text-sm text-sky-700">
                    <p className="font-semibold mb-1">보안 안내</p>
                    <ul className="space-y-1 text-xs">
                      <li>• 임시 비밀번호가 이메일로 발송됩니다</li>
                      <li>• 로그인 후 반드시 비밀번호를 변경해주세요</li>
                      <li>• 임시 비밀번호는 24시간 후 만료됩니다</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowFindPassword(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? '발송 중...' : '임시 비밀번호 발송'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 문의 모달 */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-sky-900">문의하기</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <p className="text-sky-600 mt-2">궁금한 점이 있으시면 언제든지 문의해주세요!</p>
            </div>

            <form onSubmit={handleContactSubmit} className="p-6 space-y-6">
              {/* 문의 유형 */}
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  문의 유형 *
                </label>
                <select
                  value={contactForm.category}
                  onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  required
                >
                  <option value="일반 문의">일반 문의</option>
                  <option value="강의 문의">강의 문의</option>
                  <option value="수강신청 문의">수강신청 문의</option>
                  <option value="기술 지원">기술 지원</option>
                  <option value="환불 문의">환불 문의</option>
                  <option value="제휴 문의">제휴 문의</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* 이름 */}
                <div>
                  <label className="block text-sm font-semibold text-sky-900 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="이름을 입력해주세요"
                    required
                  />
                </div>

                {/* 이메일 */}
                <div>
                  <label className="block text-sm font-semibold text-sky-900 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="이메일을 입력해주세요"
                    required
                  />
                </div>
              </div>

              {/* 연락처 */}
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  연락처
                </label>
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="010-0000-0000 (선택사항)"
                />
              </div>

              {/* 제목 */}
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  제목 *
                </label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="문의 제목을 입력해주세요"
                  required
                />
              </div>

              {/* 내용 */}
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  문의 내용 *
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent h-32 resize-none"
                  placeholder="문의하실 내용을 자세히 작성해주세요"
                  required
                />
              </div>

              {/* 안내 메시지 */}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="text-sky-500 mt-0.5">ℹ️</div>
                  <div className="text-sm text-sky-700">
                    <p className="font-semibold mb-1">문의 처리 안내</p>
                    <ul className="space-y-1 text-xs">
                      <li>• 일반 문의: 24시간 이내 답변</li>
                      <li>• 기술 지원: 12시간 이내 답변</li>
                      <li>• 긴급 문의: contact@akunurse.com으로 직접 연락</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 제출 버튼 */}
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isContactLoading}
                  className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isContactLoading ? '전송 중...' : '문의 보내기'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  취소
                </button>
              </div>


            </form>
          </div>
        </div>
      )}
    </div>
  );
} 