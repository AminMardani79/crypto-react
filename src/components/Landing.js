import React, { useState, useEffect } from "react";
// components
import Coin from "./Coin";
import Loading from "./Loading";
// api
import { getCoins } from "../services/api";
const Landing = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchApi = async () => {
      const coinsData = await getCoins();
      setCoins(coinsData);
    };
    fetchApi();
  });
  const searchHandler = (event) => [setSearch(event.target.value)];
  const searchedCoins = coins.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div className="crypto-container">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search name..."
            value={search}
            onChange={searchHandler}
          />
        </div>
        <div className="table-responsive">
          <table className="table-container table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Current Price</th>
                <th>Percentage Change(24h)</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {coins.length ? (
                searchedCoins.map((coin) => (
                  <Coin
                    key={coin.id}
                    symbol={coin.symbol}
                    name={coin.name}
                    image={coin.image}
                    price={coin.current_price}
                    priceChange={coin.price_change_percentage_24h}
                  />
                ))
              ) : (
                <Loading />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Landing;
