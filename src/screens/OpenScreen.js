import React from "react";
import { StyleSheet, Text, View, Button, Image, TextInput } from "react-native";
import { connect } from "react-redux";
import { setTokenAction } from "../actions/planeAction.js";
import { loadingAction } from "../actions/planeAction.js";
import { authorizeAction } from "../actions/planeAction.js";
import { bindActionCreators } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

//TO DO
// Asyncstorage to allow saving password - check for login credentials
// SecureStorage

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tempThing: false };
  }
  componentDidUpdate(prevProps) {}

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.oneView}>
          <Image
            style={styles.logo}
            source={require("../../assets/opening.png")}
          />
        </View>
        <View style={styles.oneView}>
          <Button
            style={styles.oneView}
            title="Home"
            onPress={() => {
              this.props.navigation.replace("HomeSec");
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
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    flex: 5,
    // width: null,
    height: null,
    resizeMode: "contain",
  },
  oneView: {
    flex: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
