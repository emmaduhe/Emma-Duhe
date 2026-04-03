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