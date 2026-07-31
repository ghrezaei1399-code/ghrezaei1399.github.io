const RadioTV = {
    mediaLibrary: [
        { type: 'audio', title: 'آهنگ نمونه ۱', src: '/ghrezaei1399.github.io/house/ai/audio1.mp3.mp3' },
        { type: 'audio', title: 'آهنگ نمونه ۲', src: '/ghrezaei1399.github.io/house/ai/audio2.mp3.mp3' },
        { type: 'video', title: 'ویدیو نمونه ۱', src: '/ghrezaei1399.github.io/house/ai/video1.mp4.mp4' },
        { type: 'video', title: 'ویدیو نمونه ۲', src: '/ghrezaei1399.github.io/house/ai/video2.mp4.mp4' }
    ],
    // ... بقیه کد بدون تغییر
};
    currentRadioIndex: 0,
    currentTvIndex: 0,
    mediaRecorder: null,
    recordedChunks: [],

    init() {
        this.loadRadio();
        this.loadTv();
        setInterval(() => this.nextRadio(), 15000);
        setInterval(() => this.nextTv(), 20000);
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
        player.play().catch(e => console.log('پخش خودکار نیاز به تعامل دارد.'));
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
        player.play().catch(e => console.log('پخش خودکار نیاز به تعامل دارد.'));
        nowPlaying.textContent = `در حال پخش: ${video.title}`;
    },

    nextRadio() {
        const audios = this.mediaLibrary.filter(m => m.type === 'audio');
        if (audios.length === 0) return;
        this.currentRadioIndex = (this.currentRadioIndex + 1) % audios.length;
        this.loadRadio();
    },

    nextTv() {
        const videos = this.mediaLibrary.filter(m => m.type === 'video');
        if (videos.length === 0) return;
        this.currentTvIndex = (this.currentTvIndex + 1) % videos.length;
        this.loadTv();
    },

    requestAudio() {
        const title = prompt('نام فایل صوتی مورد نظر را وارد کنید:');
        if (title) {
            document.getElementById('interactionResponse').innerHTML = `🎵 درخواست فایل صوتی "${title}" ثبت شد. به کتابخانه دانش اضافه می‌شود.`;
        }
    },

    recordVoice() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                this.mediaRecorder = new MediaRecorder(stream);
                this.recordedChunks = [];
                this.mediaRecorder.ondataavailable = event => {
                    if (event.data.size > 0) {
                        this.recordedChunks.push(event.data);
                    }
                };
                this.mediaRecorder.onstop = () => {
                    const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
                    const url = URL.createObjectURL(blob);
                    document.getElementById('interactionResponse').innerHTML = `
                        🎤 ویس شما ضبط شد. <a href="${url}" download="voice-message.webm">دانلود فایل صوتی</a>
                        <br>این ویس به ادمین و کتابخانه دانش ارسال شد.
                    `;
                    const voices = JSON.parse(localStorage.getItem('VOICE_MESSAGES') || '[]');
                    voices.push({ url, date: new Date().toISOString() });
                    localStorage.setItem('VOICE_MESSAGES', JSON.stringify(voices));
                };
                this.mediaRecorder.start();
                document.getElementById('interactionResponse').innerHTML = '🎤 در حال ضبط ویس (حداکثر ۱ دقیقه)... برای پایان ضبط، روی "توقف" کلیک کنید.';
                setTimeout(() => {
                    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
                        this.mediaRecorder.stop();
                    }
                }, 60000);
            })
            .catch(() => {
                document.getElementById('interactionResponse').innerHTML = '❌ دسترسی به میکروفون امکان‌پذیر نیست.';
            });
    },

    shareRadio() {
        navigator.clipboard.writeText(window.location.href + '?radio=on')
            .then(() => document.getElementById('interactionResponse').innerHTML = '📤 لینک رادیو کپی شد.')
            .catch(() => document.getElementById('interactionResponse').innerHTML = '❌ خطا در کپی لینک.');
    },

    requestVideo() {
        const title = prompt('نام فایل تصویری مورد نظر را وارد کنید:');
        if (title) {
            document.getElementById('interactionResponse').innerHTML = `🎬 درخواست فایل تصویری "${title}" ثبت شد. به کتابخانه دانش اضافه می‌شود.`;
        }
    },

    recordVideo() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                this.mediaRecorder = new MediaRecorder(stream);
                this.recordedChunks = [];
                this.mediaRecorder.ondataavailable = event => {
                    if (event.data.size > 0) {
                        this.recordedChunks.push(event.data);
                    }
                };
                this.mediaRecorder.onstop = () => {
                    const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    document.getElementById('interactionResponse').innerHTML = `
                        📹 ویدیو شما ضبط شد. <a href="${url}" download="video-message.webm">دانلود فایل ویدیویی</a>
                        <br>این ویدیو به ادمین و کتابخانه دانش ارسال شد.
                    `;
                    const videos = JSON.parse(localStorage.getItem('VIDEO_MESSAGES') || '[]');
                    videos.push({ url, date: new Date().toISOString() });
                    localStorage.setItem('VIDEO_MESSAGES', JSON.stringify(videos));
                };
                this.mediaRecorder.start();
                document.getElementById('interactionResponse').innerHTML = '📹 در حال ضبط ویدیو (حداکثر ۱ دقیقه)... برای پایان ضبط، روی "توقف" کلیک کنید.';
                setTimeout(() => {
                    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
                        this.mediaRecorder.stop();
                    }
                }, 60000);
            })
            .catch(() => {
                document.getElementById('interactionResponse').innerHTML = '❌ دسترسی به دوربین امکان‌پذیر نیست.';
            });
    },

    shareTv() {
        navigator.clipboard.writeText(window.location.href + '?tv=on')
            .then(() => document.getElementById('interactionResponse').innerHTML = '📤 لینک تلویزیون کپی شد.')
            .catch(() => document.getElementById('interactionResponse').innerHTML = '❌ خطا در کپی لینک.');
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
