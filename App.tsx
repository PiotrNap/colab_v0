import * as React from "react";
import { LogBox } from "react-native";

// Ignore all log notifications:
LogBox.ignoreAllLogs();

import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";

// Error Handlers
import { setJSExceptionHandler } from "react-native-exception-handler";
import { jsErrorHandler } from "lib/errors";
//-----

import { AppContextProvider } from "contexts/appContext";
import { appContext } from "contexts/contextApi";
import { UserRegistrationScreens } from "tabs/UserRegistrationScreens";
import { ProfileContextProvider } from "contexts/profileContext";
import { DepositSuccessful, Confirmation } from "screens/payments";
import { AppStackParamList } from "common/types/navigationTypes";
import { NavigationScreens } from "tabs/NavigationScreens";
import { WalletTopUpScreen } from "screens/onboarding";
import { OnboardingScreens } from "components/OnboardingPager";
import { LogIn } from "screens/LogIn";
import { SafeAreaProvider } from "react-native-safe-area-context";

setJSExceptionHandler(jsErrorHandler, true); // true - enables the error in dev mode
enableScreens(); // enable native screens for navigation instead of using Views

const Stack = createStackNavigator<AppStackParamList>();

function App() {
  const { auth } = appContext();

  let [fontsLoadaed] = useFonts({
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
  });

  if (!fontsLoadaed) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaProvider>
        <AppContextProvider>
          <ProfileContextProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Navigation Screens"
                headerMode="screen">
                {auth ? (
                  <>
                    {/*<Stack.Screen
                  name="Home"
                  options={{ title: "Home" }}
                  component={HomeScreen}
                />*/}
                    {/*               <Stack.Screen
                    name="Log In"
                    component={LogIn}
                    options={{ headerShown: false }}
                  />*/}
                    <Stack.Screen
                      name="Navigation Screens"
                      component={NavigationScreens}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="Deposit Successful"
                      options={{ headerShown: false, gestureEnabled: false }}
                      component={DepositSuccessful}
                    />
                    <Stack.Screen
                      name="Confirmation"
                      options={{ headerShown: false, gestureEnabled: false }}
                      component={Confirmation}
                    />
                    <Stack.Screen
                      name="Add Funds"
                      options={{ headerShown: false, gestureEnabled: false }}
                      component={WalletTopUpScreen}
                    />
                  </>
                ) : (
                  <>
                    <Stack.Screen
                      name="User Registration Screens"
                      component={UserRegistrationScreens}
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="Onboarding Screens"
                      component={OnboardingScreens}
                      options={{
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="Deposit Successful"
                      options={{ headerShown: false, gestureEnabled: false }}
                      component={DepositSuccessful}
                    />
                    <Stack.Screen
                      name="Confirmation"
                      options={{ headerShown: false, gestureEnabled: false }}
                      component={Confirmation}
                    />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </ProfileContextProvider>
        </AppContextProvider>
      </SafeAreaProvider>
    );
  }
}

export default App;
