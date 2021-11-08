var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
var fs = require('fs');

const server = new grpc.Server();
const SERVER_ADDRESS = "0.0.0.0:5001";

const fileCityList = 'city/cities_list.txt'

let options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}

let proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("protos/citygame.proto", options)
);

let users = [];
let city;
let usedNameUsers = [];
let usedNameCities = [];
let indexUserStep = 0;
let flagStartGame = false;
let lettersFalse = 'ёьъы'

// доделай проверку первой буквы с которой должен начинаться город
function defineFirstLetter(nameCity){
    return indexUserStep === 0 || usedNameCities[-1][-1] === nameCity[0];
}


// Receive message from client joining
function join(call, callback) {
    users.push(call);
    notifyChat({ user: "Server", text: selectFirst()});
}

function selectFirst(){
    if (usedNameUsers.length === 0){
        return "вы первый участник"
    }
    return usedNameUsers[indexUserStep] + " начинает игру"
}

// Receive message from client
function getName(call, callback) {
    if (usedNameUsers.includes(call.request.user))    {
        callback(null, {user: call.request.name, text: 'ask name again'})
    }
    else {
        usedNameUsers.push(call.request.user);
        console.log(usedNameUsers);
    }

}

// Receive message from client
function send(call, callback) {
    if (flagStartGame){
        if (indexUserStep === 0 || usedNameCities[-1][-1] === call.request.text[0]){// В этот уровень вставить проверку первой буквы с которой начинается город
            if (call.request.user === usedNameUsers[indexUserStep]) {
                if (city.includes(call.request.text[0].toUpperCase() + call.request.text.slice(1).toLowerCase())){
                    if (usedNameCities.includes(call.request.text)){
                        notifyChat({user: 'ошибка', text: call.request.user + ' этот город уже называли'})
                    }
                    else{
                        notifyChat(call.request);
                        usedNameCities.push(call.request.text);
                        indexUserStep = (indexUserStep+1)%usedNameUsers.length
                    }
                }
                else {
                    notifyChat({user: 'ошибка', text: call.request.user + ' Такого города не сущесьвует'})
                }
            }
            else {
                notifyChat({user: 'ошибка', text: call.request.user + ' мне кажется сейчас ходит ' + usedNameUsers[indexUserStep]})
            }
        }
        else {
            notifyChat({user: 'ошибка', text: call.request.user + ' с другой буквы должно быть слово'})
        }
    }
    else {
        notifyChat(call.request);
    }
    if (call.request.text === 'play'){
        flagStartGame = true;
        notifyChat({user: call.request.user, text: call.request.user + 'начал игру'});
    }

}

// Send message to all connected clients
function notifyChat(message) {
    users.forEach(user => {
        user.write(message);
    });
}

// Define server with the methods and start it
function main() {
    fs.readFile(fileCityList, 'utf8', function(err, data) {
        if (err) throw err;
        console.log('OK: ' + fileCityList);
        city = data
    });

    server.addService(proto.thecitygame.Game.service, {join: join, send: send, getName: getName});

    server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());

    server.start();
}

main()