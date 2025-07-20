'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MyClassPage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('진행중');
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
  const [todos, setTodos] = useState([
    { id: 1, text: '기본간호학 1강 복습하기', completed: false, priority: 'high' },
    { id: 2, text: '성인간호학 과제 제출', completed: true, priority: 'medium' },
    { id: 3, text: '아동간호학 시험 준비', completed: false, priority: 'high' },
    { id: 4, text: '간호관리학 노트 정리', completed: false, priority: 'low' }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [newTodoPriority, setNewTodoPriority] = useState('medium');
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  // 강의 타입 정의
  interface OngoingCourse {
    title: string;
    instructor: string;
    progress: number;
    nextLesson: string;
    totalLessons: number;
    completedLessons: number;
    lastAccess: string;
    status: '진행중';
  }

  interface CompletedCourse {
    title: string;
    instructor: string;
    score: number;
    date: string;
    status: '완료';
  }

  type Course = OngoingCourse | CompletedCourse;

  // 강의 데이터
  const [ongoingCourses] = useState<OngoingCourse[]>([
    {
      title: "기본간호학 완전정복",
      instructor: "김영희 교수",
      progress: 75,
      nextLesson: "8강. 간호과정의 이해",
      totalLessons: 20,
      completedLessons: 15,
      lastAccess: "2시간 전",
      status: "진행중"
    },
    {
      title: "성인간호학 심화과정",
      instructor: "박민수 교수",
      progress: 45,
      nextLesson: "12강. 심혈관계 질환 간호",
      totalLessons: 25,
      completedLessons: 11,
      lastAccess: "1일 전",
      status: "진행중"
    },
    {
      title: "아동간호학 실습",
      instructor: "이수진 교수",
      progress: 30,
      nextLesson: "6강. 신생아 간호",
      totalLessons: 18,
      completedLessons: 5,
      lastAccess: "3일 전",
      status: "진행중"
    }
  ]);

  const [completedCourses] = useState<CompletedCourse[]>([
    { 
      title: "간호윤리와 법적 쟁점", 
      instructor: "김영희 교수", 
      score: 95, 
      date: "2024.11.15",
      status: "완료"
    },
    { 
      title: "정신간호학 이론과 실제", 
      instructor: "최은영 교수", 
      score: 88, 
      date: "2024.10.28",
      status: "완료"
    },
    { 
      title: "간호관리학 실무", 
      instructor: "정호철 교수", 
      score: 92, 
      date: "2024.10.12",
      status: "완료"
    },
    { 
      title: "지역사회간호학", 
      instructor: "한미경 교수", 
      score: 89, 
      date: "2024.09.30",
      status: "완료"
    }
  ]);

  // 필터링 함수
  const getFilteredCourses = (): Course[] => {
    if (activeTab === '진행중') {
      return ongoingCourses;
    } else if (activeTab === '완료') {
      return completedCourses;
    } else { // 전체
      return [...ongoingCourses, ...completedCourses];
    }
  };

  // 타입 가드 함수
  const isOngoingCourse = (course: Course): course is OngoingCourse => {
    return course.status === '진행중';
  };

  const isCompletedCourse = (course: Course): course is CompletedCourse => {
    return course.status === '완료';
  };

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

  // To-do List 관련 함수들
  const addTodo = () => {
    if (newTodo.trim()) {
      const newId = Math.max(...todos.map(t => t.id), 0) + 1;
      setTodos([...todos, {
        id: newId,
        text: newTodo.trim(),
        completed: false,
        priority: newTodoPriority
      }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEdit = (todo: any) => {
    setEditingTodo(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingTodo ? { ...todo, text: editText.trim() } : todo
      ));
    }
    setEditingTodo(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingTodo(null);
    setEditText('');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return '높음';
      case 'medium': return '보통';
      case 'low': return '낮음';
      default: return '보통';
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
                <Link href="/success-stories" className="text-sky-700 hover:text-sky-900 transition-colors netflix-nav font-semibold">합격 후기</Link>
                <Link href="/my-class" className="text-sky-900 font-bold netflix-nav">My Class</Link>
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
            My Class
          </h1>
          <p className="text-xl text-sky-700 mb-8 max-w-3xl mx-auto netflix-slide-in animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            나만의 학습 공간에서 체계적으로 관리하고 성장해보세요
          </p>
        </div>
        
        {/* 플로팅 요소들 */}
        <div className="absolute top-10 left-8 w-16 h-16 bg-sky-200/20 rounded-full blur-xl animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 right-12 w-24 h-24 bg-blue-200/15 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }}></div>
      </section>

      {/* 학습 현황 통계 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
            {[
              { number: "3", label: "수강 중인 강의", delay: "0s" },
              { number: "12", label: "완료한 강의", delay: "0.1s" },
              { number: "156h", label: "총 학습시간", delay: "0.2s" },
              { number: "92점", label: "평균 점수", delay: "0.3s" }
            ].map((stat, index) => (
              <div key={index} className="netflix-zoom-in animate-on-scroll" style={{ transitionDelay: stat.delay }}>
                <div className="text-4xl font-bold gradient-text mb-2 netflix-card">{stat.number}</div>
                <div className="text-sky-700 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 강의 탭 */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8 netflix-slide-in animate-on-scroll">
            {['진행중', '완료', '전체'].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 mx-2 rounded-full font-semibold transition-all netflix-button ${
                  activeTab === tab
                    ? 'bg-sky-600 text-white'
                    : 'bg-white text-sky-600 hover:bg-sky-50'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 강의 목록 */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-sky-900 mb-12 text-center gradient-text netflix-fade-in animate-on-scroll">
            {activeTab === '진행중' ? '수강 중인 강의' : 
             activeTab === '완료' ? '완료한 강의' : 
             '내 강의 목록'}
          </h2>
          
          {getFilteredCourses().length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-sky-900 mb-2">
                {activeTab} 강의가 없습니다
              </h3>
              <p className="text-sky-600 mb-6">
                {activeTab === '진행중' ? '새로운 강의를 신청해보세요!' : 
                 activeTab === '완료' ? '강의를 완료하여 수료증을 받아보세요!' : 
                 '강의를 신청해보세요!'}
              </p>
              <button 
                onClick={() => setActiveTab('전체')}
                className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition-colors netflix-button"
              >
                전체 강의 보기
              </button>
            </div>
          ) : (
            <div className={`grid gap-8 ${
              activeTab === '완료' || getFilteredCourses().some(course => course.status === '완료') 
                ? 'md:grid-cols-2 lg:grid-cols-4' 
                : 'md:grid-cols-2 lg:grid-cols-3'
            }`}>
                             {getFilteredCourses().map((course, index) => (
                 <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-sky-100 netflix-card netflix-fade-in animate-on-scroll" style={{ transitionDelay: `${index * 0.1}s` }}>
                   {isOngoingCourse(course) ? (
                     // 진행중 강의 카드
                     <div className="p-6">
                <div className="h-32 rounded-lg mb-4 relative overflow-hidden">
                  <img 
                    src={
                      course.title === "기본간호학 완전정복" ? 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=200&fit=crop&auto=format' :
                      course.title === "성인간호학 심화과정" ? 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&auto=format' :
                      course.title === "아동간호학 실습" ? 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=200&fit=crop&auto=format' :
                      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=200&fit=crop&auto=format'
                    }
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                
                <h3 className="text-lg font-bold text-sky-900 mb-2">{course.title}</h3>
                <p className="text-sky-600 text-sm mb-4">{course.instructor}</p>
                
                {/* 진도율 */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-sky-700 mb-2">
                    <span>진도율</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-sky-100 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-sky-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-sky-600 mb-4">
                  <p><span className="font-medium">다음 수업:</span> {course.nextLesson}</p>
                  <p><span className="font-medium">수업 진행:</span> {course.completedLessons}/{course.totalLessons}강</p>
                  <p><span className="font-medium">최근 접속:</span> {course.lastAccess}</p>
                </div>
                
                <button className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors netflix-button font-bold">
                  수업 계속하기
                </button>
              </div>
                   ) : isCompletedCourse(course) ? (
                     // 완료된 강의 카드
                     <div className="p-4">
                <div className="h-24 rounded-lg mb-3 relative overflow-hidden">
                  <img 
                    src={
                      course.title === "간호윤리와 법적 쟁점" ? 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=150&fit=crop&auto=format' :
                      course.title === "정신간호학 이론과 실제" ? 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=150&fit=crop&auto=format' :
                      course.title === "간호관리학 실무" ? 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=150&fit=crop&auto=format' :
                      course.title === "지역사회간호학" ? 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=150&fit=crop&auto=format' :
                      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=150&fit=crop&auto=format'
                    }
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-2xl bg-green-500/80 rounded-full w-10 h-10 flex items-center justify-center">✓</span>
                  </div>
                </div>
                
                <h4 className="font-bold text-sky-900 text-sm mb-1">{course.title}</h4>
                <p className="text-sky-600 text-xs mb-2">{course.instructor}</p>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-sky-500">완료: {course.date}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                    {course.score}점
                  </span>
                </div>
                     </div>
                   ) : null}
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* 학습 캘린더 & To-do List */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 학습 캘린더 (왼쪽) */}
            <div className="netflix-fade-in animate-on-scroll">
              <h2 className="text-2xl font-bold text-sky-900 mb-6 gradient-text">
                학습 캘린더
              </h2>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sky-100">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                    <div key={day} className="text-center font-semibold text-sky-900 py-1 text-sm">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 5;
                    const hasStudy = [3, 7, 10, 14, 18, 21, 25].includes(day);
                    return (
                      <div
                        key={i}
                        className={`h-8 flex items-center justify-center rounded text-sm transition-colors ${
                          day > 0 && day <= 31
                            ? hasStudy
                              ? 'bg-sky-500 text-white font-semibold'
                              : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                            : 'text-gray-300'
                        }`}
                      >
                        {day > 0 && day <= 31 ? day : ''}
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 flex justify-center space-x-4 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-sky-500 rounded mr-1"></div>
                    <span className="text-sky-700">학습한 날</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-sky-50 border border-sky-200 rounded mr-1"></div>
                    <span className="text-sky-700">학습 가능한 날</span>
                  </div>
                </div>
              </div>
            </div>

            {/* To-do List (오른쪽) */}
            <div className="netflix-fade-in animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold text-sky-900 mb-6 gradient-text">
                학습 To-do List
              </h2>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sky-100">
                {/* To-do 추가 폼 */}
                <div className="mb-6">
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                      className="flex-1 px-3 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                      placeholder="새로운 할 일을 입력하세요..."
                    />
                    <select
                      value={newTodoPriority}
                      onChange={(e) => setNewTodoPriority(e.target.value)}
                      className="px-3 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                    >
                      <option value="high">높음</option>
                      <option value="medium">보통</option>
                      <option value="low">낮음</option>
                    </select>
                    <button
                      onClick={addTodo}
                      className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm font-semibold"
                    >
                      추가
                    </button>
                  </div>
                </div>

                {/* To-do 목록 */}
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`p-3 rounded-lg border transition-all ${
                        todo.completed 
                          ? 'bg-gray-50 border-gray-200 opacity-60' 
                          : 'bg-white border-sky-100 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 mr-3"
                          />
                          
                          {editingTodo === todo.id ? (
                            <div className="flex-1 flex gap-2">
                              <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') saveEdit();
                                  if (e.key === 'Escape') cancelEdit();
                                }}
                                className="flex-1 px-2 py-1 border border-sky-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                                autoFocus
                              />
                              <button
                                onClick={saveEdit}
                                className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                              >
                                저장
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="px-2 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700"
                              >
                                취소
                              </button>
                            </div>
                          ) : (
                            <div className="flex-1">
                              <span className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-sky-900'}`}>
                                {todo.text}
                              </span>
                              <div className="flex items-center mt-1">
                                <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(todo.priority)}`}>
                                  {getPriorityText(todo.priority)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {editingTodo !== todo.id && (
                          <div className="flex space-x-1 ml-2">
                            <button
                              onClick={() => startEdit(todo)}
                              className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                              title="수정"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => deleteTodo(todo.id)}
                              className="p-1 text-red-600 hover:text-red-800 transition-colors"
                              title="삭제"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {todos.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">아직 등록된 할 일이 없습니다.</p>
                      <p className="text-xs mt-1">위에서 새로운 할 일을 추가해보세요!</p>
                    </div>
                  )}
                </div>

                {/* 통계 */}
                <div className="mt-6 pt-4 border-t border-sky-100">
                  <div className="flex justify-between text-sm text-sky-700">
                    <span>전체: {todos.length}개</span>
                    <span>완료: {todos.filter(t => t.completed).length}개</span>
                    <span>남은 일: {todos.filter(t => !t.completed).length}개</span>
                  </div>
                  {todos.length > 0 && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(todos.filter(t => t.completed).length / todos.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 px-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 netflix-fade-in animate-on-scroll">
            더 많은 강의를 만나보세요!
          </h2>
          <p className="text-xl mb-8 opacity-90 netflix-slide-in animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            새로운 강의로 전문성을 더욱 키워보세요
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