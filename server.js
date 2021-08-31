require("rootpath")();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("_middleware/error-handler");
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

// api routes
app.use("/accounts", require("./accounts/accounts.controller"));

// swagger docs route
app.use("/api-docs", require("_helpers/swagger"));

// global error handler
app.use(errorHandler);

// start server
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "shany.franecki51@ethereal.email",
    pass: "kC6CDBjC6yHeD4gjAZ",
  },
});
const mailDetails = {
  from: "shany.franecki51@ethereal.email",
  to: "mr.lombardi@outlook.com",
  subject: "Test mail",
  text: "Soy un conchadesumadre",
};
transporter.sendMail(mailDetails, function (err, data) {
  if (err) {
    console.log("Error Occurs");
  } else {
    console.log("Email sent successfully");
  }
});
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
