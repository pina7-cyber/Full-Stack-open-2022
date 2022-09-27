import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];

  const [temp, setTemp] = useState(0);
  const [wind, setWind] = useState(0);
  const [icon, setIcon] = useState("");
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        setTemp(response.data.main.temp);
        setWind(response.data.wind.speed);
        setIcon(response.data.weather[0].icon);
      });
  }, [api_key, lat, lon, temp, wind, icon]);

  return (
    <div>
      <h1>{country.name.official}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img alt='flag' src={country.flags.png} />
      <h2>Weather in {country.name.common}</h2>
      <div>temperature {temp} Celsius</div>
      {icon !== "" && (
        <img
          alt='icon'
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        />
      )}

      <div>wind {wind} m/s</div>
    </div>
  );
};
export default Country;
