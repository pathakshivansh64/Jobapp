import google from 'googleapis'
import dotenv from "dotenv"
dotenv.config({
path:"./.env"
})

const clientID=process.env.ClientID
const clientSecret=process.env.ClientSecret

export const OAuth2Client=new google.Auth.OAuth2Client(
    clientID,
    clientSecret,
    'postmessage'
)
