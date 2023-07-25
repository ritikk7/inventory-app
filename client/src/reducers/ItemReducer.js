const itemReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'SELECT_ITEM':
      return {
        ...state,
        selectedItem: action.payload,
      };
    case 'DELETE_ITEM':
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
      }; 
    default:
      return state;
  }
};

export default itemReducer;
  