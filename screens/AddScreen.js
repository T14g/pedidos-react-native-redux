import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text,Button  } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { pedidoAddStart, pedidosFetchStart } from "../redux/pedido/pedido.actions";
// import { useNavigation } from '@react-navigation/native';

// const goEdit = () => {
//   const navigation = useNavigation();
//   navigation.navigate('home');
// }


class AddScreen extends React.Component{

  state = { inputPedido: '', inputCliente: '', inputValor: '', inputDescr: '' };

  handleSave = () => {
    const { pedidoAddStart, lastID } = this.props;
    const { inputPedido, inputCliente, inputValor, inputDescr } = this.state;
    const pedido = {id: lastID +1 ,status: 'pendente', nome: inputCliente, pedido: inputPedido, valor: inputValor, descr: inputDescr};
   
    
    if(inputCliente && inputPedido && inputValor && inputDescr){
      alert("Pedido salvo");
      pedidoAddStart(pedido);
      // this.setState({inputPedido: '', inputCliente: '', inputValor: '', inputDescr: ''});
    }else{
      alert("Preencha todos os campos!");
    }

    } 
  

  render() { 
    const { inputPedido, inputCliente, inputValor, inputDescr } = this.state;
    const { pedidoAddStart, pedidoFetch } = this.props;
   
    return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

      <TextInput
      placeholder="Pedido"
      value={inputPedido}
      onChangeText={(data)=> this.setState({inputPedido : data})}
      style={styles.textInputStyle}
      />

      <TextInput
      placeholder="Nome do cliente"
      value={inputCliente}
      onChangeText={(data)=> this.setState({inputCliente : data})}
      style={styles.textInputStyle}
      />

      <TextInput
      placeholder="Valor do pedido"
      value={inputValor}
      onChangeText={(data)=> this.setState({inputValor : data})}
      style={styles.textInputStyle}
      />

      <TextInput
      placeholder="Descrição do pedido"
      value={inputDescr}
      onChangeText={(data)=> this.setState({inputDescr : data})}
      style={styles.textInputStyleMulti}
      multiline={true}
      />

      <TouchableOpacity
      onPress={this.handleSave}
      style={styles.button}>
      <Text style={styles.buttonText}>Salvar Pedido</Text>
      </TouchableOpacity>

          

    </ScrollView>
  );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  textInputStyle: {
    textAlign: 'left',
    width: '100%',
    paddingLeft:8,
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 23,
    marginBottom: 8
  },
  textInputStyleMulti: {
    textAlignVertical:'top',
    width: '100%',
    paddingLeft: 8,
    height:150,
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 20,
  },
  button: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: 'black',
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
  },
});

const mapDispatchToProps = dispatch =>({
  pedidoAddStart : (p) => dispatch(pedidoAddStart(p)),
  pedidoFetch : () => dispatch(pedidosFetchStart())
});

const mapStateToProps = (state) => ({
  total: state.pedido.total,
  lastID: state.pedido.lastID
});

export default connect(mapStateToProps, mapDispatchToProps)(AddScreen)
