const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('by-img'),
    shufflem = document.getElementById('shuffle'),
    repeatm = document.getElementById('repeat'),
    mutem = document.getElementById('mute'),
    volumeIndicator = document.getElementById('volumeIndicator'),
    volumeProgress = document.getElementById('volume-progress'),
    Backarrow = document.getElementById('backarrow'),
    Sharem = document.getElementById('share'),
    listt = document.getElementById('list'),
    playercontrols = document.getElementById('controls');


// Add click event listener to the button

const music = new Audio();
let isRepaet = 0;
let isBack = 0;
const songs = [{
        path: 'assets/1.mp3',
        displayName: 'Gangsta\'s',
        cover: 'assets/4.png',
        artist: 'Kat Dahlia',
        link: 'https://youtu.be/trtdEg34eII?si=g31fSVg21kJQlg_c',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Dans La Peau',
        cover: 'assets/6.png',
        artist: 'Ash',
        link: 'https://youtu.be/dyhHMQp5S5k?si=hit2C_v6GzLAttD0',
    }, {
        path: 'assets/2.mp3',
        displayName: 'Roses',
        cover: 'assets/5.png',
        artist: 'SAINt JHN (Imanbek Remix)',
        link: 'https://youtu.be/ele2DMU49Jk?si=YDJ33QZo8HVPAXxg',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Johnny Cash',
        cover: 'assets/4.jpg',
        artist: 'Cairokee',
        link: 'https://youtu.be/I2MrqvBNlQY?si=QaVqvxDElHlND6Tk',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'واحد وعشرين',
        cover: 'assets/7.png',
        artist: 'Wegz',
        link: 'https://youtu.be/WwB5w-Rt88k?si=XS1UZ4jMeZiZ7PnL',
    },
    {
        path: 'assets/Not Like Us.mp3',
        displayName: 'Not Like Us',
        cover: 'assets/1.png',
        artist: 'Kendrick Lamar',
        link: '',
    },
    {
        path: 'assets/POP SMOKE - INVINCIBLE.mp3',
        displayName: 'Invincible',
        cover: 'assets/2.png',
        artist: 'Pop Smoke',
        link: 'https://youtu.be/T6eK-2OQtew?si=T9WKl_JrZTkW9HDP',
    },
    {
        path: 'assets/Franchise.mp3',
        displayName: 'Franchise',
        cover: 'assets/3.png',
        artist: 'Abyusif',
        link: 'https://youtu.be/jll3UoQ-yQY?si=bC9DLeTCp_s8bezw',
    }, {
        path: 'assets/sam3 akhina.mp3',
        displayName: 'سامع أخينا',
        cover: 'assets/9.jpg',
        artist: 'Ziad Zaza',
        link: 'https://youtu.be/MtqVu-ZJQBM?si=sNgiImplcH-aSHKL',
    },
    {
        path: 'assets/gabolna hkoma.mp3',
        displayName: 'Gabolna Hkoma',
        cover: 'assets/10.png',
        artist: 'Ziad Zaza',
        link: 'https://youtu.be/TwRJYC04ZDg?si=r-K2U_x-oUbwuFil',
    }
];
let musicIndex = 0;
let isPlaying = false;
let isMute = false;


function displaySongNames() {
    const songListContainer = document.getElementById("playlist");

    // Clear any existing content
    songListContainer.innerHTML = "";

    // Loop through the songs array and create HTML elements for each song
    songs.forEach(song => {
        // Create container for each song
        const songContainer = document.createElement("div");
        songContainer.classList.add("song");

        // Create elements for display name and artist
        const displayNameElement = document.createElement("p");
        displayNameElement.textContent = song.displayName;
        displayNameElement.classList.add("song-name");

        const artistElement = document.createElement("p");
        artistElement.textContent = song.artist;
        artistElement.classList.add("artist-name");

        // Append elements to the song container
        songContainer.appendChild(displayNameElement);
        songContainer.appendChild(artistElement);

        // Append song container to the song list container
        songListContainer.appendChild(songContainer);
    });
}

function toggleToPlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1;
}

function shuffleMusic() {

    loadMusic(songs[getRandomNumber()]);
    playMusic();
}

