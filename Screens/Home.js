import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, Pressable, FlatList } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import List from "../data/ListData.json"
import { useNavigation } from "@react-navigation/native"
import Tab_bottom from "./Tab_bottom"

export default function Home({ route }) {
    const naviHome = useNavigation()
    const [users, setUsers] = useState([])
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const user = route.params?.user; // Nhận thông tin user từ Tab_bottom
    const [qrCode, setQrCode] = useState(
        "https://654325f301b5e279de1ff315.mockapi.io/api/v1/user"
    )
    useEffect(() => {
        getUsers()
    }, [qrCode])

    const getUsers = async () => {
        setLoading(true)
        await fetch("https://654325f301b5e279de1ff315.mockapi.io/api/v1/user")
            .then((res) => res.json())
            .then((res) => {
                setUsers(res)
                console.log(name)
                res.forEach((element) => {

                    if (element.login) {
                        setName(element.userName)
                    }
                })
                setQrCode('')
            })
            .catch((e) => console.log(e))
        setLoading(false)
    }
    return (
        <View style={styles.container}>
            {/* Thông tin người dùng */}
            <View style={styles.infoArea}>
                <View style={styles.circle}>
                    <Icon name="person" size={40} color={"#a6a8aa"} />
                </View>
                <View style={styles.NameArea}>
                    <Text style={styles.text_hello}>Xin chào</Text>
                    <Text style={styles.text_name}>{user?.userName}</Text>
                </View>
            </View>

            {/* Các nút chức năng */}
            <View style={styles.btnArea}>
                <Pressable style={styles.btn1} onPress={() => { naviHome.navigate('Declare') }}>
                    <Image
                        style={styles.imgSty}
                        source={require("../images/icons/pic115.png")}
                    />
                    <Text style={styles.text_btn}>Khai báo</Text>
                    <Text style={styles.text_btn}>Y tế</Text>
                </Pressable>
                <Pressable style={styles.btn2} onPress={() => { naviHome.navigate('Certification', { user }) }}>
                    <Image
                        style={styles.imgSty}
                        source={require("../images/icons/pic127.png")}
                    />
                    <Text style={styles.text_btn}>Chứng nhận</Text>
                    <Text style={styles.text_btn}>ngừa Covid</Text>
                </Pressable>
                <Pressable style={styles.btn3} onPress={() => { alert("Không có dữ liệu") }}>
                    <Image
                        style={styles.imgSty}
                        source={require("../images/icons/pic129.png")}
                    />
                    <Text style={styles.text_btn}>Tư vấn</Text>
                    <Text style={styles.text_btn}>sức khỏe f0</Text>
                </Pressable>
            </View>

            {/* Footer với danh sách */}
            <View style={styles.footerArea}>
                <FlatList
                    numColumns={3}
                    data={List}
                    columnWrapperStyle={{ gap: 10, marginTop: 10 }}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => {
                            if (item.id == 6) {
                                naviHome.navigate('More')
                            }
                            else if (item.id == 5) {
                                naviHome.navigate('Advise')
                            }
                            else if (item.id == 4) {
                                naviHome.navigate('DocHealth', { userID: user.id })
                            }
                            else if (item.id == 3) {
                                naviHome.navigate('HealthFacilities', { userID: user.id })
                            }
                            else if (item.id == 2) {
                                naviHome.navigate('ResVacxin')
                            }
                            else if (item.id == 1) {
                                naviHome.navigate('Passpore', { userID: user.id })

                            }
                            else {
                                alert("khac")
                            }
                        }}
                        >
                            <View style={styles.item_container}>
                                <Image style={styles.btn_img} source={{ uri: item.img }} />
                                <View style={{ alignItems: "center", width: 100 }}>
                                    <Text style={styles.text_item}>{item.name}</Text>
                                </View>
                            </View>
                        </Pressable>
                    )}
                />

                {/* Cẩm nang y tế */}
                <View style={styles.newpaper_text}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, color: "#353b42" }}>
                        Cẩm nang y tế
                    </Text>
                    <Pressable onPress={() => { naviHome.navigate('HandBook') }}>
                        <Text style={{ color: "#5e83d4" }}>Tất cả</Text>
                    </Pressable>
                </View>
                <FlatList
                    data={[
                        {
                            name: "Cam nang so suc khoe dien tu",
                            img: "../images/bao1.png",
                        },
                        {
                            name: "Cam nang so suc khoe dien tu",
                            img: "../images/bao2.png",
                        },
                    ]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Pressable>
                            <View style={styles.newpp_container}>
                                <Image style={styles.pp_img} source={{ uri: item.img }} />
                                <Text>{item.name}</Text>
                            </View>
                        </Pressable>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 15,
        paddingTop: 10,
    },
    infoArea: {
        flexDirection: "row",
        gap: 10,
        width: "90%",
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 70,
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#99c3fb",
        shadowOpacity: 1,
        borderColor: "#3c8dfc",
    },
    NameArea: {
        justifyContent: "center",
    },
    text_hello: {
        fontSize: 20,
        color: "#a1a1a4",
    },
    text_name: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#16222a",
    },
    text_item: {
        textAlign: "center",
        maxWidth: 80,
    },
    btn1: {
        height: 140,
        width: 100,
        backgroundColor: "#43a1fa",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    btn2: {
        height: 140,
        width: 100,
        backgroundColor: "#61e8ad",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    btn3: {
        height: 140,
        width: 100,
        backgroundColor: "#fe8f8a",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    imgSty: {
        height: 60,
        width: 60,
        resizeMode: "contain",
        marginBottom: 5,
    },
    btnArea: {
        flexDirection: "row",
        gap: 10,
    },
    text_btn: {
        color: "#fff",
    },
    footerArea: {
        width: "100%",
        height: "62%",
        backgroundColor: "#edf0f8",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    btn_img: {
        height: 70,
        width: 70,
        resizeMode: "contain",
    },
    item_container: {
        height: 120,
        width: 120,
        gap: 10,
        alignItems: "center",
    },
    newpaper_text: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
    },
    newpp_container: {
        width: 200,
        height: 135,
        backgroundColor: "#fff",
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    pp_img: {
        height: 100,
        width: 200,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginBottom: 10,
    },
})