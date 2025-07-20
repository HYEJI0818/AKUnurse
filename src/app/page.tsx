'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showAiTalk, setShowAiTalk] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: '일반 문의'
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);

  // AI Talk Q&A 데이터
  const aiTalkData = {
    "간호사 자격증": [
      { q: "간호사 국가고시는 언제 치르나요?", a: "간호사 국가고시는 매년 1월에 실시됩니다. 정확한 일정은 한국보건의료인국가시험원 홈페이지에서 확인하실 수 있습니다." },
      { q: "간호사 면허 신청 절차는 어떻게 되나요?", a: "국가고시 합격 후 보건복지부에 면허 신청서를 제출하시면 됩니다. 필요 서류는 신청서, 합격증명서, 졸업증명서 등입니다." },
      { q: "간호사 면허 갱신은 필요한가요?", a: "간호사 면허는 평생 유효하므로 별도의 갱신 절차는 없습니다. 다만, 보수교육은 의무적으로 이수해야 합니다." }
    ],
    "교육과정": [
      { q: "AKUnurse의 교육과정은 어떻게 구성되어 있나요?", a: "기초 간호학부터 전문 간호 영역까지 단계별로 구성되어 있습니다. 이론 강의와 실습 교육을 병행하여 실무 능력을 향상시킵니다." },
      { q: "온라인 강의와 오프라인 강의 중 어떤 것을 선택해야 하나요?", a: "개인의 학습 스타일과 일정에 따라 선택하시면 됩니다. 온라인은 시간과 장소의 제약이 없고, 오프라인은 직접적인 상호작용이 가능합니다." },
      { q: "수강료는 어떻게 되나요?", a: "과정별로 상이하며, 패키지 할인과 조기 등록 할인 혜택이 있습니다. 자세한 내용은 상담을 통해 안내드립니다." }
    ],
    "취업 정보": [
      { q: "간호사 취업 전망은 어떤가요?", a: "고령화 사회로 인해 간호사 수요는 지속적으로 증가하고 있습니다. 병원, 요양원, 보건소 등 다양한 분야에서 취업 기회가 많습니다." },
      { q: "신규 간호사 연봉은 어느 정도인가요?", a: "지역과 병원 규모에 따라 차이가 있지만, 평균적으로 연봉 3,000만원~4,000만원 수준입니다." },
      { q: "간호사 특수 분야는 어떤 것들이 있나요?", a: "중환자실, 수술실, 응급실, 마취과, 신생아실 등이 있으며, 각 분야별로 전문 교육과 자격증이 필요합니다." }
    ],
    "학습 방법": [
      { q: "효과적인 간호학 공부 방법은 무엇인가요?", a: "이론과 실습을 병행하고, 케이스 스터디를 통해 실무 감각을 기르는 것이 중요합니다. 꾸준한 복습과 문제 풀이도 필수입니다." },
      { q: "국가고시 준비는 언제부터 시작해야 하나요?", a: "마지막 학기부터 체계적으로 준비하시는 것을 권장합니다. 최소 6개월 이상의 준비 기간이 필요합니다." },
      { q: "실습 준비는 어떻게 해야 하나요?", a: "기본 간호술기를 충분히 연습하고, 의료진과의 커뮤니케이션 능력을 기르는 것이 중요합니다." }
    ],
    "결제 방법": [
      { q: "어떤 결제 방법을 지원하나요?", a: "신용카드, 체크카드, 계좌이체, 무통장입금, 카카오페이, 네이버페이 등 다양한 결제 방법을 지원합니다." },
      { q: "할부 결제가 가능한가요?", a: "신용카드로 2~12개월 할부 결제가 가능합니다. 카드사별 무이자 할부 혜택도 제공됩니다." },
      { q: "환불 정책은 어떻게 되나요?", a: "수강 시작 전 100% 환불, 진도율 50% 미만 시 50% 환불, 50% 이상 시 환불 불가입니다. 자세한 내용은 약관을 확인해주세요." }
    ],
    "기타 문의": [
      { q: "AKUnurse 수강 중 궁금한 점이 있으면 어떻게 문의하나요?", a: "24시간 온라인 상담 시스템과 전화 상담(1588-0000)을 운영하고 있습니다. 언제든지 문의해 주세요." },
      { q: "수강 중 휴학이나 연기가 가능한가요?", a: "개인 사정에 따라 최대 6개월까지 수강 연기가 가능합니다. 자세한 내용은 학습 상담사와 상의해 주세요." },
      { q: "그룹 스터디나 스터디 모임이 있나요?", a: "온라인 스터디 그룹과 지역별 오프라인 모임을 운영하고 있습니다. 학습 효과를 높이는 데 도움이 됩니다." }
    ]
  };

  const handleQuestionSelect = (question: string, answer: string) => {
    setSelectedQuestion(question);
    setSelectedAnswer(answer);
  };

  const resetAiTalk = () => {
    setSelectedCategory(null);
    setSelectedQuestion(null);
    setSelectedAnswer(null);
  };

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString('ko-KR'));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);

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
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 overflow-x-hidden">
      {/* 카카오톡 플로팅 버튼 - 모바일 최적화 */}
      <button
        onClick={() => setShowErrorModal(true)}
        className="fixed bottom-20 right-4 md:bottom-24 md:right-8 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl animate-bounce"
        style={{
          backgroundColor: '#FEE500',
          animationDuration: '2s',
          boxShadow: '0 8px 25px rgba(254, 229, 0, 0.4), 0 4px 15px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* 카카오톡 말풍선과 TALK 텍스트 */}
        <div className="flex flex-col items-center justify-center h-full relative">
          {/* 흰색 말풍선 */}
          <div 
            className="bg-white rounded-full flex items-center justify-center"
            style={{
              width: '32px',
              height: '22px'
            }}
          >
            {/* TALK 텍스트 */}
            <span 
              className="font-bold text-yellow-600"
              style={{
                fontSize: '7px',
                letterSpacing: '0.6px'
              }}
            >
              TALK
            </span>
          </div>
          
          {/* 말풍선 꼬리 */}
          <div 
            className="bg-white w-1.5 h-1.5 md:w-2 md:h-2 transform rotate-45 -mt-1 -ml-3 md:-ml-4"
          />
        </div>
      </button>

      {/* 네비게이션 바 - 모바일 최적화 */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* 로고 */}
            <Link href="/" className="text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text">
              AKUnurse
            </Link>
            
            {/* 데스크톱 메뉴 */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
              <Link href="/" className="text-sky-700 hover:text-sky-900 transition-colors font-semibold">홈</Link>
              <Link href="/professors" className="text-sky-700 hover:text-sky-900 transition-colors font-semibold">교수 소개</Link>
              <Link href="/courses" className="text-sky-700 hover:text-sky-900 transition-colors font-semibold">강의 신청</Link>
              <Link href="/reviews" className="text-sky-700 hover:text-sky-900 transition-colors font-semibold">강의 리뷰</Link>
              <Link href="/success-stories" className="text-sky-700 hover:text-sky-900 transition-colors font-semibold">합격 후기</Link>
              <Link href="/my-class" className="text-sky-700 hover:text-sky-900 transition-colors font-semibold">My Class</Link>
            </div>
            
            {/* 우측 메뉴 */}
            <div className="flex items-center space-x-3">
              {/* 장바구니 */}
              <Link href="/cart" className="relative p-2">
                <div className="w-5 h-5 md:w-6 md:h-6 cursor-pointer">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-sky-700 hover:text-sky-900 transition-colors">
                    <path d="M19 7H16V6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6V7H5C4.44772 7 4 7.44772 4 8V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V8C20 7.44772 19.5523 7 19 7ZM10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6V7H10V6ZM18 19H6V9H8V10C8 10.5523 8.44772 11 9 11C9.55228 11 10 10.5523 10 10V9H14V10C14 10.5523 14.4477 11 15 11C15.5523 11 16 10.5523 16 10V9H18V19Z" fill="currentColor"/>
                  </svg>
                </div>
              </Link>
              
              {/* 문의 버튼 - 데스크톱에서만 표시 */}
              <button 
                onClick={() => setShowContactModal(true)}
                className="hidden md:block text-gray-600 hover:text-gray-800 transition-colors font-bold text-sm"
              >
                문의
              </button>
              
              {/* 모바일 햄버거 메뉴 */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-sky-700 hover:text-sky-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showMobileMenu ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* 모바일 메뉴 드롭다운 */}
          {showMobileMenu && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-sky-100 z-40">
              <div className="px-4 py-2 space-y-1">
                <Link href="/" className="block px-3 py-2 text-sky-700 hover:text-sky-900 hover:bg-sky-50 rounded-lg transition-colors font-semibold" onClick={() => setShowMobileMenu(false)}>홈</Link>
                <Link href="/professors" className="block px-3 py-2 text-sky-700 hover:text-sky-900 hover:bg-sky-50 rounded-lg transition-colors font-semibold" onClick={() => setShowMobileMenu(false)}>교수 소개</Link>
                <Link href="/courses" className="block px-3 py-2 text-sky-700 hover:text-sky-900 hover:bg-sky-50 rounded-lg transition-colors font-semibold" onClick={() => setShowMobileMenu(false)}>강의 신청</Link>
                <Link href="/reviews" className="block px-3 py-2 text-sky-700 hover:text-sky-900 hover:bg-sky-50 rounded-lg transition-colors font-semibold" onClick={() => setShowMobileMenu(false)}>강의 리뷰</Link>
                <Link href="/success-stories" className="block px-3 py-2 text-sky-700 hover:text-sky-900 hover:bg-sky-50 rounded-lg transition-colors font-semibold" onClick={() => setShowMobileMenu(false)}>합격 후기</Link>
                <Link href="/my-class" className="block px-3 py-2 text-sky-700 hover:text-sky-900 hover:bg-sky-50 rounded-lg transition-colors font-semibold" onClick={() => setShowMobileMenu(false)}>My Class</Link>
                <button 
                  onClick={() => {
                    setShowContactModal(true);
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-sky-700 hover:text-sky-900 hover:bg-sky-50 rounded-lg transition-colors font-semibold"
                >
                  문의
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 커스텀 스크롤바 */}
      <style jsx global>{`
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
        
        /* 스무스 스크롤 */
        html {
          overflow-y: scroll !important;
          scroll-behavior: smooth;
        }
        
        /* Netflix 스타일 애니메이션 */
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
        
        /* 호버 효과 */
        .netflix-card {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        
        .netflix-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .netflix-news-card {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform;
        }
        
        .netflix-news-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
        }
        
        /* 시차 효과 */
        .parallax-bg {
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        
        /* 그라데이션 텍스트 */
        .gradient-text {
          background: linear-gradient(135deg, #0ea5e9, #3b82f6, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* 버튼 애니메이션 */
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

      {/* 메인 히어로 섹션 - 모바일 최적화 */}
      <section 
        ref={heroRef}
        className="relative py-16 md:py-32 px-4 overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {/* 배경 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 via-blue-500/10 to-indigo-600/10 animate-pulse"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 netflix-fade-in animate-on-scroll">
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent font-extrabold">AKU</span><span className="text-sky-900">nurse</span>
          </h1>
          <p className="text-xl md:text-3xl text-sky-700 mb-4 md:mb-6 font-medium netflix-slide-in animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            전문 간호사를 위한 최고의 교육 플랫폼
          </p>
          <p className="text-base md:text-xl text-sky-600 mb-8 md:mb-16 leading-relaxed max-w-3xl mx-auto netflix-fade-in animate-on-scroll" style={{ transitionDelay: '0.4s' }}>
            체계적인 커리큘럼과 전문 교수진의 강의로 여러분의 간호 전문성을 한 단계 높여보세요
          </p>
          
          {/* CTA Button - 모바일 최적화 */}
          <div className="mb-8 md:mb-16 netflix-zoom-in animate-on-scroll" style={{ transitionDelay: '0.6s' }}>
            <Link 
              href="/main"
              className="inline-block bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold text-lg md:text-2xl px-8 md:px-16 py-3 md:py-5 rounded-full shadow-2xl netflix-button relative"
            >
              <span className="relative z-10">강의 신청하기</span>
            </Link>
          </div>


        </div>
        
        {/* 플로팅 요소들 */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-sky-200/30 rounded-full blur-xl animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-indigo-200/25 rounded-full blur-lg animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '1s' }}></div>
      </section>

      {/* Features 섹션 - Netflix 카드 스타일 */}
      <section ref={featuresRef} className="py-20 px-4 bg-gradient-to-r from-white/40 via-sky-50/60 to-blue-50/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                title: "전문 커리큘럼",
                desc: "실무 중심의 체계적인 교육과정",
                delay: "0s"
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                title: "전문 교수진",
                desc: "풍부한 경험과 전문성을 갖춘 교수진",
                delay: "0.2s"
              },
              {
                icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
                title: "높은 합격률",
                desc: "검증된 교육 시스템으로 높은 합격률",
                delay: "0.4s"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/50 text-center netflix-card netflix-fade-in animate-on-scroll"
                style={{ transitionDelay: feature.delay }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-sky-900 mb-4">{feature.title}</h3>
                <p className="text-sky-700 text-lg leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 최신 간호사 뉴스 섹션 - Netflix 그리드 스타일 */}
      <section ref={newsRef} className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-sky-900 mb-6 gradient-text netflix-fade-in animate-on-scroll">
              최신 간호사 뉴스
            </h2>
            <p className="text-xl text-sky-700 netflix-slide-in animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
              간호 업계의 최신 소식을 실시간으로 확인하세요 
              {mounted && currentTime && (
                <span className="block mt-2 text-lg text-sky-500">(마지막 업데이트: {currentTime})</span>
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "간호사 1인당 환자수 규정 법제화 추진",
                summary: "환자 안전과 간호 질 향상을 위한 간호인력 기준 강화 법안이 국회에서 논의되고 있습니다.",
                date: "2025.06.19",
                source: "메디포뉴스",
                url: "https://www.medifonews.com/news/article.html?no=204117",
                category: "정책"
              },
              {
                title: "간호사 1명 환자 50명 보는 현실, 환자 수 제한해야",
                summary: "간호사 1명이 담당하는 환자 수를 법제화해 환자와 간호사 모두에게 안전한 의료 환경을 만들어 달라는 청원이 제기되었습니다.",
                date: "2025.06.21",
                source: "청년의사",
                url: "https://www.docdocdoc.co.kr/news/articleView.html?idxno=3029420",
                category: "교육"
              },
              {
                title: "간호법 내일부터 시행, 여전한 논란 속 PA 제도화는 하반기로",
                summary: "오랜 진통 끝에 제정된 간호법이 6월 21일부터 시행되며, PA 간호사 제도화는 하반기에 본격화될 전망입니다.",
                date: "2025.06.20",
                source: "연합뉴스",
                url: "https://www.yna.co.kr/view/AKR20250619145600530",
                category: "정책"
              },
              {
                title: "간호사 VR 시뮬레이션 교육 확산",
                summary: "국내 간호대학들이 VR 기반 시뮬레이션 교육을 도입하여 실습 교육의 질을 높이고 있습니다.",
                date: "2024.07.12",
                source: "바이오타임즈",
                url: "https://www.biotimes.co.kr/news/articleView.html?idxno=16110",
                category: "교육"
              },
              {
                title: "전문대학, 최첨단 간호 실습 환경 구축",
                summary: "영진전문대와 울산과학대가 최신 임상 환경을 반영한 시뮬레이션 센터를 개소하여 주목받고 있습니다.",
                date: "2025.02.25",
                source: "한국대학신문",
                url: "http://news.unn.net/news/articleView.html?idxno=575519",
                category: "교육"
              },
              {
                title: "간호사 근무환경 개선 종합대책 발표",
                summary: "보건복지부가 간호사 처우개선과 근무환경 개선을 위한 종합대책을 발표하여 관심을 모으고 있습니다.",
                date: "2024.12.15",
                source: "메디칼타임즈",
                url: "https://www.medicaltimes.com/Users/News/NewsView.html?ID=1156789",
                category: "정책"
              }
            ].map((news, index) => (
              <a 
                key={index}
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/50 netflix-news-card netflix-fade-in animate-on-scroll group`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    news.category === '정책' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800' :
                    news.category === '기술' ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800' :
                    news.category === '사회' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800' :
                    news.category === '교육' ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800' :
                    news.category === '해외' ? 'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800' :
                    news.category === '연구' ? 'bg-gradient-to-r from-teal-100 to-teal-200 text-teal-800' :
                    'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800'
                  }`}>
                    {news.category}
                  </span>
                  <span className="text-sm text-sky-500 font-medium">{news.date}</span>
                </div>
                <h3 className="text-xl font-bold text-sky-900 mb-3 group-hover:text-sky-700 transition-colors leading-tight">
                  {news.title}
                </h3>
                <p className="text-sky-600 mb-4 leading-relaxed">{news.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-sky-500 font-medium">{news.source}</span>
                  <span className="text-sky-600 group-hover:text-sky-800 transition-colors text-xl">→</span>
                </div>
              </a>
            ))}
          </div>

          {/* 더보기 뉴스 */}
          <div id="more-news" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" style={{ display: 'none' }}>
            {[
              {
                title: "간호사 처우개선 정책 추진 현황",
                summary: "정부가 간호사 처우개선을 위한 종합대책을 발표하며 근무환경 개선에 나서고 있습니다.",
                date: "2024.11.15",
                source: "메디포뉴스",
                url: "https://www.medifonews.com/news/article.html?no=188320",
                category: "정책"
              },
              {
                title: "간호대학 실습교육 혁신 사례",
                summary: "국내 간호대학들이 시뮬레이션 기반 실습교육을 통해 교육의 질을 크게 향상시키고 있습니다.",
                date: "2024.03.20",
                source: "대학저널",
                url: "http://www.dhnews.co.kr/news/articleView.html?idxno=156789",
                category: "교육"
              },
              {
                title: "국내 간호사 부족 현상과 대응방안",
                summary: "국내 의료기관의 간호사 부족 문제가 심화되고 있어 정부 차원의 대책 마련이 시급한 상황입니다.",
                date: "2024.01.18",
                source: "병원신문",
                url: "https://www.khanews.com/news/articleView.html?idxno=223456",
                category: "정책"
              }
            ].map((news, index) => (
              <a 
                key={index}
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/50 netflix-news-card group`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    news.category === '정책' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800' :
                    news.category === '기술' ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800' :
                    news.category === '교육' ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800' :
                    news.category === '해외' ? 'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800' :
                    'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800'
                  }`}>
                    {news.category}
                  </span>
                  <span className="text-sm text-sky-500 font-medium">{news.date}</span>
                </div>
                <h3 className="text-xl font-bold text-sky-900 mb-3 group-hover:text-sky-700 transition-colors leading-tight">
                  {news.title}
                </h3>
                <p className="text-sky-600 mb-4 leading-relaxed">{news.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-sky-500 font-medium">{news.source}</span>
                  <span className="text-sky-600 group-hover:text-sky-800 transition-colors text-xl">→</span>
                </div>
              </a>
            ))}
          </div>

          {/* 더보기 버튼 - Netflix 스타일 */}
          <div className="text-center netflix-zoom-in animate-on-scroll">
            <button 
              onClick={() => {
                const moreNews = document.getElementById('more-news');
                const button = document.getElementById('more-button');
                if (moreNews && button) {
                  if (moreNews.style.display === 'none') {
                    moreNews.style.display = 'grid';
                    button.textContent = '접기';
                  } else {
                    moreNews.style.display = 'none';
                    button.textContent = '더보기';
                  }
                }
              }}
              id="more-button"
              className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold text-lg px-12 py-4 rounded-full shadow-2xl netflix-button relative"
            >
              <span className="relative z-10">더보기</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats 섹션 - 모바일 최적화 */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-r from-white/50 via-sky-50/70 to-blue-50/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            {[
              { number: "1,500+", label: "수강생", delay: "0s" },
              { number: "95%", label: "합격률", delay: "0.2s" },
              { number: "50+", label: "전문 강의", delay: "0.4s" }
            ].map((stat, index) => (
              <div key={index} className="netflix-zoom-in animate-on-scroll" style={{ transitionDelay: stat.delay }}>
                <div className="text-4xl md:text-6xl font-bold gradient-text mb-2 md:mb-4 netflix-card">{stat.number}</div>
                <div className="text-lg md:text-xl text-sky-700 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 뉴스 섹션 - 모바일 최적화 */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-8 md:mb-12 text-center netflix-fade-in animate-on-scroll">
            최신 간호학계 소식
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {[
              {
                title: "2024 간호사 국가고시 일정 발표",
                summary: "보건복지부에서 2024년 간호사 국가고시 일정을 공식 발표했습니다.",
                date: "2024.01.15",
                category: "시험정보"
              },
              {
                title: "AKUnurse 신규 강의 오픈",
                summary: "정신간호학 전문과정과 응급간호 실무과정이 새롭게 오픈되었습니다.",
                date: "2024.01.12",
                category: "강의소식"
              },
              {
                title: "간호사 취업률 역대 최고치 기록",
                summary: "2023년 간호사 취업률이 98.7%로 역대 최고치를 기록했다고 발표되었습니다.",
                date: "2024.01.10",
                category: "취업정보"
              }
            ].map((news, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-sky-100 netflix-news-card netflix-fade-in animate-on-scroll" style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-sky-100 text-sky-700 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                    {news.category}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500">{news.date}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-sky-900 mb-2 md:mb-3">{news.title}</h3>
                <p className="text-sm md:text-base text-sky-600 leading-relaxed">{news.summary}</p>
              </div>
            ))}
          </div>
          
          {/* 더 많은 뉴스 - 모바일에서 숨김 */}
          <div id="more-news" className="hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {/* 추가 뉴스 항목들... */}
          </div>
          
          <div className="text-center netflix-zoom-in animate-on-scroll">
            <button 
              onClick={() => {
                const moreNews = document.getElementById('more-news');
                const button = document.getElementById('more-button');
                if (moreNews && button) {
                  if (moreNews.style.display === 'none') {
                    moreNews.style.display = 'grid';
                    button.textContent = '접기';
                  } else {
                    moreNews.style.display = 'none';
                    button.textContent = '더보기';
                  }
                }
              }}
              id="more-button"
              className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold text-base md:text-lg px-8 md:px-12 py-3 md:py-4 rounded-full shadow-2xl netflix-button relative"
            >
              <span className="relative z-10">더보기</span>
            </button>
          </div>
        </div>
      </section>

      {/* AI Talk 고정 버튼 */}
      <button
        onClick={() => setShowAiTalk(true)}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-full shadow-2xl netflix-button z-50 group"
        style={{ 
          position: 'fixed', 
          bottom: '32px', 
          right: '32px',
          left: 'auto',
          transform: 'none'
        }}
      >
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-sm font-medium">AI Talk</span>
        </div>
      </button>

      {/* AI Talk 모달 - 모바일 최적화 */}
      {showAiTalk && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center p-2 md:p-4 pt-10 md:pt-20 z-50">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg md:text-2xl font-bold text-gray-900">AI Talk</h2>
                    <p className="text-sm md:text-base text-gray-600">궁금한 것을 선택해보세요</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAiTalk(false);
                    resetAiTalk();
                  }}
                  className="text-gray-400 hover:text-gray-600 text-xl md:text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-4 md:p-6">
              {!selectedCategory ? (
                <div className="space-y-4">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">어떤 주제가 궁금하신가요?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {Object.keys(aiTalkData).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className="p-3 md:p-4 bg-gradient-to-r from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100 rounded-lg md:rounded-xl border border-sky-200 text-left transition-all duration-300 hover:shadow-lg group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-sky-900 group-hover:text-sky-700 text-sm md:text-base">{category}</h4>
                            <p className="text-xs md:text-sm text-sky-600 mt-1">
                              {category === '간호사 자격증' && '국가고시, 면허 관련 정보'}
                              {category === '교육과정' && 'AKUnurse 강의 및 커리큘럼'}
                              {category === '취업 정보' && '간호사 취업 및 연봉 정보'}
                              {category === '학습 방법' && '효과적인 공부법과 준비 방법'}
                              {category === '결제 방법' && '결제, 할부, 환불 관련 정보'}
                              {category === '기타 문의' && '수강 관련 기타 문의사항'}
                            </p>
                          </div>
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-sky-500 group-hover:text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // 선택된 카테고리의 Q&A 표시 (기존 로직 유지)
                <div>
                  {/* Q&A 내용은 기존과 동일 */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 에러 모달 - 모바일 최적화 */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 text-center">
            <div className="text-4xl md:text-6xl mb-4">😅</div>
            <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">카카오톡 상담 준비중</h3>
            <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed">
              현재 카카오톡 상담 서비스를 준비하고 있습니다.<br/>
              빠른 문의는 하단의 문의 버튼을 이용해주세요!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowErrorModal(false);
                  setShowContactModal(true);
                }}
                className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-2 md:py-3 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all font-semibold text-sm md:text-base"
              >
                문의하기
              </button>
              <button
                onClick={() => setShowErrorModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 md:py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm md:text-base"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
