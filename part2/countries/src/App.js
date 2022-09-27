import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filterHandler = (event) => {
    setTerm(event.target.value);
  };

  return (
    <div>
      <Filter term={term} filterHandler={filterHandler} />
      <Countries
        countries={countries}
        term={term}
        filterHandler={filterHandler}
      />
    </div>
  );
};

export default App;
