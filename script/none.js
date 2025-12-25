//Music

// const music = new Audio("./audio/Music.mp3");
// const play = document.querySelector(".play");
// const badge = document.querySelector(".badge");
// const line = document.querySelector(".line");
// const slider = document.querySelector(".slider");
// const sliderHandle = document.querySelector(".slider-handle");
// const counter = document.querySelector(".counter");

// let isPlaying = false;
// let progressInterval = null;

// music.addEventListener("loadedmetadata", () => {
//   updateCounter();
// });

// window.addEventListener("keydown", (e) => {
//   if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

//   if (e.key === "ArrowRight") {
//     e.preventDefault();
//     if (music.duration) {
//       music.currentTime = Math.min(music.currentTime + 5, music.duration);
//       updateProgress();
//     }
//   }

//   if (e.key === "ArrowLeft") {
//     e.preventDefault();
//     if (music.duration) {
//       music.currentTime = Math.max(music.currentTime - 5, 0);
//       updateProgress();
//     }
//   }

//   if (e.key === " ") {
//     e.preventDefault();
//     playMusic();
//   }
// });

// function playMusic() {
//   if (!isPlaying) {
//     play.classList.add("active");
//     music.play();
//     isPlaying = true;
//     line.style.cursor = "pointer";
//     progressInterval = setInterval(updateProgress, 1000);
//   } else {
//     play.classList.remove("active");
//     music.pause();
//     isPlaying = false;
//     if (progressInterval) {
//       clearInterval(progressInterval);
//     }
//   }
// }

// function updateProgress() {
//   if (music.duration) {
//     const progress = (music.currentTime / music.duration) * 100;
//     slider.style.width = `${progress}%`;

//     updateSliderHandlePosition(progress);
//     updateCounter();
//   }
// }

// function updateSliderHandlePosition(progress) {
//   const lineWidth = line.offsetWidth;
//   const handlePosition = (progress / 100) * lineWidth;

//   sliderHandle.style.left = `${handlePosition}px`;
// }

// function updateCounter() {
//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const currentTime = music.currentTime || 0;
//   const duration = music.duration || 0;

//   counter.textContent = `${formatTime(currentTime)}-${formatTime(duration)}`;
// }

// line.addEventListener("click", (e) => {
//   if (!music.duration) return;

//   const rect = line.getBoundingClientRect();
//   const clickX = e.clientX - rect.left;
//   const percentage = clickX / rect.width;

//   music.currentTime = percentage * music.duration;
//   updateProgress();
// });

// sliderHandle.addEventListener("mousedown", (e) => {
//   e.preventDefault();

//   function mouseMoveHandler(e) {
//     const rect = line.getBoundingClientRect();
//     let clickX = e.clientX - rect.left;
//     clickX = Math.max(0, Math.min(clickX, rect.width));
//     const percentage = clickX / rect.width;

//     music.currentTime = percentage * music.duration;
//     updateProgress();
//   }

//   function mouseUpHandler() {
//     document.removeEventListener("mousemove", mouseMoveHandler);
//     document.removeEventListener("mouseup", mouseUpHandler);
//   }

//   document.addEventListener("mousemove", mouseMoveHandler);
//   document.addEventListener("mouseup", mouseUpHandler);
// });

// play.addEventListener("click", () => {
//   playMusic();
// });

// music.addEventListener("ended", () => {
//   play.classList.remove("active");
//   isPlaying = false;
//   music.currentTime = 0;
//   updateProgress();

//   if (progressInterval) {
//     clearInterval(progressInterval);
//   }
// });

// music.addEventListener("error", () => {
//   console.log("Error");
//   counter.textContent = "Error";
// });

// window.addEventListener("DOMContentLoaded", () => {
//   const moveLine = document.querySelector(".move-line");
//   const musicContainer = document.querySelector(".music");

//   function moveLineElement() {
//     if (window.innerWidth < 500) {
//       moveLine.appendChild(line);
//     } else {
//       musicContainer.appendChild(line);
//     }
//   }

//   moveLineElement();

//   window.addEventListener("resize", moveLineElement);
// });

