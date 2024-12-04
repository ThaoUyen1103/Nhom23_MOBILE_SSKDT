import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const HealthFacilities = () => {
  const naviHe = useNavigation();

  // Danh sách cơ sở y tế mẫu
  const facilities = [
    { id: "1", name: "Bệnh viện Đại học Y Dược TP.HCM", address: "215 Hồng Bàng, Quận 5, TP.HCM", hours: "7:00 AM - 6:00 PM" },
    { id: "2", name: "Bệnh viện 115", address: "527 Sư Vạn Hạnh, Quận 10, TP.HCM", hours: "24/7" },
    { id: "3", name: "Bệnh viện Chợ Rẫy", address: "201B Nguyễn Chí Thanh, Quận 5, TP.HCM", hours: "24/7" },
    { id: "4", name: "Bệnh viện Hùng Vương", address: "128 Hùng Vương, Quận 5, TP.HCM", hours: "7:00 AM - 5:00 PM" },
    { id: "5", name: "Bệnh viện Nhân dân 115", address: "527 Sư Vạn Hạnh, Quận 10, TP.HCM", hours: "24/7" },
  ];

  const renderFacilityItem = ({ item }) => (
    <Pressable style={styles.facilityItem} onPress={() => naviHe.navigate("FacilityDetail", { facilityId: item.id })}>
      <View style={styles.facilityInfo}>
        <Text style={styles.facilityName}>{item.name}</Text>
        <Text style={styles.facilityDetails}>Địa chỉ: {item.address}</Text>
        <Text style={styles.facilityDetails}>Giờ mở cửa: {item.hours}</Text>
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Xem Chi Tiết</Text>
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Pressable onPress={() => { naviHe.navigate("Home") }}>
          <View style={styles.title1}>
            <Icon name="arrow-back-outline" size={28} color={"#FFFFFF"} />
          </View>
        </Pressable>
        <Text style={styles.text1}>Cơ sở y tế</Text>
      </View>
      <View style={styles.view2}>
        <TextInput style={styles.input} placeholder="Tìm kiếm" />

        {/* Đảm bảo FlatList có không gian để cuộn */}
        <FlatList
          data={facilities}
          renderItem={renderFacilityItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContentContainer}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b83f9",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: 330,
    borderRadius: 20,
    color: "black",
  },
  view1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 375,
    height: 80,
  },
  view2: {
    backgroundColor: "#FFFFFF",
    width: 375,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  flatListContentContainer: {
    paddingBottom: 50,
    paddingTop: 10,
  },
  text1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  title1: {
    width: 50,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  facilityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  facilityInfo: {
    flex: 1,
  },
  facilityName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  facilityDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default HealthFacilities;
