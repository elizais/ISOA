let grpc = require('grpc');
let protoLoader = require('@grpc/proto-loader');
let fs = require('fs');

const server = new grpc.Server();
const SERVER_ADDRESS = '0.0.0.0:5001';

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

class Dictionary extends Map {
    constructor(){
        super();
    }
    add(id, data){
        if(this.has(id)){
            this.get(id).push(data);
        }else{
            this.set(id, [data]);
        }
        return this;
    }
}

let users = [];
let commands = new Dictionary();
let itergame = 0;
let usedNameUsers = new Dictionary();
let gamesUsers = new Dictionary();
let city;
let usedNameCities = new Dictionary();
let indexUserStep = new Dictionary();
let flagStartGame = new Dictionary();
let lettersFalse = 'ёьъы'
let timeInMs = new Dictionary();
let callerName;



function defineFirstLetter(nameCity, idLobby){
    if (usedNameCities.get(idLobby) === undefined){
        return true;
    }
    let lenArrUsedCity = usedNameCities.get(idLobby).length - 1;
    if (lenArrUsedCity >= 0) {
        return true;
    }
    let  previous = usedNameCities.get(idLobby)[lenArrUsedCity]
    let i = previous.length-1;
    while (lettersFalse.includes(previous[i])){i--;}
    return previous[i] === nameCity[0].toLowerCase()
}

function writeCorrectAnswer(call){
    console.log(timeInMs.get(call.request.lobby))
    if ((Date.now()-timeInMs.get(call.request.lobby))/1000 < 30){
        notifyChat(call.request);
        usedNameCities.add(call.request.lobby, call.request.text);
        indexUserStep.set(call.request.lobby,
            (indexUserStep.get(call.request.lobby)+1)%usedNameUsers.get(call.request.lobby).length)
        callerName =  usedNameUsers.get(call.request.lobby)[indexUserStep.get(call.request.lobby)]
        notifyChat({user: 'Server',
            text: 'Верно, следующий ходит ' + callerName,
            lobby: call.request.lobby
        });
    }
    else {
        if (usedNameUsers.get(call.request.lobby).length === 1) {
            sendServerMessage(call, 'Игрок ' + callerName + ' победил');
        }

        else{
            sendServerMessage(call, 'Игрок ' + callerName + ' проиграл');
            usedNameUsers.get(call.request.lobby).splice(indexUserStep.get(call.request.lobby) , 1);
        }

    }
    timeInMs.set(call.request.lobby, Date.now())
}

function sendServerMessage(call, masage){
    notifyChat({user: 'Server',
        text: masage,
        lobby: call.request.lobby});
}


// Receive message from client joining
function join(call, callback) {
    gamesUsers.add(itergame, call);
    notifyChat({ user: "Server", text: selectFirst(call), lobby: itergame});
    notifyChat({ user: "Server", text: 'Для начала игры введите play', lobby: itergame});
}

function selectFirst(call){
    if (gamesUsers.get(itergame).length === 1){
        return " вы первый участник"
    }
    return usedNameUsers.get(itergame)[0] + " начинает игру"
}

// Receive message from client
function getName(call, callback) {
    if (gamesUsers.get(call.request.lobby) !== undefined){
        if (usedNameUsers.get(call.request.lobby).includes(call.request.user)){
            callback(null, {user: call.request.user, text: 'ask name again', lobby: itergame})
        }
        else {
            callback(null, {user: call.request.user, text: 'Grate', lobby: itergame});
            usedNameUsers.add(itergame, call.request.user);
            console.log(usedNameUsers)
        }
    }
    else {
        callback(null, {user: call.request.user, text: 'Grate', lobby: itergame});
        usedNameUsers.add(itergame, call.request.user);
        console.log(usedNameUsers)
    }

}

// Receive message from client
function send(call, callback) {
    callerName = usedNameUsers.get(call.request.lobby)[indexUserStep.get(call.request.lobby)]
    if (flagStartGame.get(call.request.lobby)){
        if (defineFirstLetter(call.request.text)){
            if (call.request.user === callerName) {
                if (city.includes(call.request.text[0].toUpperCase() + call.request.text.slice(1).toLowerCase())){
                    if (usedNameCities.get(call.request.lobby) === undefined) {
                        writeCorrectAnswer(call)
                    }
                    else{
                        if (usedNameCities.get(call.request.lobby).includes(call.request.text)){
                            sendServerMessage(call,call.request.user + ' этот город уже называли');
                        }
                        else{
                            writeCorrectAnswer(call)
                        }
                    }
                }
                else {
                    sendServerMessage(call,call.request.user + ' Такого города не сущесьвует');
                }
            }
            else {
                sendServerMessage(call,call.request.user + ' мне кажется сейчас ходит ' + callerName);
            }
        }
        else {
            sendServerMessage(call,call.request.user + ' назовите город с другой буквы');
        }
    }
    else {
        notifyChat(call.request);
    }
    if (call.request.text === 'play'){
        flagStartGame.add(call.request.lobby, true);
        sendServerMessage(call,call.request.user+' начал игру для команды '+usedNameUsers.get(call.request.lobby));
        if (!(call.request.lobby in commands)){
            commands.add(call.request.lobby, users)
            itergame++;
            users.splice(0, users.length)
            indexUserStep.add(call.request.lobby, 0)
            console.log(commands)
        }
        timeInMs.set(call.request.lobby, Date.now())

    }
}

// Send message to all connected clients
function notifyChat(message) {
    gamesUsers.get(message.lobby).forEach(user => {
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