import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addItem } from '../actions/ItemActions';

const ItemForm = () => {
  const [itemId, setItemId] = useState(null);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    fetchLatestItemId();
  }, []);

  const fetchLatestItemId = () => {
    axios
      .get('http://localhost:3001/items/latestId')
      .then(response => {
        setItemId(response.data.latestId + 1);
      })
      .catch(error => console.error(`There was an error fetching the latest item ID: ${error}`));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new item object
    const newItem = {
      id: itemId,
      name: itemName,
      description,
      price,
      imageURL,
    };

    axios.post('http://localhost:3001/items', newItem)
      .then(response => {
        console.log(response.data);
        setItemId(itemId+1);
      })
      .catch(error => console.error(`There was an error posting the new item: ${error}`));

    // Dispatch the addItem action
    // dispatch(addItem(newItem));

    // Clear form inputs
    setItemName('');
    setDescription('');
    setPrice('');
    setImageURL('');
  };

  const handleClear = () => {
    setItemName('');
    setDescription('');
    setPrice('');
    setImageURL('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Item</h2>
      <label>
        Item Name:
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
      </label>
      <button type="submit">Add</button>
      <button type="button" onClick={handleClear}>Clear</button>
    </form>
  );
};

export default ItemForm;
