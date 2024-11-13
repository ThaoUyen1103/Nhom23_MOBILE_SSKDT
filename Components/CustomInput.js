import { View, Text,TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({value, setValue, placeholder,secureTextEntry}) => {
  return (
    <View style = {styles.container}>
      <TextInput
      value={value}
      onChangeText={(value)=>setValue(value)}
      style = {styles.input} 
      secureTextEntry = {secureTextEntry}
      placeholderTextColor={'#aaadb4'}
      placeholder={placeholder}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        width: '100%',
        paddingVertical: 10,
        backgroundColor: 'white',
        marginVertical: 5,
        borderRadius: 5,
        paddingHorizontal: 10,

    },
    input:{
        fontSize: 20,
    }
})

export default CustomInput