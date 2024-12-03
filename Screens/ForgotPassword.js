import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Custominput from '../Components/CustomInput.js';
import CustomButton from '../Components/CustomButton.js';
import ModalOTP from './ModalOTP.js';
import { useNavigation } from '@react-navigation/native';

function Screen_forgot_pass() {
    const naviFor = useNavigation();
    const [phone, setPhone] = useState('');
    const [pwd, setPwd] = useState('');
    const [conPwd, setConPwd] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    // Fetch users from the API
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://654325f301b5e279de1ff315.mockapi.io/api/v1/user");
            const data = await response.json();
            setUsers(data);
            console.log(data); // Debugging log
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle continue button press
    const onPressContinue = () => {
        const user = users.find(user => user.phone === phone); // Tìm người dùng theo số điện thoại
        if (user) {
            const userId = user.id;  // Lấy userId từ người dùng đã tìm được
            setVisible(true);
            console.log("User ID: ", userId);  // Kiểm tra xem userId đã được lấy chính xác chưa
            // Bạn có thể sử dụng userId ở đây, ví dụ: gọi API hoặc chuyển hướng đến màn hình khác.
        } else {
            alert('Số điện thoại chưa được đăng ký');
        }
    };

    // Function to reset the password
    const ResetPass = (pass) => {
        const user = users.find(user => user.phone === phone); // Tìm người dùng theo số điện thoại
        if (user) {
            const userId = user.id;  // Lấy userId từ người dùng đã tìm được
            editPass(userId, pass);  // Gọi hàm để cập nhật mật khẩu
            setVisible(false);
            naviFor.navigate("Login"); // Điều hướng về màn hình đăng nhập
        }
    };

    // Function to update password on backend
    const editPass = (userId, pass) => {
        if (!userId) {
            console.error('userId is undefined');
            return;
        }
        fetch(`https://654325f301b5e279de1ff315.mockapi.io/api/v1/user/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                password: pass,
            }),
        })
            .then((res) => res.json())
            .then((resJson) => {
                console.log("Password updated:", resJson);
                // Cập nhật lại danh sách người dùng sau khi thay đổi mật khẩu
                getUsers();
                Alert.alert("Thành công", "Mật khẩu của bạn đã được cập nhật.", [
                    {
                        text: "OK",
                        onPress: () => naviFor.navigate("Login"), // Chuyển hướng về màn hình đăng nhập
                    },
                ]);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.Forgot_pass_area}>
                <View style={styles.Forgot_pass_label}>
                    <Text style={styles.label_text}>Quên mật khẩu</Text>
                </View>

                <View style={styles.input_area}>
                    <Text style={styles.Text_Style}>Số điện thoại</Text>
                    <Custominput
                        placeholder='Nhập nội dung'
                        value={phone}
                        setValue={setPhone}
                    />
                </View>

                <View style={styles.button_area}>
                    <CustomButton text={"Tiếp tục"} onPress={onPressContinue} />
                </View>

                <ModalOTP
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    onSubmit={() => {
                        if (pwd === conPwd) {
                            ResetPass(pwd);
                        } else {
                            alert("Vui lòng nhập xác nhận mật khẩu trùng với mật khẩu");
                        }
                    }}
                    cancelable
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Thiết lập mật khẩu</Text>
                    </View>

                    <Text style={styles.Text_Style}>Mật khẩu mới</Text>
                    <Custominput
                        placeholder='Nhập nội dung'
                        secureTextEntry
                        value={pwd}
                        setValue={setPwd}
                    />

                    <Text style={styles.Text_Style}>Xác nhận mật khẩu</Text>
                    <Custominput
                        placeholder='Nhập nội dung'
                        secureTextEntry
                        value={conPwd}
                        setValue={setConPwd}
                    />
                </ModalOTP>
            </View>
        </View>
    );
}

export default Screen_forgot_pass;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Forgot_pass_area: {
        backgroundColor: '#f1f9ff',
        width: '100%',
        height: '110%',
        marginBottom: -50,
        borderRadius: 35,
        alignItems: 'center',
    },
    Forgot_pass_label: {
        marginVertical: 25,
    },
    label_text: {
        fontWeight: 'bold',
        fontSize: 17,
    },
    input_area: {
        width: '80%',
    },
    Text_Style: {
        fontSize: 18,
    },
    button_area: {
        marginVertical: 50,
        width: '60%',
    },
});
