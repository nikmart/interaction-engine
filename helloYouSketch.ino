int led = 10; // led that we will toggle
char inChar;  // character we will use for messages from the RPi

int button = 5;
int buttonState;

void setup() {
  Serial.begin(9600);
  pinMode(led, OUTPUT);
  pinMode(button, INPUT);
}

void loop() {
  // read the character we recieve on the serial port from the RPi
  if(Serial.available()) {
    inChar = (char)Serial.read();
  }

  // if we get a 'H', turn the LED on, else turn it off
  if(inChar == 'H'){
    digitalWrite(led, HIGH);
  }
  else{
    digitalWrite(led, LOW);
  }

  // Button event checker - if pressed, send message to RPi
  int newState = digitalRead(button);
  if (buttonState != newState) {
    buttonState = newState;
    if(buttonState == HIGH){
      Serial.println("light");
    }
    else{
      Serial.println("dark");
    }
  }
}
