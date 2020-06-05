import { delay, takeEvery , put, all, call } from 'redux-saga/effects';
import PedidoActionTypes from './pedido.types';
import { pedidoAddSuccess} from './pedido.actions';
import AsyncStorage from '@react-native-community/async-storage';

export function* addPedido(action) {
    const { payload } = action;

    try{
        let ar = [];

        AsyncStorage.getItem('pedidos').then(
            pedidos => {
            //   let id = this.lastIdPlusOne(turmas);
    
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
        console.log(payload)
        yield put(pedidoAddSuccess(ar));
    }catch{

    }
}

export function* pedidoAddStart() {
    yield takeEvery('PEDIDO_ADD_START', addPedido);
}

export function* pedidoSagas() {
    yield all([call(pedidoAddStart)])
}