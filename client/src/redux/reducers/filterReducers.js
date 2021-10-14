
const FILTER_OPEN = 'FILTER_OPEN'
const FILTER_CLOSE = 'FILTER_CLOSE'

export const filterReducer = (
    state = {show:false},
    action
  ) => {
    switch (action.type) {
      case FILTER_OPEN:
        return {
         show:action.payload
        };
      case FILTER_CLOSE:
        return {
         show:action.payload
        };
      default:
        return state;
    }
  };