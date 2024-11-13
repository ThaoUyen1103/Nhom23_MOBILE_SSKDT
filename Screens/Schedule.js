import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import React from "react"

const Schedule = () => {
  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.text1}>Lịch hẹn của tôi</Text>
      </View>
      <View style={styles.view2}>
        <View style={styles.viewBtn}>
          <Pressable style={styles.btn}>
            <Text style={styles.text2}>Lịch hẹn khám</Text>
          </Pressable>
          <Pressable style={styles.btn}>
            <Text style={styles.text2}>Lịch hẹn thêm</Text>
          </Pressable>
        </View>
        <View style={styles.schedule}>
          <Image
            style={{ width: 250, height: 150, marginTop: 100 }}
            source={require("../images/Search-app-scaled.png")}
          />
          <Text style={styles.text2}>Không có dữ liệu hiển thị</Text>
        </View>
      </View>
    </View>
  )
}

export default Schedule

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b83f9",
    //backgroundImage: 'linear-gradient(to right, #2b83f9, #47a6fa)',
    alignItems: "center",
    justifyContent: "center",
  },
  schedule: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "#DEBDBD",
  },
  btn: {
    // backgroundColor: "#DC9F9F",
    width: "50%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  viewBtn: {
    // backgroundColor: "#4B6382",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "10%",
  },
  view1: {
    // backgroundColor: "#B9DDFF",
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
  },
  text1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  text2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
  },
})
