// radio-tv.js - مدیریت پخش رادیو و تلویزیون
class RadioTVManager {
    constructor() {
        this.radioPlayer = document.getElementById('radioPlayer');
        this.tvPlayer = document.getElementById('tvPlayer');
        this.radioPlaylist = document.getElementById('radioPlaylist');
        this.tvPlaylist = document.getElementById('tvPlaylist');
        this.currentRadio = null;
        this.currentTV = null;
        console.log('✅ RadioTVManager initialized');
        
        this.initializePlaylists();
    }

    initializePlaylists() {
        // Radio playlist
        if (this.radioPlaylist) {
            const buttons = this.radioPlaylist.querySelectorAll('button');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.playRadio(btn.dataset.audio);
                    buttons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });
            
            // Auto-play first
            if (buttons.length > 0) {
                buttons[0].click();
            }
        }

        // TV playlist
        if (this.tvPlaylist) {
            const buttons = this.tvPlaylist.querySelectorAll('button');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.playTV(btn.dataset.video);
                    buttons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });
            
            // Auto-play first
            if (buttons.length > 0) {
                buttons[0].click();
            }
        }
    }

    playRadio(src) {
        if (!this.radioPlayer) return;
        this.radioPlayer.src = src;
        this.radioPlayer.load();
        this.radioPlayer.play().catch(e => console.log('Auto-play prevented:', e));
        this.currentRadio = src;
        console.log('📻 Playing radio:', src);
    }

    playTV(src) {
        if (!this.tvPlayer) return;
        this.tvPlayer.src = src;
        this.tvPlayer.load();
        this.tvPlayer.play().catch(e => console.log('Auto-play prevented:', e));
        this.currentTV = src;
        console.log('📺 Playing TV:', src);
    }

    stopRadio() {
        if (this.radioPlayer) {
            this.radioPlayer.pause();
            this.radioPlayer.currentTime = 0;
        }
    }

    stopTV() {
        if (this.tvPlayer) {
            this.tvPlayer.pause();
            this.tvPlayer.currentTime = 0;
        }
    }

    getCurrentRadio() {
        return this.currentRadio;
    }

    getCurrentTV() {
        return this.currentTV;
    }
}

// ایجاد نمونه جهانی
const radioTVManager = new RadioTVManager();
console.log('✅ RadioTVManager module loaded');
