#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "AndroidAP017D";
const char* password = "12345678";

#define TRIGGER_PIN_1 D0
#define ECHO_PIN_1 D1
//#define TRIGGER_PIN_2 3
//#define ECHO_PIN_2 5

int x = 0;

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }
  
  pinMode(TRIGGER_PIN_1, OUTPUT);
  pinMode(ECHO_PIN_1, INPUT);
  //pinMode(TRIGGER_PIN_2, OUTPUT);
  //pinMode(ECHO_PIN_2, INPUT);
}

void loop() {
  long duration_1, duration_2;
  float distance_1, distance_2;
  static unsigned long start_time = 0;
  static unsigned long end_time = 0;
  static unsigned long total_time;

  // Measure distance from the first ultrasonic sensor
  digitalWrite(TRIGGER_PIN_1, LOW);
  delayMicroseconds(1000);
  digitalWrite(TRIGGER_PIN_1, HIGH);
  delayMicroseconds(1000);
  digitalWrite(TRIGGER_PIN_1, LOW);
  duration_1 = pulseIn(ECHO_PIN_1, HIGH);
  distance_1 = duration_1 * 0.034 / 2;

  Serial.print("distance_1 = " );
  Serial.println(distance_1);

  if(distance_1 < 10){
    x = 1;
  }else{
    x = 0;
  }
  
  WiFiClient client;
  HTTPClient http;

  Serial.print("Sending POST request...");
  http.begin(client, "http://192.168.43.188:4000/api/data");
  http.addHeader("Content-Type", "application/json");
  //String data = "{\"slot1\":" + String(x) + ",\"slot2\":" + String(y) + ",\"slot3\":" + String(z) +"}";
  String data = "{\"distance\":" + String(x) + "}";
  //String data = "api/data?param1=x&param2=y";
  //String data = "{\"distance\":" + String(x) + "\"height\":" + String(y) + "}";
  int httpResponseCode = http.POST(data);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Response:");
    Serial.println(response);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }

  http.end();

  // Measure distance from the second ultrasonic sensor
  /*digitalWrite(TRIGGER_PIN_2, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIGGER_PIN_2, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIGGER_PIN_2, LOW);
  duration_2 = pulseIn(ECHO_PIN_2, HIGH);
  distance_2 = duration_2 * 0.034 / 2;*/

  // Check if both distances are less than 10 centimeters
  /*if (distance_1 < 10 && distance_2 < 10) {
    if (start_time == 0) {
      start_time = millis();
    }
  } else {
    if (start_time != 0) {
      end_time = millis();
      Serial.print("\nBoth sensors in range for ");
      total_time = end_time - start_time;
      Serial.print(total_time);
      Serial.println(" ms");
      
      if(total_time<1000){
        Serial.print("Ticket Price is Rs.100");
      }
      else if(total_time<5000){
        Serial.print("Ticket Price is Rs.300");
      }
      else {
        Serial.print("Ticket Price is Rs.500");
      }
      
      Serial.println("\nThank You!");
      
      start_time = 0;
      end_time = 0;
    }
  }*/

  delay(1000);  
}






/*
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "AndroidAP017D";
const char* password = "12345678";


//const char* ssid = "SLT_FIBER_HOMe";
//const char* password = "Nissanfb15oldshell";

// Pin definitions
const int trigPin = D0;
const int echoPin = D1;

int x = 0;
int y = 1;
int z = 1;

void setup() {
  Serial.begin(115200);
  delay(100);

  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

  Serial.println("Connected to WiFi");
  // Set the pin modes
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {

  long duration, dist;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  dist = duration /58;

  Serial.println(dist);

  /*if(distance < 20){
    x = 1;
  }else{
    x = 0;
  }*/
  
  /*WiFiClient client;
  HTTPClient http;

  Serial.print("Sending POST request...");
  http.begin(client, "http://192.168.43.188:4000/api/data");
  http.addHeader("Content-Type", "application/json");
  //String data = "{\"slot1\":" + String(x) + ",\"slot2\":" + String(y) + ",\"slot3\":" + String(z) +"}";
  String data = "{\"distance\":" + String(dist) + "}";
  //String data = "api/data?param1=x&param2=y";
  //String data = "{\"distance\":" + String(x) + "\"height\":" + String(y) + "}";
  int httpResponseCode = http.POST(data);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Response:");
    Serial.println(response);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }

  http.end();

  delay(5000);
}*/
