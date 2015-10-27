int led = 13; //led that we will toggle
char inChar;

void setup() {
  Serial.begin(9600);
  pinMode(led, OUTPUT);
}

void loop() {
  if(Serial.available()) {
    // read the character we recieve
    inChar = (char)Serial.read();
  }

  // if we get a 'h', turn the LED on
  if(inChar == 'h'){
    digitalWrite(led, HIGH);
  }
  else{
    digitalWrite(led, LOW);
  }
}
