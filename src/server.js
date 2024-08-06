import dotenv from "dotenv";
import api from "./api";
import urlConfig from "./config/urlConfig";

dotenv.config();

api.app.listen(process.env.PORT,
    ()=>{
        console.log(`Run server in  ${urlConfig.url}`);
        console.log(`PRESS Crtl+c for stop application.`);
    }
);


