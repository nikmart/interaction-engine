int led = 10; //led that we will toggle
char inChar;

int button = 5;
int buttonState;

void setup() {
  Serial.begin(9600);
  pinMode(led, OUTPUT);
  pinMode(button, INPUT);
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

  //lets check if the button is pressed
  int newState = digitalRead(button);
  if (buttonState != newState) {
    buttonState = newState;
    if(buttonState == HIGH){
      Serial.println("light");
    }
    else{
      Serial.println("shade");
    }
  }
}
