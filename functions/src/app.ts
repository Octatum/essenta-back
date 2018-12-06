import express from "express";
import compression from "compression"; // compresses requests
import * as functions from "firebase-functions";
import bodyParser from "body-parser";
import lusca from "lusca";
import dotenv from "dotenv";
import flash from "express-flash";
import expressValidator from "express-validator";
import { checkSchema } from "express-validator/check";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

// Controllers (route handlers)
import * as orderController from "./controllers/order";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

/**
 * Primary app routes.
 */

const orderCheckSchema = checkSchema({
  items: {
    in: ["body"],
    isLength: {
      errorMessage: "El carrito debe contener al menos un objeto",
      options: { min: 1 },
    },
    optional: false,
  },
  "items.*.id": {
    in: ["body"],
    errorMessage: "Cada producto debe contener un identificador.",
    isString: {
      errorMessage: "El identificador de un producto debe ser un string.",
    },
    optional: false,
  },
  "items.*.colorId": {
    in: ["body"],
    errorMessage: "Cada producto debe contener un identificador de color.",
    isString: {
      errorMessage: "El identificador de un color debe ser un string.",
    },
    optional: false,
  },
  "items.*.fraganceId": {
    in: ["body"],
    errorMessage: "Cada producto debe contener un identificador de fragancia.",
    isString: {
      errorMessage: "El identificador de una fragancia debe ser un string.",
    },
    optional: false,
  },
  "items.*.amount": {
    in: ["body"],
    errorMessage: "Cada producto debe contener una cantidad.",
    isInt: {
      errorMessage: "El valor de amount debe ser numérico.",
    },
    toInt: true,
    optional: false,
  },
});

app.get("/", (req, res) => res.sendStatus(200));
app.get("/orders", orderController.allOrders);
app.post("/orders", orderCheckSchema, orderController.createOrder);
app.put("/orders", orderController.updateOrder);

export default app;
export const server = functions.https.onRequest(app);