int color;
bool state;

void setup() {
  Serial.begin(9600);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(A0, INPUT);
  color = 0;
  state = false;
}

void loop() {
  if(Serial.available()) {
    char inChar = (char)Serial.read();
    if(inChar == 'm') {
      color = (color + 1) % 3;
    }
  }
  digitalWrite(2, color == 0 ? HIGH : LOW);
  digitalWrite(3, color == 1 ? HIGH : LOW);
  digitalWrite(4, color == 2 ? HIGH : LOW);

  if(!state && analogRead(A1) > 500) {
    state = true;
    Serial.println("shade");
  }
  if(state && analogRead(A1) < 500) {
    state = false;
    Serial.println("light");
  }
}
