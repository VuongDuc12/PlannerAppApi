import React, { useState, useEffect } from 'react';
import { FiBook, FiCalendar, FiTarget, FiTrendingUp, FiUsers, FiAward, FiClock, FiCheckCircle, FiArrowRight, FiPlay, FiStar, FiZap, FiSmile, FiHeart, FiCoffee, FiMusic } from 'react-icons/fi';

const HomePage = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4);
    }, 3000);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "Học thông minh, không học cực",
      description: "Tự động lập kế hoạch học tập thông minh, tiết kiệm thời gian và công sức"
    },
    {
      icon: <FiTarget className="w-8 h-8" />,
      title: "Đạt mục tiêu dễ dàng",
      description: "Chia nhỏ mục tiêu thành các bước cụ thể, theo dõi tiến độ real-time"
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Thấy rõ sự tiến bộ",
      description: "Biểu đồ trực quan, thống kê chi tiết giúp bạn thấy được sự cải thiện"
    },
    {
      icon: <FiSmile className="w-8 h-8" />,
      title: "Học vui, học hiệu quả",
      description: "Giao diện thân thiện, gamification giúp việc học trở nên thú vị hơn"
    }
  ];

  const stats = [
    { number: "2000+", label: "Sinh viên đang sử dụng", icon: <FiUsers />, color: "from-pink-500 to-rose-500" },
    { number: "100+", label: "Môn học được quản lý", icon: <FiBook />, color: "from-blue-500 to-indigo-500" },
    { number: "98%", label: "Tỷ lệ hài lòng", icon: <FiHeart />, color: "from-red-500 to-pink-500" },
    { number: "24/7", label: "Hỗ trợ online", icon: <FiCoffee />, color: "from-yellow-500 to-orange-500" }
  ];

  const studentBenefits = [
    {
      icon: <FiAward className="w-6 h-6" />,
      title: "Gamification",
      description: "Học như chơi game với điểm số, huy hiệu và bảng xếp hạng"
    },
    {
      icon: <FiMusic className="w-6 h-6" />,
      title: "Pomodoro Timer",
      description: "Phương pháp học tập hiệu quả với timer thông minh"
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: "AI Recommendations",
      description: "Gợi ý lịch trình học tập phù hợp với thói quen của bạn"
    },
    {
      icon: <FiHeart className="w-6 h-6" />,
      title: "Social Learning",
      description: "Kết nối với bạn bè, chia sẻ tiến độ và động viên lẫn nhau"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Animated Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium mb-6 animate-bounce">
                <FiZap className="w-4 h-4 mr-2" />
                🚀 Mới nhất 2024 - Dành riêng cho sinh viên TLU
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                TLU Study Planner
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                <span className="font-semibold text-purple-600">Biến việc học thành niềm vui!</span> 
                Công cụ quản lý học tập thông minh giúp sinh viên Đại học Thủy Lợi 
                <span className="font-semibold text-blue-600"> học thông minh hơn, hiệu quả hơn</span> 
                và <span className="font-semibold text-pink-600">đạt được mục tiêu dễ dàng</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button 
                  className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2 overflow-hidden"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FiPlay className="w-5 h-5" />
                    Bắt đầu miễn phí ngay!
                  </span>
                  {isHovered && (
                    <div 
                      className="absolute inset-0 bg-white opacity-20 rounded-full"
                      style={{
                        left: mousePosition.x - 100,
                        top: mousePosition.y - 100,
                        transform: 'translate(-50%, -50%)',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  )}
                </button>
                <button className="border-2 border-purple-300 text-purple-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-purple-500 hover:text-purple-800 hover:bg-purple-50 transition-all duration-300 flex items-center gap-2 group">
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Xem demo
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white"></div>
                    ))}
                  </div>
                  <span>2000+ sinh viên đã tin tưởng</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>4.9/5 từ 500+ đánh giá</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Tại sao sinh viên <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">yêu thích</span> chúng tôi?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá những tính năng độc đáo giúp việc học trở nên thú vị và hiệu quả hơn bao giờ hết
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-3xl transition-all duration-500 transform hover:scale-110 hover:rotate-1 ${
                  currentFeature === index
                    ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white shadow-2xl'
                    : 'bg-white/70 hover:bg-white shadow-xl hover:shadow-2xl border border-gray-100'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                  currentFeature === index ? 'bg-white/20' : 'bg-gradient-to-r from-purple-100 to-pink-100'
                }`}>
                  <div className={currentFeature === index ? 'text-white' : 'text-purple-600'}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className={`${currentFeature === index ? 'text-purple-100' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white group">
                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                  <div className="text-3xl">{stat.icon}</div>
                </div>
                <div className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">{stat.number}</div>
                <div className="text-purple-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Benefits */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tính năng <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">độc đáo</span> dành cho sinh viên
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những tính năng thú vị giúp việc học trở nên vui vẻ và hiệu quả hơn
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentBenefits.map((benefit, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Chỉ <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">3 bước</span> để bắt đầu
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Đơn giản, nhanh chóng và hiệu quả - Bắt đầu ngay hôm nay!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  1
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm animate-pulse">
                  <FiZap className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Đăng ký & Tạo profile</h3>
              <p className="text-gray-600">
                Đăng ký miễn phí và tạo profile cá nhân với thông tin học tập của bạn
              </p>
            </div>
            <div className="text-center group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  2
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm animate-pulse">
                  <FiTarget className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Thêm môn học & Mục tiêu</h3>
              <p className="text-gray-600">
                Thêm các môn học đang theo học và thiết lập mục tiêu học tập cá nhân
              </p>
            </div>
            <div className="text-center group">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  3
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm animate-pulse">
                  <FiTrendingUp className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bắt đầu học thông minh</h3>
              <p className="text-gray-600">
                Nhận lịch trình học tập thông minh và theo dõi tiến độ real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sinh viên <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">nói gì</span> về chúng tôi?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những phản hồi chân thực từ sinh viên đã sử dụng TLU Study Planner
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "TLU Study Planner đã thay đổi hoàn toàn cách học của mình! Giao diện đẹp, tính năng thông minh và thực sự giúp mình quản lý thời gian hiệu quả hơn rất nhiều. 🚀"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  NV
                </div>
                <div>
                  <div className="font-bold text-gray-900">Nguyễn Văn An</div>
                  <div className="text-gray-600">Sinh viên năm 3 - Khoa CNTT</div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Tính năng gamification thực sự tuyệt vời! Mình cảm thấy như đang chơi game khi học. Điểm số và huy hiệu thúc đẩy mình học tập rất nhiều. 🎮✨"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  TL
                </div>
                <div>
                  <div className="font-bold text-gray-900">Trần Linh</div>
                  <div className="text-gray-600">Sinh viên năm 2 - Khoa Kinh tế</div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "AI recommendations thực sự thông minh! Hệ thống hiểu được thói quen học tập của mình và đưa ra lịch trình phù hợp. Điểm GPA đã tăng từ 2.8 lên 3.5! 📈"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  LH
                </div>
                <div>
                  <div className="font-bold text-gray-900">Lê Hoàng</div>
                  <div className="text-gray-600">Sinh viên năm 4 - Khoa Xây dựng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-white mb-6">
            Sẵn sàng <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">thay đổi</span> cách học?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Tham gia cùng hàng nghìn sinh viên Đại học Thủy Lợi đang học thông minh hơn với TLU Study Planner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
              <FiZap className="w-5 h-5" />
              Đăng ký miễn phí ngay!
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center justify-center gap-2">
              <FiPlay className="w-5 h-5" />
              Xem demo 2 phút
            </button>
          </div>
          <p className="text-purple-200 mt-4 text-sm">
            ⚡ Không cần thẻ tín dụng • 🎁 Tặng 30 ngày Premium • 📱 Hoạt động trên mọi thiết bị
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 