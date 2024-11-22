import { View, Text, StyleSheet, Pressable, Image, FlatList, TextInput } from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"

const HandBook = () => {
    const naviHa = useNavigation();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [qrCode, setQrCode] = useState(
        "https://654325f301b5e279de1ff315.mockapi.io/api/v1/user"
    )
    useEffect(() => {
        getNews()
    }, [qrCode])
    const getNews = async () => {
        setLoading(true)
        await fetch("https://newsdata.io/api/1/news?apikey=pub_33817781db157be4a660191a63e354de13398&q=covid ")
            .then((res) => res.json())
            .then((res) => {
                setData(res.results)
                setQrCode('')
                console.log(data)
            })
            .catch((e) => console.log(e))
        setLoading(false)
    }
    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                <Pressable onPress={() => { naviHa.navigate("Tab_bottom") }}>
                    <View style={styles.title1}>
                        <Icon name="arrow-back-outline" size={28} color={"#FFFFFF"} />
                    </View>
                </Pressable>
                <Text style={styles.text1}>Cẩm nang y tế</Text>
            </View>
            <View style={styles.view2}>

                <FlatList
                    data={data}
                    renderItem={({ item }) =>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ height: 100, width: '90%', backgroundColor: '#fff', borderRadius: 15 }}>
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <Image style={{ height: 100, width: 100, resizeMode: 'contain' }} source={{ uri: item.image_url }} />
                                    <View style={{ gap: 10 }}>
                                        <TextInput
                                            style={{fontWeight: 'bold', width: 240}}
                                            editable={false}
                                            multiline
                                            numberOfLines={3}
                                            value={item.title}
                                             />
                                        <Text style={{ fontSize: 10, color: 'gray' }}>{item.pubDate}</Text>

                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
        </View>
    )
}

export default HandBook

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2b83f9",
        //backgroundImage: 'linear-gradient(to right, #2b83f9, #47a6fa)',
        alignItems: "center",
        justifyContent: "center",
    },
    schedule: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        // backgroundColor: "#DEBDBD",
    },
    btn: {
        // backgroundColor: "#DC9F9F",
        width: "50%",
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    viewBtn: {
        // backgroundColor: "#4B6382",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "10%",
    },
    view1: {
        flexDirection: 'row',
        // backgroundColor: "#B9DDFF",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 100,
        marginTop:60
    },
    view2: {
        backgroundColor: "#f1f9ff",
        width: "100%",
        height: "98%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    text1: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    text2: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#000000",
    },
    title1: {
        // backgroundColor: "#FFD6D6",
        width: "10%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
})