// //===========================================================

// //Music

// const musics = [
//   new Audio("./audio/Music01.mp3"),
//   new Audio("./audio/Music02.mp3"),
//   new Audio("./audio/Music03.mp3"),
//   new Audio("./audio/Music04.mp3"),
//   new Audio("./audio/Music05.mp3"),
//   new Audio("./audio/Music06.mp3"),
// ];

// const musicItems = document.querySelectorAll(".tracks__item");

// const musicTwo = document.querySelector(".music-two");
// const moveLineTwo = document.querySelector(".move-line-two");
// const playTwo = document.querySelector(".play-two");
// const badgeTwo = document.querySelector(".badge-two");
// const lineTwo = document.querySelector(".line-two");
// const sliderTwo = document.querySelector(".slider-two");
// const sliderHandleTwo = document.querySelector(".slider-handle-two");
// const counterTwo = document.querySelector(".counter-two");

// musics.forEach((item) => {
//   item.addEventListener("loadeddata", () => {});
// });

// musicItems.forEach((item, index) => {
//   item.addEventListener("click", () => {
//     const currentAudio = musics[index];

//     if (item.classList.contains("active")) {
//       currentAudio.pause();
//       currentAudio.currentTime = 0;
//       item.classList.remove("active");
//     } else {
//       musics.forEach((audio) => {
//         audio.pause();
//         audio.currentTime = 0;
//       });

//       musicItems.forEach((el) => el.classList.remove("active"));

//       currentAudio.play();
//       item.classList.add("active");
//     }
//   });
// });

//=============================================================================

// window.addEventListener("keydown", (e) => {
//   if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

//   if (e.key === "ArrowRight") {
//     e.preventDefault();
//     if (!music.paused && music.duration) {
//       music.currentTime = Math.min(music.currentTime + 5, music.duration);
//       updateMainProgress();
//     }

//     if (currentMusicIndex !== -1 && !musics[currentMusicIndex].paused) {
//       const currentAudio = musics[currentMusicIndex];
//       if (currentAudio.duration) {
//         currentAudio.currentTime = Math.min(
//           currentAudio.currentTime + 5,
//           currentAudio.duration
//         );
//         updateSecondProgress();
//       }
//     }
//   }

//   if (e.key === "ArrowLeft") {
//     e.preventDefault();
//     if (!music.paused && music.duration) {
//       music.currentTime = Math.max(music.currentTime - 5, 0);
//       updateMainProgress();
//     }

//     if (currentMusicIndex !== -1 && !musics[currentMusicIndex].paused) {
//       const currentAudio = musics[currentMusicIndex];
//       if (currentAudio.duration) {
//         currentAudio.currentTime = Math.max(currentAudio.currentTime - 5, 0);
//         updateSecondProgress();
//       }
//     }
//   }

//   if (e.key === " ") {
//     e.preventDefault();
//     const focusedElement = document.activeElement;
//     if (
//       !focusedElement ||
//       (focusedElement.tagName !== "INPUT" &&
//         focusedElement.tagName !== "TEXTAREA")
//     ) {
//       if (!music.paused) {
//         playMusic(music, play, line);
//       } else if (
//         currentMusicIndex !== -1 &&
//         !musics[currentMusicIndex].paused
//       ) {
//         const currentAudio = musics[currentMusicIndex];
//         playSecondMusic(currentAudio, playTwo, lineTwo);
//       } else {
//         playMusic(music, play, line);
//       }
//     }
//   }
// });

// function playMusic(musicElement, playButton, lineElement) {
//   if (musicElement.paused) {
//     playButton.classList.add("active");
//     musicElement.play();
//     isPlaying = true;
//     lineElement.style.cursor = "pointer";

//     if (progressInterval) {
//       clearInterval(progressInterval);
//     }
//     progressInterval = setInterval(() => updateMainProgress(), 1000);
//   } else {
//     playButton.classList.remove("active");
//     musicElement.pause();
//     isPlaying = false;
//     if (progressInterval) {
//       clearInterval(progressInterval);
//       progressInterval = null;
//     }
//   }
// }

