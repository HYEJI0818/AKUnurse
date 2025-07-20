'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SignupPage() {
  const [scrollY, setScrollY] = useState(0);
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    agreeToMarketing: false
  });
  const [isLoading, setIsLoading] = useState(false);
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
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 비밀번호 확인
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    // 필수 약관 동의 확인
    if (!signupForm.agreeToTerms || !signupForm.agreeToPrivacy) {
      alert('필수 약관에 동의해주세요.');
      setIsLoading(false);
      return;
    }
    
    try {
      // 시뮬레이션을 위한 지연
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 회원가입 성공 시뮬레이션
      alert(`환영합니다! ${signupForm.name}님의 회원가입이 완료되었습니다.`);
      // 실제로는 여기서 메인 페이지나 로그인 페이지로 리디렉션
      window.location.href = '/main';
    } catch (error) {
      alert('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    
    try {
      // 시뮬레이션을 위한 지연
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (loginForm.email && loginForm.password) {
        alert(`환영합니다! ${loginForm.email}님`);
        setShowLoginModal(false);
        setLoginForm({ email: '', password: '', rememberMe: false });
      } else {
        alert('이메일과 비밀번호를 입력해주세요.');
      }
    } catch (error) {
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleFindId = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    
    try {
      // 시뮬레이션을 위한 지연
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`등록하신 휴대폰 번호로 아이디를 발송했습니다.\n아이디: ${findIdForm.name.substring(0, 3)}***@email.com`);
      setShowFindId(false);
      setFindIdForm({ name: '', phone: '' });
    } catch (error) {
      alert('아이디 찾기 중 오류가 발생했습니다.');
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleFindPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    
    try {
      // 시뮬레이션을 위한 지연
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('등록하신 이메일로 임시 비밀번호를 발송했습니다.');
      setShowFindPassword(false);
      setFindPasswordForm({ email: '', name: '', phone: '' });
    } catch (error) {
      alert('비밀번호 찾기 중 오류가 발생했습니다.');
    } finally {
      setIsLoginLoading(false);
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
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-transparent bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text">
              AKUnurse
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link href="/main" className="text-sky-700 hover:text-sky-900 transition-colors font-semibold">
                홈으로
              </Link>
              <button 
                onClick={() => setShowLoginModal(true)}
                className="text-sky-700 hover:text-sky-900 transition-colors font-semibold"
              >
                로그인
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 회원가입 섹션 */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-sky-900 mb-2">회원가입</h1>
              <p className="text-sky-600">AKUnurse와 함께 전문 간호사로 성장하세요</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              {/* 이름 */}
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  placeholder="실명을 입력해주세요"
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
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  placeholder="이메일을 입력해주세요"
                  required
                />
              </div>

              {/* 휴대폰 번호 */}
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  휴대폰 번호 *
                </label>
                <input
                  type="tel"
                  value={signupForm.phone}
                  onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  placeholder="010-0000-0000"
                  required
                />
              </div>

              {/* 비밀번호 */}
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  비밀번호 *
                </label>
                <input
                  type="password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  placeholder="비밀번호를 입력해주세요"
                  minLength={8}
                  required
                />
                <div className="flex items-center mt-1 space-x-2">
                  <p className="text-sm text-gray-500">8자 이상 입력해주세요</p>
                  {signupForm.password.length >= 8 && (
                    <span className="text-green-500 text-sm">✓</span>
                  )}
                </div>
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">
                  비밀번호 확인 *
                </label>
                <input
                  type="password"
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                    signupForm.confirmPassword === '' 
                      ? 'border-gray-300 focus:ring-sky-500' 
                      : signupForm.password === signupForm.confirmPassword 
                        ? 'border-green-500 focus:ring-green-500 bg-green-50' 
                        : 'border-red-500 focus:ring-red-500 bg-red-50'
                  }`}
                  placeholder="비밀번호를 다시 입력해주세요"
                  required
                />
                {signupForm.confirmPassword !== '' && (
                  <div className="mt-1">
                    {signupForm.password === signupForm.confirmPassword ? (
                      <p className="text-sm text-green-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        비밀번호가 일치합니다
                      </p>
                    ) : (
                      <p className="text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        비밀번호가 일치하지 않습니다
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* 약관 동의 */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    checked={signupForm.agreeToTerms}
                    onChange={(e) => setSignupForm({...signupForm, agreeToTerms: e.target.checked})}
                    className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                  />
                  <label htmlFor="agreeToTerms" className="ml-2 text-sm text-sky-700">
                    <span className="text-red-500">*</span> 서비스 이용약관에 동의합니다
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreeToPrivacy"
                    checked={signupForm.agreeToPrivacy}
                    onChange={(e) => setSignupForm({...signupForm, agreeToPrivacy: e.target.checked})}
                    className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                  />
                  <label htmlFor="agreeToPrivacy" className="ml-2 text-sm text-sky-700">
                    <span className="text-red-500">*</span> 개인정보 처리방침에 동의합니다
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreeToMarketing"
                    checked={signupForm.agreeToMarketing}
                    onChange={(e) => setSignupForm({...signupForm, agreeToMarketing: e.target.checked})}
                    className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                  />
                  <label htmlFor="agreeToMarketing" className="ml-2 text-sm text-sky-700">
                    마케팅 정보 수신에 동의합니다 (선택)
                  </label>
                </div>
              </div>

              {/* 회원가입 버튼 */}
              <button
                type="submit"
                disabled={
                  isLoading || 
                  signupForm.password !== signupForm.confirmPassword || 
                  signupForm.password.length < 8 ||
                  !signupForm.agreeToTerms ||
                  !signupForm.agreeToPrivacy
                }
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '회원가입 중...' : '회원가입 완료'}
              </button>

              {/* 소셜 로그인 */}
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
                  Google로 회원가입
                </button>
                <button
                  type="button"
                  className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-semibold flex items-center justify-center"
                >
                  <span className="mr-2">💬</span>
                  카카오로 회원가입
                </button>
              </div>

              {/* 로그인 링크 */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  이미 계정이 있으신가요?{' '}
                  <button 
                    onClick={() => setShowLoginModal(true)}
                    className="text-sky-600 hover:text-sky-800 font-semibold underline cursor-pointer"
                  >
                    로그인
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 로그인 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 pt-16 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-sky-900">로그인</h3>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {!showFindId && !showFindPassword ? (
                <>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-sky-900 mb-2">
                        이메일
                      </label>
                      <input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                        placeholder="이메일을 입력해주세요"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-sky-900 mb-2">
                        비밀번호
                      </label>
                      <input
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                        placeholder="비밀번호를 입력해주세요"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="rememberMe"
                          checked={loginForm.rememberMe}
                          onChange={(e) => setLoginForm({...loginForm, rememberMe: e.target.checked})}
                          className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                        />
                        <label htmlFor="rememberMe" className="ml-2 text-sm text-sky-700">로그인 상태 유지</label>
                      </div>
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
                      disabled={isLoginLoading}
                      className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoginLoading ? '로그인 중...' : '로그인'}
                    </button>
                  </form>

                  {/* 소셜 로그인 */}
                  <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">또는</span>
                    </div>
                  </div>

                  <div className="space-y-3 mt-6">
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
                </>
              ) : showFindId ? (
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <button
                      onClick={() => setShowFindId(false)}
                      className="text-sky-600 hover:text-sky-800 flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>뒤로가기</span>
                    </button>
                    <span className="text-gray-300">|</span>
                    <h4 className="text-lg font-semibold text-gray-900">아이디 찾기</h4>
                  </div>
                  
                  <form onSubmit={handleFindId} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-sky-900 mb-2">
                        이름
                      </label>
                      <input
                        type="text"
                        value={findIdForm.name}
                        onChange={(e) => setFindIdForm({...findIdForm, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                        placeholder="이름을 입력해주세요"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-sky-900 mb-2">
                        휴대폰 번호
                      </label>
                      <input
                        type="tel"
                        value={findIdForm.phone}
                        onChange={(e) => setFindIdForm({...findIdForm, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                        placeholder="010-0000-0000"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoginLoading}
                      className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoginLoading ? '처리 중...' : '아이디 찾기'}
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <button
                      onClick={() => setShowFindPassword(false)}
                      className="text-sky-600 hover:text-sky-800 flex items-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>뒤로가기</span>
                    </button>
                    <span className="text-gray-300">|</span>
                    <h4 className="text-lg font-semibold text-gray-900">비밀번호 찾기</h4>
                  </div>
                  
                  <form onSubmit={handleFindPassword} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-sky-900 mb-2">
                        이메일
                      </label>
                      <input
                        type="email"
                        value={findPasswordForm.email}
                        onChange={(e) => setFindPasswordForm({...findPasswordForm, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                        placeholder="이메일을 입력해주세요"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-sky-900 mb-2">
                        이름
                      </label>
                      <input
                        type="text"
                        value={findPasswordForm.name}
                        onChange={(e) => setFindPasswordForm({...findPasswordForm, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                        placeholder="이름을 입력해주세요"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-sky-900 mb-2">
                        휴대폰 번호
                      </label>
                      <input
                        type="tel"
                        value={findPasswordForm.phone}
                        onChange={(e) => setFindPasswordForm({...findPasswordForm, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                        placeholder="010-0000-0000"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoginLoading}
                      className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-lg hover:from-sky-600 hover:to-blue-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoginLoading ? '처리 중...' : '비밀번호 찾기'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 