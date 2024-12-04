import {
    FlatList,
    Pressable,
    View,
    Image,
    Text,
    StyleSheet,
    TextInput,
  } from "react-native"
import List from "../data/covid.json"
import ListUT from "../data/uathich.json"
import React, { useEffect, useState } from "react"
import QRCode from "react-native-qrcode-svg"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
  
const More = ({route}) => {
    const user = route.params?.user;
    const naviMo = useNavigation();
    const [listdata, setListdata] = useState([])
    const mergeData = (list) => {
      setListdata(List.concat(list))
    }
    useEffect(() => {
      mergeData(ListUT)
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
            <Pressable onPress={() => { naviMo.navigate("Tab_bottom") }}>
                <View style={styles.title1}>
                    <Icon name="arrow-back-outline" size={28} color={"#FFFFFF"} />
                </View>
                </Pressable>
            <Text style={styles.text1}>Dịch vụ khác</Text>
            </View>
            <View style={styles.container2}>
            <View style={styles.search}>
                <TextInput style={styles.input} placeholder="Tìm kiếm" />
                <Icon name="search" size={20} color="#BBBBBB" />
            </View>
            <View style={styles.more1}>
                <Text style={styles.label}>Tùy chọn</Text>
                <FlatList
                style={styles.list}
                numColumns={3}
                data={listdata}
                columnWrapperStyle={{ gap: 10, marginTop: 10 }}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => {
                            if(item.id == 6){
                                naviMo.navigate('More')
                            }
                            else if(item.id == 5){
                                naviMo.navigate('Advise')
                            }
                            else if(item.id == 4){
                                naviMo.navigate('DocHealth')
                            }
                            else if(item.id == 3){  
                                naviMo.navigate('ResVacxin')
                            }
                            
                            else if(item.id == 1){
                                naviMo.navigate('Passpore')
                            }
                            else{
                                alert("khac")
                            }
                        }}
                    >
                    
                      <View style={styles.item_container}>
                        <Image style={styles.btn_img} source={{ uri: item.img }} />
                        <View style={{ alignItems: "center", width: 100 }}>
                          <Text style={styles.text_item}>{item.name}</Text>
                        </View>
                      </View>
                    </Pressable>
                )}
                />
            </View>
            </View>
        </View>
        )
    }
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#0084FF",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    container1: {
      flexDirection: 'row',
      // backgroundColor: "#9CCFFF",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "12%",
    },
    container2: {
      backgroundColor: "#EEF1F8",
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      height: "88%",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    more1: {
      flex: 1,
      backgroundColor: "#EEF1F8",
      // backgroundColor: "#7B4444",
      borderTopWidth: 1,
      borderColor: "#BBBBBB",
      width: "100%",
    },
    list: {
      // backgroundColor: "#F8B3B3",
      flex: 1,
      width: "100%",
      height: "100%",
    },
    search: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "90%",
      height: 40,
      backgroundColor: "#ffffff",
      borderRadius: 20,
      paddingHorizontal: 20,
      margin: 20,
    },
    input: {
      // backgroundColor: "#BC9898",
      height: "100%",
      color: "#BBBBBB",
    },
    label: {
      fontSize: 15,
      fontWeight: "bold",
      margin: 15,
      marginBottom: 0,
    },
    item_container: {
      height: 120,
      width: 120,
      gap: 10,
      alignItems: "center",
    },
    btn_img: {
      height: 70,
      width: 70,
      resizeMode: "contain",
    },
    text1: {
      fontSize: 17,
      fontWeight: "bold",
      color: "#FFFFFF",
    },
    text_item: {
      textAlign: "center",
      maxWidth: 80,
    },
    title1: {
      // backgroundColor: "#FFD6D6",
      width: "10%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  })
  
  export default More