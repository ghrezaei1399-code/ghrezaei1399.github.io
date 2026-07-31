const RadioTV = {
    mediaLibrary: [
        { type: 'audio', title: 'سخنرانی استاد فلانی', src: '/ghrezaei1399.github.io/house/ai/audio1.mp3.mp3' },
        { type: 'audio', title: 'موزیک شماره ۱', src: '/ghrezaei1399.github.io/house/ai/audio2.mp3.mp3' },
        { type: 'video', title: 'کانال خبری', src: '/ghrezaei1399.github.io/house/ai/video1.mp4.mp4' },
        { type: 'video', title: 'کانال مستند', src: '/ghrezaei1399.github.io/house/ai/video2.mp4.mp4' }
    ],
    currentRadioIndex: 0,
    currentTvIndex: 0,

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
        nowPlaying.textContent = `در حال پخش: ${audio.title}`;
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
        nowPlaying.textContent = `در حال پخش: ${video.title}`;
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
    // سه ماژول اصلی (درخواست، ارسال، اشتراک)
    // =============================================

    // ۱. درخواست فایل صوتی/تصویری خاص
    requestAudio() {
        const title = prompt('نام فایل صوتی مورد نظر را وارد کنید:');
        if (title) {
            const audios = this.mediaLibrary.filter(m => m.type === 'audio');
            const exists = audios.some(a => a.title === title);
            if (exists) {
                document.getElementById('interactionResponse').innerHTML = `🎵 فایل "${title}" در لیست پخش موجود است.`;
            } else {
                document.getElementById('interactionResponse').innerHTML = `🎵 درخواست فایل "${title}" به ادمین ارسال شد.`;
                // ذخیره درخواست در localStorage
                const requests = JSON.parse(localStorage.getItem('AUDIO_REQUESTS') || '[]');
                requests.push({ title, date: new Date().toISOString(), status: 'pending' });
                localStorage.setItem('AUDIO_REQUESTS', JSON.stringify(requests));
            }
        }
    },

    requestVideo() {
        const title = prompt('نام فایل تصویری مورد نظر را وارد کنید:');
        if (title) {
            const videos = this.mediaLibrary.filter(m => m.type === 'video');
            const exists = videos.some(v => v.title === title);
            if (exists) {
                document.getElementById('interactionResponse').innerHTML = `🎬 فایل "${title}" در لیست کانال‌ها موجود است.`;
            } else {
                document.getElementById('interactionResponse').innerHTML = `🎬 درخواست فایل "${title}" به ادمین ارسال شد.`;
                const requests = JSON.parse(localStorage.getItem('VIDEO_REQUESTS') || '[]');
                requests.push({ title, date: new Date().toISOString(), status: 'pending' });
                localStorage.setItem('VIDEO_REQUESTS', JSON.stringify(requests));
            }
        }
    },

    // ۲. ارسال ویس/ویدئو (به جای ضبط)
    sendVoice() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                const chunks = [];
                recorder.ondataavailable = e => chunks.push(e.data);
                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'audio/webm' });
                    const url = URL.createObjectURL(blob);
                    const voices = JSON.parse(localStorage.getItem('VOICE_MESSAGES') || '[]');
                    voices.push({ url, date: new Date().toISOString(), status: 'new' });
                    localStorage.setItem('VOICE_MESSAGES', JSON.stringify(voices));
                    document.getElementById('interactionResponse').innerHTML = `
                        🎤 ویس شما ارسال شد. <a href="${url}" download="voice-message.webm">دانلود</a>
                        <br>این ویس برای بررسی به ادمین ارسال شد.
                    `;
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

    sendVideo() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                const chunks = [];
                recorder.ondataavailable = e => chunks.push(e.data);
                recorder.onstop = () => {
                    const blob = new Blob(chunks, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    const videos = JSON.parse(localStorage.getItem('VIDEO_MESSAGES') || '[]');
                    videos.push({ url, date: new Date().toISOString(), status: 'new' });
                    localStorage.setItem('VIDEO_MESSAGES', JSON.stringify(videos));
                    document.getElementById('interactionResponse').innerHTML = `
                        📹 ویدئو شما ارسال شد. <a href="${url}" download="video-message.webm">دانلود</a>
                        <br>این ویدئو برای بررسی به ادمین ارسال شد.
                    `;
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

    // ۳. اشتراک‌گذاری با انتخاب پلتفرم و مخاطب
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
    }
};

document.addEventListener('DOMContentLoaded', () => RadioTV.init());
