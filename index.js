const express = require("express")
const mongoose = require('mongoose')
// import { createClient } from 'redis';
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, REDIS_SECRET } = require("./config/config")
const redis = require('redis')
const session = require('express-session')
let RedisStore = require('connect-redis')(session)
var cors = require('cors')

const app = express()

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.set('trust proxy', 1)

const postRouter = require("./routs/postRoutes")
const userRouter = require("./routs/userRoutes")

const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
}

);



const showClient = () => {
  if (redisClient) {
    console.log("client status: ", redisClient.isOpen, RedisStore),

      redisClient.on('error', function (err) {
        console.log('Could not establish a connection with redis. ' + err);
      }),
      redisClient.on('connect', function () {
        console.log('Connected to redis successfully');
      });
  }


}
showClient()





const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

async function connection() {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(console.log("connected to DB successfuly!"))
    .catch((e) => {
      console.log(e),
        setTimeout(connection, 5000)
    })
}

connection()
app.enable("trust proxy")
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: REDIS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,

    httpOnly: true,
    maxAge: 60000,
  },

}
))


app.use(cors())
app.use(express.json())
app.get("/api/v1", (req, res) => {
  res.send("<h1>Yap It's Alive!</h1>"),
    console.log("yes its running")


})


app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)
const port = process.env.PORT || 3333

app.listen(port, () => console.log(`listening on port: ${port} `)

)

