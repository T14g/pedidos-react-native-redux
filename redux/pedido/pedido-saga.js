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
    lastID = JSON.parse(lastID);
    let id = 0;

    if(lastID != 'null'){
      id = lastID; 
    } 

    yield put(setLastID(id));  
    
  }catch(error) {
    console.log(error);
  }
}

export function* deleteAll() {
  try{
    yield AsyncStorage.setItem('pedidos', JSON.stringify([]));
    yield AsyncStorage.setItem('lastID', 'null');
    yield put(setLastID(0));
  }catch(error) {
    console.log(error);
  }
}

export function* deleteById(action) {
  const { payload } = action;
  let newAr = [];

  try{
    yield AsyncStorage.getItem('pedidos').then(
          pedidos => {
            console.log("testando")
            if(pedidos){
              console.log("deletando")
              ar = JSON.parse(pedidos);
              newAr = ar.filter(a => a.id!== payload);

              AsyncStorage.setItem('pedidos', JSON.stringify(newAr));
              
            }
          }
        )

        yield put(pedidosFetchSuccess(newAr));
    }catch(error){
      console.log(error);
    }
      
}

// export function* deletePedidoByID(action){
//   const { payload } = action;
//   console.log("OOWOWOWOWOW");

//   yield AsyncStorage.getItem('pedidos').then(
//     pedidos => {
//       console.log("testando")
//       if(pedidos){
//         console.log("deletando")
//         ar = JSON.parse(pedidos);
//         let newAr = ar.filter(a.id!== payload);

//         console.log(newAr);
        
//         // AsyncStorage.setItem('pedidos', JSON.stringify(ar));
//       }
      
//     }
//   )
// }
 
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

export function* deletePedido() {
  yield takeEvery('DELETE_PEDIDO', deleteById);
}

export function* pedidoSagas() {
    yield all([
      call(pedidoAddStart), 
      call(pedidosFetchtart), 
      call(deleteAllPedidos), 
      call(getLastID),
      call(deletePedido)
    ])
}