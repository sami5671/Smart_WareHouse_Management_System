const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5001;
const axios = require("axios");

// ------------------- middleware ----------------------------------------------------------------
const corsOptions = {
  // origin: ["https://dream-car-68b89.web.app"],
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

// ---------------------------------------------------------------------------------------------
app.post("/api/predict", async (req, res) => {
  console.log(req.body);
  try {
    const { stock, category_code, last_month_sales, day_of_month } = req.body;

    const flaskResponse = await axios.post(
      "http://127.0.0.1:5000/predict-sales",
      {
        stock,
        category_code,
        last_month_sales,
        day_of_month,
      }
    );

    const {
      predicted_sales,
      suggestions,
      suggested_stock_quantity,
      graph_url,
    } = flaskResponse.data;

    res.status(200).json({
      predicted_sales,
      suggestions,
      suggested_stock_quantity,
      graph_url,
    });
  } catch (error) {
    console.error("Prediction Error:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch prediction from ML server" });
  }
});

app.get("/", (req, res) => {
  res.send("Smart Warehouse Server is Alive.............");
});

app.listen(port, () => {
  console.log(`Smart Warehouse Server is running on port ${port}`);
});
