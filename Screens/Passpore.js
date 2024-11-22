import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    TextInput,
  } from "react-native"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
  
const Passpore = () => {
    const naviPa = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.view1}>
            <Pressable onPress={() => { naviPa.navigate("Tab_bottom") }}>
                <View style={styles.title1}>
                <Icon name="arrow-back-outline" size={28} color={"#FFFFFF"} />
                </View>
            </Pressable>
            <Text style={styles.text1}>Hộ chiếu vắc-xin</Text>
            </View>
            <View style={styles.view2}>
            <View style={styles.notify}>
                <Text>Không có dữ liệu</Text>
            </View>
            </View>
        </View>
    )
  }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2b83f9",
        //backgroundImage: 'linear-gradient(to right, #2b83f9, #47a6fa)',
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        width: "90%",
        borderRadius: 20,
        color: "black",
    },
    notify: {
        // backgroundColor: "#DEBDBD",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 10,
    },
    view1: {
        flexDirection: 'row',
        // backgroundColor: "#B9DDFF",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "13%",
    },
    view2: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: "87%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    text1: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    title1: {
        // backgroundColor: "#FFD6D6",
        width: "10%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
})
  
export default Passpore
  