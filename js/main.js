// JS scripts placed here
gsap.to("#F-rightarm", {
  rotation: 20,              // how far it swings
  transformOrigin: "top center", // pivot point of rotation
  duration: 0.6,             // speed of one swing
  repeat: -1,                // loop forever
  yoyo: true,                // swing back and forth
  ease: "power1.inOut"       // smooth movement
});