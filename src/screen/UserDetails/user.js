import React from "react";
import {View, Text, StyleSheet} from "react-native";
import AppBar from "./components/userappbar";
import UserData from "./components/userdata";

const UserInfo = (props) => {
    return(
        <View style={styles.view}>
            <AppBar navigation={props.navigation}/>
            <UserData/>
        </View>
    );
}

const styles = StyleSheet.create({
    view:{
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "white"
    }
})

export default UserInfo;