var video = document.getElementById("video");
var boton = document.getElementById("boton");
function playPausar() {
  if (video.paused) {
    video.play();
    boton.innerHTML = "Pause";
  } else {
    video.pause();
    boton.innerHTML = "Play";
  }
}