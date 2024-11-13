import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const CustomButton = ({onPress, text}) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.input}>{text}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 14,
        marginVertical: 5,
        borderRadius: 80,
        backgroundColor: '#2b83f9',
        //backgroundImage: 'linear-gradient(to right, #2b83f9, #47a6fa)',
        alignItems: 'center',
        
    },
    input: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
})
export default CustomButton