import { View, Text, StyleSheet, Image } from "react-native"
import React from "react"

const CustomHeader = () => {
  return (
    <View style={styles.logo_area}>
      <View style={styles.logo_banner}>
        <Image
          style={styles.logo_style}
          source={require("../images/logo.png")}
        />
        <View>
          <Text style={styles.logo_banner_text_1}>SSKĐT</Text>
          <Text style={styles.logo_banner_text_2}>Sổ sức khỏe điện tử</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  logo_area: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo_banner: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo_style: {
    width: 100,
    height: 100,
  },
  logo_banner_text_1: {
    color: "white",
    fontSize: 45,
    fontWeight: 500,
  },
  logo_banner_text_2: {
    color: "white",
    fontSize: 15,
    fontWeight: 400,
  },
})
export default CustomHeader
