#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "your_SSID";
const char* password = "your_PASSWORD";

void setup() {
  Serial.begin(115200);
  delay(100);

  WiFi.begin("AndroidAP017D", "12345678");
  Serial.println("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

  Serial.println("Connected to WiFi");
}

void loop() {
  WiFiClient client;
  HTTPClient http;

  Serial.print("Sending POST request...");
  http.begin(client, "http://192.168.43.188:3000/api/data");
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST("{\"name\":\"John\",\"age\":30}");

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
}
