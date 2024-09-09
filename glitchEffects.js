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
  
    // Persistent subtle noise effect
    function applyNoiseEffect() {
      const noiseCanvas = document.createElement('canvas');
      noiseCanvas.width = window.innerWidth;
      noiseCanvas.height = window.innerHeight;
      document.body.appendChild(noiseCanvas);
  
      const context = noiseCanvas.getContext('2d');
  
      function generateNoise() {
        const imageData = context.createImageData(noiseCanvas.width, noiseCanvas.height);
        for (let i = 0; i < imageData.data.length; i += 4) {
          const gray = Math.random() * 128 + 100; // More mid-range gray values for subtler noise
          imageData.data[i] = gray;     // Red
          imageData.data[i + 1] = gray; // Green
          imageData.data[i + 2] = gray; // Blue
          imageData.data[i + 3] = 40;   // Lower alpha value for subtler opacity
        }
        context.putImageData(imageData, 0, 0);
      }
  
      generateNoise();
      setInterval(generateNoise, 150); // Refresh noise every 150ms
    }
  
    // Apply the glitch effect only once when the first text loads
    applyGlitchEffectOnce();
  
    // Apply subtle noise effect persistently
    applyNoiseEffect();
  });
  