import { Data } from '@symbiotejs/symbiote';
import { LS_TODO_LIST } from '../constants';

const store = () => {
  const lSData = localStorage.getItem(LS_TODO_LIST);

  Data.registerNamedCtx('todo-list', {
    count: JSON.parse(lSData)?.length || 0,
    items: JSON.parse(lSData) || [],
  });

  const getCtx = () => Data.getNamedCtx('todo-list');
  const getItems = () => getCtx().read('items');
  const getCount = () => getCtx().read('count');
  const updateItems = payload => getCtx().pub('items', payload);
  const updateCount = payload => getCtx().pub('count', payload);
  const onItemsUpdate = (cb) => getCtx().sub('items', (items) => {
    localStorage.setItem(LS_TODO_LIST, JSON.stringify(items));

    cb(items);
  });

  return {
    getCtx,
    getItems,
    getCount,
    updateItems,
    updateCount,
    onItemsUpdate,
  };
};

export default store();
