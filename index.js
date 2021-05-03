const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
const io = socketio(server);
//MQTT
var mqtt = require('mqtt')
var settings = {
    mqttServerUrl : "localhost", 
    port : 1883,
    topic : "myTopic"
    }

///End MQTT

// app.use(cors());


 
// PLC Connection Settings
const {S7Client} = require('s7client');
const plcSettings = {
  name: "Thesis_Test",
  host: '192.168.1.201',
  port: 102,
  rack: 0,
  slot: 1
};
 
// DBA to read
let dbNr = 1;
let dbVars = [
  { type: "BOOL", start: 0 ,bit: 0},
  { type: "BOOL", start: 0, bit: 1 },
  { type: 'BOOL', start: 0, bit: 2 },
  { type: 'REAL', start: 2 },
  { type: 'INT',  start: 6 },
  { type: 'BYTE', start: 8 }
];
let client = new S7Client(plcSettings);
client.on('error', console.error);

  ///-------
  const db = require('./config/db');
  const plc_s71200 = require('./config/models/Post');
const { json } = require('express');
  db.connect();

  ////-----------
var clientMQTT  = mqtt.connect('mqtt://' + settings.mqttServerUrl + ":" + settings.port);

clientMQTT .on('connect', function () {
  clientMQTT .subscribe(settings.topic)
  console.log("Subscribed topic " + settings.topic);
})

clientMQTT .on('message', function (topic, message) {

  const formDate = JSON.parse(message);
  const pLC_S71200 = new plc_s71200(formDate);
 pLC_S71200.save(function (err) {
  if (!err) console.log('Success!');
});    
  ///-------
  io.on('connection', (socket) => {
    socket.emit('message','Da nhan roi ne');
    socket.emit('MQTT',message.toString());
    socket.on('TEST', (msg) => {
      console.log('Nhận: ' + msg);
      if (msg !== PLCin.value)
      {PLCin.value = msg;}
    });
  });
  ///-------
  console.log(message.toString());
})
app.get("/", function(req, res)
	{
		res.sendFile(__dirname + '/homepage.html');
	});

  
server.listen(process.env.PORT || 5000,() => console.log(`Server has started.`));