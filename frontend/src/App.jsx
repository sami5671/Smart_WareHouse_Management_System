import "./App.css";
import AllProducts from "./components/AllProducts";
import PredictionForm from "./components/PredictionForm";

function App() {
  return (
    <>
      <div>
        {/* prediction form */}
        <div>
          <AllProducts />
          {/* <PredictionForm /> */}
        </div>
      </div>
    </>
  );
}

export default App;
