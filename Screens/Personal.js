import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import ModalLogout from "./ModalLogout";

const Personal = ({route}) => {
  const naviPer = useNavigation();
  const [name, setName] = useState([]);
  const [phone, setPhone] = useState("");
  const [qrCode, setQrCode] = useState(
    "https://654325f301b5e279de1ff315.mockapi.io/api/v1/user"
  );
  const [visible, setVisible] = useState(false);
  const user = route.params?.user; // Nhận thông tin user từ Tab_bottom
  const onPressLogout = () => {
    setVisible(false);
    naviPer.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.info1}>
          <View style={styles.circle}>
            <Icon name="person" size={40} color={"#B4B4B4"} />
          </View>
          <View>
            <Text style={styles.text1}>{user?.userName}</Text>
            <Text style={styles.text2}>{user?.phone}</Text>
          </View>
        </View>
        <Pressable style={styles.logout} onPress={() => { setVisible(true) }}>
          <Image
            style={{ width: 25, height: 30 }}
            source={require("../images/exit.png")}
          />
        </Pressable>
      </View>
      <View style={styles.qrcode}>
        <View style={styles.viewQR}>
          <QRCode value={qrCode} />
        </View>
        <Text style={styles.text2}>Mã sổ sức khoẻ</Text>
      </View>

      <View style={styles.more}>
        <Pressable style={styles.btn} onPress={() => { naviPer.navigate("InfoUser",{user}) }}>
          <Icon name="person" size={23} color={"#5D5D5D"} />
          <Text style={styles.text3}>Thông tin cá nhân</Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <Icon name="people" size={23} color={"#5D5D5D"} />
          <Text style={styles.text3}>Thành viên gia đình</Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <Icon name="map" size={23} color={"#5D5D5D"} />
          <Text style={styles.text3}>Nơi đã đến</Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <Icon name="time" size={23} color={"#5D5D5D"} />
          <Text style={styles.text3}>Lịch sử đặt khám</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => { naviPer.navigate("Passpore") }}>
          <Icon name="book" size={23} color={"#5D5D5D"} />
          <Text style={styles.text3}>Hộ chiếu vắc-xin</Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <Icon name="information-circle" size={23} color={"#5D5D5D"} />
          <Text style={styles.text3}>Giới thiệu</Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <Icon name="settings" size={23} color={"#5D5D5D"} />
          <Text style={styles.text3}>Cài đặt</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => { setVisible(true) }}>
          <Icon name="exit" size={23} color={"#5D5D5D"} />
          <Text style={styles.text3}>Đăng xuất</Text>
        </Pressable>
        <ModalLogout
          visible={visible}
          onDismiss={() => setVisible(false)}
          onSubmit={onPressLogout}
          cancelable
        >
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 30, borderBottomWidth: 1, width: '100%', borderBottomColor: '#eeeeee' }}>
            <Text>Đăng xuất</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', height: 50, width: '100%' }}>
            <Text style={{ fontSize: 15 }}>Bạn thật sự muốn đăng xuất tài khoản?</Text>
          </View>
        </ModalLogout>
      </View>
    </View>
  );
};

export default Personal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A99FF",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    flexDirection: "row",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomColor: "#BABABA",
    borderBottomWidth: 1,
  },
  more: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "63%",
    alignItems: "center",
    justifyContent: "flex-start",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  qrcode: {
    width: "100%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  viewQR: {
    backgroundColor: "#ffffff",
    width: 120,
    height: 120,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    width: "100%",
    height: "12%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "2%",
  },
  info1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    border: "5px solid #90BEFF",
    backgroundColor: "#ffffff",
    marginRight: 10,
  },
  logout: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  text2: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "medium",
    marginTop: 5,
  },
  text3: {
    fontSize: 15,
    color: "#5D5D5D",
    fontWeight: "medium",
    marginHorizontal: 8,
  },
});
