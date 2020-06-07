import { delay, takeEvery , put, all, call, takeLatest } from 'redux-saga/effects';
import { 
  pedidoAddSuccess,   
  pedidoAddFail, 
  pedidosFetchSuccess, 
  pedidosFetchFail, 
  getTotalPedidos,
  setLastID 
} from './pedido.actions';

import AsyncStorage from '@react-native-community/async-storage';


export function* getLastIdAsync() {
  try{
    let lastID = yield AsyncStorage.getItem('lastID');
    let id = 0;

    if(lastID !== 'null'){
      id = JSON.parse(lastID);
    }

    yield put(setLastID(id));  
    
  }catch(error) {
    console.log(error);
  }
}

export function* deleteAll() {
  try{
    yield AsyncStorage.setItem('pedidos', JSON.stringify([]));
    yield AsyncStorage.setItem('lastID', JSON.stringify('null'));
    yield put(setLastID(0));
  }catch(error) {
    console.log(error);
  }
}
 
export function* addPedido(action) {
    const { payload } = action;
    const { id } = payload;
    try{
        let ar = [];

        yield AsyncStorage.getItem('pedidos').then(
            pedidos => {
              if(pedidos){
                ar = JSON.parse(pedidos);
                ar.push(payload);
                AsyncStorage.setItem('pedidos', JSON.stringify(ar));
    
              }else{
                console.log("sem pedidos ainda")
                ar.push(payload);
                AsyncStorage.setItem('pedidos', JSON.stringify(ar));
              }
              
            }
          )
            
          yield AsyncStorage.setItem('lastID', JSON.stringify(id));
          yield put(pedidoAddSuccess(payload));
          yield put(setLastID(id));
    }catch{
        yield put(pedidoAddFail(error));
    }
}


  
export function* fetchPedidos() {
  const arrayOutside = []; 

  try {
    let pedidos = yield AsyncStorage.getItem('pedidos');

    if(pedidos){
      pedidos = JSON.parse(pedidos);
      yield put(pedidosFetchSuccess(pedidos));

      let total = (pedidos.length) ? (pedidos.length) : 0;  
      yield put(getTotalPedidos(total));
    }
    
    
  }catch{
    yield put(pedidosFetchFail(error));
  }
}

export function* deleteAllPedidos() {
  yield takeLatest('DELETE_ALL_PEDIDOS', deleteAll);
}

export function* pedidoAddStart() {
    yield takeLatest('PEDIDO_ADD_START', addPedido);
}

export function* pedidosFetchtart() {
  yield takeLatest('PEDIDOS_FETCH_START', fetchPedidos);
}

export function* getLastID() {
  yield takeLatest('GET_LAST_ID', getLastIdAsync);
}

export function* pedidoSagas() {
    yield all([call(pedidoAddStart), call(pedidosFetchtart), call(deleteAllPedidos), call(getLastID)])
}