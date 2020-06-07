import PedidoActionTypes from './pedido.types';

const INITIAL_STATE = {
    pedidos : [],
    total: 0,
    error: null,
    lastID: 0,
};

const pedidoReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'PEDIDO_ADD_SUCCESS':
            return {
                ...state,
                error: null,
                total: state.total + 1,
                pedidos: [...state.pedidos, action.payload]
        }

        case 'SET_LAST_ID':
            return{
                ...state,
                lastID: action.payload
            }
        
        case 'PEDIDOS_FETCH_SUCCESS':
            return {
                ...state,
                error: null,
                pedidos : action.payload
            }
        
        case 'DELETE_ALL_PEDIDOS':
            return {
                ...state,
                error: null,
                total: 0,
                pedidos: []
            }
        case 'GET_TOTAL_PEDIDOS':
            return {
                ...state,
                total: action.payload
            }
        
        case 'PEDIDO_FETCH_FAIL':
            return {
                ...state,
                error : action.payload
            }

        case 'ADD_PEDIDO_FAIL':
        return {
            ...state,
            error: action.payload
        }
        default:
            return state;
    }
}

export default pedidoReducer;