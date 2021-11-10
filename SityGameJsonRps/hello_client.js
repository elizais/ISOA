var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var readline = require("readline");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var packageDefinition = protoLoader.loadSync(
    'protos/helloworld.proto',
    {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;


function main() {
    rl.question("Напиши свое имя ", answer => {
        var client = new hello_proto.Greeter('localhost:50051',
            grpc.credentials.createInsecure());
        client.sayHello({name: answer}, function(err, response) {
            console.log('Greeting:', response.message);
        });
    });
}

main()