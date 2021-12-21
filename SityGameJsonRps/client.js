var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
var readline = require("readline");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}

//Load the protobuf
var proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("protos/citygame.proto", options)
);

const REMOTE_SERVER = "0.0.0.0:5001";

let username;
let yourIdCommand;

//Create gRPC client
let client = new proto.thecitygame.Game(
    REMOTE_SERVER,
    grpc.credentials.createInsecure()
);

//Start the stream between server and client
function startChat() {
    let channel = client.join({ user: username, text: '', lobby: yourIdCommand});
    channel.on("data", onData);
    rl.on("line", function(text) {
        client.send({ user: username, text: text, lobby: yourIdCommand}, res => {});
    });
}

function getNameUsers() {
    client.getName({ user: username, text: 'new user joined ...'}, function(err, response) {
        yourIdCommand = response.lobby;
        if (response.text === 'ask name again') {
            rl.question("Имя уже существует, введи имя еще раз ", answer => {
                username = answer;
                getNameUsers();
                console.log(username)
            });
        }
        else {
            startChat();
        }
    })
}

//When server send a message
function onData(message) {
    if (message.user === username) {
        return;
    }
    if (message.lobby === yourIdCommand){
        console.log(`${message.user}: ${message.text}`);
    }

}


function main(){
    rl.question("Напиши свое имя ", answer => {
        username = answer;
        getNameUsers();
        // startChat();
    });

}

main()
