import React, { useState } from "react";
import axios from "axios";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    stock: "",
    category_code: "",
    last_month_sales: "",
    day_of_month: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/predict", // Fixed API URL
        formData
      );
      setResult(response.data);
    } catch (err) {
      alert("Failed to fetch prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-between items-start space-x-10">
      {/* Input Form Section */}
      <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          📦 Warehouse Sales Predictor
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock Quantity
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="Enter stock quantity"
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category_code"
              className="block text-sm font-medium text-gray-700"
            >
              Category Code
            </label>
            <input
              type="number"
              id="category_code"
              name="category_code"
              placeholder="Enter category code"
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="last_month_sales"
              className="block text-sm font-medium text-gray-700"
            >
              Last Month Sales
            </label>
            <input
              type="number"
              id="last_month_sales"
              name="last_month_sales"
              placeholder="Enter last month sales"
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="day_of_month"
              className="block text-sm font-medium text-gray-700"
            >
              Day of Month
            </label>
            <input
              type="number"
              id="day_of_month"
              name="day_of_month"
              placeholder="Enter day of the month"
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Predicting..." : "Predict Sales"}
          </button>
        </form>
      </div>

      {/* Prediction and Graph Section */}
      {result && (
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            🔮 Prediction Result
          </h3>
          <p className="text-lg mb-2">
            <strong>Predicted Sales:</strong> {result.predicted_sales}
          </p>
          <p className="text-lg mb-4">
            <strong>Suggested Stock Quantity:</strong>{" "}
            {result.suggested_stock_quantity}
          </p>

          <h4 className="text-lg font-medium mb-3">✅ Suggestions</h4>
          <ul className="list-disc pl-5 mb-6">
            {result.suggestions.map((sug, index) => (
              <li key={index} className="text-gray-600">
                {sug}
              </li>
            ))}
          </ul>

          <h4 className="text-lg font-medium mb-3">
            📈 Sales Trend (Past & Prediction)
          </h4>
          {result.graph_url && (
            <img
              src={`http://localhost:5000${result.graph_url}`} // Updated to full URL
              alt="Sales Trend Graph"
              className="w-full h-auto rounded-md shadow-md"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
