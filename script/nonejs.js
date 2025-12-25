class AudioPlayer {
  constructor(config) {
    this.audio = config.audio;
    this.isArray = Array.isArray(config.audio);
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.progressInterval = null;

    this.elements = {
      play: config.elements.play,
      badge: config.elements.badge,
      line: config.elements.line,
      slider: config.elements.slider,
      sliderHandle: config.elements.sliderHandle,
      counter: config.elements.counter,
    };
  }
}

class AudioPlayer {
  constructor(config) {
    this.audio = config.audio; // Може бути Audio об'єкт або масив
    this.isArray = Array.isArray(config.audio);
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.progressInterval = null;

    // DOM елементи
    this.elements = {
      play: config.elements.play,
      badge: config.elements.badge,
      line: config.elements.line,
      slider: config.elements.slider,
      sliderHandle: config.elements.sliderHandle,
      counter: config.elements.counter,
    };

    // Ініціалізація
    this.init();
  }

  getCurrentAudio() {
    return this.isArray ? this.audio[this.currentTrackIndex] : this.audio;
  }

  init() {
    const audio = this.getCurrentAudio();

    // Завантаження метаданих
    audio.addEventListener("loadedmetadata", () => {
      this.updateCounter();
    });

    // Кінець треку
    audio.addEventListener("ended", () => {
      this.handleTrackEnd();
    });

    // Помилка
    audio.addEventListener("error", () => {
      console.error("Помилка завантаження аудіо");
      this.elements.counter.textContent = "Error";
    });

    // Клік по кнопці play/pause
    this.elements.play.addEventListener("click", () => {
      this.togglePlay();
    });

    // Клік по лінії прогресу
    this.elements.line.addEventListener("click", (e) => {
      this.handleLineClick(e);
    });

    // Drag слайдера
    this.elements.sliderHandle.addEventListener("mousedown", (e) => {
      this.handleSliderDragStart(e);
    });
  }

  togglePlay() {
    const audio = this.getCurrentAudio();

    if (!this.isPlaying) {
      audio.play();
      this.isPlaying = true;
      this.elements.play.classList.add("active");
      this.startProgressUpdate();
    } else {
      audio.pause();
      this.isPlaying = false;
      this.elements.play.classList.remove("active");
      this.stopProgressUpdate();
    }
  }

  playTrack(index) {
    if (this.isArray && index >= 0 && index < this.audio.length) {
      // Пауза поточного треку
      if (this.isPlaying) {
        this.getCurrentAudio().pause();
        this.stopProgressUpdate();
      }

      // Зміна треку
      this.currentTrackIndex = index;
      const newAudio = this.getCurrentAudio();

      // Скидання прогресу
      newAudio.currentTime = 0;
      this.updateProgress();

      // Запуск нового треку
      if (this.isPlaying) {
        newAudio.play();
        this.startProgressUpdate();
      }
    }
  }

  startProgressUpdate() {
    this.stopProgressUpdate(); // На випадок якщо вже запущений
    this.progressInterval = setInterval(() => {
      this.updateProgress();
    }, 100);
  }

  stopProgressUpdate() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  updateProgress() {
    const audio = this.getCurrentAudio();

    if (audio.duration) {
      const progress = (audio.currentTime / audio.duration) * 100;

      // Оновлення візуальних елементів
      this.elements.slider.style.width = `${progress}%`;
      this.updateSliderHandlePosition(progress);
      this.updateCounter();
    }
  }

  updateSliderHandlePosition(progress) {
    const lineWidth = this.elements.line.offsetWidth;
    const handlePosition = (progress / 100) * lineWidth;
    this.elements.sliderHandle.style.left = `${handlePosition}px`;
  }

  updateCounter() {
    const audio = this.getCurrentAudio();
    const formatTime = (seconds) => {
      if (isNaN(seconds)) return "00:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    };

    const currentTime = audio.currentTime || 0;
    const duration = audio.duration || 0;

    this.elements.counter.textContent = `${formatTime(
      currentTime
    )}-${formatTime(duration)}`;
  }

  handleLineClick(e) {
    const audio = this.getCurrentAudio();
    if (!audio.duration) return;

    const rect = this.elements.line.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(clickX / rect.width, 1));

    audio.currentTime = percentage * audio.duration;
    this.updateProgress();
  }

