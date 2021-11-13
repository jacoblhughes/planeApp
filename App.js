import * as React from "react";

import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";

import reducer from "./src/reducers/planeReducer";

import HomeScreen from "./src/screens/HomeScreen";
import OpenScreen from "./src/screens/OpenScreen";
import AJSScreen from "./src/screens/AJSScreen";
import BSGScreen from "./src/screens/BSGScreen";


const Stack = createStackNavigator();

const store = createStore(reducer);

function OpenSec() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Open" component={OpenScreen} />
    </Stack.Navigator>
  );
}

function HomeSec() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function AJSSec() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AJS" component={AJSScreen} />
    </Stack.Navigator>
  );
}

function BSGSec() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BSG" component={BSGScreen} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OpenSec">
          <Stack.Screen name="OpenSec" component={OpenSec} />
          <Stack.Screen name="HomeSec" component={HomeSec} />
          <Stack.Screen name="AJSSec" component={AJSSec} />
          <Stack.Screen name="BSGSec" component={BSGSec} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
