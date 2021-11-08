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

//Create gRPC client
let client = new proto.thecitygame.Game(
    REMOTE_SERVER,
    grpc.credentials.createInsecure()
);

//Start the stream between server and client
function startChat() {
    let channel = client.join({ user: username });
    channel.on("data", onData);
    rl.on("line", function(text) {
        client.send({ user: username, text: text }, res => {});
    });
}

function getNameUsers() {
    client.getName({ user: username, text: 'new user joined ...' }, function(err, response) {
        if (response.text === 'ask name again') {
            rl.question("Имя уже существует, введи имя еще раз ", answer => {
                username = answer;
                getNameUsers();
                console.log(username)
            });
        }
    })
}

//When server send a message
function onData(message) {
    if (message.user === username) {
        return;
    }
    console.log(`${message.user}: ${message.text}`);
}


function main(){
    rl.question("Напиши свое имя ", answer => {
        username = answer;
        getNameUsers();
        startChat();
    });

}

main()
