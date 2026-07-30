const RadioTV = {
    // داده‌های نمونه (در آینده از library.json خوانده می‌شود)
    mediaLibrary: [
        { type: 'audio', title: 'آهنگ نمونه ۱', src: 'sample-audio.mp3' },
        { type: 'audio', title: 'آهنگ نمونه ۲', src: 'sample-audio2.mp3' },
        { type: 'video', title: 'ویدیو نمونه ۱', src: 'sample-video.mp4' },
        { type: 'video', title: 'ویدیو نمونه ۲', src: 'sample-video2.mp4' }
    ],
    currentRadioIndex: 0,
    currentTvIndex: 0,

    init() {
        this.loadRadio();
        this.loadTv();
        // چرخش خودکار رادیو و تلویزیون
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
        this.showWave(true);
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

    showWave(show) {
        const wave = document.getElementById('radioWave');
        wave.style.display = show ? 'flex' : 'none';
    },

    // تعاملات مخاطب
    sendText() {
        const msg = prompt('پیام خود را بنویسید:');
        if (!msg) return;
        const response = this.getSmartResponse(msg);
        document.getElementById('interactionResponse').innerHTML = `
            <strong>شما:</strong> ${msg}<br>
            <strong>پاسخ هوشمند:</strong> ${response}
        `;
    },

    sendVoice() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => {
                document.getElementById('interactionResponse').innerHTML = '🎤 پیام صوتی شما دریافت شد. به زودی بررسی می‌شود.';
            })
            .catch(() => {
                document.getElementById('interactionResponse').innerHTML = '❌ دسترسی به میکروفون امکان‌پذیر نیست.';
            });
    },

    sendVideo() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(() => {
                document.getElementById('interactionResponse').innerHTML = '📹 پیام ویدیویی شما دریافت شد. به زودی بررسی می‌شود.';
            })
            .catch(() => {
                document.getElementById('interactionResponse').innerHTML = '❌ دسترسی به دوربین امکان‌پذیر نیست.';
            });
    },

    getSmartResponse(message) {
        if (message.includes('هوش مصنوعی')) {
            return 'بر اساس نظریه "درهمتنیدگی انسان و هوش مصنوعی"، تعامل انسان و ماشین یک فرصت برای تکامل فرهنگی است.';
        } else if (message.includes('عدالت')) {
            return 'عدالت دیجیتال یکی از اهداف اصلی این پلتفرم است.';
        } else {
            return 'از پیام شما متشکرم. این موضوع در گراف دانش ما در حال بررسی است.';
        }
    },

    requestRadioSong() {
        const song = prompt('نام آهنگ مورد نظر خود را وارد کنید:');
        if (song) {
            document.getElementById('interactionResponse').innerHTML = `🎵 درخواست آهنگ "${song}" ثبت شد.`;
        }
    },

    radioComment() {
        const comment = prompt('نظر صوتی خود را بنویسید:');
        if (comment) {
            document.getElementById('interactionResponse').innerHTML = `🎤 نظر صوتی شما ثبت شد: "${comment}"`;
        }
    },

    shareRadio() {
        alert('📤 لینک رادیو کپی شد.');
    },

    requestTvShow() {
        const show = prompt('نام فیلم یا برنامه مورد نظر خود را وارد کنید:');
        if (show) {
            document.getElementById('interactionResponse').innerHTML = `🎬 درخواست فیلم "${show}" ثبت شد.`;
        }
    },

    tvComment() {
        const comment = prompt('نظر تصویری خود را بنویسید:');
        if (comment) {
            document.getElementById('interactionResponse').innerHTML = `📝 نظر تصویری شما ثبت شد: "${comment}"`;
        }
    },

    shareTv() {
        alert('📤 لینک تلویزیون کپی شد.');
    }
};

// راه‌اندازی پس از بارگذاری صفحه
document.addEventListener('DOMContentLoaded', () => {
    RadioTV.init();
});
