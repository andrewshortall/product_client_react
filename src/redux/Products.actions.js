// Products action types
export const PRODUCT_LOAD_ALL = 'PRODUCT/LOAD_ALL';
export const PRODUCT_LOAD_ALL_SUCCESS = 'PRODUCT/LOAD_ALL_SUCCESS';
export const PRODUCT_LOAD_ALL_FAIL = 'PRODUCT/LOAD_ALL_FAIL';

export const PRODUCT_LOAD = 'PRODUCT/LOAD';
export const PRODUCT_LOAD_SUCCESS = 'PRODUCT/LOAD_SUCCESS';
export const PRODUCT_LOAD_FAIL = 'PRODUCT/LOAD_FAIL';

export const PRODUCT_CREATE = 'PRODUCT/CREATE';
export const PRODUCT_CREATE_SUCCESS = 'PRODUCT/CREATE_SUCCESS';
export const PRODUCT_CREATE_FAIL = 'PRODUCT/CREATE_FAIL';

export const PRODUCT_UPDATE = 'PRODUCT/UPDATE';
export const PRODUCT_UPDATE_SUCCESS = 'PRODUCT/UPDATE_SUCCESS';
export const PRODUCT_UPDATE_FAIL = 'PRODUCT/UPDATE_FAIL';

export const PRODUCT_DELETE = 'PRODUCT/DELETE';
export const PRODUCT_DELETE_SUCCESS = 'PRODUCT/DELETE_SUCCESS';
export const PRODUCT_DELETE_FAIL = 'PRODUCT/DELETE_FAIL';

/**
 * Action to load all products and put them into the store
 */
export const loadAllProducts = () => ({ type: PRODUCT_LOAD_ALL });

/**
 * Action to load a specific product and put it into the store
 * @param {string} uuid the uuid of the product
 */
export const loadProduct = (uuid) => ({ type: PRODUCT_LOAD, uuid });

/**
 * Action to create a product and put the response into the store
 * @param {string} data the data to send in the request
 */
export const createProduct = (data) => ({ type: PRODUCT_CREATE, data });

/**
 * Action to update an existing product and edit its value in the store
 * @param {string} uuid the uuid of the product
 * @param {string} data the data to send in the request
 */
export const updateProduct = (uuid, data) => ({ type: PRODUCT_UPDATE, payload: { uuid, data } });

/**
 * Action to delete an existing product and remove its value from the store
 * @param {string} uuid the uuid of the product
 */
export const deleteProduct = (uuid) => ({ type: PRODUCT_DELETE, uuid });
