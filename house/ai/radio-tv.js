// radio-tv.js - نسخه پایدار با دو فایل صوتی و دو فایل تصویری
const RadioTV = {
    mediaLibrary: [
        { type: 'audio', title: 'آهنگ نمونه ۱', src: 'audio1.mp3.mp3' },
        { type: 'audio', title: 'آهنگ نمونه ۲', src: 'audio2.mp3.mp3' },
        { type: 'video', title: 'ویدیو نمونه ۱', src: 'video1.mp4.mp4' },
        { type: 'video', title: 'ویدیو نمونه ۲', src: 'video2.mp4.mp4' }
    ],
    currentRadioIndex: 0,
    currentTvIndex: 0,
    mediaRecorder: null,
    recordedChunks: [],

    init() {
        this.loadRadio();
        this.loadTv();
        this.setupRadioCycle();
        this.setupTvCycle();
        this.populateRadioList();
        this.populateTvList();
    },

    loadRadio() {
        const player = document.getElementById('radioPlayer');
        const nowPlaying = document.getElementById('radioNowPlaying');
        const audios = this.mediaLibrary.filter(m => m.type === 'audio');
        if (audios.length === 0) {
            nowPlaying.textContent = 'در حال پخش: محتوایی موجود نیست';
            return;
        }
        const audio = audios[this.currentRadioIndex % audios.length];
        player.src = audio.src;
        player.load();
        player.play().catch(e => {
            console.log('پخش خودکار نیاز به تعامل دارد:', e);
            nowPlaying.textContent = 'برای پخش، روی دکمه پخش کلیک کنید';
        });
        nowPlaying.textContent = `در حال پخش: ${audio.title} (${this.currentRadioIndex + 1}/${audios.length})`;
    },

    loadTv() {
        const player = document.getElementById('tvPlayer');
        const nowPlaying = document.getElementById('tvNowPlaying');
        const videos = this.mediaLibrary.filter(m => m.type === 'video');
        if (videos.length === 0) {
            nowPlaying.textContent = 'در حال پخش: محتوایی موجود نیست';
            return;
        }
        const video = videos[this.currentTvIndex % videos.length];
        player.src = video.src;
        player.load();
        player.play().catch(e => {
            console.log('پخش خودکار نیاز به تعامل دارد:', e);
            nowPlaying.textContent = 'برای پخش، روی دکمه پخش کلیک کنید';
        });
        nowPlaying.textContent = `در حال پخش: ${video.title} (${this.currentTvIndex + 1}/${videos.length})`;
    },

    setupRadioCycle() {
        const player = document.getElementById('radioPlayer');
        player.addEventListener('ended', () => {
            const audios = this.mediaLibrary.filter(m => m.type === 'audio');
            if (audios.length === 0) return;
            this.currentRadioIndex = (this.currentRadioIndex + 1) % audios.length;
            this.loadRadio();
        });
    },

    setupTvCycle() {
        const player = document.getElementById('tvPlayer');
        player.addEventListener('ended', () => {
            const videos = this.mediaLibrary.filter(m => m.type === 'video');
            if (videos.length === 0) return;
            this.currentTvIndex = (this.currentTvIndex + 1) % videos.length;
            this.loadTv();
        });
    },

    populateRadioList() {
        const container = document.getElementById('radioList');
        if (!container) return;
        container.innerHTML = '<h4>📻 لیست پخش رادیو</h4><ul>';
        const audios = this.mediaLibrary.filter(m => m.type === 'audio');
        audios.forEach((item, index) => {
            container.innerHTML += `<li><button onclick="RadioTV.playRadio(${index})">${item.title}</button></li>`;
        });
        container.innerHTML += '</ul>';
    },

    populateTvList() {
        const container = document.getElementById('tvList');
        if (!container) return;
        container.innerHTML = '<h4>📺 لیست کانال‌های تلویزیون</h4><ul>';
        const videos = this.mediaLibrary.filter(m => m.type === 'video');
        videos.forEach((item, index) => {
            container.innerHTML += `<li><button onclick="RadioTV.playTv(${index})">${item.title}</button></li>`;
        });
        container.innerHTML += '</ul>';
    },

    playRadio(index) {
        this.currentRadioIndex = index;
        this.loadRadio();
        document.getElementById('radioPlayer').play();
    },

    playTv(index) {
        this.currentTvIndex = index;
        this.loadTv();
        document.getElementById('tvPlayer').play();
    },

    // =============================================
    // توابع تعامل (بدون تغییر)
    // =============================================
    requestAudio() {
        const title = prompt('نام فایل صوتی مورد نظر را وارد کنید:');
        if (title) {
            document.getElementById('interactionResponse').innerHTML = `🎵 درخواست فایل صوتی "${title}" ثبت شد.`;
        }
    },

    sendVoice() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                const chunks = [];
                recorder.ondataavailable = e => chunks.push(e.data);
                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'audio/webm' });
                    const url = URL.createObjectURL(blob);
                    document.getElementById('interactionResponse').innerHTML = `
                        🎤 ویس شما ارسال شد. <a href="${url}" download="voice-message.webm">دانلود</a>
                        <br>این ویس برای بررسی به ادمین ارسال شد.
                    `;
                    const voices = JSON.parse(localStorage.getItem('VOICE_MESSAGES') || '[]');
                    voices.push({ url, date: new Date().toISOString(), status: 'new' });
                    localStorage.setItem('VOICE_MESSAGES', JSON.stringify(voices));
                };
                recorder.start();
                document.getElementById('interactionResponse').innerHTML = '🎤 در حال ضبط ویس... (حداکثر ۳۰ ثانیه)';
                setTimeout(() => {
                    if (recorder.state === 'recording') recorder.stop();
                }, 30000);
            })
            .catch(() => {
                document.getElementById('interactionResponse').innerHTML = '❌ دسترسی به میکروفون امکان‌پذیر نیست.';
            });
    },

    share(contentType) {
        const platform = prompt('لطفاً پلتفرم مورد نظر را وارد کنید (مثلاً واتساپ، تلگرام، ایمیل):');
        if (!platform) return;
        const recipient = prompt('لطفاً مخاطب (شخص یا گروه) را مشخص کنید:');
        if (!recipient) return;
        const message = `🔗 اشتراک‌گذاری ${contentType} از رادیو تلویزیون هوشمند دکتر رضائی\nپلتفرم: ${platform}\nمخاطب: ${recipient}\nزمان: ${new Date().toLocaleString()}`;
        const shares = JSON.parse(localStorage.getItem('SHARES') || '[]');
        shares.push({ contentType, platform, recipient, message, date: new Date().toISOString() });
        localStorage.setItem('SHARES', JSON.stringify(shares));
        document.getElementById('interactionResponse').innerHTML = `
            📤 اشتراک‌گذاری ثبت شد.
            <br>پلتفرم: ${platform}
            <br>مخاطب: ${recipient}
            <br>برای تکمیل اشتراک، لینک را کپی کنید:
            <br><input type="text" value="${window.location.href}" readonly style="width:100%; padding:8px; margin-top:8px;">
        `;
        navigator.clipboard.writeText(window.location.href).catch(() => {});
    },

    sendVideo() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                const chunks = [];
                recorder.ondataavailable = e => chunks.push(e.data);
                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    document.getElementById('interactionResponse').innerHTML = `
                        📹 ویدئو شما ارسال شد. <a href="${url}" download="video-message.webm">دانلود</a>
                        <br>این ویدئو برای بررسی به ادمین ارسال شد.
                    `;
                    const videos = JSON.parse(localStorage.getItem('VIDEO_MESSAGES') || '[]');
                    videos.push({ url, date: new Date().toISOString(), status: 'new' });
                    localStorage.setItem('VIDEO_MESSAGES', JSON.stringify(videos));
                };
                recorder.start();
                document.getElementById('interactionResponse').innerHTML = '📹 در حال ضبط ویدئو... (حداکثر ۳۰ ثانیه)';
                setTimeout(() => {
                    if (recorder.state === 'recording') recorder.stop();
                }, 30000);
            })
            .catch(() => {
                document.getElementById('interactionResponse').innerHTML = '❌ دسترسی به دوربین امکان‌پذیر نیست.';
            });
    },

    requestVideo() {
        const title = prompt('نام فایل تصویری مورد نظر را وارد کنید:');
        if (title) {
            document.getElementById('interactionResponse').innerHTML = `🎬 درخواست فایل تصویری "${title}" ثبت شد.`;
        }
    },

    sendTextAdmin() {
        const msg = prompt('پیام خود را برای ادمین بنویسید:');
        if (msg) {
            document.getElementById('interactionResponse').innerHTML = `✍️ پیام شما به ادمین ارسال شد: "${msg}"`;
            const messages = JSON.parse(localStorage.getItem('ADMIN_MESSAGES') || '[]');
            messages.push({ type: 'text', content: msg, date: new Date().toISOString() });
            localStorage.setItem('ADMIN_MESSAGES', JSON.stringify(messages));
        }
    },

    sendVoiceAdmin() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                const chunks = [];
                recorder.ondataavailable = e => chunks.push(e.data);
                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'audio/webm' });
                    const url = URL.createObjectURL(blob);
                    document.getElementById('interactionResponse').innerHTML = `🎤 ویس شما به ادمین ارسال شد. <a href="${url}" download="admin-voice.webm">دانلود</a>`;
                };
                recorder.start();
                document.getElementById('interactionResponse').innerHTML = '🎤 در حال ضبط ویس برای ادمین... (حداکثر ۳۰ ثانیه)';
                setTimeout(() => {
                    if (recorder.state === 'recording') recorder.stop();
                }, 30000);
            })
            .catch(() => {
                document.getElementById('interactionResponse').innerHTML = '❌ دسترسی به میکروفون امکان‌پذیر نیست.';
            });
    },

    sendVideoAdmin() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                const chunks = [];
                recorder.ondataavailable = e => chunks.push(e.data);
                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    document.getElementById('interactionResponse').innerHTML = `📹 ویدیو شما به ادمین ارسال شد. <a href="${url}" download="admin-video.webm">دانلود</a>`;
                };
                recorder.start();
                document.getElementById('interactionResponse').innerHTML = '📹 در حال ضبط ویدیو برای ادمین... (حداکثر ۳۰ ثانیه)';
                setTimeout(() => {
                    if (recorder.state === 'recording') recorder.stop();
                }, 30000);
            })
            .catch(() => {
                document.getElementById('interactionResponse').innerHTML = '❌ دسترسی به دوربین امکان‌پذیر نیست.';
            });
    }
};

document.addEventListener('DOMContentLoaded', () => RadioTV.init());
