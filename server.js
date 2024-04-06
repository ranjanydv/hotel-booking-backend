require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();


// ? cloudinary
// ! V2 is must
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// rest of the packages
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

// database
const connectDB = require('./app/config/connectDB')

// routers
const authRouter = require('./app/routes/auth.routes')
const userRouter = require('./app/routes/user.routes')
// const productRouter = require('./routes/productRoutes')
// const reviewRouter = require('./routes/reviewRoutes')
// const bidRouter = require('./routes/bidRoutes')
// // const profileRouter = require('./routes/profileRoutes')
// const eventRouter = require('./routes/eventRoutes')


// middleware
const notFoundMiddleware = require('./app/middleware/not-found')
const errorHandlerMiddleware = require('./app/middleware/error-handler')



// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);


// invoke imports
app.use(express.json());
app.use(morgan("dev"));
app.disable("x-powered-by");
app.enable("trust proxy");
app.use(express.static(path.join(__dirname, "uploads")));

app.options("*", cors());

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization, x-access-token,"
  );
  next();
});

app.get("/", (req, res) => {
    res.json({message: "Welcome to RJ Decor API."});
});

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
// app.use('/api/v1/products', productRouter)
// app.use('/api/v1/reviews', reviewRouter)
// app.use('/api/v1/bids', bidRouter)
// app.use('/api/v1/events', eventRouter)


// invoke middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// set port, listen for requests
const port = process.env.PORT || 8080;
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => {
			console.log(
				`Furniture is server listening on port http://localhost:${port}`
			)
		})
	} catch (error) {
		console.error(error)
	}
}
start().catch((error) => console.error(error))