import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Custominput from '../Components/CustomInput.js';
import CustomButton from '../Components/CustomButton.js';
import ModalOTP from './ModalOTP.js';
import { useNavigation } from '@react-navigation/native';

function Screen_Register() {
    const naviRes = useNavigation();
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState('fake-verification-id');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Mã OTP giả
    const fakeOTP = '123456';

    const sendVerification = () => {
        if (phone === '' || fullName === '' || password === '') {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert("Mật khẩu phải có ít nhất 8 ký tự và chứa cả chữ cái và số.");
            return;
        }

        // Kiểm tra số điện thoại đã tồn tại hay chưa
        const isPhoneExists = users.some(user => user.phone === phone);
        if (isPhoneExists) {
            alert("Số điện thoại này đã được đăng ký!");
            return;
        }

        // Gửi mã OTP giả
        setVerificationId('fake-verification-id');
        setVisible(true);
    };

    const confirmCode = () => {
        if (verificationId && code === fakeOTP) {
            // Nếu mã OTP khớp với mã giả, đăng ký thành công
            onPressRegister(phone, fullName, password);
            setVisible(false);
            naviRes.navigate("Login");
            setPhone('');
            setFullName('');
            setPassword('');
        } else {
            alert("Mã OTP không chính xác");
        }
    };

    const onPressRegister = (phoneNum, name, pwd) => {
        fetch("https://654325f301b5e279de1ff315.mockapi.io/api/v1/user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                phone: phoneNum,
                userName: name,
                password: pwd,
                login: false,
                id: '',
                birthDay: '',
                email: '',
                address: '',
                gender: '',
                qrCode: "https://654325f301b5e279de1ff315.mockapi.io/api/v1/user",
            })
        }).then((res) => res.json())
            .then(resJson => {
                console.log('Users:', resJson);
                editQr(resJson.userId);
                alert("Đăng ký thành công");
            }).catch(e => { console.log(e); });
    };

    const editQr = (userId) => {
        fetch("https://654325f301b5e279de1ff315.mockapi.io/api/v1/user" + `/${userId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                qrCode: "https://654325f301b5e279de1ff315.mockapi.io/api/v1/user" + `/${userId}`,
            })
        }).then((res) => res.json())
            .then(resJson => {
                console.log('updated:', resJson);
            }).catch(e => { console.log(e); });
    };

    return (
        <View style={styles.container}>
            <View style={styles.Register_area}>
                <View style={styles.Register_label}>
                    <Text style={styles.label_text}>Đăng ký</Text>
                </View>
                <View style={styles.input_area}>
                    <Text style={styles.Text_Style}>Họ và tên</Text>
                    <Custominput placeholder='Nhập nội dung' value={fullName} setValue={setFullName} />
                    <Text style={styles.Text_Style}>Số điện thoại</Text>
                    <Custominput placeholder='Nhập nội dung' value={phone} setValue={setPhone} />
                    <Text style={styles.Text_Style}>Mật khẩu</Text>
                    <Custominput placeholder='Nhập nội dung' value={password} setValue={setPassword} secureTextEntry />
                </View>
                <View style={styles.input_area}>
                    <Text style={styles.Text_Style}>
                        <Text style={{ color: 'red' }}>*</Text> Vui lòng cung cấp thông tin chính xác để đảm bảo công tác phòng chống dịch Covid-19 và nhận chứng nhận tiêm chủng
                    </Text>
                </View>
                <View style={styles.button_area}>
                    <CustomButton text={"Đăng ký"} onPress={sendVerification} />
                </View>
                <ModalOTP
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    onSubmit={confirmCode}
                    cancelable
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Xác thực OTP</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20 }}>Mã OTP</Text>
                    </View>
                    <Custominput placeholder='Nhập nội dung' value={code} setValue={setCode} />
                </ModalOTP>
            </View>
        </View>
    );
}

export default Screen_Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b83f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Register_area: {
        backgroundColor: '#f1f9ff',
        width: '100%',
        height: '110%',
        marginBottom: -50,
        borderRadius: 35,
        alignItems: 'center',
    },
    Register_label: {
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
        marginVertical: 20,
        width: '80%',
    },
});
