import pickle

import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split

# Load the generated sales data
df = pd.read_csv("generated_sales_data.csv")

# Define features and target
X = df[["stock", "category_code", "last_month_sales", "day_of_month"]]
y = df["future_sales"]

# Split data into training and testing sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Initialize the Linear Regression model
model = LinearRegression()

# Train the model
model.fit(X_train, y_train)

# Predict on test data
y_pred = model.predict(X_test)

# Evaluate model performance
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

# Display evaluation metrics
print("✅ Model training completed.")
print(f"📊 Mean Squared Error (MSE): {mse:.2f}")
print(f"📈 R² Score: {r2:.2f}")

# Save the trained model to a file
with open("model.pkl", "wb") as file:
    pickle.dump(model, file)

print("💾 Model successfully saved as 'model.pkl'")
