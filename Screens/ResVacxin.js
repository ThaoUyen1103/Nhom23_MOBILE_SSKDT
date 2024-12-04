import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const ResVacxin = ({route}) => {
  const naviRe = useNavigation();

  // State để lưu thông tin tiêm chủng
  const [vaccines, setVaccines] = useState([]);
  const [vaccineName, setVaccineName] = useState("");
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [userData, setUserData] = useState([]); // To store user data
  const currentUserID = route.params?.userID;

  // Danh sách các loại vaccine có sẵn
  const availableVaccines = [
    { id: '1', name: "Vaccine COVID-19" },
    { id: '2', name: "Vaccine cúm mùa" },
    { id: '3', name: "Vaccine viêm gan B" },
    { id: '4', name: "Vaccine phòng uốn ván" },
    { id: '5', name: "Vaccine bại liệt" },
    { id: '6', name: "Vaccine sởi, quai bị, rubella (MMR)" },
    { id: '7', name: "Vaccine viêm phổi" },
    { id: '8', name: "Vaccine HPV (Papillomavirus)" },
  ];

  // Fetch danh sách vaccine của user hiện tại
  // Lấy thông tin người dùng từ API
  useEffect(() => {
    console.log("userID received:", currentUserID)
    if (currentUserID) {
      fetch(`https://654325f301b5e279de1ff315.mockapi.io/api/v1/user/${currentUserID}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
          setVaccines(data.vaccines || []);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [currentUserID]);
  // Hàm đăng ký vaccine
  const registerVaccine = async () => {
    if (selectedVaccine && userData) {
      const newVaccine = {
        vaccineName: selectedVaccine.name,
        date: new Date().toISOString(), // Ngày hiện tại
      };

      try {
        const response = await fetch(
          `https://654325f301b5e279de1ff315.mockapi.io/api/v1/user/${currentUserID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...userData,
              vaccines: [...vaccines, newVaccine], // Cập nhật danh sách vaccine
            }),
          }
        );

        if (response.ok) {
          const updatedUser = await response.json();
          alert("Đăng ký tiêm chủng thành công!");

          // Cập nhật trạng thái local
          setVaccines(updatedUser.vaccines);
        } else {
          const errorData = await response.json();
          alert(`Lỗi: ${errorData.message || "Đã có lỗi xảy ra. Vui lòng thử lại!"}`);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        alert("Đã có lỗi xảy ra, vui lòng thử lại!");
      }
    } else {
      alert("Vui lòng chọn vaccine!");
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Pressable onPress={() => { naviRe.navigate("Tab_bottom") }}>
          <View style={styles.title1}>
            <Icon name="arrow-back-outline" size={28} color={"#FFFFFF"} />
          </View>
        </Pressable>
        <Text style={styles.text1}>Đăng ký tiêm chủng</Text>
      </View>

      <View style={styles.view2}>
        <View style={styles.notify}>
          <Text>Thông tin tiêm chủng:</Text>
          {vaccines.length === 0 ? (
            <Text>Chưa có mũi tiêm nào được đăng ký.</Text>
          ) : (
            vaccines.map((vaccine, index) => (
              <View key={index} style={styles.vaccineItem}>
                <Text>{`Vaccine: ${vaccine.vaccineName} - Ngày tiêm: ${vaccine.date}`}</Text>
              </View>
            ))
          )}
        </View>

        <FlatList
          data={availableVaccines}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.vaccineOption}
              onPress={() => setSelectedVaccine(item)}
            >
              <Text>{item.name}</Text>
            </Pressable>
          )}
        />

        {selectedVaccine && (
          <TextInput
            style={styles.input}
            value={selectedVaccine.name}
            editable={false} // Chỉ hiển thị tên vaccine đã chọn, không cho chỉnh sửa
          />
        )}

        <Button title="Đăng ký tiêm chủng" onPress={registerVaccine} />
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
  notify: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  view1: {
    flexDirection: 'row',
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
  vaccineItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  },
  vaccineOption: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default ResVacxin;
