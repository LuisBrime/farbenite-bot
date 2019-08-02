int r1, g1, b1;
int r2, g2, b2;
int r3, g3, b3;
int r4, g4, b4;
int r5, g5, b5;

//processing-java --sketch=`pwd`/sketch_test --output=`pwd`/output_test --build --force

void setup() {
  r1 = int(args[0]);
  g1 = int(args[0]);
  b1 = int(args[0]);
  
  size(1200, 675);
  background(240, 245, 244);
  // Fist rectangle
  noStroke();
  //fill(198, 199, 148);
  fill(r1, g1, b1);
  rect(0, 0, 240, 675);
  // Second rectangle
  noStroke();
  fill(119, 147, 104);
  rect(240, 0, 240, 675);
  // Third rectangle
  noStroke();
  fill(100, 111, 70);
  rect(480, 0, 240, 675);
  // Fourth rectangle
  noStroke();
  fill(43, 58, 54);
  rect(720, 0, 240, 675);
  // Fifth rectangle
  noStroke();
  fill(133, 111, 115);
  rect(960, 0, 240, 675);
  
  PFont f = createFont("Arial", 16, true);
  textFont(f, 20);
  fill(255);
  float x = textWidth("#C6C794");
  text("#C6C794", 120 - x/2, 450);
  
  x = textWidth("#779368");
  text("#779368", 360 - x/2, 450);
  
  x = textWidth("#646F46");
  text("#646F46", 600 - x/2, 450);
  
  x = textWidth("#2B3A36");
  text("#2B3A36", 840 - x/2, 450);
  
  x = textWidth("#856F73");
  text("#856F73", 1080 - x/2, 450);
  
  save("./utils/output.png");
  exit();
}
