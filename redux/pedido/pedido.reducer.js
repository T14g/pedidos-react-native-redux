import PedidoActionTypes from './pedido.types';

const INITIAL_STATE = {
    pedidos : [],
    error: null
};

const pedidoReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'PEDIDO_ADD_SUCCESS':
            return {
                ...state,
                error: null,
                pedidos: action.payload
            }

            case PedidoActionTypes.ADD_PEDIDO_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default pedidoReducer;