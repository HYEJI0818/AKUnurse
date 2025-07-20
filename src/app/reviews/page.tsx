'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ReviewsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    course: '',
    rating: 5,
    comment: '',
    isVerified: false
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
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
  
  // 리뷰 필터링 함수
  const getFilteredReviews = () => {
    if (selectedFilter === '전체') {
      return reviews;
    } else if (selectedFilter === '5점') {
      return reviews.filter(review => review.rating === 5);
    } else if (selectedFilter === '4점') {
      return reviews.filter(review => review.rating === 4);
    } else if (selectedFilter === '기본간호학') {
      return reviews.filter(review => review.course.includes('기본간호학'));
    } else if (selectedFilter === '중환자간호') {
      return reviews.filter(review => review.course.includes('중환자'));
    } else if (selectedFilter === '간호관리학') {
      return reviews.filter(review => review.course.includes('간호관리'));
    }
    return reviews;
  };

  const [reviews, setReviews] = useState([
    {
      name: "김간호사",
      course: "기본간호학 마스터 코스",
      rating: 5,
      date: "2024.12.30",
      comment: "정말 체계적이고 실무에 바로 적용할 수 있는 내용들로 구성되어 있어서 만족스러웠습니다. 특히 교수님의 설명이 이해하기 쉬웠고, 질문에도 친절하게 답변해주셔서 감사했어요. 간호사로서 기본기를 다시 한번 탄탄히 할 수 있었습니다.",
      helpful: 24,
      verified: true
    },
    {
      name: "박수간호사",
      course: "중환자실 간호 전문과정",
      rating: 5,
      date: "2024.12.29",
      comment: "중환자실 근무를 준비하면서 수강했는데, 실제 현장에서 필요한 지식들을 정말 자세히 배울 수 있었습니다. 시뮬레이션 영상도 많고, 사례 중심의 강의라 이해가 잘 되었어요. 덕분에 중환자실 면접도 합격했습니다!",
      helpful: 18,
      verified: true
    },
    {
      name: "이주임",
      course: "간호관리학 실무과정",
      rating: 4,
      date: "2024.12.28",
      comment: "관리자로 승진하면서 필요한 지식들을 체계적으로 배울 수 있었습니다. 인사관리, 예산관리, 리더십 등 실무에서 바로 활용할 수 있는 내용들이 많아서 도움이 되었어요. 다만 분량이 많아서 조금 부담스러웠습니다.",
      helpful: 15,
      verified: true
    },
    {
      name: "최신규간호사",
      course: "기본간호학 마스터 코스",
      rating: 5,
      date: "2024.12.27",
      comment: "신규간호사로서 기본기를 다지고 싶어서 수강했는데 정말 도움이 많이 되었습니다. 학교에서 배운 이론을 실무와 연결해서 설명해주셔서 이해가 쉬웠어요. 프리셉터 선생님께도 칭찬받았습니다!",
      helpful: 21,
      verified: true
    },
    {
      name: "정경력간호사",
      course: "모성간호학 심화과정",
      rating: 5,
      date: "2024.12.26",
      comment: "모성간호 분야로 이직을 준비하면서 수강했습니다. 최신 가이드라인과 실무 노하우를 배울 수 있어서 정말 유익했어요. 교수님의 임상 경험담도 많이 들을 수 있어서 좋았습니다. 강력 추천합니다!",
      helpful: 19,
      verified: true
    },
    {
      name: "신규간호사",
      course: "기본간호학 마스터 코스",
      rating: 4,
      date: "2024.12.28",
      comment: "신규간호사로서 기본기를 다지는 데 정말 도움이 되었습니다. 이론과 실무를 연결해서 설명해주셔서 이해가 쉬웠어요. 다만 진도가 조금 빨라서 따라가기 힘든 부분도 있었습니다.",
      helpful: 12,
      verified: true
    },
    {
      name: "한경력간호사",
      course: "간호관리학 실무과정",
      rating: 4,
      date: "2024.12.25",
      comment: "관리자 준비를 위해 수강했습니다. 실무 중심의 내용이 많아서 좋았고, 특히 인사관리 부분이 유익했어요. 조금 더 사례가 많았으면 좋겠습니다.",
      helpful: 8,
      verified: true
    },
    {
      name: "곽수간호사",
      course: "중환자실 간호 전문과정",
      rating: 4,
      date: "2024.12.24",
      comment: "중환자실 이직 준비를 위해 들었는데 실무에 정말 도움이 되었습니다. 이론과 실제가 잘 연결되어 있어서 이해하기 쉬웠어요. 추천합니다!",
      helpful: 11,
      verified: true
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

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 새 리뷰 생성
    const newReview = {
      name: reviewForm.name,
      course: reviewForm.course,
      rating: reviewForm.rating,
      date: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\./g, '.').replace(/ /g, ''),
      comment: reviewForm.comment,
      helpful: 0,
      verified: reviewForm.isVerified
    };
    
    // 리뷰 목록 맨 앞에 새 리뷰 추가
    setReviews(prevReviews => [newReview, ...prevReviews]);
    
    // 폼 초기화 및 모달 닫기
    setShowReviewForm(false);
    setReviewForm({
      name: '',
      course: '',
      rating: 5,
      comment: '',
      isVerified: false
    });
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

  const courses = [
    '기본간호학 마스터 코스',
    '중환자실 간호 전문과정',
    '간호관리학 실무과정',
    '모성간호학 심화과정',
    '응급간호 전문과정',
    '정신간호학 전문과정',
    '수술간호 전문과정',
    '종양간호 전문과정'
  ];
  
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

        /* 리뷰 모달 스타일 */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 50;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 1rem;
          padding-top: 5rem;
        }

        .modal-content {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          max-width: 42rem;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 1rem;
          padding-top: 5rem;
        }

        .modal-content {
          background: white;
          border-radius: 1rem;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
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
                <Link href="/reviews" className="text-sky-900 font-bold netflix-nav">강의 리뷰</Link>
                <Link href="/success-stories" className="text-sky-700 hover:text-sky-900 transition-colors netflix-nav font-semibold">합격 후기</Link>
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
            강의 리뷰
          </h1>
          <p className="text-xl text-sky-700 mb-8 max-w-3xl mx-auto netflix-slide-in animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            실제 수강생들의 생생한 후기를 통해 AKUnurse 강의의 품질을 확인해보세요. <br />
            진솔한 평가와 경험담이 여러분의 선택에 도움이 될 것입니다.
          </p>
        </div>
        
        {/* 플로팅 요소들 */}
        <div className="absolute top-10 left-8 w-16 h-16 bg-sky-200/20 rounded-full blur-xl animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 right-12 w-24 h-24 bg-blue-200/15 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }}></div>
      </section>

      {/* 리뷰 통계 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
            {[
              { number: "4.8", label: "전체 평점", delay: "0s" },
              { number: "2,847", label: "총 리뷰 수", delay: "0.1s" },
              { number: "96%", label: "추천율", delay: "0.2s" },
              { number: "98%", label: "완주율", delay: "0.3s" }
            ].map((stat, index) => (
              <div key={index} className="netflix-zoom-in animate-on-scroll" style={{ transitionDelay: stat.delay }}>
                <div className="text-4xl font-bold gradient-text mb-2 netflix-card">{stat.number}</div>
                <div className="text-sky-700 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 리뷰 작성 CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-sky-900 mb-6 gradient-text netflix-fade-in animate-on-scroll">
            당신의 소중한 후기를 남겨주세요
          </h2>
          <p className="text-lg text-sky-700 mb-8 netflix-slide-in animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            수강 경험을 공유하여 다른 학습자들에게 도움을 주세요
          </p>
          <button 
            onClick={() => setShowReviewForm(true)}
            className="bg-sky-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-sky-700 transition-colors netflix-button netflix-zoom-in animate-on-scroll" 
            style={{ transitionDelay: '0.4s' }}
          >
            리뷰 작성하기
          </button>
        </div>
      </section>

      {/* 리뷰 필터 */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12 netflix-slide-in animate-on-scroll">
            {[
              { name: '전체', active: selectedFilter === '전체' },
              { name: '5점', active: selectedFilter === '5점' },
              { name: '4점', active: selectedFilter === '4점' },
              { name: '기본간호학', active: selectedFilter === '기본간호학' },
              { name: '중환자간호', active: selectedFilter === '중환자간호' },
              { name: '간호관리학', active: selectedFilter === '간호관리학' }
            ].map((filter, index) => (
              <button 
                key={index}
                onClick={() => setSelectedFilter(filter.name)}
                className={`px-6 py-3 rounded-full transition-all netflix-button ${
                  filter.active 
                    ? 'bg-sky-600 text-white shadow-lg' 
                    : 'bg-white/70 text-sky-700 hover:bg-sky-100'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 리뷰 목록 */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          {getFilteredReviews().length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-sky-900 mb-2">
                {selectedFilter}에 해당하는 리뷰가 없습니다
              </h3>
              <p className="text-sky-600 mb-6">
                다른 필터를 선택하거나 전체 리뷰를 확인해보세요
              </p>
              <button 
                onClick={() => setSelectedFilter('전체')}
                className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition-colors"
              >
                전체 리뷰 보기
              </button>
            </div>
          ) : (
          <div className="space-y-8">
              {getFilteredReviews().map((review, index) => (
              <div 
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all netflix-card netflix-fade-in animate-on-scroll"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-sky-900">{review.name}</h4>
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            ✓ 수강 인증
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-sky-600">{review.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex mb-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">⭐</span>
                      ))}
                    </div>
                    <p className="text-sm text-sky-500">{review.date}</p>
                  </div>
                </div>
                
                <p className="text-sky-700 leading-relaxed mb-4">{review.comment}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-sky-100">
                  <button className="flex items-center space-x-2 text-sky-600 hover:text-sky-800 transition-colors netflix-button">
                    <span className="text-sm">👍</span>
                    <span className="text-sm">도움이 돼요 ({review.helpful})</span>
                  </button>
                  <button className="text-sky-600 hover:text-sky-800 text-sm transition-colors netflix-button">
                    신고하기
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* 리뷰 작성 모달 */}
      {showReviewForm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowReviewForm(false)}>
          <div className="modal-content">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-sky-900 gradient-text">리뷰 작성하기</h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-sky-900 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                    placeholder="실명 또는 닉네임을 입력해주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sky-900 mb-2">
                    수강 과목 *
                  </label>
                  <select
                    required
                    value={reviewForm.course}
                    onChange={(e) => setReviewForm({...reviewForm, course: e.target.value})}
                    className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  >
                    <option value="">수강한 과목을 선택해주세요</option>
                    {courses.map((course, index) => (
                      <option key={index} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sky-900 mb-2">
                    평점 *
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({...reviewForm, rating: star})}
                        className={`text-3xl transition-colors ${
                          star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                    <span className="ml-4 text-sky-700 font-semibold">
                      {reviewForm.rating}점
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sky-900 mb-2">
                    리뷰 내용 *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                    className="w-full px-4 py-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none"
                    placeholder="강의에 대한 솔직한 후기를 작성해주세요. 다른 수강생들에게 도움이 되는 구체적인 내용을 포함해주시면 더욱 좋습니다."
                  />
                  <p className="text-sm text-sky-600 mt-2">
                    최소 10자 이상 작성해주세요. ({reviewForm.comment.length}/10)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={reviewForm.isVerified}
                    onChange={(e) => setReviewForm({...reviewForm, isVerified: e.target.checked})}
                    className="w-4 h-4 text-sky-600 border-sky-300 rounded focus:ring-sky-500"
                  />
                  <label htmlFor="verified" className="text-sm text-sky-700">
                    수강 인증 (수강증이나 수료증을 보유하고 있습니다)
                  </label>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 px-6 py-3 border border-sky-300 text-sky-700 rounded-lg hover:bg-sky-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={reviewForm.comment.length < 10}
                    className="flex-1 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors netflix-button"
                  >
                    리뷰 제출하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CTA 섹션 */}
      <section className="py-20 px-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 netflix-fade-in animate-on-scroll">
            지금 바로 시작하세요!
          </h2>
          <p className="text-xl mb-8 opacity-90 netflix-slide-in animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            수강생들의 생생한 후기가 증명하는 최고의 강의를 만나보세요
          </p>
          <button className="bg-white text-sky-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors netflix-button netflix-zoom-in animate-on-scroll" style={{ transitionDelay: '0.4s' }}>
            강의 둘러보기
          </button>
        </div>
      </section>

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