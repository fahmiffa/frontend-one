import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './itemsSlice';

const AddItemForm: React.FC = () => {
  const [item, setItem] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      dispatch(addItem(item));
      setItem('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
