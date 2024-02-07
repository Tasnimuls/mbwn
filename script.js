document.getElementById("pressButton").addEventListener("click", function() {
    document.body.style.backgroundColor = "black";
    // Hide the button
    this.style.display = "none";
  
    // Create and append the text with animation
    const centeredText = document.createElement("div");
    centeredText.classList.add("centered-text");
    centeredText.innerHTML = "<h1>This is just an example text<a><strong>Fox</strong></a></h1>";
    document.body.appendChild(centeredText);
    centeredText.style.animation = "fadeIn 2s forwards";
  
    // Start fireworks animation
    startFireworks();
  });
  
  function startFireworks() {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const fireworks = [];
    const particles = [];
  
    function Firework() {
      this.x = canvas.width / 2;
      this.y = canvas.height;
      this.dx = Math.random() * 4 - 2;
      this.dy = Math.random() * -12 - 6;
      this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      this.radius = Math.random() * 3 + 2;
      this.life = true;
  
      this.update = function() {
        this.x += this.dx;
        this.y += this.dy;
        this.dy += 0.2;
        
        if (this.life) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
  
        if (this.y <= canvas.height / 4 || this.dy > 0) {
          this.life = false;
          for (let i = 0; i < 40; i++) {
            particles.push(new Particle(this.x, this.y, this.color));
          }
        }
      };
    }
  
    function Particle(x, y, color) {
      this.x = x;
      this.y = y;
      this.dx = Math.random() * 8 - 4;
      this.dy = Math.random() * 8 - 4;
      this.color = color;
      this.radius = Math.random() * 2 + 1;
      this.life = 60;
  
      this.update = function() {
        this.x += this.dx;
        this.y += this.dy;
        this.dy += 0.1;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        this.life--;
      };
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireworks.forEach((firework, index) => {
        firework.update();
        if (!firework.life) fireworks.splice(index, 1);
      });
      particles.forEach((particle, index) => {
        particle.update();
        if (particle.life <= 0) particles.splice(index, 1);
      });
  
      requestAnimationFrame(animate);
    }
  
    animate();
  
    function createFirework() {
      fireworks.push(new Firework());
      setTimeout(createFirework, Math.random() * 200 + 100);
    }
  
    createFirework();
  }
  