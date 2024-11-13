import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";

const ModalScanQR = ({ onSubmit, visible = false, submitText = "Đóng", url }) => {
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [birthYear, setBirthYear] = useState('')
    const [id, setId] = useState('')
    const [address, setAddress] = useState('')
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: { 'content-type': 'application/json' },
        }).then((res) => res.json())
        .then(res => {
            setName(res.userName)
            res.gender == '' ? setGender('---') : setGender(res.gender)
            res.id == '' ? setId('-------------') : setId(res.id)
            res.birthDay == '' ? setBirthYear('----') : setBirthYear(res.birthDay.substring(6))
            res.address == '' ? setAddress('-------') : setAddress(res.address)

        })
      }, [url])
    
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: 400, width: 300, justifyContent: 'center', alignItems: 'center' }}>

                    <View style={{ flex: 1, width: '90%', height: 500, backgroundColor: '#fff', borderWidth: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: 80, borderBottomWidth: 1, width: '100%', borderBottomColor: '#eeeeee' }}>
                            <Text>Thông tin</Text>
                        </View>
                        <View style={{ marginTop: 20, width: '80%', height: 200, borderRadius: 15, backgroundColor: '#007d49', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#fff', width: '100%' }}>
                                <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>{name}</Text>
                                <Text style={{ fontSize: 15, color: '#fff' }}>{gender} - {birthYear}</Text>

                            </View>
                            <View style={{ marginTop: 5 }}>
                                <Text style={{ fontSize: 15, color: '#fff' }}>Sổ hộ chiếu/CMND/CCCD:</Text>
                                <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>{id}</Text>

                                <Text style={{ fontSize: 15, color: '#fff', marginTop: 5 }}>Địa chỉ:</Text>
                                <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>{address}</Text>
                            </View>



                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Pressable style={{ padding: 10, backgroundColor: '#2b83f9', justifyContent: 'center', alignItems: 'center', width: 100, borderRadius: 20, marginTop: 50 }} 
                            onPress={
                                onSubmit
                            }>
                                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}> {submitText}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>

        </Modal>
    );
};


export default ModalScanQR