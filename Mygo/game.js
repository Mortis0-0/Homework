class Game {
  constructor() {
    this.barSize = 100;
    this.barPos = null;
    this.score = 0;
    this.ballVel = null;
    this.ballPos = null;
  }
  
  startGame() {
    this.barPos = createVector(mouseX, height - 25);
    this.ballPos = createVector(width / 2, height / 2);
    this.ballVel = createVector(random(-3, 3), random(1, 6));
    this.score = 0;
  }
  
  setup() {
    createCanvas(450, 400);
    canvas.parent('canvas-holder');
    background(0);
    this.startGame();
  }
  
  draw() {
    this.barPos.x = constrain(mouseX, this.barSize / 2, width - this.barSize / 2);
    this.ballPos.add(this.ballVel);
    if (this.ballPos.x < 0 || this.ballPos.x > width) this.ballVel.x *= -1;
    if (this.ballPos.y < 0) this.ballVel.y *= -1;
    
    if (
      this.ballPos.y > this.barPos.y &&
      this.ballPos.x > this.barPos.x - this.barSize / 2 &&
      this.ballPos.x < this.barPos.x + this.barSize / 2
    ) {
      this.ballVel.y *= -1;
      this.ballVel.x += map(
        this.ballPos.x - this.barPos.x,
        -this.barSize / 2,
        this.barSize / 2,
        -2,
        2
      ); 
      this.barSize *= 0.95;
      if (this.barSize < 50) this.barSize = 50; // 設定最小長條板大小
      this.ballVel.mult(1.1);
      this.score++;
    } else if (this.ballPos.y > this.barPos.y) {
      this.startGame();
    }
    
    this.update();
  }
  
  update() {
    noStroke();
    fill(0, 50);
    rect(0, 0, width, height);
    
    noStroke();
    fill(80, 0, 255);
    rect(this.barPos.x - this.barSize / 2, this.barPos.y, this.barSize, 20);
    
    fill(255, 255, 0);
    ellipse(this.ballPos.x, this.ballPos.y, 20, 20);
    
    fill(255, 0, 150);
    textSize(20);
    text("得分=" + this.score, 10, 30);
  }
}

const game = new Game();

function setup() {
  game.setup();
  print("球的位置", game.ballPos.x, game.ballPos.y);
}

function draw() {
  game.draw();
}