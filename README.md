# mernStackJwtAuthorization
Jwt token Authorization with React,Redux,Express and MongoDb

This is a MernStack Authorization with Jwt token and with email confirmation functionality.

To run the example you need .env file with couple of variables 

PORT , DATABASE , JWT_SECRET, SENDGRID_API_KEY , EMAIL_FROM , CLIENT_URL 

PORT is the port your server runs on 
DATABASE is the path to your mongoDb database ,local or atlas 
JWT_SECRET is the secret token 
SENDGRID_API_KEY is the API key for SENDGRID ,you have to register to get one
EMAIL_FROM is your email
CLIENT_URL is the url where the react client is running 

On client side you should check client/src/utils/api.js API_BASE_URL set it to where your backend is running ,in my case it is http://localhost:5000

After you set this env variables should run npm install on server and client and should be good to go to run the application.
