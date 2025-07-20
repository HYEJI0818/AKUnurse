'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProfessorsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCoursesModal, setShowCoursesModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState<any>(null);
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

  const showProfessorCourses = (professor: any) => {
    setSelectedProfessor(professor);
    setShowCoursesModal(true);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactLoading(true);
    
    try {
      // 실제로는 여기서 이메일 전송 API를 호출하거나 백엔드로 데이터를 전송
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 이메일 클라이언트로 미리 작성된 메일 열기
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
      
      // 기본 메일 클라이언트 열기
      window.location.href = `mailto:contact@akunurse.com?subject=${subject}&body=${body}`;
      
      alert('문의 내용이 이메일 클라이언트로 전송되었습니다. 메일을 확인하여 전송해주세요.');
      
      // 폼 초기화
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

  const getProfessorCourseDetails = (professorName: string) => {
    const courseDetails: any = {
      "김영희 교수": [
        {
          title: "기본간호학 완전정복",
          duration: "40시간",
          students: "1,234명",
          rating: 4.9,
          price: "150,000원",
          originalPrice: "200,000원",
          discount: "25%",
          level: "초급",
          description: "간호학의 기초부터 심화까지 체계적으로 학습하는 필수 과정",
          curriculum: [
            "1강: 간호학 개론 및 기본 개념",
            "2강: 인체의 구조와 기능",
            "3강: 건강과 질병의 이해",
            "4강: 간호과정과 간호진단",
            "5강: 감염관리와 무균술"
          ]
        },
        {
          title: "간호윤리와 법적 쟁점",
          duration: "20시간",
          students: "654명",
          rating: 4.7,
          price: "120,000원",
          originalPrice: "160,000원",
          discount: "25%",
          level: "초급",
          description: "간호 실무에서 마주하는 윤리적 딜레마와 법적 책임 이해",
          curriculum: [
            "1강: 간호윤리의 기본원칙",
            "2강: 의료법과 간호사 의무",
            "3강: 환자의 권리와 자율성",
            "4강: 비밀보장과 사생활보호",
            "5강: 생명윤리와 연명치료"
          ]
        }
      ],
      "박민수 교수": [
        {
          title: "성인간호학 심화과정",
          duration: "35시간",
          students: "987명",
          rating: 4.8,
          price: "180,000원",
          originalPrice: "240,000원",
          discount: "25%",
          level: "중급",
          description: "성인 환자 간호의 전문적 접근법과 실무 기술 습득",
          curriculum: [
            "1강: 성인기 건강문제 개요",
            "2강: 심혈관계 질환 간호",
            "3강: 호흡기계 질환 간호",
            "4강: 소화기계 질환 간호",
            "5강: 내분비계 질환 간호"
          ]
        },
        {
          title: "중환자실 간호 전문과정",
          duration: "45시간",
          students: "398명",
          rating: 4.9,
          price: "220,000원",
          originalPrice: "290,000원",
          discount: "24%",
          level: "고급",
          description: "중환자 간호의 고급 기술과 응급상황 대처법 마스터",
          curriculum: [
            "1강: 중환자실 간호의 개념",
            "2강: 중환자 모니터링",
            "3강: 인공호흡기 간호",
            "4강: 혈역학 감시",
            "5강: 신대체요법 간호"
          ]
        }
      ],
      "이수진 교수": [
        {
          title: "아동간호학 실습",
          duration: "30시간",
          students: "756명",
          rating: 4.9,
          price: "160,000원",
          originalPrice: "210,000원",
          discount: "24%",
          level: "중급",
          description: "아동 발달 단계별 간호 중재와 가족 중심 돌봄 실습",
          curriculum: [
            "1강: 아동 성장발달 이론",
            "2강: 신생아 간호",
            "3강: 영아기 간호",
            "4강: 유아기 간호",
            "5강: 학령전기 간호"
          ]
        },
        {
          title: "신생아 집중치료",
          duration: "38시간",
          students: "287명",
          rating: 4.8,
          price: "190,000원",
          originalPrice: "250,000원",
          discount: "24%",
          level: "고급",
          description: "신생아 중환자실에서의 전문적 간호 기술과 가족 지원",
          curriculum: [
            "1강: 신생아의 생리적 특성",
            "2강: 미숙아 간호",
            "3강: 신생아 호흡관리",
            "4강: 신생아 영양관리",
            "5강: 신생아 감염관리"
          ]
        }
      ],
      "최은영 교수": [
        {
          title: "정신간호학 이론과 실제",
          duration: "32시간",
          students: "643명",
          rating: 4.7,
          price: "170,000원",
          originalPrice: "220,000원",
          discount: "23%",
          level: "중급",
          description: "정신건강 문제에 대한 이해와 치료적 의사소통 기법",
          curriculum: [
            "1강: 정신건강의 개념",
            "2강: 정신질환의 이해",
            "3강: 치료적 의사소통",
            "4강: 정신간호 사정",
            "5강: 불안장애 간호"
          ]
        }
      ],
      "정호철 교수": [
        {
          title: "간호관리학 실무",
          duration: "28시간",
          students: "521명",
          rating: 4.8,
          price: "165,000원",
          originalPrice: "215,000원",
          discount: "23%",
          level: "고급",
          description: "간호 조직 관리와 리더십 역량 개발을 위한 실무 중심 교육",
          curriculum: [
            "1강: 간호관리의 개념과 역할",
            "2강: 리더십과 팔로워십",
            "3강: 조직관리와 인사관리",
            "4강: 의사결정과 문제해결",
            "5강: 의사소통과 갈등관리"
          ]
        }
      ],
      "한미경 교수": [
        {
          title: "지역사회간호학",
          duration: "26시간",
          students: "432명",
          rating: 4.6,
          price: "155,000원",
          originalPrice: "200,000원",
          discount: "23%",
          level: "중급",
          description: "지역사회 건강증진과 보건교육 프로그램 기획 및 실행",
          curriculum: [
            "1강: 지역사회간호학 개론",
            "2강: 지역사회 건강사정",
            "3강: 역학과 건강통계",
            "4강: 보건교육과 건강증진",
            "5강: 감염병 관리"
          ]
        }
      ]
    };
    return courseDetails[professorName] || [];
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
                <Link href="/professors" className="text-sky-900 font-bold netflix-nav">교수 소개</Link>
                <Link href="/courses" className="text-sky-700 hover:text-sky-900 transition-colors netflix-nav font-semibold">강의 신청</Link>
                <Link href="/reviews" className="text-sky-700 hover:text-sky-900 transition-colors netflix-nav font-semibold">강의 리뷰</Link>
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
            전문 교수진
          </h1>
          <p className="text-xl text-sky-700 mb-8 max-w-3xl mx-auto netflix-slide-in animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            풍부한 임상 경험과 전문 지식을 갖춘 최고의 교수진이 여러분의 성장을 이끌어드립니다
          </p>
        </div>
        
        {/* 플로팅 요소들 */}
        <div className="absolute top-10 left-8 w-16 h-16 bg-sky-200/20 rounded-full blur-xl animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 right-12 w-24 h-24 bg-blue-200/15 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }}></div>
      </section>

      {/* 교수진 통계 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
            {[
              { number: "15+", label: "전문 교수진", delay: "0s" },
              { number: "20년+", label: "평균 경력", delay: "0.1s" },
              { number: "50+", label: "개설 강의", delay: "0.2s" },
              { number: "98%", label: "수강생 만족도", delay: "0.3s" }
            ].map((stat, index) => (
              <div key={index} className="netflix-zoom-in animate-on-scroll" style={{ transitionDelay: stat.delay }}>
                <div className="text-4xl font-bold gradient-text mb-2 netflix-card">{stat.number}</div>
                <div className="text-sky-700 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 교수진 소개 */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-12 text-center gradient-text netflix-fade-in animate-on-scroll">
            우리의 교수진을 만나보세요
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "김영희 교수",
                position: "기본간호학과 교수",
                education: "서울대학교 간호학 박사",
                experience: "25년",
                specialties: ["기본간호학", "간호윤리", "간호교육"],
                courses: ["기본간호학 완전정복", "간호윤리와 법적 쟁점"],
                achievements: "대한간호학회 우수논문상 수상"
              },
              {
                name: "박민수 교수",
                position: "성인간호학과 교수",
                education: "연세대학교 간호학 박사",
                experience: "22년",
                specialties: ["중환자간호", "심혈관간호", "응급간호"],
                courses: ["성인간호학 심화과정", "중환자실 간호"],
                achievements: "국제간호학술대회 최우수 발표상"
              },
              {
                name: "이수진 교수",
                position: "아동간호학과 교수",
                education: "고려대학교 간호학 박사",
                experience: "18년",
                specialties: ["아동간호", "신생아간호", "소아중환자"],
                courses: ["아동간호학 실습", "신생아 집중치료"],
                achievements: "아동간호학회 연구공로상 수상"
              },
              {
                name: "최은영 교수",
                position: "정신간호학과 교수",
                education: "부산대학교 간호학 박사",
                experience: "20년",
                specialties: ["정신건강간호", "상담치료", "스트레스관리"],
                courses: ["정신간호학 이론과 실제", "간호사 스트레스 관리"],
                achievements: "정신간호학회 학술상 수상"
              },
              {
                name: "정호철 교수",
                position: "간호관리학과 교수",
                education: "경희대학교 간호학 박사",
                experience: "24년",
                specialties: ["간호관리", "리더십", "의료질관리"],
                courses: ["간호관리학 실무", "간호 리더십 개발"],
                achievements: "간호행정학회 공로상 수상"
              },
              {
                name: "한미경 교수",
                position: "지역사회간호학과 교수",
                education: "이화여대 간호학 박사",
                experience: "19년",
                specialties: ["지역사회간호", "보건교육", "건강증진"],
                courses: ["지역사회간호학", "보건교육과 상담"],
                achievements: "보건복지부 장관 표창 수상"
              }
            ].map((professor, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sky-100 netflix-card netflix-fade-in animate-on-scroll" style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden">
                  <img 
                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${professor.name}&backgroundColor=0ea5e9,3b82f6&radius=50&size=96`}
                    alt={professor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-sky-900 mb-2">{professor.name}</h3>
                  <p className="text-sky-600 font-medium mb-1">{professor.position}</p>
                  <p className="text-sm text-sky-500">{professor.education}</p>
                  <p className="text-sm text-sky-500">임상경력 {professor.experience}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sky-900 mb-2">전문 분야</h4>
                    <div className="flex flex-wrap gap-2">
                      {professor.specialties.map((specialty, i) => (
                        <span key={i} className="bg-sky-100 text-sky-800 px-2 py-1 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sky-900 mb-2">담당 강의</h4>
                    <ul className="text-sm text-sky-600 space-y-1">
                      {professor.courses.map((course, i) => (
                        <li key={i}>• {course}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sky-900 mb-2">주요 성과</h4>
                    <p className="text-sm text-sky-600">{professor.achievements}</p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button 
                    onClick={() => showProfessorCourses(professor)}
                    className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors netflix-button w-full font-bold"
                  >
                    강의 보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 px-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 netflix-fade-in animate-on-scroll">
            최고의 교수진과 함께하세요!
          </h2>
          <p className="text-xl mb-8 opacity-90 netflix-slide-in animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            전문 교수진의 체계적인 강의로 여러분의 간호 전문성을 한 단계 높여보세요
          </p>
          <Link href="/courses" className="bg-white text-sky-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors netflix-button netflix-zoom-in animate-on-scroll inline-block" style={{ transitionDelay: '0.4s' }}>
            강의 둘러보기
          </Link>
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

      {/* 교수 강의 목록 모달 */}
      {showCoursesModal && selectedProfessor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img 
                      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${selectedProfessor.name}&backgroundColor=0ea5e9,3b82f6&radius=50&size=64`}
                      alt={selectedProfessor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-sky-900">{selectedProfessor.name}</h3>
                    <p className="text-sky-600">{selectedProfessor.position}</p>
                    <p className="text-sm text-sky-500">임상경력 {selectedProfessor.experience}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCoursesModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-xl font-bold text-sky-900 mb-6">📚 담당 강의</h4>
              
              {getProfessorCourseDetails(selectedProfessor.name).length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {getProfessorCourseDetails(selectedProfessor.name).map((course: any, index: number) => (
                    <div key={index} className="bg-sky-50 rounded-xl p-6 border border-sky-100">
                                             {/* 강의 썸네일 */}
                       <div className="relative h-32 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                         <span className="text-white font-semibold">강의 썸네일</span>
                         <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                           {course.discount} OFF
                         </div>
                         <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                           {course.level}
                         </div>
                       </div>

                      {/* 강의 정보 */}
                      <h5 className="text-lg font-bold text-sky-900 mb-2">{course.title}</h5>
                      <p className="text-sky-600 text-sm mb-3">{course.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-sky-500">{course.duration} | {course.students} 수강</span>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-sm text-sky-700">{course.rating}</span>
                        </div>
                      </div>

                      {/* 가격 */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-lg font-bold text-sky-900">{course.price}</span>
                        <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
                      </div>

                      {/* 커리큘럼 미리보기 */}
                      <div className="mb-4">
                        <h6 className="font-semibold text-sky-900 mb-2">주요 커리큘럼</h6>
                        <ul className="text-sm text-sky-600 space-y-1">
                          {course.curriculum.slice(0, 3).map((item: string, i: number) => (
                            <li key={i}>• {item}</li>
                          ))}
                          {course.curriculum.length > 3 && (
                            <li className="text-sky-400">... 외 {course.curriculum.length - 3}개 강의</li>
                          )}
                        </ul>
                      </div>

                      {/* 버튼 */}
                      <div className="flex space-x-2">
                        <Link 
                          href="/courses"
                          className="flex-1 bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors text-center font-semibold"
                          onClick={() => setShowCoursesModal(false)}
                        >
                          수강신청
                        </Link>
                        <button className="flex-1 bg-sky-100 text-sky-700 py-2 rounded-lg hover:bg-sky-200 transition-colors font-semibold">
                          상세보기
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📚</div>
                  <p className="text-sky-600">현재 개설된 강의가 없습니다.</p>
                </div>
              )}

              {/* 교수 정보 요약 */}
              <div className="mt-8 p-6 bg-gradient-to-r from-sky-100 to-blue-100 rounded-xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h6 className="font-semibold text-sky-900 mb-2">전문 분야</h6>
                    <div className="flex flex-wrap gap-2">
                      {selectedProfessor.specialties.map((specialty: string, i: number) => (
                        <span key={i} className="bg-sky-200 text-sky-800 px-3 py-1 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h6 className="font-semibold text-sky-900 mb-2">주요 성과</h6>
                    <p className="text-sm text-sky-700">{selectedProfessor.achievements}</p>
                  </div>
                </div>
              </div>

              {/* 닫기 버튼 */}
              <div className="flex justify-center mt-6">
                <button 
                  onClick={() => setShowCoursesModal(false)}
                  className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  닫기
                </button>
              </div>
            </div>
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