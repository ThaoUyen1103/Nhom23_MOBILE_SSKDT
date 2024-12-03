import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, TextInput, Modal, Button, CheckBox } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Advise = () => {
    const naviAd = useNavigation();

    // State to control the modals
    const [modalVisible, setModalVisible] = useState(false);
    const [prescriptionModalVisible, setPrescriptionModalVisible] = useState(false);

    const [message, setMessage] = useState("");
    const [prescription, setPrescription] = useState("");

    // Example data to show in the view (this can be replaced with real data)
    const [exampleData, setExampleData] = useState([
        { id: 1, name: "Tư vấn về đau lưng", checked: false },
        { id: 2, name: "Kê đơn thuốc cảm cúm", checked: false },
        { id: 3, name: "Khám bệnh định kỳ", checked: false },
    ]);

    const handleMessageSubmit = () => {
        console.log("Message Sent: ", message);
        setModalVisible(false);
    };

    const handlePrescriptionSubmit = () => {
        console.log("Prescription Sent: ", prescription);
        setPrescriptionModalVisible(false);
    };

    const handleCheckboxChange = (id) => {
        const updatedData = exampleData.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setExampleData(updatedData); // Update the state with the new checked values
    };

    return (
        <View style={styles.container}>
            <View style={styles.view1}>
                <Pressable onPress={() => { naviAd.navigate("Tab_bottom") }}>
                    <View style={styles.title1}>
                        <Icon name="arrow-back-outline" size={28} color={"#FFFFFF"} />
                    </View>
                </Pressable>
                <Text style={styles.text1}>Tư vấn từ xa</Text>
            </View>

            <View style={styles.view2}>
                <View style={styles.notify}>
                    {exampleData.length === 0 ? (
                        <Text>Không có dữ liệu</Text>
                    ) : (
                        exampleData.map((item) => (
                            <View key={item.id} style={styles.dataRow}>
                                {/* Checkbox */}
                                <CheckBox
                                    value={item.checked}
                                    onValueChange={() => handleCheckboxChange(item.id)}
                                />
                                {/* Text: Tư vấn về đau lưng */}
                                <Text style={styles.dataText}>{item.name}</Text>

                                {/* Button for treatment consultation */}
                                <Pressable style={styles.treatmentButton} onPress={() => setModalVisible(true)}>
                                    <Text style={styles.buttonText}>Tư vấn điều trị</Text>
                                </Pressable>
                            </View>
                        ))
                    )}
                </View>

                {/* Button for messaging the doctor */}
                <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Nhắn tin cho bác sĩ</Text>
                </Pressable>

                {/* Button for prescription */}
                <Pressable style={styles.button} onPress={() => setPrescriptionModalVisible(true)}>
                    <Text style={styles.buttonText}>Kê đơn thuốc</Text>
                </Pressable>

                {/* Modal for messaging */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Nhắn tin cho bác sĩ</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập tin nhắn..."
                                value={message}
                                onChangeText={setMessage}
                                multiline
                            />
                            <Pressable style={styles.button} onPress={handleMessageSubmit}>
                                <Text style={styles.buttonText}>Gửi tin nhắn</Text>
                            </Pressable>
                            <Pressable style={styles.button} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Đóng</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                {/* Modal for prescription */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={prescriptionModalVisible}
                    onRequestClose={() => setPrescriptionModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Kê đơn thuốc</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập tình trạng sức khỏe..."
                                value={prescription}
                                onChangeText={setPrescription}
                                multiline
                            />
                            <Pressable style={styles.button} onPress={handlePrescriptionSubmit}>
                                <Text style={styles.buttonText}>Kê đơn</Text>
                            </Pressable>
                            <Pressable style={styles.button} onPress={() => setPrescriptionModalVisible(false)}>
                                <Text style={styles.buttonText}>Đóng</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2b83f9",
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
    button: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    view1: {
        flexDirection: "row",
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
        padding: 20,
        alignItems: "center",
    },
    text1: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    title1: {
        width: "10%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    notify: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 10,
    },
    dataRow: {
        flexDirection: "row", // Align items horizontally
        alignItems: "center", // Center the items vertically
        marginBottom: 15,
        width: "90%",
        justifyContent: "space-between", // Ensure proper spacing
    },
    dataText: {
        flex: 2,
        fontSize: 16,
        marginLeft: 10, // Space between checkbox and text
    },
    treatmentButton: {
        backgroundColor: "#FF6347",  // Button color for treatment consultation
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Advise;
