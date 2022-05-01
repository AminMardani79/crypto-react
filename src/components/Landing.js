import React, { useState, useEffect, useReducer } from "react";
// components
import Coin from "./Coin";
import Loading from "./Loading";
// api
import { getCoins } from "../services/api";

const initialState = {
  coins: [],
  role: "",
  isAscending: false,
};

const sortReducer = (state, action) => {
  switch (action.type) {
    case "":
      return {
        ...state,
        coins: action.payload,
      };
    case "PRICE":
      const sortByPrice = action.payload.sort((a, b) => {
        return state.isAscending
          ? b.current_price - a.current_price
          : a.current_price - b.current_price;
      });
      return {
        ...state,
        coins: [...sortByPrice],
        role: "PRICE",
        isAscending: !state.isAscending,
      };
    case "CHANGE_PERCENT":
      const sortByChange = action.payload.sort((a, b) => {
        return state.isAscending
          ? b.price_change_percentage_24h - a.price_change_percentage_24h
          : a.price_change_percentage_24h - b.price_change_percentage_24h;
      });
      return {
        ...state,
        coins: [...sortByChange],
        role: "CHANGE_PERCENT",
        isAscending: !state.isAscending,
      };
    default:
      return {
        ...state,
      };
  }
};

const Landing = () => {
  const [sortState, dispatch] = useReducer(sortReducer, initialState);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchApi = async () => {
      const coinsData = await getCoins();
      dispatch({ type: "", payload: coinsData });
    };
    fetchApi();
  }, []);
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };
  const searchedCoins = sortState.coins.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });
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
                <th>
                  Current Price
                  <i
                    className="sort-icon fa fa-sort mx-1"
                    onClick={() =>
                      dispatch({ type: "PRICE", payload: sortState.coins })
                    }
                  ></i>
                </th>
                <th>
                  Percentage Change(24h)
                  <i
                    className="sort-icon fa fa-sort mx-1"
                    onClick={() =>
                      dispatch({
                        type: "CHANGE_PERCENT",
                        payload: sortState.coins,
                      })
                    }
                  ></i>
                </th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {sortState.coins.length ? (
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
