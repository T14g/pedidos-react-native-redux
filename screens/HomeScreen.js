import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { connect } from 'react-redux';

import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Modal, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { MonoText } from '../components/StyledText';
import { pedidosFetchStart, getLastID, deletePedido, updatePedido } from '../redux/pedido/pedido.actions';
// import { getLastID } from '../redux/pedido/pedido-saga';

class HomeScreen extends React.Component {

  state = { isEditing: false, tempPedido: null }

  componentDidMount(){
    const { fetchPedidos, getLastID } = this.props;
    getLastID();
    fetchPedidos();
  }

  startEditing = (pedido) => {
    this.setState({isEditing: true, tempPedido: pedido});
    // console.log(pedido)
  }


  render(){
    let { pedidos, deletePedidoByID, updatePedidoNow } = this.props;
    const { modalVisible,isEditing } = this.state;
    pedidos = pedidos ? pedidos : [];

  if(!isEditing){
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        {
          pedidos.map(p => {
            let { id, nome , pedido, valor,descr } = p;
            return (
            <View key={id} style={styles.pedidoContainer}>
              <Text>Id:{id} |Cliente :{nome} | Pedido: {pedido}| Valor: {valor}</Text>
              <Text>Descrição: {descr}</Text>

              <TouchableOpacity  
              onPress={() => this.startEditing(p)}
              style={styles.helpLink}
              >
                <Text style={styles.helpLinkText}>EDIT</Text>
              </TouchableOpacity>

              <TouchableOpacity  
              onPress={() => deletePedidoByID(id)}
              style={styles.helpLink}
              >
                <Text style={styles.helpLinkText}>DELETE</Text>
              </TouchableOpacity>
            </View>
            )
          })
        }
      </ScrollView>
    </View>
  )}else{
    const { tempPedido } = this.state;
    const { id, nome , pedido, valor,descr } = tempPedido;
    // console.log(tempPedido);

    return(
      <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
      <TextInput
      placeholder="Pedido"
      value={pedido}
      onChangeText={(data)=> this.setState({tempPedido: {...tempPedido, pedido: data}})}
      style={styles.textInputStyle2}
      />

      <TextInput
      placeholder="Nome do cliente"
      value={nome}
      onChangeText={(data)=> this.setState({tempPedido: {...tempPedido, nome: data}})}
      style={styles.textInputStyle2}
      />

      <TextInput
      placeholder="Valor do pedido"
      value={valor}
      onChangeText={(data)=> this.setState({tempPedido: {...tempPedido, valor: data}})}
      style={styles.textInputStyle2}
      />

      <TextInput
      placeholder="Descrição do pedido"
      value={descr}
      onChangeText={(data)=> this.setState({tempPedido: {...tempPedido, descr: data}})}
      style={styles.textInputStyleMulti2}
      multiline={true}
      />

      <TouchableOpacity
      onPress={ () => updatePedidoNow(tempPedido)}
      style={styles.button2}>
      <Text style={styles.buttonText2}>Salvar Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={() => this.setState({ isEditing: false, tempPedido: null})}
      style={styles.button2}>
      <Text style={styles.buttonText2}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
    )
  };
}
}

HomeScreen.navigationOptions = {
  header: 'null',
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  pedidoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  container2: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer2: {
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  textInputStyle2: {
    textAlign: 'left',
    width: '100%',
    paddingLeft:8,
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 23,
    marginBottom: 8
  },
  textInputStyleMulti2: {
    textAlignVertical:'top',
    width: '100%',
    paddingLeft: 8,
    height:150,
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 20,
  },
  button2: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: 'black',
    marginTop: 10,
  },
  buttonText2: {
    textAlign: 'center',
    color: 'white',
  },
  text2: {
    textAlign: 'center',
    fontSize: 30,
  },
});

const mapStateToProps = (state) => ({
  pedidos : state.pedido.pedidos
});

const  mapDispatchToProps = (dispatch) => ({
  fetchPedidos : () => dispatch(pedidosFetchStart()),
  getLastID : () => dispatch(getLastID()),
  deletePedidoByID : (id) => dispatch(deletePedido(id)),
  updatePedidoNow : (pedido) => dispatch(updatePedido(pedido))
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);