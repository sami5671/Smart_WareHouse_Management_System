import React, { useState } from "react";
import axios from "axios";

const initialData = [
  {
    stock: "100",
    category_code: "1",
    last_month_sales: "20",
    day_of_month: "13",
    product_img:
      "https://image.made-in-china.com/2f0j00JczhmqtGYaeE/Kaidifeiniroo-K015-Wholesale-Designer-Bags-Women-Famous-Brands-Luxury-Designer-Fashion-Lady-Handbag-for-Women.webp",
    product_name: "Kaidifeiniroo K015",
    product_country: "United States",
    product_Color: "Brown",
  },
  {
    stock: "300",
    category_code: "2",
    last_month_sales: "120",
    day_of_month: "15",
    product_img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQXiTcQoiPsRKkABdjP7YWPCSqOGQNsMu4VA&s",
    product_name: "Long Line Wool Coat",
    product_country: "UAE",
    product_Color: "Brown",
  },
  {
    stock: "220",
    category_code: "3",
    last_month_sales: "200",
    day_of_month: "10",
    product_img:
      "https://cdn.sanity.io/images/c1chvb1i/production/a0479c253b26a9fec066b696305577ab9836f48a-1100x735.jpg?w=1760&h=1176&q=75&fit=max&auto=format",
    product_name: "Self-Lacing Sneakers",
    product_country: "United Kingdom",
    product_Color: "Gray & White",
  },
];

const AllProducts = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [products, setProducts] = useState(initialData);

  const handleInputChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handlePredict = async (item) => {
    setLoading(true);
    const productInfo = {
      stock: item?.stock,
      category_code: item?.category_code,
      last_month_sales: item?.last_month_sales,
      day_of_month: item?.day_of_month,
    };
    try {
      const response = await axios.post(
        "http://localhost:5001/api/predict",
        productInfo
      );
      setResult(response.data);
    } catch (err) {
      alert("Failed to fetch prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="px-2 py-8">
        <div className="overflow-x-auto px-12">
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              📦 Warehouse Sales Predictor
            </h2>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Product No</th>
                <th>Product Name</th>
                <th>Product Category</th>
                <th>Day of Month (current)</th>
                <th>Current Stock</th>
                <th>Last Month Sales</th>
                <th>Product Color</th>
                <th>Analyze</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.product_img} alt="product" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.product_name}</div>
                        <div className="text-sm opacity-50">
                          {item.product_country}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.category_code}</td>
                  <td>
                    <input
                      type="number"
                      value={item.day_of_month}
                      onChange={(e) =>
                        handleInputChange(index, "day_of_month", e.target.value)
                      }
                      className="border px-2 py-1 w-16 rounded"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.stock}
                      onChange={(e) =>
                        handleInputChange(index, "stock", e.target.value)
                      }
                      className="border px-2 py-1 w-20 rounded font-extrabold"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.last_month_sales}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "last_month_sales",
                          e.target.value
                        )
                      }
                      className="border px-2 py-1 w-24 rounded font-extrabold"
                    />
                  </td>
                  <td>{item.product_Color}</td>
                  <th>
                    <button
                      onClick={() => handlePredict(item)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full"
                    >
                      Predict
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Prediction Result */}
        <div className="bg-gray-100 py-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            🔮 Prediction Result
          </h3>
          {result && (
            <div className="flex justify-between lg:px-24 lg:py-16">
              <div>
                <h3 className="text-3xl font-bold text-cyan-800 mb-8">
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
              </div>
              <div>
                <h3 className="text-3xl font-bold text-cyan-800 mb-8">
                  📈 Prediction Graph
                  <span className="text-xl text-red-500 ml-4">
                    (Sales Trend Past & Prediction)
                  </span>
                </h3>
                {result.graph_url && (
                  <img
                    src={`http://localhost:5000${result.graph_url}`}
                    alt="Sales Trend Graph"
                    className="w-full h-auto rounded-md shadow-md"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AllProducts;
