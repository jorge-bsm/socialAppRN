import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";
import UserPermissions from "../utilities/UserPermissions";

export default class PostScreen extends React.Component {
  state = {
    tittle: "",
    content: ""
  };

  componentDidMount() {
    UserPermissions.getCameraPermission;
  }

  handlePost = () => {
    Fire.shared
      .addPost({
        tittle: this.state.tittle.trim(),
        content: this.state.content.trim()
      })
      .then(ref => {
        this.setState({ tittle: "", content: "" });
        this.props.navigation.goBack();
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePost}>
            <Text style={{ fontWeight: "500" }}>Post</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/tempAvatar.jpg")}
            style={styles.avatar}
          ></Image>
          <TextInput
            autoFocus={true}
            numberOfLines={1}
            style={{ fontSize: 20 }}
            placeholder="#EnUnaPalabra"
            onChangeText={tittle => this.setState({ tittle })}
            value={this.state.tittle}
          ></TextInput>
          <TextInput
            multiline={true}
            numberOfLines={4}
            // style={{ flex: 1 }}
            placeholder="Aquí lo que quieras..."
            onChangeText={content => this.setState({ content })}
            value={this.state.content}
          ></TextInput>

          <View
            style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}
          ></View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
    paddingTop: 40,
    paddingBottom: 16
  },
  inputContainer: {
    margin: 32,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 48
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 16
    // marginRight: 16
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32
  }
});
