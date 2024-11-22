import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    ScrollView,
} from "react-native";
import Custominput from "../Components/CustomInput.js";
import CustomButton from "../Components/CustomButton.js";
import { useNavigation } from "@react-navigation/native";

function Screen_login() {
    const navigation = useNavigation();
    const [users, setUsers] = useState([])
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("");

    const editLoginStatus = (userId) => {
        fetch("https://654325f301b5e279de1ff315.mockapi.io/api/v1/user" + `/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            login: true,
          }),
        })
          .then((res) => res.json())
          .then((resJson) => {
            console.log("updated:", resJson)
          })
          .catch((e) => {
            console.log(e)
          })
    }

    const getUsers = async () => {
        setLoading(true)
        await fetch("https://654325f301b5e279de1ff315.mockapi.io/api/v1/user")
          .then((res) => res.json())
          .then((res) => {
            setUsers(res)
            setQrCode('')
            console.log(users)
          })
          .catch((e) => console.log(e))
        setLoading(false)
    }

    const onPressForgot = () => {
        navigation.navigate("Forgot_password");
    };

    const onPressLogin = async () => {
        await getUsers(); //gọi API lấy ds người dùng
        var Correct = false
        let correctUser = null
        users.forEach((element) => {
            if (element.phone === phone && element.password === password) {
                Correct = true
                correctUser = element; //Lưu thông tin người dùng 
                editLoginStatus(element.userId)
            }
        })
        if (correctUser) {
            navigation.navigate("Tab_bottom", { user : correctUser });
        } else {
            alert("Tài khoản không hợp lệ");
        }
  }

    const onPressFingerPrint = () => {
        alert("Đăng nhập bằng dấu vân tay");
    };

    const onPressRegister = () => {
        navigation.navigate("Register");
    };

    
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <View style={styles.login_area}>
                    <View style={styles.login_label}>
                        <Text style={styles.label_text}>Đăng nhập</Text>
                    </View>
                    <View style={styles.input_area}>
                        <Text style={styles.Text_Style}>Số điện thoại</Text>
                        <Custominput
                            placeholder="Nhập nội dung"
                            value={phone}
                            setValue={(phone) => setPhone(phone)}
                        />
                        <Text style={styles.Text_Style}>Mật khẩu</Text>
                        <Custominput
                            placeholder="Nhập mật khẩu"
                            value={password}
                            setValue={(password) => setPassword(password)}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.forgot}>
                        <Pressable onPress={onPressForgot}>
                            <Text style={styles.text_forgot}>Quên mật khẩu?</Text>
                        </Pressable>
                    </View>
                    <View style={styles.button_area}>
                        <CustomButton text={"Đăng nhập"} onPress={onPressLogin} />
                    </View>
                    <View style={styles.finger_print_login_area}>
                        <Pressable
                            style={styles.finger_print_container}
                            onPress={onPressFingerPrint}
                        >
                            <Image
                                source={require("../images/icon_vanTay.png")}
                                style={styles.finger_print}
                            />
                            <Text style={styles.Text_Style}>Đăng nhập bằng dấu vân tay</Text>
                        </Pressable>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.finger_print_container}>
                            <Text style={styles.Text_Style}>Bạn chưa có tài khoản?</Text>
                            <Pressable onPress={onPressRegister}>
                                <Text style={[styles.Text_Style, { color: "#6a98c5" }]}>
                                    Đăng ký ngay
                                </Text>
                            </Pressable>
                        </View>
                        <View style={styles.finger_print_container}>
                            <Text style={styles.Text_Style}>Hotline</Text>
                            <Pressable>
                                <Text style={[styles.Text_Style, { color: "#6a98c5" }]}>
                                    19009095
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default Screen_login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    login_area: {
        backgroundColor: "#f1f9ff",
        width: "100%",
        height: "110%",
        marginBottom: -50,
        borderRadius: 35,
        alignItems: "center",
    },
    login_label: {
        marginVertical: 25,
    },
    label_text: {
        fontWeight: "bold",
        fontSize: 20,
    },
    input_area: {
        width: "80%",
    },
    Text_Style: {
        fontSize: 18,
    },
    forgot: {
        marginVertical: 20,
        marginRight: -150,
    },
    text_forgot: {
        color: "#5886c6",
        fontSize: 18,
        fontWeight: 500,
    },
    input_text: {
        backgroundColor: "white",
        padding: 10,
        marginVertical: "5px",
        width: "100%",
    },
    button_area: {
        width: "80%",
    },
    finger_print_login_area: {
        marginVertical: 25,
        width: "70%",
    },
    finger_print_container: {
        flexDirection: "row",
    },
    finger_print: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    footer: {
        width: "80%",
        marginTop: 60,
        alignItems: "center",
    },
})
