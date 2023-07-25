export const addItem = (item) => {
    return {
        type: 'ADD_ITEM',
        payload: item,
    };
};

export const selectItem = (item) => {
    return {
        type: 'SELECT_ITEM',
        payload: item,
    };
};

export const deleteItem = (itemId) => {
    return {
      type: 'DELETE_ITEM',
      payload: itemId,
    };
};

export const updateItems = (items) => {
    return {
        type: 'UPDATE_ITEMS',
        payload: items,
    };
};