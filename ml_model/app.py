import os
import pickle
import uuid

import matplotlib.pyplot as plt
import pandas as pd
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

# Load trained model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

app = Flask(__name__)
CORS(app)

# Define the folder to save static files
STATIC_FOLDER = "static"
if not os.path.exists(STATIC_FOLDER):
    os.makedirs(STATIC_FOLDER)


@app.route("/predict-sales", methods=["POST"])
def predict():
    data = request.get_json()

    try:
        # Validate required fields
        required_fields = ["stock", "category_code", "last_month_sales", "day_of_month"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Convert to integer values
        stock = int(data["stock"])
        category_code = int(data["category_code"])
        last_month_sales = int(data["last_month_sales"])
        day_of_month = int(data["day_of_month"])

        # Prepare input for model prediction
        features = pd.DataFrame(
            [[stock, category_code, last_month_sales, day_of_month]],
            columns=["stock", "category_code", "last_month_sales", "day_of_month"],
        )

        predicted_sales = model.predict(features)[0]
        predicted_sales = round(predicted_sales, 2)

        # Suggestions & reorder logic
        suggestions = []
        suggested_stock = max(predicted_sales + 10, predicted_sales * 1.2)

        if stock < 20:
            suggestions.append("⚠️ Low Stock Alert: Consider restocking soon.")
        if stock > 100 and predicted_sales < 30:
            suggestions.append("📦 Overstocked: Sales are low — reduce order quantity.")
        if predicted_sales > stock:
            suggestions.append("🔥 High Demand Risk: Predicted sales exceed stock.")
        if last_month_sales < 20 and stock > 100:
            suggestions.append("📉 Low sales + high stock: Reduce order quantity.")
        if not suggestions:
            suggestions.append("✅ Stock level looks fine.")

        # Generate past sales trend data
        months = ["-3M", "-2M", "-1M", "Current"]
        past_sales = [
            last_month_sales - 5,
            last_month_sales - 3,
            last_month_sales,
            last_month_sales + 2,
        ]

        # Add prediction to the trend
        months.append("Next Month")
        sales_trend = past_sales + [predicted_sales]

        # Create and save the graph
        plt.figure(figsize=(6, 4))
        plt.plot(
            months[:-1],
            past_sales,
            marker="o",
            linestyle="--",
            color="skyblue",
            label="Past Sales",
        )
        plt.plot(
            months,
            sales_trend,
            marker="o",
            linestyle="-",
            color="green",
            label="Sales Prediction",
        )

        plt.title("📊 Sales Trend (Past & Prediction)")
        plt.xlabel("Month")
        plt.ylabel("Sales")
        plt.grid(True)
        plt.legend()

        # Save graph with unique filename
        # image_filename = f"sales_trend_{uuid.uuid4().hex}.png"
        image_filename = "sales_trend.png"
        image_path = os.path.join(STATIC_FOLDER, image_filename)
        plt.tight_layout()
        plt.savefig(image_path)
        plt.close()

        return jsonify(
            {
                "predicted_sales": predicted_sales,
                "suggested_stock_quantity": round(suggested_stock),
                "suggestions": suggestions,
                "graph_url": f"/static/{image_filename}",
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Serve static files (if not using default Flask static folder behavior)
@app.route("/static/<filename>")
def send_graph(filename):
    return send_from_directory(STATIC_FOLDER, filename)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
