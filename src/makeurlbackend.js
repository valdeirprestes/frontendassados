var fs = require("fs");
var dotenv = require("dotenv");
dotenv.config();

try {
    const file = "src/urlBackEnd.js";
    console.log(`Tentando atualizar o arquivo ${file}...`)
    var writeStream = fs.createWriteStream(file);
    writeStream.write(`const APP_PROTOCOL_DOMAIN_PORT="${process.env.APP_PROTOCOL_DOMAIN_PORT}";\n`);
    writeStream.write("export default APP_PROTOCOL_DOMAIN_PORT;\n");
    writeStream.end();
    console.log("OK");
} catch (error) {
    console.log(`Falhou em atualizar ${file}`);
}

