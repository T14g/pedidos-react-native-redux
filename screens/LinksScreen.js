import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text,Button  } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { pedidoAddStart } from "../redux/pedido/pedido.actions";


class LinksScreen extends React.Component{
  render() {

    const { pedidoAddStart } = this.props;
    return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* <OptionButton
        icon="md-school"
        label="Read the Expo documentation"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
      />

      <OptionButton
        icon="md-compass"
        label="Read the React Navigation documentation"
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />

      <OptionButton
        icon="ios-chatboxes"
        label="Ask a question on the forums"
        onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
        isLastOption
      /> */}

      <TextInput
      placeholder="Pedido"
      style={styles.textInputStyle}
      />

      <TextInput
      placeholder="Nome do cliente"
      style={styles.textInputStyle}
      />

      <TextInput
      placeholder="Valor do pedido"
      style={styles.textInputStyle}
      />

      <TextInput
      placeholder="Descrição do pedido"
      style={styles.textInputStyleMulti}
      multiline={true}
      />

      <TouchableOpacity
      style={styles.button}>
      <Text style={styles.buttonText}>Salvar Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity    
      onPress={pedidoAddStart}
      style={styles.button}>
      <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>    

    </ScrollView>
  );
  }
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
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
  pedidoAddStart : () => dispatch(pedidoAddStart({nome: 'zé', pedido: 'uma moto'}))
})

export default connect(null, mapDispatchToProps)(LinksScreen)
