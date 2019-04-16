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
 * Load all products action
 */
export const loadAllProducts = () => ({ type: PRODUCT_LOAD_ALL });

/**
 * Load product action
 * @param id
 */
export const loadProduct = (uuid) => ({ type: PRODUCT_LOAD, uuid });

/**
 * Create product action
 * @param data
 */
export const createProduct = (data) => ({ type: PRODUCT_CREATE, data });

/**
 * Update product action
 * @param id
 * @param data
 */
export const updateProduct = (uuid, product) => ({ type: PRODUCT_UPDATE, payload: { uuid, product } });

/**
 * Delete product action
 * @param id
 */
export const deleteProduct = (uuid) => ({ type: PRODUCT_DELETE, uuid });
