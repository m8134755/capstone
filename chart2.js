var express = require("express");
var app = express();
var socket = require('socket.io');
var server = app.listen(4005);
var io = socket.listen(server);
var bodyParser = require('body-parser');


app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded 
//app.listen(4004, '192.168.1.6');

var SerialPort = require('serialport').SerialPort,
    serial = new SerialPort('/dev/ttyUSB0', {
    baudrate : 9600
}) ;

app.get('/', function(request, response){
        response.sendfile(__dirname + "/index2.html");
        });
app.get('/index2', function(request, response){
        response.sendfile(__dirname + "/index2.html");
        });
app.get('/config',function (request, response){
        
        response.sendfile(__dirname + "/config.html");
		
	
		
		
		
		
        });
app.get('/jsonConfig',function (request, response){
        //__dirname + "/index2.html"
        response.json(__dirname + "/data/conf.json")
				
		
		
		
        });
app.get('/submit',function (request, response){
        
    console.log("post");
		
		var id = request.param('reportid');
		 console.log(id);
        });
		
//http://117.123.187.46:4005/data/conf.json
		
app.get('/main',function (request, response){
        
        response.sendfile(__dirname + "/main.html");
        });
io.sockets.on('connection', function(socket){clientConnect(socket)});

function clientConnect(socket){

    serial.on('data', function(data) {
            var msg = data.toString().split(".");

//            console.log("data " + data.toString()) ;
            //console.log("right  > "+msg[0].toString()) ;
//            console.log("< left  "+msg[1].toString()) ;

            var output1 = msg[0].split(",");
            var output2 = msg[1].split(",");


            var subavg = (((parseInt(output1[0])-parseInt(output2[0])) + (parseInt(output1[1])-parseInt(output1[2])) + (parseInt(output1[2])-parseInt(output2[2])))/3);

                       io.sockets.emit('message1',msg[0].toString());
  //          io.sockets.emit('message1', "0,0,1000");
              io.sockets.emit('message2', msg[1].toString());

    //        io.sockets.emit('message2', "1000,500,1000");
                      io.sockets.emit('message3', subavg);
      //      io.sockets.emit('message3', 50);
            });
}
