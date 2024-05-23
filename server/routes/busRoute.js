// const express = require("express");
// const busController = require("../controllers/busController");

// const busRouter = express.Router();
// console.log("busRouter---");
// busRouter.get("/busInfo", busController.busInfo);
// busRouter.put("/updateBusInfo/:id", busController.updateBusInfo);

// module.exports = busRouter;

// busRoute.js
// routes/busRoutes.js
const express = require("express");
const busController = require("../controllers/busController");

const busRouter = express.Router();

busRouter.get("/busInfo", busController.busInfo);
busRouter.post("/createBus", busController.createBus);
busRouter.put("/updateBusInfo/:id", busController.updateBusInfo);

module.exports = busRouter;
