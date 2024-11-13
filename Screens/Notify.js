import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import React from "react"

const Notify = () => {
  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.text1}>Thông báo của tôi</Text>
      </View>
      <View style={styles.view2}>
        <View style={styles.notify}>
          <Image
            style={{ width: 250, height: 150, marginTop: 100 }}
            source={require("../images/Search-app-scaled.png")}
          />
          <Text>Không có dữ liệu</Text>
        </View>
      </View>
    </View>
  )
}

export default Notify

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b83f9",
    //backgroundImage: 'linear-gradient(to right, #2b83f9, #47a6fa)',
    alignItems: "center",
    justifyContent: "center",
  },
  notify: {
    // backgroundColor: "#DEBDBD",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
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
})
