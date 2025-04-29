
![Logo](https://i.ibb.co.com/KjdTFbKY/png-transparent-silhouette-warehouse-factory-industry-logo-thumbnail-removebg-preview.png)


#  Smart Online Warehouse Management Support System
This project aims to design and implement a Smart Online Warehouse Management Support System (MSS) tailored for retail stores. The proposed MSS will utilize modern web technologies and machine learning to offer decision-making support, automate routine warehouse tasks, and improve operational efficiency through predictive analytics and inventory forecasting. The system will serve as a centralized platform for warehouse administrators to manage product stocks, sales forecasting, performance tracking, and restocking suggestions.


## System diagram of MSS 

![App Screenshot](https://i.ibb.co.com/9H1KFhyj/diagram.png)


## Installation

#### Install Smart Online Warehouse with client npm

```bash
  git clone https://github.com/sami5671/Smart_WareHouse_Management_System.git
  cd frontend
  npm install
```

#### To Run Client Site
```bash
  npm run dev
```

#### To Run Server Site
```bash
  cd backend
  npm install
  nodemon index.js
```

#### To Run ML Model
```bash
  cd ml_model
  pip install Flask flask-cors pandas scikit-learn matplotlib
  python app.py
```

# Features

- Data Warehouse: Centralized storage for inventory, sales, and historical data
- BI Dashboards: Real-time visualizations using chart libraries (e.g., Chart.js or Recharts). 
- Inventory Management Module: CRUD operations for product stock, category-wise filtering. 
- Forecasting Module: Predictive ML model (Linear Regression/Random Forest) to estimate future sales and restock quantities. 
- Stock Suggestion System: Rules-based engine (e.g., "low sales + high stock -> reduce order") to aid procurement decisions. 

# Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Python:** Flask, flask-cors, pandas, scikit-learn, matplotlib


## Author

- [@sami5671](https://www.github.com/sami5671)

