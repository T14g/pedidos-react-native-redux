import { delay, takeEvery , put, all, call, takeLatest } from 'redux-saga/effects';
import PedidoActionTypes from './pedido.types';
import { pedidoAddSuccess, pedidoAddFail, pedidosFetchSuccess, pedidosFetchFail } from './pedido.actions';
import AsyncStorage from '@react-native-community/async-storage';


 
export function* addPedido(action) {
    const { payload } = action;

    try{
        var ar = [];

        AsyncStorage.getItem('pedidos').then(
            pedidos => {
              if(pedidos){
                console.log(pedidos)
                ar = JSON.parse(pedidos);
                p = payload; 
                ar.push(p);
                AsyncStorage.setItem('pedidos', JSON.stringify(ar));
    
              }else{
                p = payload;
                console.log("sem pedidos ainda")
                ar.push(p);
                AsyncStorage.setItem('pedidos', JSON.stringify(ar));
              }
              
            }
          )

          yield put(pedidoAddSuccess(payload));
    }catch{
        yield put(pedidoAddFail(error));
    }
}


  
export function* fetchPedidos() {
  const arrayOutside = []; 

  try {
    let pedidos = yield AsyncStorage.getItem('pedidos');
    pedidos = JSON.parse(pedidos);
    yield put(pedidosFetchSuccess(pedidos));
    
  }catch{
    yield put(pedidosFetchFail(error));
  }
}

export function* pedidoAddStart() {
    yield takeLatest('PEDIDO_ADD_START', addPedido);
}

export function* pedidosFetchtart() {
  yield takeLatest('PEDIDOS_FETCH_START', fetchPedidos);
}

export function* pedidoSagas() {
    yield all([call(pedidoAddStart), call(pedidosFetchtart)])
}