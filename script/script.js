//Menu

const menuButton = document.getElementById("menu-button");
const menu = document.querySelector(".header__menu");
const menuLinks = document.querySelectorAll(".menu__link");
const header = document.querySelector(".header");

menuButton.addEventListener("click", () => {
  menu.classList.toggle("active");
  menuButton.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

menuLinks.forEach((li) => {
  li.addEventListener("click", () => {
    menu.classList.remove("active");
    menuButton.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

//==================================================================

//Animation

const animationElements = document.querySelectorAll(".animation");
const animationElementSeconds = document.querySelectorAll(".animationElement");
const animationImages = document.querySelectorAll(".animation-image");

const animation = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        animation.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

animationElements.forEach((animationElement) => {
  animation.observe(animationElement);
});

animationImages.forEach((animationImage) => {
  animation.observe(animationImage);
});

//========================================================

//Music

const music = new Audio("./audio/Music.mp3");
const play = document.querySelector(".play");
const badge = document.querySelector(".badge");
const line = document.querySelector(".line");
const slider = document.querySelector(".slider");
const sliderHandle = document.querySelector(".slider-handle");
const counter = document.querySelector(".counter");

//====================================

const musics = [
  new Audio("./audio/Music01.mp3"),
  new Audio("./audio/Music02.mp3"),
  new Audio("./audio/Music03.mp3"),
  new Audio("./audio/Music04.mp3"),
  new Audio("./audio/Music05.mp3"),
  new Audio("./audio/Music06.mp3"),
];

const musicItems = document.querySelectorAll(".tracks__item");
const vibrationEffect = document.querySelector(".vibration-effect");

const musicTwo = document.querySelector(".music-two");
const moveLineTwo = document.querySelector(".move-line-two");
const playTwo = document.querySelector(".play-two");
const badgeTwo = document.querySelector(".badge-two");
const lineTwo = document.querySelector(".line-two");
const sliderTwo = document.querySelector(".slider-two");
const sliderHandleTwo = document.querySelector(".slider-handle-two");
const counterTwo = document.querySelector(".counter-two");

//=====================================

let isPlaying = false;
let isPlayingTwo = false;
let progressInterval = null;
let progressIntervalTwo = null;
let currentMusicIndex = -1;

musicItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    const currentAudio = musics[index];

    if (item.classList.contains("active")) {
      if (!currentAudio.paused) {
        currentAudio.pause();

        item.classList.remove("active");
        if (vibrationEffect) vibrationEffect.classList.remove("active");
      } else {
        currentAudio
          .play()
          .then(() => {
            item.classList.add("active");
            if (vibrationEffect) vibrationEffect.classList.add("active");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } else {
      musics.forEach((audio, i) => {
        if (i !== index) {
          audio.pause();
          audio.currentTime = 0;
        }
      });

      musicItems.forEach((el) => el.classList.remove("active"));
      if (vibrationEffect) vibrationEffect.classList.remove("active");

      currentAudio
        .play()
        .then(() => {
          item.classList.add("active");
          if (vibrationEffect) vibrationEffect.classList.add("active");
        })
        .catch((error) => {
          if (error.name === "NotAllowedError") {
            item.classList.add("needs-user-interaction");
            item.addEventListener(
              "click",
              function handler() {
                if (item.classList.contains("needs-user-interaction")) {
                  currentAudio
                    .play()
                    .then(() => {
                      item.classList.remove("needs-user-interaction");
                      item.classList.add("active");
                      if (vibrationEffect)
                        vibrationEffect.classList.add("active");
                    })
                    .catch((e) => console.error("Error:", e));
                }
              },
              { once: true }
            );
          }
        });
    }
  });
});

musics.forEach((audio, index) => {
  audio.addEventListener("ended", () => {
    musicItems[index].classList.remove("active");
    if (vibrationEffect) vibrationEffect.classList.remove("active");
  });
});

//=================================================

function stopAllMusics(exceptIndex = -1) {
  musics.forEach((music, index) => {
    if (index !== exceptIndex) {
      music.pause();
      music.currentTime = 0;
    }
  });
  musicItems.forEach((el) => el.classList.remove("active"));
}

//====================================

music.addEventListener("loadedmetadata", () => {
  updateCounter(counter, music);
});

musics.forEach((music, index) => {
  music.addEventListener("loadedmetadata", () => {
    if (index === currentMusicIndex) {
      updateCounter(counterTwo, music);
    }
  });
});

//====================================

function updateProgress(
  audio,
  counterElement,
  lineElement,
  sliderElement,
  sliderHandleElement
) {
  if (audio && audio.duration && !isNaN(audio.duration)) {
    const progress = (audio.currentTime / audio.duration) * 100;

    if (sliderElement) {
      sliderElement.style.width = `${progress}%`;
    }

    if (lineElement && sliderHandleElement) {
      updateSliderHandlePosition(progress, lineElement, sliderHandleElement);
    }

    if (counterElement) {
      updateCounter(counterElement, audio);
    }
  }
}

function updateMainProgress() {
  if (!music.paused && music.duration && !isNaN(music.duration)) {
    const progress = (music.currentTime / music.duration) * 100;
    slider.style.width = `${progress}%`;
    updateSliderHandlePosition(progress, line, sliderHandle);
    updateCounter(counter, music);
  }
}

function updateSecondProgress() {
  if (currentMusicIndex !== -1) {
    const currentAudio = musics[currentMusicIndex];
    if (
      !currentAudio.paused &&
      currentAudio.duration &&
      !isNaN(currentAudio.duration)
    ) {
      const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
      sliderTwo.style.width = `${progress}%`;
      updateSliderHandlePosition(progress, lineTwo, sliderHandleTwo);
      updateCounter(counterTwo, currentAudio);
    }
  }
}

//====================================

function updateCounter(count, music) {
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === Infinity) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentTime = music.currentTime || 0;
  const duration = music.duration || 0;

  if (count) {
    count.textContent = `${formatTime(currentTime)}-${formatTime(duration)}`;
  }
}

//=========================================

window.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

  if (e.key === "ArrowRight") {
    e.preventDefault();
    if (!music.paused && music.duration) {
      music.currentTime = Math.min(music.currentTime + 5, music.duration);
      updateMainProgress();
    }

    if (currentMusicIndex !== -1 && !musics[currentMusicIndex].paused) {
      const currentAudio = musics[currentMusicIndex];
      if (currentAudio.duration) {
        currentAudio.currentTime = Math.min(
          currentAudio.currentTime + 5,
          currentAudio.duration
        );
        updateSecondProgress();
      }
    }
  }

  if (e.key === "ArrowLeft") {
    e.preventDefault();
    if (!music.paused && music.duration) {
      music.currentTime = Math.max(music.currentTime - 5, 0);
      updateMainProgress();
    }

    if (currentMusicIndex !== -1 && !musics[currentMusicIndex].paused) {
      const currentAudio = musics[currentMusicIndex];
      if (currentAudio.duration) {
        currentAudio.currentTime = Math.max(currentAudio.currentTime - 5, 0);
        updateSecondProgress();
      }
    }
  }

  if (e.key === " ") {
    e.preventDefault();
    const focusedElement = document.activeElement;
    if (
      !focusedElement ||
      (focusedElement.tagName !== "INPUT" &&
        focusedElement.tagName !== "TEXTAREA")
    ) {
      if (!music.paused) {
        playMusic(music, play, line);
      } else if (
        currentMusicIndex !== -1 &&
        !musics[currentMusicIndex].paused
      ) {
        const currentAudio = musics[currentMusicIndex];
        playSecondMusic(currentAudio, playTwo, lineTwo);
      } else {
        if (currentMusicIndex !== -1) {
          musics[currentMusicIndex].pause();
          musicItems[currentMusicIndex].classList.remove("active");
          playTwo.classList.remove("active");
          isPlayingTwo = false;
          currentMusicIndex = -1;

          if (progressIntervalTwo) {
            clearInterval(progressIntervalTwo);
            progressIntervalTwo = null;
          }
        }
        playMusic(music, play, line);
      }
    }
  }
});

//=========================================

function playMusic(musicElement, playButton, lineElement) {
  if (currentMusicIndex !== -1 && !musics[currentMusicIndex].paused) {
    musics[currentMusicIndex].pause();
    musicItems[currentMusicIndex].classList.remove("active");
    playTwo.classList.remove("active");
    isPlayingTwo = false;
    currentMusicIndex = -1;

    if (progressIntervalTwo) {
      clearInterval(progressIntervalTwo);
      progressIntervalTwo = null;
    }
  }

  if (musicElement.paused) {
    playButton.classList.add("active");
    musicElement.play();
    isPlaying = true;
    lineElement.style.cursor = "pointer";

    if (progressInterval) {
      clearInterval(progressInterval);
    }
    progressInterval = setInterval(() => updateMainProgress(), 1000);
  } else {
    playButton.classList.remove("active");
    musicElement.pause();
    isPlaying = false;
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  }
}

function playSecondMusic(musicElement, playButton, lineElement) {
  if (musicElement.paused) {
    playButton.classList.add("active");
    musicElement.play();
    isPlayingTwo = true;
    lineElement.style.cursor = "pointer";

    if (progressIntervalTwo) {
      clearInterval(progressIntervalTwo);
    }
    progressIntervalTwo = setInterval(() => updateSecondProgress(), 1000);
  } else {
    playButton.classList.remove("active");
    musicElement.pause();
    isPlayingTwo = false;
    if (progressIntervalTwo) {
      clearInterval(progressIntervalTwo);
      progressIntervalTwo = null;
    }
  }
}

//==========================================

function updateSliderHandlePosition(
  progress,
  lineElement,
  sliderHandleElement
) {
  const lineWidth = lineElement.offsetWidth;
  const handlePosition = (progress / 100) * lineWidth;

  sliderHandleElement.style.left = `${handlePosition}px`;
}

line.addEventListener("click", (e) => {
  if (!music.duration) return;

  const rect = line.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percentage = Math.max(0, Math.min(clickX / rect.width, 1));

  music.currentTime = percentage * music.duration;
  updateMainProgress();
});

lineTwo.addEventListener("click", (e) => {
  if (currentMusicIndex === -1) return;

  const currentAudio = musics[currentMusicIndex];
  if (!currentAudio.duration) return;

  const rect = lineTwo.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percentage = Math.max(0, Math.min(clickX / rect.width, 1));

  currentAudio.currentTime = percentage * currentAudio.duration;
  updateSecondProgress();
});

function sliderFunction(
  sliderHandleElement,
  musicElement,
  lineElement,
  isMainPlayer = true
) {
  sliderHandleElement.addEventListener("mousedown", (e) => {
    e.preventDefault();

    function mouseMoveHandler(e) {
      const rect = lineElement.getBoundingClientRect();
      let clickX = e.clientX - rect.left;
      clickX = Math.max(0, Math.min(clickX, rect.width));
      const percentage = clickX / rect.width;

      musicElement.currentTime = percentage * musicElement.duration;

      if (isMainPlayer) {
        updateMainProgress();
      } else {
        updateSecondProgress();
      }
    }

    function mouseUpHandler() {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    }

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  });
}

sliderFunction(sliderHandle, music, line, true);

musics.forEach((musicElement, index) => {
  sliderFunction(sliderHandleTwo, musicElement, lineTwo, false);
});

play.addEventListener("click", () => {
  playMusic(music, play, line);
});

playTwo.addEventListener("click", () => {
  if (currentMusicIndex === -1) {
    musicItems[0].click();
  } else {
    const currentAudio = musics[currentMusicIndex];
    playSecondMusic(currentAudio, playTwo, lineTwo);
  }
});

//===================================================
//===================================================

music.addEventListener("ended", () => {
  play.classList.remove("active");
  isPlaying = false;
  music.currentTime = 0;
  updateMainProgress();

  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
});

musics.forEach((musicElement, index) => {
  musicElement.addEventListener("ended", () => {
    if (index === currentMusicIndex) {
      playTwo.classList.remove("active");
      isPlayingTwo = false;
      musicElement.currentTime = 0;
      musicItems[index].classList.remove("active");
      currentMusicIndex = -1;
      updateSecondProgress();

      if (progressIntervalTwo) {
        clearInterval(progressIntervalTwo);
        progressIntervalTwo = null;
      }
    }
  });
});

music.addEventListener("error", (e) => {
  console.log("Main audio error:", e);
  if (counter) counter.textContent = "Error";
});

musics.forEach((musicElement) => {
  musicElement.addEventListener("error", (e) => {
    console.log("Music array audio error:", e);
    if (counterTwo) counterTwo.textContent = "Error";
  });
});

//======================================

window.addEventListener("DOMContentLoaded", () => {
  const moveLine = document.querySelector(".move-line");
  const musicContainer = document.querySelector(".music");

  function moveLineElement() {
    if (window.innerWidth < 500) {
      if (moveLine && line) moveLine.appendChild(line);
    } else {
      if (musicContainer && line) musicContainer.appendChild(line);
    }
  }

  moveLineElement();

  window.addEventListener("resize", moveLineElement);
});

//========================================

musicItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    const currentAudio = musics[index];

    if (item.classList.contains("active")) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      item.classList.remove("active");
      playTwo.classList.remove("active");
      isPlayingTwo = false;
      currentMusicIndex = -1;

      if (progressIntervalTwo) {
        clearInterval(progressIntervalTwo);
        progressIntervalTwo = null;
      }
    } else {
      if (!music.paused) {
        music.pause();
        play.classList.remove("active");
        isPlaying = false;
        if (progressInterval) {
          clearInterval(progressInterval);
          progressInterval = null;
        }
      }

      stopAllMusics(index);

      currentAudio.currentTime = 0;
      currentAudio.play();
      currentMusicIndex = index;

      playTwo.classList.add("active");
      isPlayingTwo = true;

      if (progressIntervalTwo) {
        clearInterval(progressIntervalTwo);
      }
      progressIntervalTwo = setInterval(() => {
        updateSecondProgress();
      }, 1000);

      item.classList.add("active");

      updateCounter(counterTwo, currentAudio);
    }
  });
});

window.addEventListener("load", () => {
  updateCounter(counter, music);
  if (counterTwo) counterTwo.textContent = "00:00-00:00";
});