// musicItems.forEach((item, index) => {
//   item.addEventListener("click", () => {
//     const currentAudio = musics[index];

//     if (item.classList.contains("active")) {
//       currentAudio.pause();
//       currentAudio.currentTime = 0;
//       item.classList.remove("active");
//       playTwo.classList.remove("active");
//       isPlayingTwo = false;
//       currentMusicIndex = -1;

//       if (progressIntervalTwo) {
//         clearInterval(progressIntervalTwo);
//         progressIntervalTwo = null;
//       }
//     } else {
//       stopAllMusics(index);

//       currentAudio.currentTime = 0;
//       currentAudio.play();
//       currentMusicIndex = index;

//       playTwo.classList.add("active");
//       isPlayingTwo = true;

//       if (progressIntervalTwo) {
//         clearInterval(progressIntervalTwo);
//       }
//       progressIntervalTwo = setInterval(() => {
//         updateSecondProgress();
//       }, 1000);

//       item.classList.add("active");

//       updateCounter(counterTwo, currentAudio);
//     }
//   });
// });

//===================================================

// musicItems.forEach((item, index) => {
//   item.addEventListener("click", () => {
//     const currentAudio = musics[index];

//     if (item.classList.contains("active")) {
//       currentAudio.pause();
//       currentAudio.currentTime = 0;
//       item.classList.remove("active");
//       vibrationEffect.classList.remove("active");
//     } else {
//       musics.forEach((audio) => {
//         audio.pause();
//         audio.currentTime = 0;
//       });

//       musicItems.forEach((el) => el.classList.remove("active"));
//       vibrationEffect.classList.remove("active");

//       currentAudio.play();
//       item.classList.add("active");
//       vibrationEffect.classList.add("active");
//     }
//   });
// });

// musics.forEach((audio) => {
//   audio.addEventListener("ended", () => {
//     musicItems.forEach((el) => el.classList.remove("active"));
//     vibrationEffect.classList.remove("active");
//   });
// });

// musics.forEach((audio) => {
//   audio.addEventListener("pause", () => {
//     vibrationEffect.classList.remove("active");
//   });
// });

//==============================================================

// musicItems.forEach((item, index) => {
//   item.addEventListener("click", () => {
//     const currentAudio = musics[index];

//     if (item.classList.contains("active")) {
//       if (!currentAudio.paused) {
//         currentAudio.pause();
//         if (vibrationEffect) vibrationEffect.classList.remove("active");
//       }
//       // currentAudio.pause();
//       // currentAudio.currentTime = 0;
//       // item.classList.remove("active");
//     } else {
//       musics.forEach((audio) => {
//         audio.pause();
//         audio.currentTime = 0;
//       });

//       musicItems.forEach((el) => el.classList.remove("active"));
//       if (vibrationEffect) vibrationEffect.classList.remove("active");

//       currentAudio
//         .play()
//         .then(() => {
//           item.classList.add("active");
//           if (vibrationEffect) vibrationEffect.classList.add("active");
//         })
//         .catch((error) => {
//           if (error.name === "NotAllowedError") {
//             item.classList.add("needs-user-interaction");
//             item.addEventListener(
//               "click",
//               function handler() {
//                 if (item.classList.contains("needs-user-interaction")) {
//                   currentAudio
//                     .play()
//                     .then(() => {
//                       item.classList.remove("needs-user-interaction");
//                       item.classList.add("active");
//                       if (vibrationEffect)
//                         vibrationEffect.classList.add("active");
//                     })
//                     .catch((e) => console.error("Error:", e));
//                 }
//               },
//               { once: true }
//             );
//           }
//         });
//     }
//   });
// });

// musics.forEach((audio) => {
//   audio.addEventListener("ended", () => {
//     musicItems.forEach((el) => el.classList.remove("active"));
//     if (vibrationEffect) vibrationEffect.classList.remove("active");
//   });

//   audio.addEventListener("pause", () => {
//     if (vibrationEffect) vibrationEffect.classList.remove("active");
//   });
// });

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
