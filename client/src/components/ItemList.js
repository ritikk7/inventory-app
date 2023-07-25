import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectItem } from '../actions/ItemActions';

const ItemList = () => {
  // const items = useSelector((state) => state.items);
  const [items, setItems] = useState([]);
  // const [sortParam, setSortParam] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [submittedMinPrice, setSubmittedMinPrice] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://inventory-app-ibwz.onrender.com/${submittedMinPrice ? `?minPrice=${submittedMinPrice}` : ''}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          console.error(`Unexpected response data: ${response.data}`);
          setItems([]);  // Set to an empty array in case of unexpected data
        }
      })
      .catch(error => {
        console.error(`There was an error retrieving the items: ${error}`);
        setItems([]);
      });

  }, [submittedMinPrice]);

  const handleItemClick = (item) => {
    dispatch(selectItem(item));
  };

  const handleMinPriceChange = (e) => {
    const inputValue = e.target.value;
    if (!inputValue || inputValue === '') {
      setMinPrice('');  // Set to empty string when input field is empty
    } else {
      setMinPrice(inputValue);
    }
  };

  const handlePriceSubmit = (e) => {
    e.preventDefault();  // prevent page from refreshing on form submission
    setSubmittedMinPrice(minPrice);  // update the submittedMinPrice state
    setItems([]);
  };

  // const handleSortChange = (e) => {
  //   const selectedSortParam = e.target.value;
  //   setSortParam(selectedSortParam);
  //   setItems([]);
  // };

  return (
    <div>
      <h2>Item List</h2>
      <div>
        {/* <label>
          Sort By:
          <select value={sortParam} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </label> */}
        <form onSubmit={handlePriceSubmit}>
          <label>
            Minimum Price:
            <input type="number" value={minPrice} onChange={handleMinPriceChange} />
          </label>
          <button type="submit">Apply Filter</button>
        </form>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.name} onClick={() => handleItemClick(item)}>
            <img src={item.imageURL} alt={item.name} />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
