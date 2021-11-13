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
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function BSGScreen(props) {
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
    },
  ]);

  const getNextElement = () => {
    let next_element_num = Math.floor(Math.random() * 4);
    return next_element_num;
  };

  const addNextElement = () => {
    let nextNum = getNextElement();
    setSimonArray((simonArray) => [...simonArray, nextNum]);
  };

  const colorShade = (col, amt) => {
    col = col.replace(/^#/, "");
    if (col.length === 3)
      col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];

    let [r, g, b] = col.match(/.{2}/g);
    [r, g, b] = [
      parseInt(r, 16) + amt,
      parseInt(g, 16) + amt,
      parseInt(b, 16) + amt,
    ];

    r = Math.max(Math.min(255, r), 0).toString(16);
    g = Math.max(Math.min(255, g), 0).toString(16);
    b = Math.max(Math.min(255, b), 0).toString(16);

    const rr = (r.length < 2 ? "0" : "") + r;
    const gg = (g.length < 2 ? "0" : "") + g;
    const bb = (b.length < 2 ? "0" : "") + b;

    return `#${rr}${gg}${bb}`;
  };

  const fakeButtonClick = (itemId) => {
    // let newArr = [...simonArrayButtons];
    // let oldColor = newArr[itemId]["boxStyle"]["backgroundColor"];
    // newArr[itemId]["boxStyle"]["backgroundColor"] = colorShade(oldColor, +60);
    // setSimonArrayButtons(newArr);
    // setTimeout(() => {
    //   setSimonArrayButtons(newArr);
    //   console.log("when");
    // }, 3000);
  };

  // const [simonArray, setSimonArray] = useState([getNextElement()]);
  const [simonArray, setSimonArray] = useState([0, 1, 2, 3]);

  const [playerSimonArray, setPlayerSimonArray] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);

  const touchableRefs = React.useRef([]);

  const habitList = () => {
    return simonArrayButtons.map((item) => {
      return (
        <TouchableOpacity
          style={Object.assign(item.boxStyle, styles.simonTouchable)}
          // style={Object.assign(item.boxStyle, styles.simonButtonView)}
          key={item.id}
          onPress={() => {
            addNextElement();
          }}
        >
          <Image
            ref={(reference) => (touchableRefs.current[item.id] = reference)}
            style={Object.assign(item.boxStyle)}
            source={item.backgroundImage}
          />
        </TouchableOpacity>
      );
    });
  };

  const makeLight = (item) => {
    let found = simonArrayButtons.find((element2) => element2.id == item);
    touchableRefs.current[item].setNativeProps({
      src: [resolveAssetSource(found.newBackgroundImage)],
    });
  };

  const pressOrder = () => {
    simonArray.forEach((item) => {
      setTimeout(() => {
        makeLight(item);
      }, 1000);
    });
    // for(let i=0; i<simonArray.length;i++){
    //   let found = simonArrayButtons.find((element2) => element2.id == i);
    //   setTimeout(() => {
    //     touchableRefs.current[i].setNativeProps({
    //       src: [resolveAssetSource(found.newBackgroundImage)],
    //     });
    //   }, 1000);
    //   setTimeout(() => {
    //     touchableRefs.current[i].setNativeProps({
    //       src: [resolveAssetSource(found.backgroundImage)],
    //     });
    //   }, 200);

    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.simonView}>
        <View style={styles.simonOutline} onLayout={(event) => {}}>
          {habitList()}
        </View>
      </View>

      <View style={styles.buttonView}>
        <Button
          style={styles.button}
          title="Start Game"
          onPress={() => {
            pressOrder();
          }}
        />
        <Text>{playerScore}</Text>
        <Button
          style={styles.button}
          title="Current Array"
          onPress={() => {
            console.log(simonArray);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#FFFFFF",
    // flexGrow:1,
  },
  buttonView: {
    // flex: 1,
    backgroundColor: "#FFFFFF",
    // justifyContent: 'space-around',
  },
  button: {
    // flex: 1,
    backgroundColor: "#FFFFFF",
  },
  simonView: {
    // flex: 1,
    // aspectRatio: 1,
    height: Dimensions.get("window").width,
    backgroundColor: "#445544",
    justifyContent: "space-evenly",
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

export default connect(mapStateToProps)(BSGScreen);

// style = {isPress ? Object.assign(item.boxStylePress, styles.simonButtonView) : Object.assign(item.boxStyle, styles.simonButtonView)}
