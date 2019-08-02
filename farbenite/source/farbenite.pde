int r1, g1, b1;
int r2, g2, b2;
int r3, g3, b3;
int r4, g4, b4;
int r5, g5, b5;

String c1, c2, c3, c4, c5;

//processing-java --sketch=`pwd`/sketch_test --output=`pwd`/output_test --build --force

void setup() {
  r1 = int(args[0]);
  g1 = int(args[1]);
  b1 = int(args[2]);
  
  r2 = int(args[3]);
  g2 = int(args[4]);
  b2 = int(args[5]);
  
  r3 = int(args[6]);
  g3 = int(args[7]);
  b3 = int(args[8]);
  
  r4 = int(args[9]);
  g4 = int(args[10]);
  b4 = int(args[11]);
  
  r5 = int(args[12]);
  g5 = int(args[13]);
  b5 = int(args[14]);
  
  c1 = args[15];
  c2 = args[16];
  c3 = args[17];
  c4 = args[18];
  c5 = args[19];
  
  size(1200, 675);
  background(240, 245, 244);
  
  // Fist rectangle
  noStroke();
  //fill(198, 199, 148);
  fill(r1, g1, b1);
  rect(0, 0, 240, 675);
  
  // Second rectangle
  noStroke();
  fill(r2, g2, b2);
  rect(240, 0, 240, 675);
  
  // Third rectangle
  noStroke();
  fill(r3, g3, b3);
  rect(480, 0, 240, 675);
  
  // Fourth rectangle
  noStroke();
  fill(r4, g4, b4);
  rect(720, 0, 240, 675);
  
  // Fifth rectangle
  noStroke();
  fill(r5, g5, b5);
  rect(960, 0, 240, 675);
  
  PFont f = createFont("Arial", 16, true);
  textFont(f, 20);
  fill(255);
  float x = textWidth(c1);
  text(c1, 120 - x/2, 450);
  
  x = textWidth(c2);
  text(c2, 360 - x/2, 450);
  
  x = textWidth(c3);
  text(c3, 600 - x/2, 450);
  
  x = textWidth(c4);
  text(c4, 840 - x/2, 450);
  
  x = textWidth(c5);
  text(c5, 1080 - x/2, 450);
  
  save("output.png");
  exit();
}
