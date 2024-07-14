const express = require("express");

const app = express();

require("./start/modules")(express, app);

require("./start/run")(app);
