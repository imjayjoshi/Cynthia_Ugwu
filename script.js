const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

var timeout;

function FirstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1.5,
      stagger: 0.2,
    })
    .from("#homefooter", {
      y: -10,
      ease: Expo.easeInOut,
      duration: 1.5,
      stagger: 0.2,
      delay: -1,
      opacity: 0,
    });
}

function CircleOblate() {
  // Define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    CircleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

function CircleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
  });
}

function ImageScroll() {
  document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function () {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });

    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  });
}

function DateTime() {
  let now = new Date();

  let yr = now.getFullYear();
  let hrs = now.getHours();
  let min = now.getMinutes();
  let ampm = hrs >= 12 ? 'PM' : 'AM';

  hrs = hrs % 12;
  hrs = hrs ? hrs : 12;
  min = min < 10 ? '0' + min : min;

  document.querySelector('#hr').textContent = hrs;
  document.querySelector('#min').textContent = min;
  document.querySelector('#dur').textContent = ampm;
  document.querySelector("#year").textContent = yr;
}

CircleOblate();
FirstPageAnim();
CircleMouseFollower();
ImageScroll();
DateTime();