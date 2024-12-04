import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"

const Passpore = ({ route }) => {
    const { userID } = route.params;
    const [vaccines, setVaccines] = useState([]) // Lưu trữ thông tin mũi tiêm
    const [loading, setLoading] = useState(true) // Để theo dõi trạng thái tải dữ liệu
    const naviPa = useNavigation()
    useEffect(() => {
        console.log("userID nhận được:", userID);

        // Lấy dữ liệu từ API
        fetch("https://654325f301b5e279de1ff315.mockapi.io/api/v1/user")
            .then((response) => response.json())
            .then((data) => {
                console.log("Dữ liệu API:", data);  // Kiểm tra cấu trúc của dữ liệu trả về
                // Lọc ra thông tin của người dùng đăng nhập
                const currentUser = data.find((user) => user.id === userID);
                console.log("User tìm thấy:", currentUser);  // Kiểm tra dữ liệu người dùng
                if (currentUser && Array.isArray(currentUser.vaccines)) {
                    setVaccines(currentUser.vaccines); // Gán mảng vaccines từ người dùng đã đăng nhập
                } else {
                    setVaccines([]); // Gán mảng rỗng nếu không có thông tin
                }
                setLoading(false); // Kết thúc trạng thái tải
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setVaccines([]); // Gán mảng rỗng nếu có lỗi
                setLoading(false);
            });
    }, [userID]);

    // Hàm render từng mũi tiêm
    const renderItem = ({ item }) => (
        <View style={styles.vaccineItem}>
            <Text style={styles.vaccineName}>{item.vaccineName}</Text>
            <Text style={styles.vaccineDate}>{item.date}</Text>
        </View>
    )

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
                {loading ? (
                    // Hiển thị khi dữ liệu đang được tải
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : vaccines.length > 0 ? (
                    <FlatList
                        data={vaccines}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <View style={styles.notify}>
                        <Text>Không có dữ liệu</Text>
                    </View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2b83f9",
        alignItems: "center",
        justifyContent: "center",
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
        padding: 10,
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
    vaccineItem: {
        backgroundColor: "#f1f1f1",
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ccc",
    },
    vaccineName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    vaccineDate: {
        fontSize: 14,
        color: "#666",
    },
})

export default Passpore