import PedidoActionTypes from './pedido.types';

export const pedidoAddStart = pedido => ({
    type: 'PEDIDO_ADD_START',
    payload: pedido
});

export const pedidoAddSuccess = pedidos => ({
    type: 'PEDIDO_ADD_SUCCESS',
    payload: pedidos
});

export const getTotalPedidos = (total) => ({
    type: 'GET_TOTAL_PEDIDOS',
    payload: total
});

export const pedidoAddFail = error => ({
    type: 'PEDIDO_ADD_FAIL',
    payload: error
});

export const pedidosFetchStart = () => ({
    type: 'PEDIDOS_FETCH_START'
});

export const pedidosFetchSuccess = pedidos => ({
    type: 'PEDIDOS_FETCH_SUCCESS',
    payload: pedidos
});

export const pedidosFetchFail = error =>({
    type: 'PEDIDOS_FETCH_FAIL',
    payload: error
});

export const deleteAllPedidos = () => ({
    type: 'DELETE_ALL_PEDIDOS'
});