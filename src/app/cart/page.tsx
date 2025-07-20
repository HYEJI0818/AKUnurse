'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const [scrollY, setScrollY] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    bankName: '',
    accountNumber: '',
    agreeTerms: false,
    agreePrivacy: false
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: '일반 문의'
  });
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // 장바구니 아이템 불러오기
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }

    // 로그인 상태 확인
    const checkLoginState = () => {
      const savedLoginState = localStorage.getItem('isLoggedIn');
      const savedUserName = localStorage.getItem('userName');
      if (savedLoginState === 'true' && savedUserName) {
        setIsLoggedIn(true);
        setUserName(savedUserName);
      }
    };
    checkLoginState();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const removeFromCart = (id: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: quantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const getTotalOriginalPrice = () => {
    return cartItems.reduce((total, item) => total + item.originalPrice, 0);
  };

  const toggleItemSelection = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  const getSelectedTotalPrice = () => {
    return cartItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.price, 0);
  };

  const getSelectedTotalOriginalPrice = () => {
    return cartItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.originalPrice, 0);
  };

  const getCourseImage = (title: string) => {
    if (title.includes('기본간호학')) {
      return 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop&auto=format';
    } else if (title.includes('성인간호학')) {
      return 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format';
    } else if (title.includes('아동간호학')) {
      return 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop&auto=format';
    } else if (title.includes('정신간호학')) {
      return 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop&auto=format';
    } else if (title.includes('간호관리학')) {
      return 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop&auto=format';
    } else if (title.includes('지역사회간호학')) {
      return 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop&auto=format';
    } else {
      return 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop&auto=format';
    }
  };

  const addToCartFromRecommendation = (course: any) => {
    // 새로운 강의 객체 생성
    const newCourse = {
      id: Date.now() + Math.random(), // 고유 ID 생성
      title: course.title,
      instructor: course.instructor,
      duration: course.duration,
      price: parseInt(course.price.replace(/[^0-9]/g, '')), // 숫자만 추출
      originalPrice: parseInt(course.originalPrice.replace(/[^0-9]/g, '')),
      discount: Math.round((1 - parseInt(course.price.replace(/[^0-9]/g, '')) / parseInt(course.originalPrice.replace(/[^0-9]/g, ''))) * 100),
      rating: course.rating,
      thumbnail: course.title
    };

    // 이미 장바구니에 있는지 확인
    const isAlreadyInCart = cartItems.some(item => item.title === course.title);
    
    if (isAlreadyInCart) {
      alert('이미 장바구니에 있는 강의입니다.');
      return;
    }

    // 장바구니에 추가
    const updatedCartItems = [...cartItems, newCourse];
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    
    alert(`${course.title}이(가) 장바구니에 추가되었습니다.`);
  };

  const handlePaymentFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setPaymentForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setPaymentForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 입력 검증
    if (!paymentForm.name || !paymentForm.email || !paymentForm.phone) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    if (!paymentForm.agreeTerms || !paymentForm.agreePrivacy) {
      alert('약관에 동의해주세요.');
      return;
    }

    if (paymentForm.paymentMethod === 'card') {
      if (!paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv) {
        alert('카드 정보를 모두 입력해주세요.');
        return;
      }
    } else if (paymentForm.paymentMethod === 'bank') {
      if (!paymentForm.bankName || !paymentForm.accountNumber) {
        alert('계좌 정보를 모두 입력해주세요.');
        return;
      }
    }

    setIsProcessing(true);
    
    // 결제 처리 시뮬레이션
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // 장바구니 비우기
      setCartItems([]);
      localStorage.removeItem('cartItems');
      
      // 3초 후 결제 완료 페이지로 이동
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentSuccess(false);
        alert('결제가 완료되었습니다! My Class에서 강의를 확인해보세요.');
      }, 3000);
    }, 2000);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 page-enter">
      {/* 페이지 진입 애니메이션 CSS */}
      <style jsx global>{`
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
      `}</style>

      {/* 네비게이션 바 */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-16">
            <Link href="/" className="text-2xl font-bold text-transparent bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text -ml-8">
              AKUnurse
            </Link>
            
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-sky-700 hover:text-sky-900 transition-colors font-semibold">홈</Link>
                <Link href="/professors" className="text-sky-700 hover:text-sky-900 transition-colors font-semibold">교수 소개</Link>
                <Link href="/courses" className="text-sky-700 hover:text-sky-900 transition-colors font-semibold">강의 신청</Link>
                <Link href="/reviews" className="text-sky-700 hover:text-sky-900 transition-colors font-semibold">강의 리뷰</Link>
                <Link href="/success-stories" className="text-sky-700 hover:text-sky-900 transition-colors font-semibold">합격 후기</Link>
                <Link href="/my-class" className="text-sky-700 hover:text-sky-900 transition-colors font-semibold">My Class</Link>
              </div>
            </div>
            
            <div className="ml-auto flex items-center space-x-4 -mr-8">
              <Link href="/cart" className="relative">
                <div className="w-6 h-6 cursor-pointer">
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-sky-700 hover:text-sky-900 transition-colors">
                    <path d="M19 7H16V6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6V7H5C4.44772 7 4 7.44772 4 8V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V8C20 7.44772 19.5523 7 19 7ZM10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6V7H10V6ZM18 19H6V9H8V10C8 10.5523 8.44772 11 9 11C9.55228 11 10 10.5523 10 10V9H14V10C14 10.5523 14.4477 11 15 11C15.5523 11 16 10.5523 16 10V9H18V19Z" fill="currentColor"/>
                  </svg>
                </div>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
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
                                  <Link href="/login" className="text-gray-600 hover:text-gray-800 transition-colors font-bold text-sm">
                로그인
              </Link>
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

      {/* 장바구니 섹션 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-sky-900 mb-4">장바구니</h1>
            <p className="text-sky-600 text-lg">선택하신 강의를 확인하고 결제를 진행해주세요</p>
          </div>

          {cartItems.length === 0 ? (
            /* 빈 장바구니 */
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🛒</div>
              <h2 className="text-2xl font-bold text-sky-900 mb-4">장바구니가 비어있습니다</h2>
              <p className="text-sky-600 mb-8">다양한 간호학 강의를 둘러보고 학습을 시작해보세요</p>
              <Link href="/courses" className="bg-sky-600 text-white px-8 py-3 rounded-lg hover:bg-sky-700 transition-colors font-semibold">
                강의 둘러보기
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* 장바구니 아이템 목록 */}
              <div className="lg:col-span-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-sky-900">선택한 강의 ({cartItems.length}개)</h2>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="selectAll"
                        checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500"
                      />
                      <label htmlFor="selectAll" className="text-sm font-medium text-sky-700">
                        전체 선택
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border border-sky-100 rounded-xl">
                        {/* 체크박스 */}
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleItemSelection(item.id)}
                          className="w-4 h-4 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 flex-shrink-0"
                        />
                        
                        {/* 강의 썸네일 */}
                        <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={getCourseImage(item.title)}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* 강의 정보 */}
                        <div className="flex-1">
                          <h3 className="font-bold text-sky-900 mb-1">{item.title}</h3>
                          <p className="text-sky-600 text-sm mb-2">{item.instructor} | {item.duration}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-sky-900">{item.price.toLocaleString()}원</span>
                            <span className="text-sm text-gray-500 line-through">{item.originalPrice.toLocaleString()}원</span>
                            <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">{item.discount}% OFF</span>
                          </div>
                        </div>
                        
                        {/* 삭제 버튼 */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 주문 요약 */}
              <div className="lg:col-span-1">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-sky-900 mb-6">주문 요약</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sky-700">선택한 강의</span>
                      <span className="font-semibold text-sky-900">{selectedItems.length}개 / {cartItems.length}개</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sky-700">정가</span>
                      <span className="text-gray-500 line-through">{getSelectedTotalOriginalPrice().toLocaleString()}원</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sky-700">할인 금액</span>
                      <span className="text-red-600 font-semibold">-{(getSelectedTotalOriginalPrice() - getSelectedTotalPrice()).toLocaleString()}원</span>
                    </div>
                    
                    <hr className="border-sky-200" />
                    
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold text-sky-900">총 결제 금액</span>
                      <span className="font-bold text-sky-900">{getSelectedTotalPrice().toLocaleString()}원</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      if (selectedItems.length === 0) {
                        alert('결제할 강의를 선택해주세요.');
                        return;
                      }
                      setShowPaymentModal(true);
                    }}
                    className={`w-full py-4 rounded-lg font-bold text-lg mb-4 transition-all ${
                      selectedItems.length > 0 
                        ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 transform hover:scale-105' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {selectedItems.length > 0 ? '결제하기' : '강의를 선택해주세요'}
                  </button>
                  
                  <Link href="/courses" className="block w-full bg-sky-100 text-sky-700 py-3 rounded-lg hover:bg-sky-200 transition-colors text-center font-semibold">
                    강의 더 둘러보기
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 추천 강의 섹션 */}
      {cartItems.length > 0 && (
        <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-sky-900 mb-12 text-center">
              함께 수강하면 좋은 강의
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "아동간호학 실습",
                  instructor: "이수진 교수",
                  duration: "30시간",
                  price: "160,000원",
                  originalPrice: "210,000원",
                  rating: 4.9
                },
                {
                  title: "정신간호학 이론과 실제",
                  instructor: "최은영 교수",
                  duration: "32시간",
                  price: "170,000원",
                  originalPrice: "220,000원",
                  rating: 4.7
                },
                {
                  title: "간호관리학 실무",
                  instructor: "정호철 교수",
                  duration: "28시간",
                  price: "165,000원",
                  originalPrice: "215,000원",
                  rating: 4.8
                }
              ].map((course, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sky-100 hover:shadow-xl transition-shadow">
                  <div className="h-32 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={getCourseImage(course.title)}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-sky-900 mb-2">{course.title}</h3>
                  <p className="text-sky-600 text-sm mb-3">{course.instructor} | {course.duration}</p>
                  <div className="flex items-center mb-3">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-sm text-sky-700">{course.rating}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sky-900">{course.price}</span>
                      <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
                    </div>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                      {Math.round((1 - parseInt(course.price.replace(/[^0-9]/g, '')) / parseInt(course.originalPrice.replace(/[^0-9]/g, ''))) * 100)}% OFF
                    </span>
                  </div>
                  <button 
                    onClick={() => addToCartFromRecommendation(course)}
                    className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors font-semibold transform hover:scale-105"
                  >
                    수강신청
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 결제 모달 */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-sky-900">결제하기</h2>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {paymentSuccess ? (
              /* 결제 완료 화면 */
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-sky-900 mb-2">결제가 완료되었습니다!</h3>
                <p className="text-sky-600 mb-4">강의 수강권이 My Class에 추가되었습니다.</p>
                <div className="bg-sky-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-sky-700">
                    • 결제 완료 메일이 발송되었습니다<br/>
                    • My Class에서 바로 수강 가능합니다<br/>
                    • 영수증은 마이페이지에서 확인하세요
                  </p>
                </div>
              </div>
            ) : (
              /* 결제 폼 */
              <form onSubmit={handlePayment} className="p-6">
                {/* 주문 요약 */}
                <div className="bg-sky-50 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-sky-900 mb-3">주문 요약</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-sky-700">강의 개수</span>
                      <span className="font-semibold">{cartItems.length}개</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sky-700">할인 금액</span>
                      <span className="text-red-600">-{(getTotalOriginalPrice() - getTotalPrice()).toLocaleString()}원</span>
                    </div>
                    <hr className="border-sky-200" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>총 결제 금액</span>
                      <span className="text-sky-900">{getTotalPrice().toLocaleString()}원</span>
                    </div>
                  </div>
                </div>

                {/* 구매자 정보 */}
                <div className="mb-6">
                  <h3 className="font-bold text-sky-900 mb-3">구매자 정보</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-sky-700 mb-1">이름 *</label>
                      <input
                        type="text"
                        name="name"
                        value={paymentForm.name}
                        onChange={handlePaymentFormChange}
                        className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="이름을 입력하세요"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-sky-700 mb-1">이메일 *</label>
                      <input
                        type="email"
                        name="email"
                        value={paymentForm.email}
                        onChange={handlePaymentFormChange}
                        className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="이메일을 입력하세요"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-sky-700 mb-1">연락처 *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={paymentForm.phone}
                        onChange={handlePaymentFormChange}
                        className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="010-0000-0000"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 결제 방법 */}
                <div className="mb-6">
                  <h3 className="font-bold text-sky-900 mb-3">결제 방법</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentForm.paymentMethod === 'card'}
                        onChange={handlePaymentFormChange}
                        className="text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-sky-700">신용카드/체크카드</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={paymentForm.paymentMethod === 'bank'}
                        onChange={handlePaymentFormChange}
                        className="text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-sky-700">무통장입금</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="kakao"
                        checked={paymentForm.paymentMethod === 'kakao'}
                        onChange={handlePaymentFormChange}
                        className="text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-sky-700">카카오페이</span>
                    </label>
                  </div>

                  {/* 카드 결제 정보 */}
                  {paymentForm.paymentMethod === 'card' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-sky-700 mb-1">카드번호</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={paymentForm.cardNumber}
                            onChange={handlePaymentFormChange}
                            className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="0000-0000-0000-0000"
                            maxLength={19}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-sky-700 mb-1">유효기간</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={paymentForm.expiryDate}
                            onChange={handlePaymentFormChange}
                            className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-sky-700 mb-1">CVC</label>
                          <input
                            type="text"
                            name="cvv"
                            value={paymentForm.cvv}
                            onChange={handlePaymentFormChange}
                            className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="000"
                            maxLength={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 무통장입금 정보 */}
                  {paymentForm.paymentMethod === 'bank' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-sky-700 mb-1">은행명</label>
                          <select
                            name="bankName"
                            value={paymentForm.bankName}
                            onChange={handlePaymentFormChange}
                            className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                          >
                            <option value="">은행 선택</option>
                            <option value="kb">KB국민은행</option>
                            <option value="shinhan">신한은행</option>
                            <option value="woori">우리은행</option>
                            <option value="hana">하나은행</option>
                            <option value="nh">농협은행</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-sky-700 mb-1">계좌번호</label>
                          <input
                            type="text"
                            name="accountNumber"
                            value={paymentForm.accountNumber}
                            onChange={handlePaymentFormChange}
                            className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="계좌번호를 입력하세요"
                          />
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                          <strong>입금계좌:</strong> KB국민은행 123-456-789012 (주)AKUnurse<br/>
                          입금자명은 주문자와 동일해야 합니다.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 카카오페이 안내 */}
                  {paymentForm.paymentMethod === 'kakao' && (
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-700">
                        결제하기 버튼을 누르면 카카오페이 결제창으로 이동합니다.
                      </p>
                    </div>
                  )}
                </div>

                {/* 약관 동의 */}
                <div className="mb-6">
                  <h3 className="font-bold text-sky-900 mb-3">약관 동의</h3>
                  <div className="space-y-2">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={paymentForm.agreeTerms}
                        onChange={handlePaymentFormChange}
                        className="mt-1 text-sky-600 focus:ring-sky-500"
                        required
                      />
                      <span className="text-sm text-sky-700">
                        <strong>[필수]</strong> 이용약관 및 결제진행 동의
                        <a href="#" className="text-blue-600 underline ml-1">보기</a>
                      </span>
                    </label>
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreePrivacy"
                        checked={paymentForm.agreePrivacy}
                        onChange={handlePaymentFormChange}
                        className="mt-1 text-sky-600 focus:ring-sky-500"
                        required
                      />
                      <span className="text-sm text-sky-700">
                        <strong>[필수]</strong> 개인정보 수집 및 이용 동의
                        <a href="#" className="text-blue-600 underline ml-1">보기</a>
                      </span>
                    </label>
                  </div>
                </div>

                {/* 결제 버튼 */}
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>결제 처리중...</span>
                      </div>
                    ) : (
                      `${getTotalPrice().toLocaleString()}원 결제하기`
                    )}
                  </button>
                </div>
              </form>
            )}
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