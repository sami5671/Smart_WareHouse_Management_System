import numpy as np
import pandas as pd

# Set a random seed for reproducibility
np.random.seed(42)

# Generate 20 realistic data points
stock = np.random.randint(5, 500, size=20)  # Stock between 5 and 500
category_code = np.random.choice([1, 2, 3], size=20)  # Category codes 1, 2, or 3
last_month_sales = np.random.randint(
    5, 200, size=20
)  # Last month's sales between 5 and 200
day_of_month = np.random.randint(1, 31, size=20)  # Day of the month between 1 and 31

# Generate future sales based on last month’s sales with a bit of randomness
future_sales = (last_month_sales * np.random.uniform(0.5, 1.5, size=20)).astype(int)

# Combine data into a DataFrame
data = {
    "stock": stock,
    "category_code": category_code,
    "last_month_sales": last_month_sales,
    "day_of_month": day_of_month,
    "future_sales": future_sales,
}
df = pd.DataFrame(data)

# Save to CSV
df.to_csv("generated_sales_data.csv", index=False)

print(
    "✅ Generated 20 new realistic data points and saved to 'generated_20_sales_data.csv'."
)
