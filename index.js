const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const bodyparser = require("body-parser");
const path = require('path');
require('dotenv').config();
app.use(express.json());
app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/getimage", express.static("images"));
app.use("/buktievent", express.static("buktievent"));
app.use("/buktikonsul", express.static("buktikonsul"));

app.use("/public", express.static(path.join(__dirname, 'public')));

//Router
const adminRouter = require("./routers/Admins");
app.use("/auth", adminRouter);
const userRouter = require("./routers/Users");
app.use("/users/auth", userRouter);
const eventsRouter = require("./routers/Events");
app.use("/events", eventsRouter);
const konsulsRouter = require("./routers/Konsuls");
app.use("/konsuls", konsulsRouter);
const OrdersRouter = require("./routers/Orders");
app.use("/orders", OrdersRouter);

const buktieventRouter = require("./routers/BuktiEvent");
app.use("/buktievent", buktieventRouter);

const buktikonsulRouter = require("./routers/BuktiKonsul");
app.use("/buktikonsul", buktikonsulRouter);

const lockregisRouter = require("./routers/LockRegis");
app.use("/lockregis", lockregisRouter);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
});
