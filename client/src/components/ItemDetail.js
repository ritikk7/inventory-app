import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, selectItem } from '../actions/ItemActions';

const ItemDetail = () => {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.selectedItem);

  const handleCloseDetail = () => {
    dispatch(selectItem(null));
  };

  const handleDeleteItem = () => {
    // dispatch(deleteItem(selectedItem.id));
    axios.delete(`http://localhost:3001/items/${selectedItem.id}`)
      .then(response => {
        console.log(`The item ${response.data[0].name} was deleted.`);
      })
      .catch(error => console.error(`There was an error deleting the item: ${error}`));
    handleCloseDetail();
  };

  return (
    <div className="overlay">
      <div className="item-detail">
        <h2>{selectedItem.itemName}</h2>
        <img src={selectedItem.imageURL} alt={selectedItem.itemName} />
        <p>Description: {selectedItem.description}</p>
        <p>Price: ${selectedItem.price}</p>
        <button onClick={handleCloseDetail}>Close</button>
        <button onClick={handleDeleteItem}>Delete</button>
      </div>
    </div>
  );
};

export default ItemDetail;
