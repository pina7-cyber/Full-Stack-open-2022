import Country from "./Country";

const Countries = ({ term, countries, filterHandler }) => {
  const filteredCountriesByTerm = countries.filter((country) =>
    country.name.official.toLowerCase().includes(term.toLowerCase())
  );

  if (filteredCountriesByTerm.length === 1) {
    return <Country country={filteredCountriesByTerm[0]} />;
  } else if (filteredCountriesByTerm.length > 10) {
    return "Too many matches, specify another filter";
  } else
    return filteredCountriesByTerm.map((country) => (
      <div key={country.name.official}>
        {country.name.official + " "}
        <button value={country.name.official} onClick={filterHandler}>
          show
        </button>
      </div>
    ));
};

export default Countries;
