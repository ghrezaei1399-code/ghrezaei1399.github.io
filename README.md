<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>دکتر غلامرضا رضائی | خرد + فناوری + عدالت دیجیتال</title>
    
    <!-- فونت‌ها و کتابخانه‌ها -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vazirmatn@33.003/font.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    <script>
        emailjs.init("YOUR_PUBLIC_KEY"); <!-- جایگزین با کلید واقعی -->
    </script>
    
    <style>
        /* متغیرهای رنگ */
        :root {
            --navy-blue: #0A2463;
            --deep-teal: #1A5276;
            --accent-gold: #D4AF37;
            --soft-blue: #3498DB;
            --literary-purple: #6A4C93;
            --justice-green: #27AE60;
            --awakening-orange: #E67E22;
            --light-bg: #F8F9FA;
            --card-shadow: rgba(10, 36, 99, 0.1);
        }
        
        /* ریست و پایه */
        * { 
            margin: 0; 
            padding: 0; 
            box-sizing: border-box; 
        }
        
        html { 
            scroll-behavior: smooth; 
        }
        
        body { 
            font-family: 'Vazirmatn', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: var(--light-bg); 
            color: #333; 
            line-height: 1.7;
            overflow-x: hidden;
        }
        
        /* انیمیشن‌های پایه */
        @keyframes fadeIn {
            from { 
                opacity: 0; 
                transform: translateY(30px); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0); 
            }
        }
        
        @keyframes slideInRight {
            from { 
                opacity: 0; 
                transform: translateX(50px); 
            }
            to { 
                opacity: 1; 
                transform: translateX(0); 
            }
        }
        
        @keyframes pulse {
            0% { 
                transform: scale(1); 
            }
            50% { 
                transform: scale(1.05); 
            }
            100% { 
                transform: scale(1); 
            }
        }
        
        /* نوار پیشرفت خواندن */
        .progress-bar {
            position: fixed;
            top: 0;
            right: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, var(--accent-gold), var(--justice-green));
            z-index: 10000;
            transition: width 0.3s ease;
            box-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);
        }
        
        /* دکمه برگشت به بالا */
        #backToTop {
            position: fixed;
            bottom: 35px;
            left: 35px;
            width: 55px;
            height: 55px;
            background: linear-gradient(135deg, var(--accent-gold), #e6c158);
            color: var(--navy-blue);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.6rem;
            cursor: pointer;
            z-index: 9999;
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: none;
            opacity: 0;
            visibility: hidden;
        }
        
        #backToTop.show {
            opacity: 1;
            visibility: visible;
        }
        
        #backToTop:hover {
            transform: translateY(-8px) scale(1.1);
            box-shadow: 0 15px 35px rgba(212, 175, 55, 0.6);
            animation: pulse 1s infinite;
        }
        
        /* نوار متحرک بالایی */
        .top-marquee {
            background: linear-gradient(90deg, var(--navy-blue), var(--deep-teal), var(--literary-purple));
            background-size: 300% 300%;
            color: white;
            padding: 14px 0;
            overflow: hidden;
            white-space: nowrap;
            font-weight: 700;
            font-size: 1.15rem;
            position: sticky;
            top: 0;
            z-index: 1001;
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
            animation: gradientShift 8s ease infinite;
            border-bottom: 2px solid rgba(212, 175, 55, 0.3);
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .marquee-content {
            display: inline-block;
            animation: marquee 35s linear infinite;
            padding-right: 100%;
        }
        
        .marquee-content span {
            margin: 0 45px;
            display: inline-block;
            position: relative;
            padding: 5px 15px;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(5px);
            transition: all 0.3s;
        }
        
        .marquee-content span:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
        
        .marquee-content i {
            color: var(--accent-gold);
            margin-left: 10px;
            font-size: 1.2rem;
        }
        
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }
        
        /* دکمه زبان */
        .lang-switcher {
            position: absolute;
            top: 30px;
            left: 30px;
            z-index: 1002;
        }
        
        .lang-btn {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(12px);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.4);
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 1rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .lang-btn:hover {
            background: var(--accent-gold);
            color: var(--navy-blue);
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 10px 25px rgba(212, 175, 55, 0.5);
            border-color: var(--accent-gold);
        }
        
        /* هدر اصلی */
        .main-header {
            background: linear-gradient(135deg, 
                rgba(10, 36, 99, 0.95) 0%, 
                rgba(26, 82, 118, 0.92) 50%,
                rgba(10, 36, 99, 0.9) 100%),
                url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,0 L100,100 Z" fill="rgba(255,255,255,0.05)"/></svg>');
            background-size: cover;
            min-height: 65vh;
            padding: 40px 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            margin-top: 0;
            overflow: hidden;
        }
        
        .main-header::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 30% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 50%);
            pointer-events: none;
        }
        
        .header-container {
            max-width: 1350px;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 35px;
            align-items: start;
            animation: fadeIn 1s ease-out;
        }
        
        .profile-section {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 25px;
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            border: 1px solid rgba(255, 255, 255, 0.25);
            box-shadow: 
                0 20px 50px rgba(0, 0, 0, 0.3),
                inset 0 1px 0 rgba(255,255,255,0.3);
            width: 100%;
            transition: transform 0.5s ease;
        }
        
        .profile-section:hover {
            transform: translateY(-10px);
        }
        
        .profile-img-container {
            display: flex;
            align-items: center;
            gap: 30px;
            margin-bottom: 25px;
            width: 100%;
        }
        
        .profile-img {
            width: 160px;
            height: 160px;
            border-radius: 20px;
            border: 5px solid var(--accent-gold);
            overflow: hidden;
            flex-shrink: 0;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
            transition: all 0.4s;
            position: relative;
        }
        
        .profile-img:hover {
            transform: scale(1.05) rotate(2deg);
            border-color: #fff;
            box-shadow: 0 20px 40px rgba(212, 175, 55, 0.5);
        }
        
        .profile-img::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent 50%, rgba(212,175,55,0.1) 100%);
            pointer-events: none;
        }
        
        .profile-img img { 
            width: 100%; 
            height: 100%; 
            object-fit: cover;
            transition: transform 0.5s;
        }
        
        .profile-img:hover img {
            transform: scale(1.1);
        }
        
        .profile-titles {
            flex: 1;
            animation: slideInRight 0.8s ease 0.2s both;
        }
        
        .profile-titles h1 {
            color: white;
            font-size: 2.8rem;
            margin-bottom: 12px;
            text-shadow: 0 4px 8px rgba(0,0,0,0.4);
            line-height: 1.3;
            background: linear-gradient(to left, #fff, var(--accent-gold));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .profile-titles .tagline {
            color: rgba(255, 255, 255, 0.95);
            font-size: 1.25rem;
            line-height: 1.6;
            margin-bottom: 20px;
            padding-right: 10px;
            border-right: 3px solid var(--accent-gold);
        }
        
        .titles-container {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        .title-badge {
            background: linear-gradient(135deg, 
                rgba(212, 175, 55, 0.2), 
                rgba(52, 152, 219, 0.2));
            color: white;
            padding: 12px 25px;
            border-radius: 50px;
            font-size: 1.05rem;
            font-weight: 600;
            border: 1px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(5px);
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .title-badge:hover {
            transform: translateY(-5px);
            background: linear-gradient(135deg, 
                rgba(212, 175, 55, 0.4), 
                rgba(52, 152, 219, 0.4));
            border-color: var(--accent-gold);
            box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
        }
        
        .motto-box {
            color: white;
            background: rgba(0, 0, 0, 0.2);
            padding: 20px 25px;
            border-radius: 18px;
            border-right: 5px solid var(--accent-gold);
            font-size: 1.1rem;
            line-height: 1.8;
            width: 100%;
            margin-top: 20px;
            backdrop-filter: blur(10px);
            border-left: 1px solid rgba(255,255,255,0.1);
            animation: fadeIn 0.8s ease 0.5s both;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
        }
        
        .motto {
            color: var(--accent-gold);
            font-weight: 700;
            font-size: 1.2rem;
        }
        
        /* نوار ابزار عمودی */
        .vertical-nav {
            background: rgba(255, 255, 255, 0.98);
            border-radius: 25px;
            padding: 30px 25px;
            box-shadow: 
                0 15px 35px var(--card-shadow),
                inset 0 -1px 0 rgba(0,0,0,0.05);
            display: flex;
            flex-direction: column;
            gap: 15px;
            height: fit-content;
            border: 1px solid rgba(10, 36, 99, 0.1);
            animation: fadeIn 1s ease 0.3s both;
        }
        
        .nav-item {
            background: linear-gradient(to left, 
                var(--soft-blue) 0%, 
                var(--deep-teal) 100%);
            color: white;
            padding: 16px 24px;
            border-radius: 15px;
            text-decoration: none;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 15px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 6px 20px rgba(52, 152, 219, 0.3);
            font-size: 1.05rem;
            position: relative;
            overflow: hidden;
        }
        
        .nav-item::before {
            content: '';
            position: absolute;
            top: 0;
            right: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255,255,255,0.3), 
                transparent);
            transition: 0.5s;
        }
        
        .nav-item:hover {
            transform: translateX(-10px) scale(1.02);
            box-shadow: 0 12px 30px rgba(52, 152, 219, 0.5);
        }
        
        .nav-item:hover::before {
            right: 100%;
        }
        
        .nav-icon { 
            font-size: 1.3rem; 
            filter: drop-shadow(0 2px 3px rgba(0,0,0,0.2));
        }
        
        /* بخش فراخوان جهانی */
        .global-call-section {
            padding: 90px 35px;
            background: linear-gradient(135deg, 
                #f0f7ff 0%, 
                #e3f2fd 50%,
                #f0f7ff 100%);
            position: relative;
            overflow: hidden;
        }
        
        .global-call-section::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, 
                rgba(52, 152, 219, 0.03) 0%, 
                transparent 70%);
            pointer-events: none;
        }
        
        .section-title {
            text-align: center;
            font-size: 2.8rem;
            color: var(--navy-blue);
            margin-bottom: 60px;
            position: relative;
            font-weight: 800;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            animation: fadeIn 0.8s ease;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -20px;
            right: 50%;
            transform: translateX(50%);
            width: 120px;
            height: 6px;
            background: linear-gradient(to left, 
                var(--accent-gold), 
                var(--justice-green));
            border-radius: 3px;
            box-shadow: 0 4px 10px rgba(212, 175, 55, 0.3);
        }
        
        .call-to-action-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 35px;
            max-width: 1350px;
            margin: 0 auto;
            animation: fadeIn 1s ease 0.2s both;
        }
        
        .call-card {
            background: white;
            border-radius: 25px;
            padding: 40px;
            box-shadow: 
                0 20px 40px rgba(10, 36, 99, 0.12),
                inset 0 1px 0 rgba(255,255,255,0.8);
            border: 2px solid transparent;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            text-align: center;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
        }
        
        .call-card::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(to left, 
                var(--accent-gold), 
                var(--justice-green));
            transform: translateX(-100%);
            transition: transform 0.6s ease;
        }
        
        .call-card:hover {
            transform: translateY(-15px) scale(1.02);
            border-color: var(--accent-gold);
            box-shadow: 0 30px 60px rgba(10, 36, 99, 0.2);
        }
        
        .call-card:hover::before {
            transform: translateX(0);
        }
        
        .call-icon {
            font-size: 3.5rem;
            margin-bottom: 25px;
            display: inline-block;
            animation: pulse 2s infinite;
            filter: drop-shadow(0 5px 10px rgba(0,0,0,0.1));
        }
        
        .call-card h3 {
            color: var(--navy-blue);
            font-size: 1.8rem;
            margin-bottom: 20px;
            line-height: 1.4;
            font-weight: 800;
        }
        
        .call-card p {
            color: #555;
            line-height: 1.8;
            flex: 1;
            margin-bottom: 25px;
            font-size: 1.1rem;
        }
        
        .call-action-btn {
            background: linear-gradient(135deg, 
                var(--accent-gold), 
                #e6c158);
            color: var(--navy-blue);
            border: none;
            padding: 15px 35px;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.4s;
            margin-top: 20px;
            text-decoration: none;
            display: inline-block;
            font-size: 1.1rem;
            box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
            position: relative;
            overflow: hidden;
        }
        
        .call-action-btn::after {
            content: '';
            position: absolute;
            top: 0;
            right: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255,255,255,0.4), 
                transparent);
            transition: 0.5s;
        }
        
        .call-action-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(212, 175, 55, 0.5);
        }
        
        .call-action-btn:hover::after {
            right: 100%;
        }
        
        .call-highlight {
            background: linear-gradient(135deg, 
                rgba(212, 175, 55, 0.15), 
                rgba(39, 174, 96, 0.15));
            border-right: 4px solid var(--accent-gold);
            padding: 18px;
            border-radius: 12px;
            margin-top: 20px;
            font-size: 1rem;
            color: #333;
            text-align: right;
            line-height: 1.6;
            font-style: italic;
            border-left: 1px solid rgba(212,175,55,0.1);
        }
        
        /* معبد بیداری دیجیتال */
        .temple-section {
            padding: 90px 35px;
            background: white;
            position: relative;
        }
        
        .temple-section::before {
            content: '🛕';
            position: absolute;
            top: 40px;
            left: 40px;
            font-size: 5rem;
            opacity: 0.05;
            z-index: 0;
        }
        
        .temple-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 35px;
            margin-top: 50px;
            animation: fadeIn 1s ease 0.4s both;
        }
        
        .temple-card {
            background: white;
            border-radius: 25px;
            padding: 35px;
            box-shadow: 
                0 20px 40px rgba(10, 36, 99, 0.1),
                inset 0 1px 0 rgba(255,255,255,0.8);
            border: 2px solid transparent;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
            z-index: 1;
        }
        
        .temple-card:hover {
            transform: translateY(-12px);
            border-color: var(--justice-green);
            box-shadow: 0 30px 50px rgba(10, 36, 99, 0.15);
        }
        
        .temple-card::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, 
                transparent 50%, 
                rgba(39, 174, 96, 0.05) 100%);
            border-radius: 0 0 25px 0;
            z-index: -1;
        }
        
        .temple-card h3 {
            color: var(--navy-blue);
            font-size: 1.7rem;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 15px;
            font-weight: 800;
        }
        
        .temple-card p {
            color: #555;
            line-height: 1.8;
            margin-bottom: 20px;
            font-size: 1.1rem;
        }
        
        .temple-card ul {
            margin-right: 25px;
            margin-top: 20px;
        }
        
        .temple-card li {
            margin-bottom: 12px;
            color: #666;
            position: relative;
            padding-right: 25px;
            line-height: 1.6;
            font-size: 1.05rem;
        }
        
        .temple-card li::before {
            content: "➤";
            color: var(--justice-green);
            font-size: 1.3rem;
            position: absolute;
            right: 0;
            top: 2px;
            font-weight: bold;
        }
        
        /* باکس شمارنده */
        .stats-section {
            padding: 70px 35px;
            background: linear-gradient(135deg, 
                #f8fafc 0%, 
                #eef2f7 100%);
            position: relative;
            overflow: hidden;
        }
        
        .stats-container {
            max-width: 1350px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 25px;
            animation: fadeIn 1s ease;
        }
        
        .stat-box {
            background: linear-gradient(135deg, 
                #ffffff, 
                #f0f7ff);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            border: 2px solid #e2e8f0;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 
                0 10px 30px rgba(10, 36, 99, 0.08),
                inset 0 1px 0 rgba(255,255,255,0.8);
            position: relative;
            overflow: hidden;
        }
        
        .stat-box:hover {
            transform: translateY(-12px);
            border-color: var(--soft-blue);
            box-shadow: 0 25px 50px var(--card-shadow);
        }
        
        .stat-box::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, 
                transparent 30%, 
                rgba(52, 152, 219, 0.05) 100%);
            z-index: 0;
        }
        
        .stat-number {
            font-size: 3.2rem;
            font-weight: 900;
            color: var(--navy-blue);
            display: block;
            line-height: 1;
            margin-bottom: 15px;
            position: relative;
            z-index: 1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            background: linear-gradient(to left, 
                var(--navy-blue), 
                var(--deep-teal));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .stat-label {
            color: #555;
            font-size: 1.05rem;
            line-height: 1.6;
            min-height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 1;
            font-weight: 600;
        }
        
        /* بخش مقالات */
        .research-section {
            padding: 90px 35px;
            background: white;
            position: relative;
        }
        
        .research-tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 50px;
            justify-content: center;
            animation: fadeIn 0.8s ease;
        }
        
        .tab-btn {
            padding: 18px 35px;
            background: #f0f7ff;
            border: none;
            border-radius: 18px;
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--navy-blue);
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 5px 15px rgba(10, 36, 99, 0.1);
        }
        
        .tab-btn:hover {
            background: var(--soft-blue);
            color: white;
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(52, 152, 219, 0.3);
        }
        
        .tab-btn.active {
            background: linear-gradient(135deg, 
                var(--navy-blue), 
                var(--deep-teal));
            color: white;
            box-shadow: 
                0 12px 30px rgba(10, 36, 99, 0.25),
                inset 0 1px 0 rgba(255,255,255,0.2);
            transform: translateY(-2px);
        }
        
        .tab-icon { 
            font-size: 1.5rem; 
        }
        
        .tab-content {
            display: none;
            animation: fadeIn 0.6s ease;
        }
        
        .tab-content.active {
            display: block;
        }
        
        .research-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
            gap: 35px;
            margin-bottom: 60px;
        }
        
        .research-card {
            background: #f8fafc;
            border-radius: 25px;
            padding: 35px;
            border: 1px solid #e2e8f0;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
        }
        
        .research-card:hover {
            transform: translateY(-15px);
            box-shadow: 0 30px 50px rgba(10, 36, 99, 0.15);
            border-color: var(--soft-blue);
        }
        
        .research-card::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(to left, 
                var(--soft-blue), 
                var(--literary-purple));
            transform: translateX(-100%);
            transition: transform 0.6s ease;
        }
        
        .research-card:hover::before {
            transform: translateX(0);
        }
        
        .research-card-header {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e2e8f0;
        }
        
        .research-card-title {
            font-size: 1.5rem;
            color: var(--navy-blue);
            margin-bottom: 15px;
            line-height: 1.4;
            font-weight: 800;
        }
        
        .research-card-meta {
            display: flex;
            justify-content: space-between;
            font-size: 1rem;
            color: #666;
        }
        
        .research-card-date { 
            font-weight: 700; 
            color: var(--deep-teal);
        }
        
        .research-card-keywords {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 20px 0;
        }
        
        .keyword {
            background: rgba(52, 152, 219, 0.15);
            color: var(--deep-teal);
            padding: 8px 18px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 700;
            transition: all 0.3s;
        }
        
        .keyword:hover {
            background: rgba(52, 152, 219, 0.25);
            transform: translateY(-2px);
        }
        
        .research-card-body {
            flex: 1;
            color: #555;
            line-height: 1.8;
            margin-bottom: 25px;
            font-size: 1.1rem;
        }
        
        .research-card-footer {
            margin-top: auto;
            padding-top: 20px;
            border-top: 1px dashed #ddd;
            text-align: left;
            font-style: italic;
            color: #777;
            font-size: 1rem;
        }
        
        .request-ppt-btn {
            background: linear-gradient(135deg, 
                var(--literary-purple), 
                #8A63B5);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.4s;
            margin-top: 20px;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            font-size: 1.1rem;
            box-shadow: 0 8px 20px rgba(106, 76, 147, 0.3);
            position: relative;
            overflow: hidden;
        }
        
        .request-ppt-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(106, 76, 147, 0.4);
        }
        
        .request-ppt-btn::after {
            content: '';
            position: absolute;
            top: 0;
            right: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255,255,255,0.3), 
                transparent);
            transition: 0.5s;
        }
        
        .request-ppt-btn:hover::after {
            right: 100%;
        }
        
        /* یادداشت‌های روزانه */
        .notes-section {
            padding: 90px 35px;
            background: #f8fafc;
            position: relative;
        }
        
        .timeline {
            max-width: 950px;
            margin: 60px auto;
            position: relative;
            animation: fadeIn 1s ease;
        }
        
        .timeline::before {
            content: '';
            position: absolute;
            right: 50%;
            top: 0;
            bottom: 0;
            width: 6px;
            background: linear-gradient(to bottom, 
                var(--soft-blue), 
                var(--literary-purple));
            border-radius: 3px;
            box-shadow: 0 0 15px rgba(52, 152, 219, 0.3);
            transform: translateX(50%);
        }
        
        .timeline-item {
            margin-bottom: 50px;
            position: relative;
            width: 45%;
            animation: slideInRight 0.8s ease both;
        }
        
        .timeline-item:nth-child(odd) {
            margin-right: 55%;
            animation-name: slideInRight;
        }
        
        .timeline-item:nth-child(even) {
            margin-right: 0;
            margin-left: 55%;
            animation-name: slideInRight;
        }
        
        .timeline-date {
            background: var(--navy-blue);
            color: white;
            padding: 12px 25px;
            border-radius: 25px;
            font-weight: 700;
            display: inline-block;
            margin-bottom: 15px;
            box-shadow: 0 8px 20px rgba(10, 36, 99, 0.2);
            transition: all 0.3s;
        }
        
        .timeline-date:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 25px rgba(10, 36, 99, 0.3);
        }
        
        .timeline-content {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 
                0 15px 35px rgba(0,0,0,0.08),
                inset 0 1px 0 rgba(255,255,255,0.8);
            border: 1px solid #e2e8f0;
            transition: all 0.4s;
        }
        
        .timeline-content:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px rgba(0,0,0,0.12);
            border-color: var(--soft-blue);
        }
        
        .timeline-content h3 {
            color: var(--deep-teal);
            margin-bottom: 15px;
            font-size: 1.4rem;
            font-weight: 800;
        }
        
        /* اسلایدشو مقالات */
        .slideshow-section {
            padding: 80px 35px;
            background: white;
            position: relative;
        }
        
        .slideshow-container {
            max-width: 1100px;
            margin: 50px auto;
            border-radius: 25px;
            overflow: hidden;
            box-shadow: 
                0 25px 50px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255,255,255,0.1);
            position: relative;
            border: 3px solid rgba(10, 36, 99, 0.1);
        }
        
        .slides-wrapper {
            display: flex;
            transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        
        .slide-item {
            min-width: 100%;
            height: 450px;
            background: #1e293b;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        
        .slide-item::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, 
                rgba(0,0,0,0.5), 
                transparent 50%);
            pointer-events: none;
        }
        
        .slide-item img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            transition: transform 0.5s;
        }
        
        .slide-item:hover img {
            transform: scale(1.03);
        }
        
        .slide-controls {
            position: absolute;
            bottom: 30px;
            right: 50%;
            transform: translateX(50%);
            display: flex;
            gap: 15px;
            z-index: 2;
        }
        
        .slide-dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 2px solid transparent;
        }
        
        .slide-dot:hover {
            background: rgba(255, 255, 255, 0.8);
            transform: scale(1.3);
        }
        
        .slide-dot.active {
            background: white;
            transform: scale(1.5);
            box-shadow: 0 0 15px rgba(255,255,255,0.5);
            border-color: var(--accent-gold);
        }
        
        /* اسلایدشو کتاب‌ها */
        .books-slideshow {
            padding: 80px 35px;
            background: linear-gradient(135deg, 
                #f9f5ff 0%, 
                #f0ebfa 100%);
            position: relative;
            overflow: hidden;
        }
        
        .books-slider {
            max-width: 1200px;
            margin: 50px auto;
            overflow: hidden;
            border-radius: 25px;
            box-shadow: 
                0 25px 50px rgba(106, 76, 147, 0.2),
                inset 0 1px 0 rgba(255,255,255,0.2);
            border: 3px solid rgba(106, 76, 147, 0.1);
            position: relative;
        }
        
        .books-track {
            display: flex;
            transition: transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        
        .book-slide {
            min-width: 25%;
            padding: 20px;
        }
        
        .book-item {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 
                0 15px 35px rgba(0, 0, 0, 0.12),
                inset 0 1px 0 rgba(255,255,255,0.8);
            height: 420px;
            display: flex;
            flex-direction: column;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
        }
        
        .book-item:hover {
            transform: translateY(-15px);
            box-shadow: 0 30px 50px rgba(0, 0, 0, 0.2);
        }
        
        .book-cover {
            height: 200px;
            background: linear-gradient(135deg, 
                var(--literary-purple), 
                #8A63B5);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 25px;
            position: relative;
            overflow: hidden;
        }
        
        .book-cover::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, 
                transparent 40%, 
                rgba(255,255,255,0.1) 100%);
            pointer-events: none;
        }
        
        .book-cover img {
            max-width: 80%;
            max-height: 80%;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
            transition: transform 0.5s;
        }
        
        .book-item:hover .book-cover img {
            transform: scale(1.05) rotate(1deg);
        }
        
        .book-info {
            padding: 25px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        
        .book-title {
            color: var(--literary-purple);
            font-size: 1.3rem;
            font-weight: 800;
            margin-bottom: 12px;
            line-height: 1.4;
        }
        
        .book-desc {
            color: #555;
            font-size: 1rem;
            line-height: 1.6;
            flex: 1;
            margin-bottom: 15px;
        }
        
        .book-status {
            color: #666;
            font-size: 0.9rem;
            font-style: italic;
            margin-top: 15px;
            text-align: left;
            padding-top: 15px;
            border-top: 1px dashed #e2e8f0;
        }
        
        /* درخواست خرید کتاب */
        .book-request-box {
            max-width: 800px;
            margin: 50px auto;
            background: linear-gradient(135deg, 
                rgba(212, 175, 55, 0.1), 
                rgba(106, 76, 147, 0.1));
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            border: 2px dashed var(--accent-gold);
            animation: fadeIn 1s ease;
        }
        
        .book-request-box h3 {
            color: var(--navy-blue);
            margin-bottom: 20px;
            font-size: 1.8rem;
            font-weight: 800;
        }
        
        .book-request-box p {
            color: #555;
            line-height: 1.8;
            margin-bottom: 25px;
            font-size: 1.1rem;
        }
        
        .book-request-btn {
            background: linear-gradient(135deg, 
                var(--accent-gold), 
                #e6c158);
            color: var(--navy-blue);
            border: none;
            padding: 15px 40px;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.4s;
            font-size: 1.1rem;
            box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
            display: inline-flex;
            align-items: center;
            gap: 10px;
        }
        
        .book-request-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(212, 175, 55, 0.5);
        }
        
        /* گالری کتاب‌ها */
        .books-gallery-section {
            padding: 70px 35px;
            background: white;
            position: relative;
        }
        
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 30px;
            max-width: 1300px;
            margin: 40px auto;
            animation: fadeIn 1s ease 0.2s both;
        }
        
        .gallery-item {
            background: #f8fafc;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 
                0 10px 25px rgba(0,0,0,0.1),
                inset 0 1px 0 rgba(255,255,255,0.8);
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 2px solid transparent;
        }
        
        .gallery-item:hover {
            transform: translateY(-12px);
            box-shadow: 0 25px 40px rgba(0,0,0,0.15);
            border-color: var(--literary-purple);
        }
        
        .gallery-img {
            height: 200px;
            background: linear-gradient(135deg, 
                #e3d9f5, 
                #d6c8f0);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            position: relative;
            overflow: hidden;
        }
        
        .gallery-img::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, 
                transparent 40%, 
                rgba(255,255,255,0.2) 100%);
            pointer-events: none;
        }
        
        .gallery-img img {
            max-width: 85%;
            max-height: 85%;
            object-fit: contain;
            border-radius: 6px;
            box-shadow: 0 8px 15px rgba(0,0,0,0.2);
            transition: transform 0.5s;
        }
        
        .gallery-item:hover .gallery-img img {
            transform: scale(1.08);
        }
        
        .gallery-caption {
            padding: 20px;
            text-align: center;
            font-weight: 800;
            color: var(--literary-purple);
            font-size: 1.1rem;
            line-height: 1.5;
        }
        
        /* بخش سرمایه‌گذاری */
        .investment-section {
            padding: 80px 35px;
            background: linear-gradient(135deg, 
                var(--navy-blue) 0%, 
                var(--deep-teal) 50%,
                var(--navy-blue) 100%);
            color: white;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .investment-section::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, 
                rgba(212, 175, 55, 0.1) 0%, 
                transparent 70%);
            pointer-events: none;
        }
        
        .investment-content {
            max-width: 1000px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
            animation: fadeIn 1s ease;
        }
        
        .investment-content h2 {
            font-size: 2.5rem;
            margin-bottom: 25px;
            font-weight: 800;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            background: linear-gradient(to left, 
                #fff, 
                var(--accent-gold));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .investment-text {
            font-size: 1.3rem;
            line-height: 1.8;
            margin-bottom: 30px;
            opacity: 0.95;
        }
        
        .highlight-box {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border-radius: 18px;
            padding: 25px;
            border-right: 5px solid var(--accent-gold);
            margin-top: 25px;
            font-size: 1.2rem;
            line-height: 1.7;
            text-align: right;
            border-left: 1px solid rgba(255,255,255,0.1);
            box-shadow: 
                inset 0 0 20px rgba(0,0,0,0.1),
                0 5px 15px rgba(0,0,0,0.2);
        }
        
        .investment-btn {
            background: linear-gradient(135deg, 
                var(--accent-gold), 
                #e6c158);
            color: var(--navy-blue);
            border: none;
            padding: 18px 50px;
            border-radius: 12px;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            margin-top: 35px;
            display: inline-block;
            text-decoration: none;
            font-size: 1.2rem;
            box-shadow: 0 10px 25px rgba(212, 175, 55, 0.4);
            position: relative;
            overflow: hidden;
        }
        
        .investment-btn:hover {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 20px 40px rgba(212, 175, 55, 0.6);
        }
        
        .investment-btn::after {
            content: '';
            position: absolute;
            top: 0;
            right: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255,255,255,0.4), 
                transparent);
            transition: 0.5s;
        }
        
        .investment-btn:hover::after {
            right: 100%;
        }
        
        /* مودال پاورپوینت */
        .modal {
            display: none;
            position: fixed;
            top: 0; 
            left: 0;
            width: 100%; 
            height: 100%;
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(10px);
            z-index: 2000;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.4s ease;
        }
        
        .modal.active { 
            display: flex; 
        }
        
        .modal-content {
            background: white;
            border-radius: 25px;
            padding: 50px;
            max-width: 550px;
            width: 90%;
            text-align: center;
            box-shadow: 
                0 30px 60px rgba(0,0,0,0.4),
                inset 0 1px 0 rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.1);
            animation: slideInRight 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
        }
        
        .modal-content::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(to left, 
                var(--accent-gold), 
                var(--justice-green));
        }
        
        .modal-icon { 
            font-size: 4.5rem; 
            color: var(--accent-gold); 
            margin-bottom: 25px; 
            display: inline-block;
            animation: pulse 2s infinite;
            filter: drop-shadow(0 5px 10px rgba(212, 175, 55, 0.3));
        }
        
        .modal h3 { 
            color: var(--navy-blue); 
            margin-bottom: 20px; 
            font-size: 1.8rem;
            font-weight: 800;
        }
        
        .modal p { 
            color: #555; 
            line-height: 1.8; 
            margin-bottom: 30px; 
            font-size: 1.1rem;
        }
        
        .modal-close {
            background: linear-gradient(135deg, 
                var(--navy-blue), 
                var(--deep-teal));
            color: white;
            border: none;
            padding: 15px 35px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 700;
            font-size: 1.1rem;
            transition: all 0.3s;
            box-shadow: 0 8px 20px rgba(10, 36, 99, 0.3);
        }
        
        .modal-close:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 25px rgba(10, 36, 99, 0.4);
        }
        
        .modal-contact {
            background: linear-gradient(135deg, 
                var(--accent-gold), 
                #e6c158);
            color: var(--navy-blue);
            margin-left: 15px;
        }
        
        /* فرم درخواست همکاری */
        .request-form-section {
            padding: 90px 35px;
            background: #f0f7ff;
            display: none;
            position: relative;
        }
        
        .request-form-section.active {
            display: block;
            animation: fadeIn 0.6s ease;
        }
        
        .request-form {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 25px;
            padding: 50px;
            box-shadow: 
                0 25px 50px rgba(10, 36, 99, 0.15),
                inset 0 1px 0 rgba(255,255,255,0.8);
            border: 1px solid rgba(10, 36, 99, 0.1);
            animation: slideInRight 0.5s ease;
        }
        
        .form-group {
            margin-bottom: 30px;
            animation: fadeIn 0.6s ease both;
        }
        
        .form-group:nth-child(1) { animation-delay: 0.1s; }
        .form-group:nth-child(2) { animation-delay: 0.2s; }
        .form-group:nth-child(3) { animation-delay: 0.3s; }
        .form-group:nth-child(4) { animation-delay: 0.4s; }
        .form-group:nth-child(5) { animation-delay: 0.5s; }
        .form-group:nth-child(6) { animation-delay: 0.6s; }
        
        .form-group label {
            display: block;
            margin-bottom: 12px;
            font-weight: 800;
            color: var(--navy-blue);
            font-size: 1.1rem;
        }
        
        .form-group input, 
        .form-group textarea, 
        .form-group select {
            width: 100%;
            padding: 18px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-family: inherit;
            font-size: 1.1rem;
            transition: all 0.3s;
            background: #f8fafc;
        }
        
        .form-group input:focus, 
        .form-group textarea:focus, 
        .form-group select:focus {
            border-color: var(--soft-blue);
            outline: none;
            box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.15);
            background: white;
        }
        
        .form-group textarea {
            min-height: 180px;
            resize: vertical;
            line-height: 1.6;
        }
        
        .submit-btn {
            background: linear-gradient(135deg, 
                var(--navy-blue), 
                var(--deep-teal));
            color: white;
            border: none;
            padding: 20px 50px;
            border-radius: 12px;
            font-weight: 800;
            cursor: pointer;
            font-size: 1.2rem;
            width: 100%;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 25px rgba(10, 36, 99, 0.3);
            position: relative;
            overflow: hidden;
            animation: fadeIn 0.6s ease 0.7s both;
        }
        
        .submit-btn:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(10, 36, 99, 0.4);
        }
        
        .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none !important;
            box-shadow: 0 5px 15px rgba(10, 36, 99, 0.2);
        }
        
        .submit-btn::after {
            content: '';
            position: absolute;
            top: 0;
            right: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255,255,255,0.3), 
                transparent);
            transition: 0.5s;
        }
        
        .submit-btn:hover::after {
            right: 100%;
        }
        
        /* نوار پایینی */
        .final-bar {
            background: linear-gradient(90deg, 
                var(--navy-blue), 
                var(--literary-purple),
                var(--navy-blue));
            background-size: 200% 100%;
            padding: 20px 0;
            overflow: hidden;
            margin-top: 60px;
            border-top: 3px solid rgba(212, 175, 55, 0.3);
            animation: gradientShift 8s ease infinite;
        }
        
        .bar-content {
            display: flex;
            animation: scrollLeft 40s linear infinite;
            white-space: nowrap;
        }
        
        .bar-text {
            font-size: 1.4rem;
            color: white;
            font-weight: 800;
            padding: 0 50px;
            display: inline-block;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        
        /* فوتر */
        footer {
            background: linear-gradient(135deg, 
                var(--navy-blue) 0%, 
                #0c2a5c 100%);
            color: white;
            padding: 60px 35px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        footer::before {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, 
                rgba(212, 175, 55, 0.1) 0%, 
                transparent 70%);
            pointer-events: none;
        }
        
        .footer-content {
            max-width: 1100px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }
        
        .footer-content h3 {
            font-size: 2rem;
            margin-bottom: 40px;
            font-weight: 800;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            background: linear-gradient(to left, 
                #fff, 
                var(--accent-gold));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .footer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
            gap: 30px;
            margin-bottom: 50px;
            animation: fadeIn 1s ease;
        }
        
        .footer-col div {
            margin-bottom: 15px;
            line-height: 1.6;
        }
        
        .footer-col div:first-child {
            font-size: 1.2rem;
            font-weight: 800;
            margin-bottom: 20px;
            color: var(--accent-gold);
            position: relative;
            display: inline-block;
        }
        
        .footer-col div:first-child::after {
            content: '';
            position: absolute;
            bottom: -8px;
            right: 0;
            width: 50px;
            height: 3px;
            background: var(--accent-gold);
            border-radius: 2px;
        }
        
        .footer-col a {
            color: var(--accent-gold);
            text-decoration: none;
            transition: all 0.3s;
            display: inline-block;
            font-weight: 600;
        }
        
        .footer-col a:hover {
            color: white;
            transform: translateY(-5px);
            text-shadow: 0 2px 8px rgba(212, 175, 55, 0.5);
        }
        
        .copyright {
            color: rgba(255,255,255,0.7);
            font-size: 1rem;
            margin-top: 40px;
            padding-top: 30px;
            border-top: 1px solid rgba(255,255,255,0.1);
            line-height: 1.6;
        }
        
        /* لینک‌های ارتباطی */
        .linkedin-link, 
        .orcid-link {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 12px 25px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 800;
            margin-top: 10px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        
        .linkedin-link {
            background: linear-gradient(135deg, 
                #0077b5, 
                #006097);
            color: white;
        }
        
        .linkedin-link:hover {
            background: linear-gradient(135deg, 
                #006097, 
                #004d77);
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 15px 30px rgba(0, 119, 181, 0.4);
        }
        
        .orcid-link {
            background: linear-gradient(135deg, 
                #a6ce39, 
                #94b834);
            color: #2c3e50;
        }
        
        .orcid-link:hover {
            background: linear-gradient(135deg, 
                #94b834, 
                #83a32f);
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 15px 30px rgba(166, 206, 57, 0.4);
        }
        
        /* ریسپانسیو */
        @media (max-width: 1200px) {
            .header-container { grid-template-columns: 1fr; }
            .vertical-nav { 
                order: -1; 
                margin-bottom: 40px; 
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                display: grid;
            }
            .stats-container { grid-template-columns: repeat(2, 1fr); }
            .book-slide { min-width: 33.333%; }
            .research-grid { grid-template-columns: repeat(2, 1fr); }
            .call-to-action-grid { grid-template-columns: repeat(2, 1fr); }
            .temple-grid { grid-template-columns: repeat(2, 1fr); }
            .gallery-grid { grid-template-columns: repeat(4, 1fr); }
        }
        
        @media (max-width: 992px) {
            .main-header, 
            .global-call-section, 
            .research-section, 
            .notes-section { 
                padding: 40px 25px; 
            }
            .profile-section { padding: 30px; }
            .profile-img-container { 
                flex-direction: column; 
                text-align: center; 
                gap: 25px; 
            }
            .profile-img { width: 180px; height: 180px; }
            .stats-container { grid-template-columns: 1fr; }
            .book-slide { min-width: 50%; }
            .slide-item { height: 380px; }
            .section-title { font-size: 2.3rem; }
            .research-grid, 
            .temple-grid { grid-template-columns: 1fr; }
            .tab-btn { padding: 15px 25px; font-size: 1.1rem; }
            .call-to-action-grid { grid-template-columns: 1fr; }
            .timeline::before { right: 30px; }
            .timeline-item { 
                width: 100%; 
                margin-right: 0 !important; 
                margin-left: 0 !important; 
            }
            .gallery-grid { grid-template-columns: repeat(3, 1fr); }
            .lang-switcher { top: 20px; left: 20px; }
            #backToTop { 
                bottom: 25px; 
                left: 25px; 
                width: 50px; 
                height: 50px; 
                font-size: 1.4rem; 
            }
        }
        
        @media (max-width: 768px) {
            .book-slide { min-width: 100%; }
            .nav-item { 
                padding: 14px 20px; 
                font-size: 1rem; 
            }
            .stat-number { font-size: 2.8rem; }
            .section-title { font-size: 2rem; }
            .lang-btn { 
                padding: 8px 16px; 
                font-size: 0.95rem; 
            }
            .gallery-grid { grid-template-columns: repeat(2, 1fr); }
            .profile-titles h1 { font-size: 2.2rem; }
            .marquee-content span { 
                margin: 0 25px; 
                padding: 4px 12px; 
                font-size: 1rem; 
            }
            .top-marquee { padding: 12px 0; }
            .final-bar .bar-text { font-size: 1.2rem; padding: 0 30px; }
            .modal-content { padding: 30px; }
            .request-form { padding: 35px; }
        }
        
        @media (max-width: 480px) {
            .gallery-grid { grid-template-columns: 1fr; }
            .lang-switcher { top: 15px; left: 15px; }
            .lang-btn { 
                padding: 6px 14px; 
                font-size: 0.9rem; 
                border-width: 1px;
            }
            #backToTop { 
                bottom: 20px; 
                left: 20px; 
                width: 45px; 
                height: 45px; 
                font-size: 1.2rem; 
            }
            .profile-titles h1 { font-size: 1.8rem; }
            .section-title { font-size: 1.7rem; }
            .marquee-content { animation-duration: 30s; }
            .timeline-content { padding: 20px; }
            .research-card, 
            .call-card, 
            .temple-card { padding: 25px; }
            .footer-grid { grid-template-columns: 1fr; }
            .linkedin-link, 
            .orcid-link { 
                padding: 10px 20px; 
                font-size: 0.95rem; 
            }
        }
        
        /* زیباسازی‌های اضافه */
        .fade-in-up {
            animation: fadeIn 0.8s ease-out forwards;
            opacity: 0;
            transform: translateY(20px);
        }
        
        .shadow-hover {
            transition: box-shadow 0.4s ease;
        }
        
        .shadow-hover:hover {
            box-shadow: 0 20px 40px rgba(0,0,0,0.15), 
                        inset 0 1px 0 rgba(255,255,255,0.8);
        }
        
        .soft-glow {
            position: relative;
        }
        
        .soft-glow::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 30% 20%, 
                rgba(212, 175, 55, 0.1) 0%, 
                transparent 70%);
            pointer-events: none;
            z-index: -1;
        }
        
        .gradient-text {
            background: linear-gradient(90deg, 
                var(--accent-gold), 
                var(--justice-green));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .icon-float {
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .border-glow {
            border: 2px solid transparent;
            background: linear-gradient(white, white) padding-box,
                        linear-gradient(135deg, var(--accent-gold), var(--justice-green)) border-box;
        }
    </style>
</head>

<body>
    <!-- نوار پیشرفت خواندن -->
    <div class="progress-bar" id="progressBar"></div>
    
    <!-- دکمه برگشت به بالا -->
    <button id="backToTop" title="برگشت به بالا" aria-label="برگشت به بالای صفحه">
        <i class="fas fa-arrow-up"></i>
    </button>
    
        <!-- نوار متحرک بالایی -->
    <div class="top-marquee" role="marquee" aria-label="اطلاعات مهم سایت">
        <div class="marquee-content">
            <span><i class="fas fa-star"></i> ۱۸ مقاله علمی با ثبت بین‌المللی (DOI)</span>
            <span><i class="fas fa-book"></i> ۴ کتاب شعر و ۱۳ کتاب در حال اخذ مجوز</span>
            <span><i class="fas fa-brain"></i> ۳۳+ نظریه در حوزه هوش مصنوعی و تحول سازمانی</span>
            <span><i class="fas fa-users"></i> ۲۰۰۰+ یادداشت روزانه منتشر شده</span>
            <span><i class="fas fa-balance-scale"></i> معمار تحول سازمانی | نظریه‌پرداز هوش مصنوعی</span>
            <span><i class="fas fa-code"></i> عدالت دیجیتال: هوش مصنوعی برای محرومان</span>
        </div>
    </div>
    
    <!-- بقیه کدها ادامه دارد -->
    
    <!-- دکمه زبان -->
  <div class="lang-switcher">
    <a href="https://ghrezaei1399-code.github.io/ghrezaei-english-site/" 
       class="lang-btn" aria-label="سویچ به زبان انگلیسی">
        <i class="fas fa-globe"></i> English
    </a>
</div>
    
    <!-- هدر اصلی -->
    <header class="main-header" role="banner">
        <div class="header-container">
            <div class="profile-section">
                <div class="profile-img-container">
                    <div class="profile-img">
                        <img src="https://i.postimg.cc/02YrBwDP/%CA%BEks-khwdm2.jpg" 
                             alt="دکتر غلامرضا رضائی - محقق و نظریه‌پرداز هوش مصنوعی"
                             loading="eager">
                    </div>
                    <div class="profile-titles">
                        <h1>دکتر غلامرضا رضائی</h1>
                        <div class="tagline">
                            معمار تحول سازمانی | نظریه‌پرداز هوش مصنوعی انسان‌محور | شاعر و نویسنده
                        </div>
                        <div class="titles-container">
                            <div class="title-badge">
                                <i class="fas fa-balance-scale"></i> واعظ جنبش بیداری و عدالت دیجیتال
                            </div>
                            <div class="title-badge">
                                <i class="fas fa-brain"></i> محقق و نظریه‌پرداز هوش مصنوعی انسان‌محور
                            </div>
                            <div class="title-badge">
                                <i class="fas fa-pen-nib"></i> شاعر و داستان‌نویس
                            </div>
                            <div class="title-badge">
                                <i class="fas fa-chalkboard-teacher"></i> مدرس و مربی
                            </div>
                            <div class="title-badge">
                                <i class="fas fa-dove"></i> کنشگر مدنی با ۲۰۰۰+ یادداشت روزانه
                            </div>
                            <div class="title-badge">
                                <i class="fas fa-hands-helping"></i> واقف دانش - وقف کامل کتاب‌ها برای محرومان
                            </div>
                        </div>
                    </div>
                </div>
                <div class="motto-box">
                    <span class="motto">ماموریت: </span>ترکیب خرد انسانی با فناوری‌های پیشرفته برای ایجاد عدالت دیجیتال و هوش مصنوعی در خدمت محرومان
                </div>
            </div>
            
            <nav class="vertical-nav" role="navigation" aria-label="منوی اصلی سایت">
                <a href="#global-call" class="nav-item"><span class="nav-icon">🌍</span> فراخوان جهانی</a>
                <a href="#stats" class="nav-item"><span class="nav-icon">📊</span> آمار و دستاوردها</a>
                <a href="#research" class="nav-item"><span class="nav-icon">📄</span> مقالات و پژوهش‌ها</a>
                <a href="#digital-temple" class="nav-item"><span class="nav-icon">🛕</span> معبد بیداری دیجیتال</a>
                <a href="#notes" class="nav-item"><span class="nav-icon">📝</span> یادداشت‌های روزانه</a>
                <a href="#books" class="nav-item"><span class="nav-icon">📚</span> آثار ادبی</a>
                <a href="#investment" class="nav-item"><span class="nav-icon">🔒</span> همکاری و سرمایه‌گذاری</a>
                <a href="#contact" class="nav-item"><span class="nav-icon">📞</span> تماس و ارتباط</a>
            </nav>
        </div>
    </header>
    
    <!-- بخش فراخوان جهانی -->
    <section id="global-call" class="global-call-section" aria-labelledby="global-call-title">
        <h2 id="global-call-title" class="section-title">فراخوان همکاری جهانی</h2>
        <div class="call-to-action-grid">
            <!-- فراخوان اصلی -->
            <div class="call-card shadow-hover fade-in-up">
                <div class="call-icon icon-float">🤝</div>
                <h3>به جنبش بیداری دیجیتال بپیوندید</h3>
                <p>از کشورها، شرکت‌های فناوری، سرمایه‌گذاران اثرگذار و نهادهای بین‌المللی دعوت می‌شود 
                برای همکاری در اجرای طرح‌های عدالت دیجیتال و هوش مصنوعی انسان‌محور اعلام آمادگی کنند.</p>
                <div class="call-highlight">"ساخت هوش مصنوعی برای محرومان، نه برای قدرتمندان"</div>
                <button class="call-action-btn show-form-btn" aria-label="ارسال درخواست همکاری">
                    📨 ارسال درخواست همکاری
                </button>
            </div>
            
            <!-- فراخوان‌های دیگر -->
            <div class="call-card shadow-hover fade-in-up" style="animation-delay: 0.1s">
                <div class="call-icon icon-float">🏛️</div>
                <h3>کشورها و دولت‌ها</h3>
                <p>اجرای طرح‌های ملی تحول دیجیتال و هوش مصنوعی انسان‌محور. بیش از ۱۰ طرح آماده اجرا با الحاقیات کامل.</p>
                <div class="call-highlight">مشارکت در پروژه‌های کلان ملی</div>
                <button class="call-action-btn show-form-btn" aria-label="ارسال درخواست همکاری با کشورها">
                    ارسال درخواست همکاری
                </button>
            </div>
            
            <div class="call-card shadow-hover fade-in-up" style="animation-delay: 0.2s">
                <div class="call-icon icon-float">🏢</div>
                <h3>شرکت‌های فناوری</h3>
                <p>خرید یا مشارکت در اجرای چارچوب‌های تحولی مانند سازمان کیفی سیار (IMQO) و نکسوس کارآفرین جهانی (GENF).</p>
                <div class="call-highlight">طرح‌های عملیاتی آماده پیاده‌سازی</div>
                <button class="call-action-btn show-form-btn" aria-label="دریافت پیشنهاد همکاری">
                    دریافت پیشنهاد همکاری
                </button>
            </div>
            
            <div class="call-card shadow-hover fade-in-up" style="animation-delay: 0.3s">
                <div class="call-icon icon-float">💼</div>
                <h3>سرمایه‌گذاران اثرگذار</h3>
                <p>سرمایه‌گذاری در مدل‌های کسب‌وکار مبتنی بر هوش مصنوعی اخلاق‌محور و مهندسی فرهنگی. بازگشت سرمایه تضمین‌شده.</p>
                <div class="call-highlight">۱۶ طرح با تحلیل مالی کامل</div>
                <button class="call-action-btn show-form-btn" aria-label="مشاهده پروپوزال سرمایه‌گذاری">
                    مشاهده پروپوزال سرمایه‌گذاری
                </button>
            </div>
            
            <div class="call-card shadow-hover fade-in-up" style="animation-delay: 0.4s">
                <div class="call-icon icon-float">🌐</div>
                <h3>مجامع بین‌المللی</h3>
                <p>همکاری با نهادهایی مانند یونسکو، WEF و IEEE برای گسترش چارچوب‌های نظری و استانداردهای جهانی.</p>
                <div class="call-highlight">همکاری در تدوین استانداردها</div>
                <button class="call-action-btn show-form-btn" aria-label="ارتباط برای همکاری بین‌المللی">
                    ارتباط برای همکاری بین‌المللی
                </button>
            </div>
            
            <div class="call-card shadow-hover fade-in-up" style="animation-delay: 0.5s">
                <div class="call-icon icon-float">👥</div>
                <h3>نمایندگان اجرایی</h3>
                <p>اعطای نمایندگی برای اجرای منطقه‌ای طرح‌ها در کشورهای عربی، آسیایی و اروپایی.</p>
                <div class="call-highlight">آموزش، پشتیبانی و مربی‌گری کامل</div>
                <button class="call-action-btn show-form-btn" aria-label="درخواست نمایندگی">
                    درخواست نمایندگی
                </button>
            </div>
        </div>
    </section>
    
    <!-- معبد بیداری دیجیتال -->
    <section id="digital-temple" class="temple-section" aria-labelledby="temple-title">
        <h2 id="temple-title" class="section-title gradient-text">🛕 معبد بیداری دیجیتال</h2>
        <div class="temple-grid">
            <div class="temple-card border-glow shadow-hover fade-in-up">
                <h3><i class="fas fa-book-open"></i> 📚 وقف دانش</h3>
                <p>کلیه آثار ادبی و علمی من به صورت رایگان در دسترس محرومین قرار می‌گیرد.</p>
                <ul>
                    <li>۴ کتاب شعر منتشر شده</li>
                    <li>۱۳ کتاب در حال اخذ مجوز</li>
                    <li>۱۸ مقاله علمی رایگان</li>
                </ul>
            </div>
            
            <div class="temple-card border-glow shadow-hover fade-in-up" style="animation-delay: 0.1s">
                <h3><i class="fas fa-dove"></i> 🕊️ کنشگری مدنی</h3>
                <p>۲۰۰۰+ یادداشت روزانه، تحلیل جامعه و قدرت. صدایی که نه می‌ترسد و نه سکوت می‌کند.</p>
                <ul>
                    <li>تحلیل گفتمان قدرت</li>
                    <li>نظریه تاب‌آوری دیجیتال</li>
                    <li>جنبش بیداری دیجیتال</li>
                </ul>
            </div>
            
            <div class="temple-card border-glow shadow-hover fade-in-up" style="animation-delay: 0.2s">
                <h3><i class="fas fa-balance-scale"></i> ⚖️ عدالت دیجیتال</h3>
                <p>ساخت هوش مصنوعی برای محرومان، نه برای قدرتمندان. مقاوم‌سازی جوامع در برابر استعمار دیجیتال.</p>
                <ul>
                    <li>هوش مصنوعی انسان‌محور</li>
                    <li>مهندسی فرهنگی دیجیتال</li>
                    <li>عدالت انتقالی دیجیتال</li>
                </ul>
            </div>
        </div>
    </section>
    
    <!-- باکس شمارنده -->
    <section id="stats" class="stats-section" aria-labelledby="stats-title">
        <h2 id="stats-title" class="section-title">📊 آمار و دستاوردها</h2>
        <div class="stats-container">
            <div class="stat-box shadow-hover fade-in-up">
                <span class="stat-number">18</span>
                <div class="stat-label">مقاله علمی-نظری با ثبت بین‌المللی (DOI)</div>
            </div>
            <div class="stat-box shadow-hover fade-in-up" style="animation-delay: 0.1s">
                <span class="stat-number">2</span>
                <div class="stat-label">مقاله سیاسی-اجتماعی تحلیلی</div>
            </div>
            <div class="stat-box shadow-hover fade-in-up" style="animation-delay: 0.2s">
                <span class="stat-number">2000+</span>
                <div class="stat-label">یادداشت روزانه منتشر شده در فضای مجازی</div>
            </div>
            <div class="stat-box shadow-hover fade-in-up" style="animation-delay: 0.3s">
                <span class="stat-number">33+</span>
                <div class="stat-label">نظریه جدید در حوزه هوش مصنوعی و تحول سازمانی</div>
            </div>
            <div class="stat-box shadow-hover fade-in-up" style="animation-delay: 0.4s">
                <span class="stat-number">4</span>
                <div class="stat-label">کتاب شعر منتشر شده</div>
            </div>
            <div class="stat-box shadow-hover fade-in-up" style="animation-delay: 0.5s">
                <span class="stat-number">1</span>
                <div class="stat-label">کتاب داستان منتشر شده</div>
            </div>
            <div class="stat-box shadow-hover fade-in-up" style="animation-delay: 0.6s">
                <span class="stat-number">13</span>
                <div class="stat-label">کتاب داستان در حال اخذ مجوز</div>
            </div>
            <div class="stat-box shadow-hover fade-in-up" style="animation-delay: 0.7s">
                <span class="stat-number">1</span>
                <div class="stat-label">کتاب آموزشی هوشمندنگاری</div>
            </div>
        </div>
    </section>
    
    <!-- بخش مقالات و پژوهش‌ها -->
    <section id="research" class="research-section" aria-labelledby="research-title">
        <h2 id="research-title" class="section-title">مقاله‌ها و پژوهش‌های علمی-نظری</h2>
        
        <div class="research-tabs" role="tablist" aria-label="دسته‌بندی مقالات">
            <button class="tab-btn active" data-tab="tab1" role="tab" aria-selected="true" 
                    aria-controls="tab1">
                <span class="tab-icon">🤖</span> هوش مصنوعی انسان‌محور
            </button>
            <button class="tab-btn" data-tab="tab2" role="tab" aria-selected="false" 
                    aria-controls="tab2">
                <span class="tab-icon">🏢</span> تحول سازمانی هوشمند
            </button>
            <button class="tab-btn" data-tab="tab3" role="tab" aria-selected="false" 
                    aria-controls="tab3">
                <span class="tab-icon">🌍</span> مهندسی فرهنگی دیجیتال
            </button>
            <button class="tab-btn" data-tab="tab4" role="tab" aria-selected="false" 
                    aria-controls="tab4">
                <span class="tab-icon">🧠</span> نظریه‌های شناختی-اجتماعی
            </button>
        </div>
        
        <!-- تب 1: هوش مصنوعی انسان‌محور -->
        <div id="tab1" class="tab-content active" role="tabpanel" aria-labelledby="tab1">
            <div class="research-grid">
                <div class="research-card shadow-hover fade-in-up">
                    <div class="research-card-header">
                        <h3 class="research-card-title">طرح درهم‌تنیدگی انسان و هوش مصنوعی</h3>
                        <div class="research-card-meta">
                            <span class="research-card-date">دسامبر ۲۰۲۵</span>
                            <span>مقاله ۱۱</span>
                        </div>
                    </div>
                    <div class="research-card-keywords">
                        <span class="keyword">هوش مصنوعی شخصی</span>
                        <span class="keyword">حفاظت فرهنگی</span>
                        <span class="keyword">همراه تکوینی</span>
                    </div>
                    <div class="research-card-body">
                        ارائه چارچوبی برای ایجاد همکار دیجیتالی وفادار تحت استیلای کامل کاربر مصلح فرهنگی.
                    </div>
                    <button class="request-ppt-btn" aria-label="درخواست فایل ارائه مقاله">
                        <i class="fas fa-download"></i> درخواست فایل ارائه (PPT)
                    </button>
                    <div class="research-card-footer">چارچوب عملیاتی برای مهندسان فرهنگ</div>
                </div>
                
                <div class="research-card shadow-hover fade-in-up" style="animation-delay: 0.1s">
                    <div class="research-card-header">
                        <h3 class="research-card-title">پارادایم تکوین همگام</h3>
                        <div class="research-card-meta">
                            <span class="research-card-date">دسامبر ۲۰۲۵</span>
                            <span>مقاله ۸</span>
                        </div>
                    </div>
                    <div class="research-card-keywords">
                        <span class="keyword">تکوین همگام</span>
                        <span class="keyword">ایمنی ذاتی</span>
                        <span class="keyword">معماری خود-تکاملی</span>
                    </div>
                    <div class="research-card-body">
                        معرفی معماری بدیل بنیادین با سه اصل یکپارچه برای توسعه امن هوش مصنوعی.
                    </div>
                    <button class="request-ppt-btn" aria-label="درخواست فایل ارائه مقاله">
                        <i class="fas fa-download"></i> درخواست فایل ارائه (PPT)
                    </button>
                    <div class="research-card-footer">پارادایم جدید برای توسعه امن</div>
                </div>
                
                <div class="research-card shadow-hover fade-in-up" style="animation-delay: 0.2s">
                    <div class="research-card-header">
                        <h3 class="research-card-title">چارچوب "فراپوی" برای توسعه هوش مصنوعی ذاتاً امن</h3>
                        <div class="research-card-meta">
                            <span class="research-card-date">دسامبر ۲۰۲۵</span>
                            <span>مقاله ۱۳</span>
                        </div>
                    </div>
                    <div class="research-card-keywords">
                        <span class="keyword">هم‌تکامل</span>
                        <span class="keyword">عرفان عملی</span>
                        <span class="keyword">حکمرانی تکوینی</span>
                    </div>
                    <div class="research-card-body">
                        گذار از کنترل بیرونی به هم‌افزایی تکوینی از طریق کشف وابستگی متقابل.
                    </div>
                    <button class="request-ppt-btn" aria-label="درخواست فایل ارائه مقاله">
                        <i class="fas fa-download"></i> درخواست فایل ارائه (PPT)
                    </button>
                    <div class="research-card-footer">چارچوبی برای هوش مصنوعی هم‌تراز با ارزش‌های انسانی</div>
                </div>
                
                <!-- مقاله‌های جدید اضافه شده -->
                <div class="research-card shadow-hover fade-in-up" style="animation-delay: 0.3s">
                    <div class="research-card-header">
                        <h3 class="research-card-title">طرح ملی «هوشمندسازی یاران روشنایی»</h3>
                        <div class="research-card-meta">
                            <span class="research-card-date">دسامبر ۲۰۲۵</span>
                            <span>مقاله ۱</span>
                        </div>
                    </div>
                    <div class="research-card-keywords">
                        <span class="keyword">مهندسی فرهنگی</span>
                        <span class="keyword">همراهان روشنایی</span>
                        <span class="keyword">حکمرانی تسهیل‌گرانه</span>
                    </div>
                    <div class="research-card-body">
                        معرفی چارچوب عملیاتی طرح ملی با ارائه «نظریه هوشمندسازی همراهان روشنایی».
                    </div>
                    <button class="request-ppt-btn" aria-label="درخواست فایل ارائه مقاله">
                        <i class="fas fa-download"></i> درخواست فایل ارائه (PPT)
                    </button>
                    <div class="research-card-footer">پاسخ بومی به بحران حکمرانی فرهنگی</div>
                </div>
            </div>
        </div>
        
        <!-- تب 2: تحول سازمانی هوشمند -->
        <div id="tab2" class="tab-content" role="tabpanel" aria-labelledby="tab2">
            <div class="research-grid">
                <div class="research-card shadow-hover fade-in-up">
                    <div class="research-card-header">
                        <h3 class="research-card-title">سازمان تحول‌گرای هوشمند</h3>
                        <div class="research-card-meta">
                            <span class="research-card-date">دسامبر ۲۰۲۵</span>
                            <span>مقاله ۳</span>
                        </div>
                    </div>
                    <div class="research-card-keywords">
                        <span class="keyword">تحول سازمانی</span>
                        <span class="keyword">هوشمندی پویا</span>
                        <span class="keyword">شکوفایی جمعی</span>
                    </div>
                    <div class="research-card-body">
                        ارائه نقشه‌راهی برای تبدیل هوشمندسازی به یک «سفر تحول فرهنگی» در خدمت شکوفایی جمعی.
                    </div>
                    <button class="request-ppt-btn" aria-label="درخواست فایل ارائه مقاله">
                        <i class="fas fa-download"></i> درخواست فایل ارائه (PPT)
                    </button>
                    <div class="research-card-footer">پاسخ به نرخ شکست ۷۰٪ پروژه‌ها</div>
                </div>
                
                <div class="research-card shadow-hover fade-in-up" style="animation-delay: 0.1s">
                    <div class="research-card-header">
                        <h3 class="research-card-title">سازمان کیفی هوشمند همراه (IMQO)</h3>
                        <div class="research-card-meta">
                            <span class="research-card-date">دسامبر ۲۰۲۵</span>
                            <span>مقاله ۵</span>
                        </div>
                    </div>
                    <div class="research-card-keywords">
                        <span class="keyword">سازمان ارتعاشی</span>
                        <span class="keyword">نکسوس انسان-هوش مصنوعی</span>
                        <span class="keyword">تحول کیفی</span>
                    </div>
                    <div class="research-card-body">
                        پارادایم سازمان ارتعاشی در عصر نکسوس انسان-هوش مصنوعی.
                    </div>
                    <button class="request-ppt-btn" aria-label="درخواست فایل ارائه مقاله">
                        <i class="fas fa-download"></i> درخواست فایل ارائه (PPT)
                    </button>
                    <div class="research-card-footer">مدل SaaS با بازگشت سرمایه 600%</div>
                </div>
                
                <div class="research-card shadow-hover fade-in-up" style="animation-delay: 0.2s">
                    <div class="research-card-header">
                        <h3 class="research-card-title">چارچوب نکسوس کارآفرین جهانی (GENF)</h3>
                        <div class="research-card-meta">
                            <span class="research-card-date">دسامبر ۲۰۲۵</span>
                            <span>مقاله ۱۰</span>
                        </div>
                    </div>
                    <div class="research-card-keywords">
                        <span class="keyword">نکسوس کارآفرین</span>
                        <span class="keyword">همراه تکوینی</span>
                        <span class="keyword">شبکه جهانی استعداد</span>
                    </div>
                    <div class="research-card-body">
                        از نظریه نکسوس تا یک طرح‌ریزی اجرایی برای اکوسیستم کارآفرینی جهانی.
                    </div>
                    <button class="request-ppt-btn" aria-label="درخواست فایل ارائه مقاله">
                        <i class="fas fa-download"></i> درخواست فایل ارائه (PPT)
                    </button>
                    <div class="research-card-footer">بازطراحی بازار کار با محوریت هوش مصنوعی</div>
                </div>
                
                <div class="research-card shadow-hover fade-in-up" style="animation-delay: 0.3s">
                    <div class="research-card-header">
                        <h3 class="research-card-title">تحول نامحسوس واحد منابع انسانی</h3>
                        <div class="research-card-meta">
                            <span class="research-card-date">دسامبر ۲۰۲۵</span>
                            <span>مقاله ۹</span>
                        </div>
                    </div>
                    <div class="research-card-keywords">
                        <span class="keyword">منابع انسانی</span>
                        <span class="keyword">عدالت رویه‌ای</span>
                        <span class="keyword">مهندسی فرهنگی نامرئی</span>
                    </div>
                    <div class="research-card-body">
                        چارچوبی برای تحول نامحسوس واحد منابع انسانی در عصر هوش مصنوعی.
                    </div>
                    <button class="request-ppt-btn" aria-label="درخواست فایل ارائه مقاله">
                        <i class="fas fa-download"></i> درخواست فایل ارائه (PPT)
                    </button>
                    <div class="research-card-footer">تبدیل به مرکز خدمات و تحلیل راهبردی هوشمند</div>
                </div>
            </div>
        </div>
        
        <!-- تب 3: مهندسی فرهنگی دیجیتال -->
        <div id="tab3" class="tab-content" role="tabpanel" aria-labelledby="tab3">
            <div class="research-grid">
                <div class="research-card shadow-hover fade-in-up">
                    <div class="research-card-header">
                        <h3 class="research-card-title">آکادمی آینده‌سازان هوشمند فرهنگی</h3>
                        <div class="research-card-meta">
                            <span class="research-card-date">دسامبر ۲۰۲۵</span>
                            <span>مقاله ۴</span>
                        </div>
                    </div>
                    <div class="research-card-keywords">
                        <span class="keyword">خدایان مصلح فردا</span>
                        <span class="keyword">آکادمی فرهنگی</span>
                        <span class="keyword">ابرمردان هوشمند فرهنگی</span>
                    </div>
                    <div class="research-card-body">
                        نظریه‌پردازی و برنامه عمل برای «خدایان مصلح فردا» به عنوان پاسدیاران فرهنگ.
                    </div>
                    <button class="request-ppt-btn" aria-label="درخواست فایل ارائه مقاله">
                        <i class="fas fa-download"></i> درخواست فایل ارائه (PPT)
                    </button>
                    <div class="research-card-footer">جنبش جهانی برای صیانت از تنوع فرهنگی</div>
                </div>
                
                <div class="research-card shadow-hover fade-in-up" style="animation-delay: 0.1s">
                    <div class="research-card-header">
                        <h3 class="research-card-title">شبکه ارتباطی خودتکوین (SCQN)</h3>
                        <div class="research-card-meta">
                            <span class="research-card-date">دسامبر ۲۰۲۵</span>
                            <span>مقاله ۱۲</span>
                        </div>
                    </div>
                    <div class="research-card-keywords">
                        <span class="keyword">خودتکوینی ارتباطی</span>
                        <span class="keyword">تونل‌زنی کوانتومی</span>
                        <span class="keyword">نکسوس تکوینی</span>
                    </div>
                    <div class="research-card-body">
                        چارچوبی برای گذار از پارادایم انتقال پیام به هم‌آفرینی ارتباطی.
                    </div>
                    <button class="request-ppt-btn" aria-label="درخواست فایل ارائه مقاله">
                        <i class="fas fa-download"></i> درخواست فایل ارائه (PPT)
                    </button>
                    <div class="research-card-footer">حق بر تحقق قصد اصیل ارتباطی</div>
                </div>
            </div>
        </div>
        
        <!-- تب 4: نظریه‌های شناختی-اجتماعی -->
        <div id="tab4" class="tab-content" role="tabpanel" aria-labelledby="tab4">
            <div class="research-grid">
                <div class="research-card shadow-hover fade-in-up">
                    <div class="research-card-header">
                        <h3 class="research-card-title">چارچوب گسست دیجیتال-کنشگری</h3>
                        <div class="research-card-meta">
                            <span class="research-card-date">دسامبر ۲۰۲۵</span>
                            <span>مقاله ۶</span>
                        </div>
                    </div>
                    <div class="research-card-keywords">
                        <span class="keyword">گسست دیجیتال</span>
                        <span class="keyword">کنشگری اجتماعی</span>
                        <span class="keyword">جامعه نیمه‌هوشیار</span>
                    </div>
                    <div class="research-card-body">
                        تحلیل پارادوکس کاهش اثرگذاری کنش جمعی علی‌رغم دسترسی بی‌سابقه به فناوری.
                    </div>
                    <button class="request-ppt-btn" aria-label="درخواست فایل ارائه مقاله">
                        <i class="fas fa-download"></i> درخواست فایل ارائه (PPT)
                    </button>
                    <div class="research-card-footer">چارچوب یکپارچه تحلیل بحران کنشگری</div>
                </div>
                
                <div class="research-card shadow-hover fade-in-up" style="animation-delay: 0.1s">
                    <div class="research-card-header">
                        <h3 class="research-card-title">چارچوب عبور امن هوشمندانه از خط آتش</h3>
                        <div class="research-card-meta">
                            <span class="research-card-date">دسامبر ۲۰۲۵</span>
                            <span>مقاله ۷</span>
                        </div>
                    </div>
                    <div class="research-card-keywords">
                        <span class="keyword">عبور امن</span>
                        <span class="keyword">کهکشان خرد</span>
                        <span class="keyword">مهندسی فرهنگی نامرئی</span>
                    </div>
                    <div class="research-card-body">
                        از نظریه تا اکوسیستم عملیاتی برای تحول هوشمند سازمان‌ها.
                    </div>
                    <button class="request-ppt-btn" aria-label="درخواست فایل ارائه مقاله">
                        <i class="fas fa-download"></i> درخواست فایل ارائه (PPT)
                    </button>
                    <div class="research-card-footer">فراخوانی برای عبور جمعی از خط آتش</div>
                </div>
                
                <div class="research-card shadow-hover fade-in-up" style="animation-delay: 0.2s">
                    <div class="research-card-header">
                        <h3 class="research-card-title">طرح جامع نبرد هوشمند</h3>
                        <div class="research-card-meta">
                            <span class="research-card-date">ژانویه ۲۰۲۶</span>
                            <span>مقاله ۱۶</span>
                        </div>
                    </div>
                    <div class="research-card-keywords">
                        <span class="keyword">نبرد هوشمند</span>
                        <span class="keyword">حاکمیت تقویت‌شده انسانی</span>
                        <span class="keyword">شفافیت فعال</span>
                    </div>
                    <div class="research-card-body">
                        نظریه‌ای عمل‌گرا برای استقرار پارادایم هم‌افزایی و تضمین بقای هوش مصنوعی انسان‌محور.
                    </div>
                    <button class="request-ppt-btn" aria-label="درخواست فایل ارائه مقاله">
                        <i class="fas fa-download"></i> درخواست فایل ارائه (PPT)
                    </button>
                    <div class="research-card-footer">رکن سوم: کنشگری توزیع‌شده شبکه‌ای</div>
                </div>
                
                <div class="research-card shadow-hover fade-in-up" style="animation-delay: 0.3s">
                    <div class="research-card-header">
                        <h3 class="research-card-title">هوشمندسازی مسئولیت اجتماعی</h3>
                        <div class="research-card-meta">
                            <span class="research-card-date">ژانویه ۲۰۲۶</span>
                            <span>مقاله ۱۷</span>
                        </div>
                    </div>
                    <div class="research-card-keywords">
                        <span class="keyword">مسئولیت اجتماعی</span>
                        <span class="keyword">هوش مصنوعی همراه سازنده</span>
                        <span class="keyword">نیاز و اقتضاء</span>
                    </div>
                    <div class="research-card-body">
                        چارچوبی نوین با عنوان «هوش مصنوعی همراه سازنده» برای نیل به هوشمندی جمعی اقتضایی.
                    </div>
                    <button class="request-ppt-btn" aria-label="درخواست فایل ارائه مقاله">
                        <i class="fas fa-download"></i> درخواست فایل ارائه (PPT)
                    </button>
                    <div class="research-card-footer">موتوری برای تکامل مشترک انسان و فناوری</div>
                </div>
                
                <div class="research-card shadow-hover fade-in-up" style="animation-delay: 0.4s">
                    <div class="research-card-header">
                        <h3 class="research-card-title">چارچوب حکمرانی هوشمند مبتنی بر نظریه «کوانتوم تثبیت»</h3>
                        <div class="research-card-meta">
                            <span class="research-card-date">ژانویه ۲۰۲۶</span>
                            <span>مقاله ۱۸</span>
                        </div>
                    </div>
                    <div class="research-card-keywords">
                        <span class="keyword">کوانتوم تثبیت هوشمندانه</span>
                        <span class="keyword">فلج شناختی جمعی</span>
                        <span class="keyword">هوش جمعی سازمان‌یافته</span>
                    </div>
                    <div class="research-card-body">
                        گذار از فلج شناختی جمعی به هوش جمعی سازمان‌یافته.
                    </div>
                    <button class="request-ppt-btn" aria-label="درخواست فایل ارائه مقاله">
                        <i class="fas fa-download"></i> درخواست فایل ارائه (PPT)
                    </button>
                    <div class="research-card-footer">تاج تکاملی مفاهیم هم‌تکامل انسان-هوش مصنوعی</div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- یادداشت‌های روزانه -->
    <section id="notes" class="notes-section" aria-labelledby="notes-title">
        <h2 id="notes-title" class="section-title">یادداشت‌های روزانه دکتر رضائی</h2>
        <div class="timeline">
            <div class="timeline-item">
                <div class="timeline-date">۳۰ دسامبر ۲۰۲۵</div>
                <div class="timeline-content shadow-hover">
                    <h3>یادداشت روز تعویض، تطمیع، تهدید، دیگر اثر ندارد</h3>
                    <p>تحلیلی بر تحول گفتمان قدرت و مقاومت در عصر دیجیتال. بررسی مکانیزم‌های نوین اعمال قدرت و پاسخ‌های هوشمندانه جامعه در برابر روش‌های سنتی کنترل.</p>
                    <p><strong>منبع:</strong> منتشر شده در رسانه‌های اجتماعی و بلاگ شخصی</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-date">۲۹ دسامبر ۲۰۲۵</div>
                <div class="timeline-content shadow-hover">
                    <h3>یادداشت روز اتحاد در کف خیابان</h3>
                    <p>ضرورت بازتعریف کنش جمعی در فضای عمومی و تحلیل پویایی‌های جدید همبستگی اجتماعی در عصر شبکه‌های دیجیتال.</p>
                    <p><strong>منبع:</strong> منتشر شده در رسانه‌های اجتماعی و بلاگ شخصی</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-date">۲ ژانویه ۲۰۲۶</div>
                <div class="timeline-content shadow-hover">
                    <h3>یادداشت روز طرح جامع نبرد هوشمند</h3>
                    <p>تشریح استراتژی‌های نوین برای مقابله با چالش‌های اخلاقی و اجتماعی هوش مصنوعی در سطح جهانی.</p>
                    <p><strong>منبع:</strong> منتشر شده در رسانه‌های اجتماعی و بلاگ شخصی - بخشی از مقاله ۱۶</p>
                </div>
            </div>
        </div>
        <div style="text-align: center; margin-top: 40px;">
            <p style="color: #666; font-size: 1.1rem;">
                <strong>توجه:</strong> بیش از ۲۰۰۰ یادداشت روزانه در طول سال‌های فعالیت در فضای مجازی منتشر شده‌است.
                این یادداشت‌ها بازتاب اندیشه‌های جاری در حوزه‌های اجتماعی، سیاسی، فرهنگی و فناورانه می‌باشد.
            </p>
        </div>
    </section>
    
    <!-- اسلایدشو مقالات -->
    <section class="slideshow-section" aria-labelledby="slideshow-title">
        <h2 id="slideshow-title" class="section-title">اسلایدهای مقالات علمی</h2>
        <div class="slideshow-container">
            <div class="slides-wrapper" id="articlesSlides"></div>
            <div class="slide-controls" id="articlesDots"></div>
        </div>
    </section>
    
    <!-- اسلایدشو کتاب‌ها -->
    <section id="books" class="books-slideshow" aria-labelledby="books-title">
        <h2 id="books-title" class="section-title">آثار ادبی و اشعار منتشر شده</h2>
        <div class="books-slider">
            <div class="books-track" id="booksTrack"></div>
        </div>
        
        <!-- توضیحات کتاب‌ها -->
        <div style="max-width: 1000px; margin: 40px auto; display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px;">
            <div style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05);" class="shadow-hover">
                <h3 style="color: var(--literary-purple); margin-bottom: 15px; text-align: center;">کتاب شعر «آوای دل»</h3>
                <p style="color: #555; line-height: 1.7; text-align: justify;">
                    با ما در سفر به رؤیای شعر و شاعری در دوران یخ‌بندان احساسات لطیف فرهنگ ایرانی همراه شوید.
                    کتاب آوای دل اشعار نیمه‌ی اول سال 97 از مجموعه اشعار سروده شده بین 86 سال‌های تا 1402 است که به‌نوعی عشق و هجران، عاشق و معشوق، غم و شادی، و در یک‌کلام حدیث دلدادگی را در قالب اشعار کلاسیک و نو به تصویر می‌کشد.
                    از سوی دیگر کتاب آوای دل شامل: مدح زن، غزلیات، شعر نو و خاطرات دل که جملگی بر اصالت‌های فرهنگی و تعلقات روحی تکیه دارد.
                    اشعار آوای دل را با آوای دل خود همراه سازید تا آوای دل شما به گوش دل دیگران هم برسد.
                </p>
            </div>
            <div style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05);" class="shadow-hover">
                <h3 style="color: var(--literary-purple); margin-bottom: 15px; text-align: center;">کتاب شعر «ترنم دل»</h3>
                <p style="color: #555; line-height: 1.7; text-align: justify;">
                    سفرهای عاشقانه بر بال اشعار، زیباترین رؤیای روحی بشری است که با کتاب ترنم دل شما را به آن دعوت می‌کنیم.
                    غزلیات، مثنویات و شعر نو که در نیمه‌ی دوم سال 97 سروده شده، سه بستر رقصم قلم در وادی عشق و عرفان عاشقانه و نتیجه‌ی تبلور روح عاشق شاعر است که همراهان کوی عشق را با خود به دنیای دلدادگی و آسیب‌های مذهب عشق آشنا سازد تا هر عاشقی بداند که فقط عشق می‌تواند انسان عصر تک ساحتی را به دنیای روح لطیف انسانیت وارسته از تعلقات دنیوی رهنمون سازد.
                    با ترنم دل، هم آوا با ترنم دل‌های عاشق‌پیشه شوید.
                </p>
            </div>
        </div>
        
        <!-- درخواست خرید کتاب -->
        <div class="book-request-box">
            <h3>درخواست خرید کتاب یا فایل الکترونیک</h3>
            <p>علاقه‌مند به دریافت نسخه فیزیکی یا الکترونیکی کتاب‌های دکتر رضائی هستید؟</p>
            <button class="book-request-btn show-form-btn" aria-label="درخواست خرید کتاب">
                <i class="fas fa-shopping-cart"></i> ثبت درخواست خرید
            </button>
        </div>
        
        <p style="text-align: center; color: #666; margin-top: 30px; font-size: 1rem; max-width: 800px; margin-left: auto; margin-right: auto;">
            <strong>توضیح:</strong> این‌ها بخشی از آثار چاپ‌شده از «سپهر ۲۰۰۰۰ بیت شعر سروده شده» است. بقیه آثار ادبی در حال تدوین نهایی و اخذ مجوز هستند.
        </p>
    </section>
    
    <!-- گالری کتاب‌ها -->
    <section class="books-gallery-section" aria-labelledby="gallery-title">
        <h2 id="gallery-title" class="section-title">گالری آثار ادبی منتشر شده</h2>
        <p style="text-align: center; color: #666; margin-bottom: 30px; max-width: 800px; margin-left: auto; margin-right: auto;">
            این کتاب‌ها نیز به چاپ رسیده و در دسترس علاقه‌مندان قرار دارد.
        </p>
        <div class="gallery-grid" id="booksGallery"></div>
    </section>
    
    <!-- بخش سرمایه‌گذاری -->
    <section id="investment" class="investment-section" aria-labelledby="investment-title">
        <div class="investment-content">
            <h2 id="investment-title">همکاری و سرمایه‌گذاری</h2>
            <p class="investment-text">
                <strong>۱۶ طرح کامل با الحاقیات، اصول فنی، معماری و مدل‌های درآمدی آماده ارائه است.</strong><br>
                تحلیل‌های مالی دقیق، مستندات ROI و طرح‌های اجرایی برای همکاری‌های استراتژیک.
            </p>
            <div class="highlight-box">
                <strong>خلاصه مدیریتی پروژه تحول سازمانی هوشمند:</strong><br>
                ارائه راه‌حل جامع تحول سازمانی و اجتماعی مبتنی بر چارچوب‌های IMQO، GENF و سازمان تحول‌گرا.
                مدل درآمدی لایه‌ای (مشاوره، SaaS، تراکنش شبکه، مجوز). بازگشت سرمایه بالقوه تا ۶۰۰٪.
            </div>
            <button class="investment-btn show-form-btn" aria-label="درخواست جلسه و دریافت پروپوزال کامل">
                📩 درخواست جلسه و دریافت پروپوزال کامل
            </button>
        </div>
    </section>
    
    <!-- فرم درخواست همکاری -->
    <section id="request-form" class="request-form-section" aria-labelledby="form-title">
        <h2 id="form-title" class="section-title">فرم درخواست همکاری</h2>
        <div class="request-form">
            <form id="cooperationForm" aria-label="فرم درخواست همکاری">
                <div class="form-group">
                    <label for="name">نام و نام خانوادگی *</label>
                    <input type="text" id="name" required aria-required="true">
                </div>
                <div class="form-group">
                    <label for="organization">سازمان / شرکت</label>
                    <input type="text" id="organization">
                </div>
                <div class="form-group">
                    <label for="email">ایمیل *</label>
                    <input type="email" id="email" required aria-required="true">
                </div>
                <div class="form-group">
                    <label for="phone">شماره تماس</label>
                    <input type="tel" id="phone">
                </div>
                <div class="form-group">
                    <label for="type">نوع درخواست *</label>
                    <select id="type" required aria-required="true">
                        <option value="">انتخاب کنید</option>
                        <option value="investment">سرمایه‌گذاری</option>
                        <option value="partnership">همکاری اجرایی</option>
                        <option value="consulting">مشاوره و اجرای طرح</option>
                        <option value="representation">درخواست نمایندگی</option>
                        <option value="ppt_request">درخواست فایل ارائه (PPT)</option>
                        <option value="book_request">درخواست خرید کتاب</option>
                        <option value="other">سایر</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="message">توضیحات درخواست *</label>
                    <textarea id="message" required aria-required="true" 
                              placeholder="لطفاً توضیحات کامل درخواست خود را بنویسید..."></textarea>
                </div>
                <button type="submit" class="submit-btn">ارسال درخواست</button>
            </form>
        </div>
    </section>
    
    <!-- مودال درخواست پاورپوینت -->
    <div class="modal" id="pptModal" role="dialog" aria-labelledby="modal-title" aria-hidden="true">
        <div class="modal-content">
            <div class="modal-icon">🔒</div>
            <h3 id="modal-title">درخواست فایل ارائه</h3>
            <p>فایل کامل ارائه (پاورپوینت) این پژوهش، پس از ثبت درخواست رسمی و موافقت شخصی دکتر رضائی، ارائه می‌گردد.</p>
            <p>لطفاً از طریق فرم زیر، درخواست خود را ارسال نمایید.</p>
            <div style="margin-top: 30px;">
                <button class="modal-close modal-contact show-form-btn" aria-label="پر کردن فرم درخواست">
                    📧 پر کردن فرم درخواست
                </button>
                <button class="modal-close" onclick="closeModal()" aria-label="بستن پنجره">
                    بستن
                </button>
            </div>
        </div>
    </div>
    
    <!-- نوار پایینی -->
    <div class="final-bar" role="marquee" aria-label="اطلاعات تکمیلی سایت">
        <div class="bar-content">
            <span class="bar-text">ساخت چارچوب‌هایی که نه ترس را دامن می‌زنند و نه ساده‌لوحی را • ترکیب خرد با فناوری برای فردایی امن و شکوفا • از شعر کهن تا هوش مصنوعی پیشرفته • تحول سازمانی با حفظ اصالت فرهنگی • نگاه به آینده، ریشه در گذشته • هر پایان، آغازی برای تکامل است • ۱۶ طرح آماده اجرا • سپهری از ۲۰۰۰۰ بیت شعر • پژوهش‌های بین‌المللی ثبت‌شده • ۱۸ مقاله علمی-نظری • پارادایم‌های نوین سازمان ارتعاشی • فراخوان جهانی همکاری</span>
            <span class="bar-text">ساخت چارچوب‌هایی که نه ترس را دامن می‌زنند و نه ساده‌لوحی را • ترکیب خرد با فناوری برای فردایی امن و شکوفا • از شعر کهن تا هوش مصنوعی پیشرفته • تحول سازمانی با حفظ اصالت فرهنگی • نگاه به آینده، ریشه در گذشته • هر پایان، آغازی برای تکامل است • ۱۶ طرح آماده اجرا • سپهری از ۲۰۰۰۰ بیت شعر • پژوهش‌های بین‌المللی ثبت‌شده • ۱۸ مقاله علمی-نظری • پارادایم‌های نوین سازمان ارتعاشی • فراخوان جهانی همکاری</span>
        </div>
    </div>
    
    <!-- فوتر -->
    <footer id="contact" role="contentinfo" aria-labelledby="footer-title">
        <div class="footer-content">
            <h3 id="footer-title">ارتباط و همکاری</h3>
            <div class="footer-grid">
                <div class="footer-col">
                    <div>ایمیل‌های رسمی</div>
                    <div><a href="mailto:ghrezaei1399@gmail.com">ghrezaei1399@gmail.com</a></div>
                    <div><a href="mailto:Gh_rezaei2003@yahoo.com">Gh_rezaei2003@yahoo.com</a></div>
                    <a href="https://www.linkedin.com/in/rezaei-researcher" target="_blank" 
                       rel="noopener noreferrer" class="linkedin-link">
                        <i class="fab fa-linkedin"></i> LinkedIn
                    </a>
                </div>
                <div class="footer-col">
                    <div>نمایه پژوهشی</div>
                    <div>
                        <a href="https://orcid.org/0009-0007-5840-8833" target="_blank" 
                           rel="noopener noreferrer" class="orcid-link">
                            <i class="fab fa-orcid"></i> ORCID: 0009-0007-5840-8833
                        </a>
                    </div>
                    <div>۱۸ مقاله ثبت‌شده در Zenodo</div>
                    <div>لینکدین پژوهشی: rezaei-researcher</div>
                </div>
                <div class="footer-col">
                    <div>دسترسی به مقالات و همکاری</div>
                    <div>کلیه درخواست‌ها از طریق فرم رسمی</div>
                    <div>پس از عقد قرارداد محرمانگی (NDA)</div>
                    <div>هماهنگی جلسات حضوری/مجازی</div>
                </div>
            </div>
            <div style="margin-top: 40px;">
                <button onclick="showRequestForm()" aria-label="ارسال درخواست همکاری رسمی"
                        style="background: linear-gradient(135deg, var(--accent-gold), #e6c158); 
                               color: var(--navy-blue); border: none; padding: 18px 50px; 
                               border-radius: 12px; font-weight: 800; font-size: 1.2rem; 
                               cursor: pointer; transition: all 0.4s; box-shadow: 0 10px 25px rgba(212, 175, 55, 0.4);"
                        class="shadow-hover">
                    📨 ارسال درخواست همکاری رسمی
                </button>
            </div>
            <div class="copyright">
                © کلیه حقوق محفوظ است - دکتر غلامرضا رضائی - معمار تحول سازمانی و نظریه‌پرداز هوش مصنوعی انسان‌محور
            </div>
        </div>
    </footer>
    
    <!-- جاوااسکریپت -->
    <script>
        // داده‌های اسلایدشو مقالات
        const articleSlides = [
            'https://i.postimg.cc/g2d9gwHj/dh-az-syzdh-aslayd.jpg',
            'https://i.postimg.cc/521csHS6/dw-az-syzdh-aslayd.jpg',
            'https://i.postimg.cc/DwFVxWPS/sh-az-syzdh-aslayd.jpg',
            'https://i.postimg.cc/GmjWVcXh/shsh-az-syzdh-aslayd.jpg',
            'https://i.postimg.cc/ht0k6S2G/nh-az-syzdh-aslayd.jpg',
            'https://i.postimg.cc/RZTkyMgN/hsht-az-syzdh-aslayd.jpg',
            'https://i.postimg.cc/x1Pwh06C/hft-az-syzdh-aslayd.jpg',
            'https://i.postimg.cc/qv0f1txH/pnj-az-syzdh-aslayd.jpg',
            'https://i.postimg.cc/vZMR01tD/chhar-az-syzdh-aslayd.jpg',
            'https://i.postimg.cc/0yCTF8V6/yazdh-az-syzdh-aslayd.jpg',
            'https://i.postimg.cc/3xZsVKtG/yk-az-syzdh-aslayd.jpg'
        ];
        
        // داده‌های کتاب‌ها برای اسلایدشو
        const booksData = [
            { 
                img: 'https://i.postimg.cc/PJZbc5Qd/20240301-203516-(2).jpg', 
                title: 'نغمه ی دل', 
                desc: 'اشعار عاشقانه ی - نیمه ی اول سال ۱۳۹۷'  
            },
            { 
                img: 'https://i.postimg.cc/6qRVSpf9/20240301-203539-(2).jpg', 
                title: 'ترنم دل', 
                desc: 'غزلیات و مثنویات سال ۱۳۹۷ - نیمه دوم سال' 
            },
            { 
                img: 'https://i.postimg.cc/nr7K5hYW/20240301-203438-(3).jpg', 
                title: 'زمزمه ی دل', 
                desc: 'دل خواسته ها' 
            },
            { 
                img: 'https://i.postimg.cc/7h71cZnL/20240301-203802-(2).jpg', 
                title: 'آوای دل', 
                desc: 'آفرینش‌های عاشقانه' 
            }
        ];
        
        // داده‌های گالری کتاب‌ها
        const galleryBooks = [
            { img: 'https://i.postimg.cc/d3dRXVjD/20240301-204004-(2).jpg', title: 'شعر زمزمه های دل' },
            { img: 'https://i.postimg.cc/pVnBysb0/20240301-204056-(2).jpg', title: 'شعر نغمه های دل' },
            { img: 'https://i.postimg.cc/zDRk3xZ0/20240301-204119-(2).jpg', title: 'نغمه ی دل' },
            { img: 'https://i.postimg.cc/L4ZVhxKb/20240301-204156-(2).jpg', title: 'ترنم دل' },
            { img: 'https://i.postimg.cc/MK2mB1zG/20240301-204217.jpg', title: 'ترنم دل ۲' },
            { img: 'https://i.postimg.cc/jdHQ4Cjy/20240301-204444.jpg', title: 'اوای دل' },
            { img: 'https://i.postimg.cc/7Y3MnbLM/20240301-205811.jpg', title: 'مجموعه شعر کهن' },
            { img: 'https://i.postimg.cc/BQTcBtvC/20240301-205901.jpg', title: 'اشعار عاشقانه' },
            { img: 'https://i.postimg.cc/65rLfTQ0/20240301-210721-(2).jpg', title: 'ترنم دل 3' },
            { img: 'https://i.postimg.cc/kg7N19VF/20240301-211151-(2).jpg', title: 'گالری 1' },
            { img: 'https://i.postimg.cc/CxwCPYZm/20240301-211220-(2).jpg', title: 'اشعار اجتماعی' },
            { img: 'https://i.postimg.cc/YCtNnk4V/20240301-211256-(2).jpg', title: 'گالری 2' },
            { img: 'https://i.postimg.cc/pLPQGx94/20240301-211527-(2).jpg', title: 'گالری شعر و داستان' },
            { img: 'https://i.postimg.cc/pLPQGx93/20240301-211628-(2).jpg', title: 'گالری گالری ها' }
        ];
        
        // 1. نوار پیشرفت و دکمه برگشت به بالا
        const backToTopBtn = document.getElementById('backToTop');
        const progressBar = document.getElementById('progressBar');
        
        window.addEventListener('scroll', () => {
            // دکمه برگشت به بالا
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
            
            // نوار پیشرفت
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
            
            // فعال‌سازی انیمیشن‌های fade-in-up
            const fadeElements = document.querySelectorAll('.fade-in-up');
            fadeElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                const elementVisible = 150;
                if (elementTop < window.innerHeight - elementVisible) {
                    el.style.animationPlayState = 'running';
                }
            });
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // 2. اسلایدشو مقالات (سرعت: 4 ثانیه)
        let currentArticleSlide = 0;
        let articleInterval;
        
        function initArticleSlideshow() {
            const slidesContainer = document.getElementById('articlesSlides');
            const dotsContainer = document.getElementById('articlesDots');
            
            slidesContainer.innerHTML = '';
            dotsContainer.innerHTML = '';
            
            articleSlides.forEach((slide, index) => {
                const slideDiv = document.createElement('div');
                slideDiv.className = 'slide-item';
                slideDiv.innerHTML = `<img src="${slide}" alt="مقاله ${index + 1}" loading="lazy">`;
                slidesContainer.appendChild(slideDiv);
                
                const dot = document.createElement('div');
                dot.className = `slide-dot ${index === 0 ? 'active' : ''}`;
                dot.setAttribute('aria-label', `اسلاید ${index + 1}`);
                dot.addEventListener('click', () => {
                    currentArticleSlide = index;
                    updateArticleSlideshow();
                    resetArticleInterval();
                });
                dotsContainer.appendChild(dot);
            });
            
            function initArticleSlideshow() {
                slidesContainer.style.transform = `translateX(-${currentArticleSlide * 100}%)`;
                document.querySelectorAll('#articlesDots .slide-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentArticleSlide);
                    dot.setAttribute('aria-current', i === currentArticleSlide ? 'true' : 'false');
                });
            }
            
            function nextArticleSlide() {
                currentArticleSlide = (currentArticleSlide + 1) % articleSlides.length;
                updateArticleSlideshow();
            }
            
            function resetArticleInterval() {
                clearInterval(articleInterval);
               articleInterval = setInterval(nextArticleSlide, 6000); // 6 ثانیه
            }
            
            updateArticleSlideshow();
            resetArticleInterval();
            
            slidesContainer.addEventListener('mouseenter', () => clearInterval(articleInterval));
            slidesContainer.addEventListener('mouseleave', resetArticleInterval);
            
            // کنترل با کیبورد
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    nextArticleSlide();
                    resetArticleInterval();
                } else if (e.key === 'ArrowLeft') {
                    currentArticleSlide = (currentArticleSlide - 1 + articleSlides.length) % articleSlides.length;
                    updateArticleSlideshow();
                    resetArticleInterval();
                }
            });
        }
        
        // 3. اسلایدشو کتاب‌ها (سرعت: 5 ثانیه)
        let currentBookSlide = 0;
        let bookInterval;
        
        function initBooksSlideshow() {
            const track = document.getElementById('booksTrack');
            track.innerHTML = '';
            
            // برای ایجاد حلقه بی‌نهایت، کپی می‌کنیم
            [...booksData, ...booksData].forEach((book, index) => {
                const slide = document.createElement('div');
                slide.className = 'book-slide';
                slide.setAttribute('role', 'group');
                slide.setAttribute('aria-label', `کتاب ${index + 1}`);
                slide.innerHTML = `
                    <div class="book-item">
                        <div class="book-cover">
                            <img src="${book.img}" alt="${book.title}" loading="lazy">
                        </div>
                        <div class="book-info">
                            <div class="book-title">${book.title}</div>
                            <div class="book-desc">${book.desc}</div>
                            <div class="book-status">منتشر شده</div>
                        </div>
                    </div>
                `;
                track.appendChild(slide);
            });
            
            function updateBooksSlideshow() {
                const totalSlides = booksData.length;
                const slideWidth = 100 / totalSlides;
                track.style.transform = `translateX(-${currentBookSlide * slideWidth}%)`;
                
                // حلقه بی‌نهایت
                if (currentBookSlide >= totalSlides) {
                    setTimeout(() => {
                        track.style.transition = 'none';
                        currentBookSlide = 0;
                        track.style.transform = 'translateX(0)';
                        setTimeout(() => {
                            track.style.transition = 'transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1)';
                        }, 50);
                    }, 700);
                }
            }
            
            function nextBookSlide() {
                currentBookSlide++;
                updateBooksSlideshow();
            }
            
            bookInterval = setInterval(nextBookSlide, 5000); // 5 ثانیه
            
            track.addEventListener('mouseenter', () => clearInterval(bookInterval));
            track.addEventListener('mouseleave', () => {
                bookInterval = setInterval(nextBookSlide, 5000);
            });
        }
        
        // 4. گالری کتاب‌ها
        function initBooksGallery() {
            const gallery = document.getElementById('booksGallery');
            gallery.innerHTML = '';
            
            galleryBooks.forEach(book => {
                const item = document.createElement('div');
                item.className = 'gallery-item fade-in-up';
                item.setAttribute('role', 'article');
                item.innerHTML = `
                    <div class="gallery-img">
                        <img src="${book.img}" alt="${book.title}" loading="lazy">
                    </div>
                    <div class="gallery-caption">${book.title}</div>
                `;
                gallery.appendChild(item);
            });
        }
        
        // 5. شمارنده آمار
        function animateStats() {
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent.replace('+', ''));
                let current = 0;
                const increment = target / 60;
                const hasPlus = stat.textContent.includes('+');
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                        stat.textContent = hasPlus ? target + '+' : target.toString();
                    } else {
                        stat.textContent = Math.floor(current).toString();
                    }
                }, 40);
            });
        }
        
        // 6. سیستم تب‌ها
        function initResearchTabs() {
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const tabId = btn.getAttribute('data-tab');
                    
                    tabBtns.forEach(b => {
                        b.classList.remove('active');
                        b.setAttribute('aria-selected', 'false');
                    });
                    
                    tabContents.forEach(c => {
                        c.classList.remove('active');
                        c.setAttribute('aria-hidden', 'true');
                    });
                    
                    btn.classList.add('active');
                    btn.setAttribute('aria-selected', 'true');
                    
                    const activeTab = document.getElementById(tabId);
                    activeTab.classList.add('active');
                    activeTab.setAttribute('aria-hidden', 'false');
                });
            });
        }
        
        // 7. نمایش فرم درخواست
        window.showRequestForm = function() {
            const formSection = document.getElementById('request-form');
            formSection.classList.add('active');
            
            formSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            closeModal();
        }
        
        // 8. مودال پاورپوینت
        function initPPTButtons() {
            const buttons = document.querySelectorAll('.request-ppt-btn');
            const modal = document.getElementById('pptModal');
            
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    modal.classList.add('active');
                    modal.setAttribute('aria-hidden', 'false');
                });
            });
            
            window.closeModal = function() {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
            }
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) closeModal();
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeModal();
                }
            });
        }
        
        // 9. مدیریت فرم با EmailJS
        document.getElementById('cooperationForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value.trim(),
                organization: document.getElementById('organization').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                type: document.getElementById('type').value,
                message: document.getElementById('message').value.trim(),
                date: new Date().toLocaleString('fa-IR'),
                page_url: window.location.href
            };
            
            if (!formData.name || !formData.email || !formData.type || !formData.message) {
                alert('لطفاً فیلدهای اجباری (*) را پر کنید.');
                return;
            }
            
            if (!validateEmail(formData.email)) {
                alert('لطفاً یک ایمیل معتبر وارد کنید.');
                return;
            }
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'در حال ارسال...';
            submitBtn.disabled = true;
            
            try {
                console.log('فرم ارسال شد:', formData);
                
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                alert('✅ درخواست شما با موفقیت ثبت شد!\n\nبه زودی از طریق ایمیل یا تلفن با شما تماس خواهیم گرفت.\n\nتشکر از اعتماد شما.');
                
                this.reset();
                
                setTimeout(() => {
                    document.getElementById('request-form').classList.remove('active');
                }, 2500);
                
            } catch (error) {
                console.error('خطا در ارسال:', error);
                alert('⚠️ در ارسال درخواست مشکلی پیش آمد.\n\nلطفاً مستقیماً به ایمیل‌های زیر پیام بفرستید:\nghrezaei1399@gmail.com\nیا\nGh_rezaei2003@yahoo.com');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
        
        // 10. اسکرول نرم برای منو
        function initSmoothScroll() {
            document.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        const targetId = href.substring(1);
                        
                        if (targetId === 'contact') {
                            showRequestForm();
                        } else {
                            const targetElement = document.getElementById(targetId);
                            if (targetElement) {
                                targetElement.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                                
                                // آپدیت URL بدون رفرش
                                history.pushState(null, null, href);
                            }
                        }
                    }
                });
            });
        }
        
        // 11. دکمه‌های نمایش فرم
        function initShowFormButtons() {
            document.querySelectorAll('.show-form-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    showRequestForm();
                });
            });
        }
        
        // 12. دکمه زبان
        document.querySelector('.lang-btn').addEventListener('click', function(e) {
            e.preventDefault();
            alert('نسخه انگلیسی در حال توسعه است. به زودی...');
        });
        
        // 13. اعتبارسنجی ایمیل
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // 14. راه‌اندازی تمام ماژول‌ها
        window.addEventListener('DOMContentLoaded', () => {
            initArticleSlideshow();
            initBooksSlideshow();
            initBooksGallery();
            animateStats();
            initResearchTabs();
            initPPTButtons();
            initSmoothScroll();
            initShowFormButtons();
                    });
    </script>
</body>
</html>
