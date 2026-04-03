const clouds = [
  { el: document.getElementById("cloud1"), x: -200, speed: 0.2 },
  { el: document.getElementById("cloud2"), x: -300, speed: 0.7 }
];

function animateClouds() {
  clouds.forEach(cloud => {
    cloud.x += cloud.speed;

    const cloudWidth = cloud.el.offsetWidth;

    // restart when the cloud's left edge is past the scene width
    // but make it start from just offscreen left
    if (cloud.x > 1366) { 
      cloud.x = -cloudWidth; 
    }

    cloud.el.style.transform = `translateX(${cloud.x}px)`;
  });

  requestAnimationFrame(animateClouds);
}

animateClouds();

document.addEventListener("DOMContentLoaded", () => {
  const creatures = document.querySelectorAll("#frog, #ladybug, #dragonfly, #butterfly");

  let dragging = null;
  let selected = null;   
  let offsetX = 0;
  let offsetY = 0;

  // Track scale for each creature
  const scales = {};
  creatures.forEach(c => scales[c.id] = 1);

  creatures.forEach(creature => {
    creature.style.position = "absolute";
    creature.style.cursor = "grab";
    creature.style.transformOrigin = "top left"; // important for scaling

    // --- Dragging ---
    creature.addEventListener("mousedown", e => {
      dragging = creature;

      const rect = creature.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      creature.style.cursor = "grabbing";
      creature.style.zIndex = 100;  // bring to front while dragging
      selected = creature;          // select the creature
      highlightSelected(selected);

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    });

    // --- Click to select without dragging ---
    creature.addEventListener("click", e => {
      e.stopPropagation(); // prevent deselect
      selected = creature;
      highlightSelected(selected);
    });
  });

  // --- Deselect on click outside ---
  document.addEventListener("click", () => {
    if (selected) {
      removeHighlight(selected);
      selected = null;
    }
  });

  function onMouseMove(e) {
    if (!dragging) return;
    dragging.style.left = e.clientX - offsetX + "px";
    dragging.style.top = e.clientY - offsetY + "px";
  }

  function onMouseUp() {
    if (!dragging) return;
    dragging.style.cursor = "grab";
    dragging.style.zIndex = 39; 
    dragging = null;

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  // --- Resize with Up / Down arrows ---
  document.addEventListener("keydown", e => {
    if (!selected) return;

    let scale = scales[selected.id];
    if (e.key === "ArrowUp") {
      scale += 0.1;  // increase 10%
    } else if (e.key === "ArrowDown") {
      scale = Math.max(0.1, scale - 0.1); // minimum 10%
    } else {
      return;
    }

    scales[selected.id] = scale;
    selected.style.transform = `scale(${scale})`;
  });

  // --- Helper functions ---
  function highlightSelected(creature) {
    creatures.forEach(c => c.style.outline = ""); 
    creature.style.outline = "2px dashed yellow";
  }

  function removeHighlight(creature) {
    creature.style.outline = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const waves = [
    { el: document.getElementById("wave1"), amplitude: 10, speed: 0.04, phase: 0 },
    { el: document.getElementById("wave2"), amplitude: 15, speed: 0.03, phase: 50 },
    { el: document.getElementById("wave3"), amplitude: 20, speed: 0.025, phase: 100 },
  ];

  function animateWaves() {
    waves.forEach(wave => {
      wave.phase += wave.speed;
      const offsetX = Math.sin(wave.phase) * wave.amplitude;
      wave.el.style.transform = `translateX(${offsetX}px)`;
    });

    requestAnimationFrame(animateWaves);
  }

  animateWaves();
});

document.addEventListener("DOMContentLoaded", () => {
  const sun = document.getElementById("sun");
  let scalePhase = 0;

  // ensure it scales from the center
  sun.style.transformOrigin = "50% 50%";

  function animateSun() {
    scalePhase += 0.01; // slower pulse
    const scale = 1 + Math.sin(scalePhase) * 0.02; // subtle ±2% growth/shrink
    sun.style.transform = `scale(${scale})`;

    requestAnimationFrame(animateSun);
  }

  animateSun();
});

// Fast blink every 5 seconds
gsap.timeline({ repeat: -1, repeatDelay: 4 })
  .to("#F-eyes", {
    scaleY: 0.05,           // very small to simulate closing
    transformOrigin: "center center",
    duration: 0.05,         // very fast closing
    ease: "power1.inOut"
  })
  .to("#F-eyes", {
    scaleY: 1,              // open eyes back up
    duration: 0.05,
    ease: "power1.inOut"
  });

  // Cute frog wave from the inside of the arm
gsap.timeline({ repeat: -1, yoyo: true })
  .to("#F-rightarm", {
    rotation: 20,                // swing out
    transformOrigin: "left center", // pivot from the left side
    duration: 0.3,
    ease: "sine.inOut"
  })
  .to("#F-rightarm", {
    rotation: -10,               // swing back slightly past center
    duration: 0.3,
    ease: "sine.inOut"
  })
  .to("#F-rightarm", {
    rotation: 5,                 // settle a little
    duration: 0.3,
    ease: "sine.inOut"
  });

  // Fast blink every 5 seconds
gsap.timeline({ repeat: -1, repeatDelay: 3 })
  .to("#L-eyes", {
    scaleY: 0.05,           // very small to simulate closing
    transformOrigin: "center center",
    duration: 0.05,         // very fast closing
    ease: "power1.inOut"
  })
  .to("#L-eyes", {
    scaleY: 1,              // open eyes back up
    duration: 0.05,
    ease: "power1.inOut"
  });


  // Fast blink every 5 seconds
gsap.timeline({ repeat: -1, repeatDelay: 3 })
  .to("#B-eyes", {
    scaleY: 0.05,           // very small to simulate closing
    transformOrigin: "center center",
    duration: 0.05,         // very fast closing
    ease: "power1.inOut"
  })
  .to("#B-eyes", {
    scaleY: 1,              // open eyes back up
    duration: 0.05,
    ease: "power1.inOut"
  });

  // Fast blink every 5 seconds
gsap.timeline({ repeat: -1, repeatDelay: 4 })
  .to("#D-eyes", {
    scaleY: 0.05,           // very small to simulate closing
    transformOrigin: "center center",
    duration: 0.05,         // very fast closing
    ease: "power1.inOut"
  })
  .to("#D-eyes", {
    scaleY: 1,              // open eyes back up
    duration: 0.05,
    ease: "power1.inOut"
  });

 document.addEventListener("DOMContentLoaded", () => {
  const leftWing = document.getElementById("L-leftwing");
  const rightWing = document.getElementById("L-rightwing");

  if (leftWing && rightWing) {

    function gentleFlap() {
      // open outward in opposite direction
      leftWing.setAttribute("transform", "rotate(5,60,80)");
      rightWing.setAttribute("transform", "rotate(-5,120,80)");

      // close back slowly after 1 second
      setTimeout(() => {
        leftWing.setAttribute("transform", "rotate(0,60,80)");
        rightWing.setAttribute("transform", "rotate(0,120,80)");
      }, 1000); // wings stay open for 1 second
    }

    // flap every 5-8 seconds randomly
    setInterval(() => {
      gentleFlap();
    }, 5000 + Math.random() * 3000);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const leftWing = document.getElementById("D-leftwing");
  const rightWing = document.getElementById("D-rightwing");

  if (!leftWing || !rightWing) return;

  // get bounding boxes
  const leftBox = leftWing.getBBox();
  const rightBox = rightWing.getBBox();

  // LEFT wing rotates from its RIGHT edge
  const leftPivotX = leftBox.x + leftBox.width;
  const leftPivotY = leftBox.y + leftBox.height / 2;

  // RIGHT wing rotates from its LEFT edge
  const rightPivotX = rightBox.x;
  const rightPivotY = rightBox.y + rightBox.height / 2;

  let t = 0;

  function flap() {
    t += 0.08; // same motion speed you liked
    const angle = Math.sin(t) * 8; // gentle dragonfly flap

    leftWing.setAttribute(
      "transform",
      `rotate(${-angle}, ${leftPivotX}, ${leftPivotY})`
    );

    rightWing.setAttribute(
      "transform",
      `rotate(${angle}, ${rightPivotX}, ${rightPivotY})`
    );

    requestAnimationFrame(flap);
  }

  flap();
});

document.addEventListener("DOMContentLoaded", () => {
  const leftWing = document.getElementById("B-leftwing");
  const rightWing = document.getElementById("B-rightwing");

  if (!leftWing || !rightWing) return;

  // get wing bounds
  const leftBox = leftWing.getBBox();
  const rightBox = rightWing.getBBox();

  // hinge points (where wings attach to body)
  const leftPivotX = leftBox.x + leftBox.width; // right side of left wing
  const leftPivotY = leftBox.y + leftBox.height / 2;

  const rightPivotX = rightBox.x; // left side of right wing
  const rightPivotY = rightBox.y + rightBox.height / 2;

  let t = 0;

  function flap() {
    t += 0.04; // slower than dragonfly
    const angle = Math.sin(t) * 12; // gentle inward fold

    // rotate inward toward body
    leftWing.setAttribute(
      "transform",
      `rotate(${angle}, ${leftPivotX}, ${leftPivotY})`
    );

    rightWing.setAttribute(
      "transform",
      `rotate(${-angle}, ${rightPivotX}, ${rightPivotY})`
    );

    requestAnimationFrame(flap);
  }

  flap();
});

