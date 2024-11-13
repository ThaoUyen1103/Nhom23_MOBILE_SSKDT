import { View, Text, StyleSheet, Button, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner'
import ModalScanQR from './modalScanQR';
export default function Scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [visible, setVisible] = useState(false);
    const [url, setUrl] = useState('');
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setUrl(data)
        setVisible(true)

    };
   
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }
    return (
        <View style={styles.container}>
            <ModalScanQR
                visible={visible}
                url={url}
                onSubmit={() => setVisible(false)}
            >

            </ModalScanQR>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title='Nhấn để quét lại' onPress={() => setScanned(false)} />}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column'
    },
})

