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
} from './products.actions';
import { put, takeLatest, takeEvery, all, call } from 'redux-saga/effects';
import { httpService } from 'midgard/modules/http/http.service';
import { environment } from 'environment';

function* loadAllProducts() {
  try {
    const products = yield call(httpService.makeRequest, 'get', `${environment.API_URL}products/products/`, {}, true);
    yield [
      yield put({ type: PRODUCT_LOAD_ALL_SUCCESS, products: products.data.results })
    ];
  } catch(error) {
    yield put({ type: PRODUCT_LOAD_ALL_FAIL, error });
  }
}

function* loadProduct() {
  try {
    const product = yield call(httpService.makeRequest, 'get', `${environment.API_URL}products/products/${payload.uuid}/`, {}, true);
    yield [
      yield put({ type: PRODUCT_LOAD_SUCCESS, product: product.data })
    ];
  } catch(error) {
    yield put({ type: PRODUCT_LOAD_FAIL, error });
  }
}

function* createProduct(payload) {
  try {
    const product = yield call(httpService.makeRequest, 'post', `${environment.API_URL}products/products/`, payload.data, true);
    yield [
      yield put({ type: PRODUCT_CREATE_SUCCESS, product: product.data })
    ];
  } catch(error) {
    yield put({ type: PRODUCT_CREATE_FAIL, error });
  }
}

function* updateProduct(payload) {
  try {
    const product = yield call(httpService.makeRequest, 'put', `${environment.API_URL}products/products/${payload.payload.uuid}/`, payload.payload.data, true);
    yield [
      yield put({ type: PRODUCT_UPDATE_SUCCESS, product: product.data })
    ];
  } catch(error) {
    yield put({ type: PRODUCT_UPDATE_FAIL, error });
  }
}

function* deleteProduct(payload) {
  try {
    yield call(httpService.makeRequest, 'delete', `${environment.API_URL}products/products/${payload.uuid}/`, {}, true);
    yield [
      yield put({ type: PRODUCT_DELETE_SUCCESS, uuid: payload.uuid })
    ];
  } catch(error) {
    yield put({ type: PRODUCT_DELETE_FAIL, error });
  }
}

function* watchLoadAllProducts() {
  yield takeLatest(PRODUCT_LOAD_ALL, loadAllProducts)
}

function* watchLoadProduct() {
  yield takeLatest(PRODUCT_LOAD, loadProduct)
}

function* watchCreateProduct() {
  yield takeLatest(PRODUCT_CREATE, createProduct)
}

function* watchUpdateProduct() {
  yield takeEvery(PRODUCT_UPDATE, updateProduct)
}

function* watchDeleteProduct() {
  yield takeEvery(PRODUCT_DELETE, deleteProduct)
}

export default function* productsSaga() {
  yield all([
    watchLoadAllProducts(),
    watchLoadProduct(),
    watchCreateProduct(),
    watchUpdateProduct(),
    watchDeleteProduct(),
  ]);
}
