const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune } = require('./controller');


app.get("/api/compliment", getCompliment);

app.get("/api/fortune", getFortune);

const foodController = require("./foodController");
app.get("/api/food", foodController.getPlace);
app.post("/api/food", foodController.createPlace);
app.put("/api/food/:id", foodController.voteOnPlace);
app.delete("/api/food/:id", foodController.deletePlace);

app.listen(4000, () => console.log("Server running on 4000"));