function repeatMusic() {

    if (!isRepaet) {
        // Toggle to all songs loop mode
        repeatm.classList.remove('fa-repeat');
        repeatm.classList.add('fa-rotate-right');
        repeatm.setAttribute('title', 'Repeat Once');
    } else {
        // Toggle to single song repeat mode
        repeatm.classList.remove('fa-rotate-right');
        repeatm.classList.add('fa-repeat');
        repeatm.setAttribute('title', 'Loop Mode');
    }
    isRepaet = !isRepaet;
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration/60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime/60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

function muteAudio() {
    if (!isMute) {
        music.volume = 0; // Set volume to 0 (mute)
        mutem.classList.remove('fa-volume-xmark');
        mutem.classList.add('fa-volume-high');
        mutem.setAttribute('title', 'Volume Max');
    } else {
        music.volume = 1;
        mutem.classList.remove('fa-volume-high');
        mutem.classList.add('fa-volume-xmark');
        mutem.setAttribute('title', 'Mute');
    }
    isMute = !isMute;
}

function setMusicBar(f) {
    const rect = volumeProgress.getBoundingClientRect();
    const maxVolume = 1; // Max volume is 1 (100%)
    let volume = (e.clientX - rect.left) / rect.width;
    volume = Math.max(0, Math.min(volume, maxVolume));
    music.volume = volume;
    volumeIndicator.style.width = (volume * 100) + '%';
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowRight') {
        // Go to the next song
        changeMusic(1);
    } else if (event.code === 'ArrowLeft') {
        // Go to the previous song
        changeMusic(-1);
    } else if (event.code === 'Space') {
        // Toggle play/pause
        if (music.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    } else if (event.code === 'ArrowUp') {
        // Increase volume (volume ranges from 0 to 1)
        if (music.volume < 1) {
            music.volume += 0.1; // Increase volume by 0.1 (10%)
        }
    } else if (event.code === 'ArrowDown') {
        // Decrease volume (volume ranges from 0 to 1)
        if (music.volume > 0) {
            music.volume -= 0.1; // Decrease volume by 0.1 (10%)
        }
    }
});

music.addEventListener('ended', function() {
    if (!isRepaet) {
        changeMusic(1);
    } else {
        loadMusic(songs[musicIndex]);
        playMusic();
    }
});

function droplist() {
    if (!isBack) {
        hideElements();
    } else {
        showElements();
    }
    isBack = !isBack;
}

function hideElements() {
    mutem.classList.add('hidden');
    playBtn.classList.add('hidden');
    prevBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
    shufflem.classList.add('hidden');
    repeatm.classList.add('hidden');
    playerProgress.classList.add('hidden');
    image.classList.add('hidden');
    title.classList.add('hidden');
    Sharem.classList.add('hidden');
    artist.classList.add('hidden');
    const playerImg = document.querySelector('.player-img');
    if (playerImg) {
        playerImg.classList.add('hidden');
    }
}

function showElements() {
    mutem.classList.remove('hidden');
    playBtn.classList.remove('hidden');
    prevBtn.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    shufflem.classList.remove('hidden');
    repeatm.classList.remove('hidden');
    playerProgress.classList.remove('hidden');
    image.classList.remove('hidden');
    title.classList.remove('hidden');
    Sharem.classList.remove('hidden');
    listt.classList.remove('hidden');
    artist.classList.remove('hidden');
    const playerImg = document.querySelector('.player-img');
    if (playerImg) {
        playerImg.classList.remove('hidden');
    }
}
const keyframes = [
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(360deg)' }
];

// Set up the animation options
const options = {
    duration: 2500,
    iterations: Infinity
};

// Apply the animation using Element.animate()
image.animate(keyframes, options);

loadMusic(songs[musicIndex]);

Backarrow.addEventListener('click', droplist);
playBtn.addEventListener('click', toggleToPlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
shufflem.addEventListener('click', shuffleMusic);
repeatm.addEventListener('click', repeatMusic);
playerProgress.addEventListener('click', setProgressBar);


mutem.addEventListener('click', muteAudio);
listt.addEventListener('click', switchPage);


document.addEventListener("DOMContentLoaded", function() {
    displaySongNames();
});