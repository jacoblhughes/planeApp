import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  Touchable,
  Dimensions,
  ImageBackground,
} from "react-native";
import {
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native-gesture-handler";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

function AJSScreen(props) {
  let [gameArray, setGameArray] = useState([]);
  let [playerSimonPosition, setPlayerSimonPosition] = useState(0);
  let [playerScore, setPlayerScore] = useState(0);
  let [gameStatus, setGameStatus] = useState("New");
  let [buttonStatus, setButtonStatus] = useState("Start");
  let [inputStatus, setInputStatus] = useState(false);

  const touchableRefs = React.useRef([]);

  const [simonArrayButtons, setSimonArrayButtons] = useState([
    {
      id: 0,
      boxStyle: {
        borderTopLeftRadius: Dimensions.get("window").width / 2,
        // backgroundColor: "#013220",
      },
      backgroundImage: require("../../assets/AJS/simonButtons/base/green.png"),
      newBackgroundImage: require("../../assets/AJS/simonButtons/base/greenPress.png"),
      name: "green",
      ref: "greenButton",
      sound: require("../../assets/AJS/simonButtons/sounds/bump.wav"),
    },
    {
      id: 1,
      boxStyle: {
        borderBottomLeftRadius: Dimensions.get("window").width / 2,
        // backgroundColor: "#8b0000",
      },
      backgroundImage: require("../../assets/AJS/simonButtons/base/red.png"),
      newBackgroundImage: require("../../assets/AJS/simonButtons/base/redPress.png"),

      name: "red",
      ref: "redButton",
      sound: require("../../assets/AJS/simonButtons/sounds/bump.wav"),
    },
    {
      id: 2,
      boxStyle: {
        borderTopRightRadius: Dimensions.get("window").width / 2,
        // backgroundColor: "#CCCC00",
      },
      backgroundImage: require("../../assets/AJS/simonButtons/base/yellow.png"),
      newBackgroundImage: require("../../assets/AJS/simonButtons/base/yellowPress.png"),

      name: "yellow",
      ref: "yellowButton",
      sound: require("../../assets/AJS/simonButtons/sounds/bump.wav"),
    },
    {
      id: 3,
      boxStyle: {
        borderBottomRightRadius: Dimensions.get("window").width / 2,
        // backgroundColor: "#00008B",
      },
      backgroundImage: require("../../assets/AJS/simonButtons/base/blue.png"),
      newBackgroundImage: require("../../assets/AJS/simonButtons/base/bluePress.png"),
      name: "blue",
      ref: "blueButton",
      sound: require("../../assets/AJS/simonButtons/sounds/bump.wav"),
    },
  ]);

  const progressGame = () => {
    let nextNum = Math.floor(Math.random() * 4);
    let oldArray = gameArray;
    oldArray.push(nextNum);
    setGameArray(oldArray);
    setPlayerSimonPosition(0);
    setInputStatus(false);
    setTimeout(() => {
      rollCall();
    }, 1000);
  };

  const simonGame = () => {
    return simonArrayButtons.map((item) => {
      return (
        <TouchableHighlight
          style={Object.assign(item.boxStyle, styles.simonTouchable)}
          disabled={!inputStatus}
          key={item.id}
          onPress={() => {
            playSound();
            if (gameArray[playerSimonPosition] == item.id) {
              setPlayerSimonPosition(playerSimonPosition + 1);
              if (gameArray.length == playerSimonPosition + 1) {
                setTimeout(() => {
                  setPlayerScore(playerScore + 1);
                  progressGame();
                }, 1000);
              }
            } else if (gameArray[playerSimonPosition] !== item.id) {
              gameReset();
            }
          }}
        >
          <Image
            ref={(reference) => (touchableRefs.current[item.id] = reference)}
            style={Object.assign(item.boxStyle)}
            source={item.backgroundImage}
          />
        </TouchableHighlight>
      );
    });
  };

  async function playSound() {
    const noise = new Audio.Sound();
    try {
      await noise.loadAsync(
        require("../../assets/AJS/simonButtons/sounds/bump.wav")
      );
      await noise.playAsync();
      setTimeout(() => {
        noise.unloadAsync();
      }, 500);
    } catch (error) {
      // An error occurred!
    }
  }

  const rollCall = () => {
    let i = 0;
    var inte = setInterval(() => {
      let next = gameArray[i];
      let found = simonArrayButtons.find((element2) => element2.id == next);
      makeLight(found);
      if (i == gameArray.length - 1) {
        clearInterval(inte);
        setInputStatus(true);
      }
      i++;
    }, 1000);
  };

  const makeLight = (item) => {
    let found = simonArrayButtons.find((element2) => element2.id == item.id);

    setTimeout(() => {
      touchableRefs.current[item.id].setNativeProps({
        src: [resolveAssetSource(found.newBackgroundImage)],
      });
    }, 500);

    setTimeout(() => {
      touchableRefs.current[item.id].setNativeProps({
        src: [resolveAssetSource(found.backgroundImage)],
      });
    }, 1000);
  };

  const simonGameLights = () => {
    if (playerSimonPosition !== 0) {
      return gameArray.map((item, key) => {
        let found = simonArrayButtons.find((element2) => element2.id == item);
        if (key < playerSimonPosition) {
          return (
            <View
              style={[
                styles.simonLightInsideView,
                { backgroundColor: found.name },
              ]}
              key={key}
            ></View>
          );
        } else {
          return <View style={styles.simonLightInsideView} key={key}></View>;
        }
      });
    } else {
      return (
        <View
          style={[styles.simonLightInsideView, { justifyContent: "center" }]}
        >
          <Text style={{ textAlign: "center" }}>New Round</Text>
        </View>
      );
    }
  };

  const gameReset = () => {
    setGameArray([]);
    setPlayerSimonPosition(0);
    setPlayerScore(0);
    setGameStatus("New");
    setButtonStatus("Start");
    setInputStatus(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.simonView}>
        <View style={styles.simonOutline}>{simonGame()}</View>
      </View>

      <View style={styles.statusView}>
        <View style={styles.basicView}>
          <Text>Game Status: {gameStatus}</Text>
        </View>
        <View style={styles.basicView}>
          <Text>Current Score: {playerScore}</Text>
        </View>

        <Button
          style={styles.button}
          title={buttonStatus}
          onPress={() => {
            if (gameStatus == "New") {
              setGameStatus("Running");
              setButtonStatus("Reset");
              progressGame();
            } else {
              gameReset();
            }
          }}
        />
        <Button
          style={styles.button}
          title="Quit to Games"
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        />
        <View style={styles.simonLightView}>{simonGameLights()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // flexGrow:1,
  },
  statusView: {
    flex: 1,

    backgroundColor: "#FFFFFF",
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  basicView: {
    flex: 1,
  },

  simonView: {
    flex: 2,
    // aspectRatio: 1,
    backgroundColor: "#445544",
    justifyContent: "space-evenly",
  },

  simonLightView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  simonLightInsideView: {
    flex: 1,
  },

  simonTouchable: {
    flex: 1,
    flexBasis: "50%",
    borderColor: "#123456",
    borderWidth: 1,
    height: "100%",
    width: "100%",
  },
  simonOutline: {
    // flex: 1,
    // flexGrow: 1,
    backgroundColor: "#123456",
    height: Dimensions.get("window").width - 10,
    padding: 20,
    margin: 0,
    flexWrap: "wrap",
    alignContent: "stretch",
    borderBottomLeftRadius: Dimensions.get("window").width / 2,
    borderBottomRightRadius: Dimensions.get("window").width / 2,
    borderTopLeftRadius: Dimensions.get("window").width / 2,
    borderTopRightRadius: Dimensions.get("window").width / 2,
  },
  buttonImage: {
    // flex: 1,
    // width: 100,
    // height: 100,
    // backgroundColor: "green",
    // height: '100%',
    // width:'100%',
  },
});

const mapStateToProps = (state) => {
  const { planeApp } = state;
  return { planeApp };
};

export default connect(mapStateToProps)(AJSScreen);

// style = {isPress ? Object.assign(item.boxStylePress, styles.simonButtonView) : Object.assign(item.boxStyle, styles.simonButtonView)}
