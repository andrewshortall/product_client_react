import {
  PRODUCT_LOAD_ALL,
  PRODUCT_LOAD_ALL_SUCCESS,
  PRODUCT_LOAD_ALL_FAIL,
  PRODUCT_LOAD,
  PRODUCT_LOAD_SUCCESS,
  PRODUCT_LOAD_FAIL,
  PRODUCT_CREATE,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from '../actions/productActions';

const initialState = {
  loading: false,
  loaded: false,
  
  creating: false,
  created: false,

  updating: false,
  updated: false,

  deleting: false,
  deleted: false,

  ids: [],
  entities: {},
  products: [],
  error: null
}

// Reducer
export default (state = initialState, action) => {
  const ids = [];
  const entities = {};
  let products = [];

  console.log('sele', action);

  console.log(state);
  switch (action.type) {
    // Load all products
    case PRODUCT_LOAD_ALL:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null
      };

    case PRODUCT_LOAD_ALL_SUCCESS:
      action.products.forEach(product => {
        ids.push(product.uuid);
        entities[product.uuid] = product;
      });
      products = action.products;
      return {
        ...state,
        loading: false,
        loaded: true,
        ids,
        entities,
        products
      };

    case PRODUCT_LOAD_ALL_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.error
      };

    // Load product
    case PRODUCT_LOAD:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null
      };

    case PRODUCT_LOAD_SUCCESS:
      ids.push(product.uuid);
      entities[product.uuid] = action.product;
      ids.forEach(id => products.push(entities[id]));
      return {
        ...state,
        loading: false,
        loaded: true,
        ids,
        entities,
        
      };

    case PRODUCT_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.error
      };

    // Create product
    case PRODUCT_CREATE:
      return {
        ...state,
        creating: true,
        created: false,
        error: null
      };

    case PRODUCT_CREATE_SUCCESS:
      ids.push(product.uuid);
      entities[product.uuid] = action.product;
      ids.forEach(id => products.push(entities[id]));
      return {
        ...state,
        creating: false,
        created: true,
        products
      };

    case PRODUCT_CREATE_FAIL:
      return {
        ...state,
        creating: false,
        created: true,
        error: action.error
      };
    
    // Update product
    case PRODUCT_UPDATE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null
      };

    case PRODUCT_UPDATE_SUCCESS:
      entities[product.id] = action.product;
      ids.forEach(id => products.push(entities[id]));
      return {
        ...state,
        updating: false,
        updated: true,
        ids,
        entities,
        products
      };

    case PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        updating: false,
        updated: true,
        error: action.error
      };

    // Delete product
    case PRODUCT_DELETE:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null
      };

    case PRODUCT_DELETE_SUCCESS:
      console.log('succ', action);
      ids = ids.filter(id => id !== uuid);
      entities[uuid] = undefined;
      ids.forEach(id => products.push(entities[id]));
      return {
        ...state,
        deleting: false,
        deleted: true,
        ids,
        entities,
        products
      };

    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        deleting: false,
        deleted: true,
        error: action.error
      };
      
    default:
      return state
  }
}
