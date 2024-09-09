document.addEventListener('DOMContentLoaded', () => {
    const gameText = document.getElementById('game-text');
  
    // Glitch effect (applies only once to the first text update)
    function applyGlitchEffectOnce() {
      const glitchInterval = setInterval(() => {
        gameText.style.textShadow = Math.random() > 0.5
          ? '1px 0px 2px limegreen, -1px 0px 2px darkgreen'
          : '0px 0px 1px limegreen'; // Subtle text shadow change
        gameText.style.opacity = Math.random() > 0.95 ? 0.9 : 1; // Occasional flicker
      }, 200); // Glitch every 200ms
  
      // Stop glitch effect after 5 seconds
      setTimeout(() => {
        clearInterval(glitchInterval);
        gameText.style.textShadow = 'none'; // Reset to no shadow
        gameText.style.opacity = 1; // Full opacity
      }, 5000); // Glitch stops after 5 seconds
    }
  
    // Apply the glitch effect only once when the first text loads
    applyGlitchEffectOnce();
  });
  