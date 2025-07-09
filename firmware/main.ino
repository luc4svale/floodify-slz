#include <WiFi.h>
#include <PubSubClient.h>
#include "secrets.h"

// ========== THINGSBOARD MQTT SETTINGS ==========
const char* mqtt_server = "demo.thingsboard.io";  // ThingBoard broker
const int mqtt_port = 1883;  // Default MQTT port

// ========== STATIC LOCATION ==========
const float latitude = -2.5225;
const float longitude = -44.3003;

// ========== SENSOR T1592 ==========
const int sensorPin = 34;
const float sensorHeight = 7.0;                   // Height of the sensor in cm
const float sensorHeightFromGround = 10.0;        // Distance from sensor to ground in cm

const int dryReading = 300;                       // Sensor reading when dry
const int submergedReading = 2800;                // Sensor reading when fully submerged

// ========== SENDING INTERVAL ==========
const unsigned long sendInterval = 30 * 1000; // 30 seconds
unsigned long lastSendTime = 0;

// MQTT
WiFiClient wifiClient;
PubSubClient client(wifiClient);

// ================= WIFI ===================
void setup_wifi() {
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);  // Using the credentials in secrets.h
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {  // Limit connection attempts
    delay(1000);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ WiFi connected!");
    Serial.print("Local IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n❌ WiFi connection failed. Check the WiFi credentials.");
    while (true) delay(1000);  // Stop the program here if no Wi-Fi
  }
}

// ============== MQTT ====================
void reconnect_mqtt() {
  while (!client.connected()) {
    Serial.print("Connecting to ThingsBoard via MQTT... ");
    if (client.connect("ESP32Client", device_token, NULL)) {
      Serial.println("✅ Connected!");
    } else {
      Serial.print("❌ Failed (rc=");
      Serial.print(client.state());
      Serial.println("), retrying in 5s...");
      delay(5000);
    }
  }
}

// ========== ANALOG TO CM CONVERSION ==========
float readWaterLevelCM() {
  long totalReading = 0;
  int numReadings = 10;

  // Taking multiple readings to smooth out fluctuations
  for (int i = 0; i < numReadings; i++) {
    totalReading += analogRead(sensorPin);
    delay(10);
  }
  int averageReading = totalReading / numReadings;

  averageReading = constrain(averageReading, dryReading, submergedReading);
  float level = map(averageReading, dryReading, submergedReading, 0, sensorHeight);
  return level;
}

// ========== SEND DATA TO THINGSBOARD ==========
void sendData() {
  float detectedLevel = readWaterLevelCM();                      // Level detected by the sensor in cm
  float actualLevel = sensorHeightFromGround + detectedLevel;   // Add base height
  actualLevel = constrain(actualLevel, 0.0, sensorHeightFromGround + sensorHeight); // Limit the value

  String payload = "{";
  payload += "\"water_level_cm\":" + String(actualLevel, 2) + ",";
  payload += "\"latitude\":" + String(latitude, 6) + ",";
  payload += "\"longitude\":" + String(longitude, 6);
  payload += "}";

  Serial.print("📡 Sending: ");
  Serial.println(payload);

  client.publish("v1/devices/me/telemetry", payload.c_str());
}

// ========== SETUP ==========
void setup() {
  Serial.begin(115200);
  pinMode(sensorPin, INPUT);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
}

// ========== MAIN LOOP ==========
void loop() {
  if (!client.connected()) {
    reconnect_mqtt();  // Try reconnecting to MQTT if the connection is lost
  }
  client.loop();  // Keeps the MQTT communication running

  unsigned long now = millis();
  if (now - lastSendTime > sendInterval) {  // If the send interval has passed
    lastSendTime = now;
    sendData();
  }
}
