import React from 'react';
import { useSelector } from 'react-redux';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import './App.css';

function App() {
  const selectedItem = useSelector((state) => state.selectedItem);

  return (
    <div className="App">
      <h1>Inventory Management</h1>
      <ItemForm />
      <ItemList />
      {selectedItem && <ItemDetail />}
    </div>
  );
}

export default App;
