import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const InfoUser = ({ route }) => {
  const naviIn = useNavigation();
  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const user = route.params?.user;

  useEffect(() => {
    if (user) {
      setName(user.userName);
      setBirthDay(user.birthDay);
      setGender(user.gender);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
      setId(user.userID);
    }
  }, [user]);

  const updateUser = async () => {
    if (!name || !birthDay || !gender || !email || !id || !address) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const response = await fetch(
        `https://654325f301b5e279de1ff315.mockapi.io/api/v1/user/${user?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: name,
            birthDay,
            gender,
            email,
            phone,
            address,
            userID: id,
          }),
        }
      );
      const data = await response.json();
      alert("Thông tin đã được cập nhật!");
      console.log("Cập nhật thành công:", data);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Pressable
          onPress={() => {
            naviIn.navigate("Tab_bottom");
          }}
        >
          <View style={styles.title1}>
            <Icon name="arrow-back-outline" size={28} color={"#FFFFFF"} />
          </View>
        </Pressable>
        <Text style={styles.text1}>Chỉnh sửa thông tin cá nhân</Text>
      </View>

      <View style={styles.container2}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ alignItems: "center", marginBottom: 5 }}>
            <Image
              style={styles.image}
              source={require("../images/qrinfo2.png")}
            />
          </View>

          <View style={styles.form_control}>
            <Text style={styles.label}>
              Họ và tên: <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
            />
          </View>
          <View style={styles.form_control}>
            <Text style={styles.label}>
              Ngày tháng năm sinh <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={birthDay}
              onChangeText={(text) => setBirthDay(text)}
            />
          </View>
          <View style={styles.form_control}>
            <Text style={styles.label}>
              Giới tính <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={(text) => setGender(text)}
            />
          </View>
          <View style={styles.form_control}>
            <Text style={styles.label}>
              Số điện thoại <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput style={styles.input} value={phone} editable={false} />
          </View>
          <View style={styles.form_control}>
            <Text style={styles.label}>
              Số hộ chiếu/CMND/CCCD <Text style={{ color: "red" }}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={id}
              onChangeText={(text) => setId(text)}
            />
          </View>
          <View style={styles.form_control}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.form_control}>
            <Text style={styles.label}>Địa chỉ</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
          <Pressable onPress={updateUser} style={styles.btn}>
          <Text style={styles.text1}>Lưu thông tin</Text>
        </Pressable>
        </ScrollView>
        
      </View>
    </View>
  );
};

export default InfoUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b83f9",
    alignItems: "center",
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "10%",
  },
  container2: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    width: 400,
    height: "90%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#3E91FF",
  },
  btn: {
    backgroundColor: "#3E91FF",
    width: 200,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginLeft: 150
  },
  label: {
    fontSize: 12,
    color: "gray",
    marginBottom: 4,
    marginLeft: 10,
  },
  input: {
    height: 35,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 5,
    padding: 8,
    width: 300,
    borderRadius: 10,
    color: "#292929",
  },
  form_control: {
    width: 400,
    marginBottom: 8,
    marginLeft: 100
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
  scrollContent: {
    paddingBottom: 100,
  },
});
