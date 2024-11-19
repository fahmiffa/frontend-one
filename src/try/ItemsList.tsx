import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { removeItem } from './itemsSlice';

const ItemsList: React.FC = () => {
  const items = useSelector((state: RootState) => state.items.items);
  const dispatch = useDispatch();

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item} <button onClick={() => dispatch(removeItem(index))}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemsList;
