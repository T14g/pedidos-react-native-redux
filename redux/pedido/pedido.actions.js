import PedidoActionTypes from './pedido.types';

export const pedidoAddStart = pedido =>({
    type: 'PEDIDO_ADD_START',
    payload: pedido
});

export const pedidoAddSuccess = (pedidos) =>({
    type: 'PEDIDO_ADD_SUCCESS',
    payload: pedidos
});

export const pedidoAddFail = (error) =>({
    type: PedidoActionTypes.PEDIDO_ADD_FAIL,
    payload: error
});