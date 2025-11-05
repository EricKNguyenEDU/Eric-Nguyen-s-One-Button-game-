let targets = [];
let score = 0;
let numTargets = 5;
let targetSize = 50;
let gameOver = false;
let bgColor;

let confetti = []; // <-- stores confetti particles

function setup() {
  createCanvas(1920, 1080);
  bgColor = color(30);
  createTargets();
}

function draw() {
  background(bgColor);

  if (!gameOver) {
    moveTargets();
    displayTargets();
    displayScore();
    updateConfetti();
    displayConfetti();

    if (score >= 30) {
      gameOver = true;
    }

  } else {
    displayWinScreen();
  }
}

// ---------------- HELPER FUNCTIONS ----------------

function createTargets() {
  for (let i = 0; i < numTargets; i++) {
    targets.push({
      x: random(width),
      y: random(height),
      color: color(255, 255, 255),
      speedX: random(-2, 2),
      speedY: random(-2, 2)
    });
  }
}

function moveTargets() {
  for (let t of targets) {
    t.x += t.speedX;
    t.y += t.speedY;

    if (t.x < 0 || t.x > width) t.speedX *= -1;
    if (t.y < 0 || t.y > height) t.speedY *= -1;
  }
}

function displayTargets() {
  for (let t of targets) {
    fill(t.color);
    noStroke();
    ellipse(t.x, t.y, targetSize);
  }
}

function displayScore() {
  fill(255);
  textSize(20);
  text("Score: " + score, 100, 25);
}

// ---------- CONFETTI SYSTEM ----------

function spawnConfetti(x, y) {
  for (let i = 0; i < 20; i++) { // number of pieces
    confetti.push({
      x: x,
      y: y,
      size: random(5, 10),
      col: color(random(255), random(255), random(255)),
      speedX: random(-3, 3),
      speedY: random(-3, 1),
      gravity: 0.1,
      life: 255
    });
  }
}

function updateConfetti() {
  for (let c of confetti) {
    c.x += c.speedX;
    c.y += c.speedY;
    c.speedY += c.gravity;
    c.life -= 4; // fade out
  }

  // remove faded particles
  confetti = confetti.filter(c => c.life > 0);
}

function displayConfetti() {
  for (let c of confetti) {
    noStroke();
    fill(red(c.col), green(c.col), blue(c.col), c.life);
    ellipse(c.x, c.y, c.size);
  }
}

// ---------- WIN SCREEN ----------

function displayWinScreen() {
  background(0, 150, 100);
  fill(255);
  textAlign(CENTER);
  textSize(40);
  text("YOU WIN!", width / 2, height / 2 - 20);
  textSize(25);
  text("Final Score: " + score, width / 2, height / 2 + 20);
  textSize(18);
  text("Press R to Restart", width / 2, height / 2 + 60);
}

function mousePressed() {
  for (let t of targets) {
    let d = dist(mouseX, mouseY, t.x, t.y);
    if (d < targetSize / 2) {

      t.color = color(random(255), random(255), random(255)); 
      bgColor = t.color; 
      score++;

      spawnConfetti(t.x, t.y); // <-- CONFETTI burst here 🎉
    }
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    resetGame();
  }
}

function resetGame() {
  score = 0;
  gameOver = false;
  targets = [];
  confetti = []; // clear confetti
  bgColor = color(30);
  createTargets();
}

