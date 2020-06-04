import { combineReducers } from 'redux';

import pedidoReducer from './pedido/pedido.reducer';

const rootReducer = combineReducers({
    pedido: pedidoReducer
});

export default rootReducer;