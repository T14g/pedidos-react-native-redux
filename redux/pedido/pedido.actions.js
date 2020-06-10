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

export const updatePedido = id => ({
    type: 'UPDATE_PEDIDO',
    payload: id
})

export const getLastID = () => ({
    type: 'GET_LAST_ID'
});

export const setLastID = id => ({
    type: 'SET_LAST_ID',
    payload: id
});

export const deletePedido = id => ({
    type: 'DELETE_PEDIDO',
    payload: id
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

export const setPedidoOk = id => ({
    type: 'SET_PEDIDO_OK',
    payload: id
})