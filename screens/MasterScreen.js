import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text,Button  } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { pedidoAddStart, pedidosFetchStart, deleteAllPedidos } from "../redux/pedido/pedido.actions";


class MasterScreen extends React.Component{
  render() {

    const { deleteAll } = this.props;
    return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
  
      <TouchableOpacity
      onPress={deleteAll}
      style={styles.button}>
      <Text style={styles.buttonText}>Apagar todos os pedidos</Text>
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
  deleteAll : () => dispatch(deleteAllPedidos())
})

export default connect(null, mapDispatchToProps)(MasterScreen)
