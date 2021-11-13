import React from "react";
import { StyleSheet, Text, View, Button, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { connect } from "react-redux";
import { setTokenAction } from "../actions/planeAction.js";
import { loadingAction } from "../actions/planeAction.js";
import { authorizeAction } from "../actions/planeAction.js";

import { bindActionCreators } from "redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {}

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/choose.png")}
        />

        <View style={styles.buttonView}>
          <Button
            style={styles.button}
            title="Jacob Says"
            onPress={() => {
              this.props.navigation.navigate("AJSSec");
            }}
          />
                    <Button
            style={styles.button}
            title="Snake Game"
            onPress={() => {
              this.props.navigation.navigate("BSGSec");
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

const mapStateToProps = (state) => {
  const { planeApp } = state;
  return { planeApp };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setTokenAction,
      loadingAction,
      authorizeAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