  handleSliderDragStart(e) {
    e.preventDefault();
    const audio = this.getCurrentAudio();

    const mouseMoveHandler = (e) => {
      const rect = this.elements.line.getBoundingClientRect();
      let clickX = e.clientX - rect.left;
      clickX = Math.max(0, Math.min(clickX, rect.width));
      const percentage = clickX / rect.width;

      audio.currentTime = percentage * audio.duration;
      this.updateProgress();
    };

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  }

  handleTrackEnd() {
    this.isPlaying = false;
    this.elements.play.classList.remove("active");

    if (this.isArray) {
      // Автоматичний перехід до наступного треку
      const nextIndex = (this.currentTrackIndex + 1) % this.audio.length;
      this.playTrack(nextIndex);
    } else {
      // Скидання до початку для одиночного треку
      this.getCurrentAudio().currentTime = 0;
      this.updateProgress();
    }

    this.stopProgressUpdate();
  }

  seek(seconds) {
    const audio = this.getCurrentAudio();
    if (audio.duration) {
      audio.currentTime = Math.max(
        0,
        Math.min(audio.currentTime + seconds, audio.duration)
      );
      this.updateProgress();
    }
  }
}

// Ініціалізація плеєрів
const player1 = new AudioPlayer({
  audio: new Audio("./audio/Music.mp3"),
  elements: {
    play: document.querySelector(".play"),
    badge: document.querySelector(".badge"),
    line: document.querySelector(".line"),
    slider: document.querySelector(".slider"),
    sliderHandle: document.querySelector(".slider-handle"),
    counter: document.querySelector(".counter"),
  },
});

const player2 = new AudioPlayer({
  audio: [
    new Audio("./audio/Music01.mp3"),
    new Audio("./audio/Music02.mp3"),
    new Audio("./audio/Music03.mp3"),
    new Audio("./audio/Music04.mp3"),
    new Audio("./audio/Music05.mp3"),
    new Audio("./audio/Music06.mp3"),
  ],
  elements: {
    play: document.querySelector(".play-two"),
    badge: document.querySelector(".badge-two"),
    line: document.querySelector(".line-two"),
    slider: document.querySelector(".slider-two"),
    sliderHandle: document.querySelector(".slider-handle-two"),
    counter: document.querySelector(".counter-two"),
  },
});

// Обробка кліків по списку треків для другого плеєра
const musicItems = document.querySelectorAll(".tracks__item");
musicItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Зняти активний клас з усіх елементів
    musicItems.forEach((el) => el.classList.remove("active"));

    // Додати активний клас до поточного
    item.classList.add("active");

    // Зупинити програвання якщо трек змінюється
    if (player2.isPlaying) {
      player2.getCurrentAudio().pause();
    }

    // Встановити та запустити новий трек
    player2.playTrack(index);

    // Якщо плеєр був активний, продовжити програвання
    if (player2.isPlaying) {
      player2.getCurrentAudio().play();
    }
  });
});

// Глобальні обробники клавіш
window.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

  // Space для обох плеєрів (зупинка/запуск активного)
  if (e.key === " ") {
    e.preventDefault();

    // Можна додати логіку для визначення активного плеєра
    // Наразі керуємо обома одночасно
    player1.togglePlay();
    player2.togglePlay();
  }

  // Стрілки для перемотки активного плеєра
  if (e.key === "ArrowRight") {
    e.preventDefault();
    player1.seek(5);
    player2.seek(5);
  }

  if (e.key === "ArrowLeft") {
    e.preventDefault();
    player1.seek(-5);
    player2.seek(-5);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const moveLine = document.querySelector(".move-line");
  const musicContainer = document.querySelector(".music");

  function moveLineElement() {
    if (window.innerWidth < 500) {
      if (moveLine && musicContainer && player1.elements.line) {
        moveLine.appendChild(player1.elements.line);
      }
    } else {
      if (musicContainer && player1.elements.line) {
        musicContainer.appendChild(player1.elements.line);
      }
    }
  }

  moveLineElement();
  window.addEventListener("resize", moveLineElement);
});
