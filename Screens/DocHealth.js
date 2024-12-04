import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Ionicons";

const DocHealth = () => {
  const [userData, setUserData] = useState(null); // State to store user data
  const naviDo = useNavigation();

  useEffect(() => {
    // Fetching user data from the API
    fetch('https://654325f301b5e279de1ff315.mockapi.io/api/v1/user')
      .then((response) => response.json())
      .then((data) => {
        setUserData(data[0]); // Assuming we are displaying the first user’s data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Displaying loading state or the user profile
  if (!userData) {
    return (
      <View style={styles.container}>
        <View style={styles.view1}>
          <Pressable onPress={() => { naviDo.navigate("Tab_bottom") }}>
            <View style={styles.title1}>
              <Icon name="arrow-back-outline" size={28} color={"#FFFFFF"} />
            </View>
          </Pressable>
          <Text style={styles.text1}>Hồ sơ sức khỏe</Text>
        </View>
        <View style={styles.view2}>
          <View style={styles.notify}>
            <Text>Không có dữ liệu</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Pressable onPress={() => { naviDo.navigate("Tab_bottom") }}>
          <View style={styles.title1}>
            <Icon name="arrow-back-outline" size={28} color={"#FFFFFF"} />
          </View>
        </Pressable>
        <Text style={styles.text1}>Hồ sơ sức khỏe</Text>
      </View>

      <View style={styles.view2}>
        <View style={styles.notify}>
          <Text style={styles.infoText}>Tên: {userData.userName}</Text>
          <Text style={styles.infoText}>Số điện thoại: {userData.phone}</Text>
          <Text style={styles.infoText}>Ngày sinh: {userData.birthDay}</Text>
          <Text style={styles.infoText}>Tình trạng sức khỏe: {userData.healthStatus}</Text>
        </View>
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
    paddingTop: 10,
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#000000",
  },
});

export default DocHealth;
