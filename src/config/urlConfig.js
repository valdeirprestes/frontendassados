require("dotenv").config();
export default {
    url:`${process.env.DOMAIN}:${process.env.PORT}`
}