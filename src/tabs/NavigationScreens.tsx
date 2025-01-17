import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { OrganizerHomeScreen } from "screens/organizer/index";
import { ProfileContextProvider } from "contexts/profileContext";
import { OrganizerTabParamList } from "common/types/navigationTypes";
import { WalletScreen } from "screens/index";
import { Calendar } from "containers/MyCalendar";
import { OrganizerProfileScreen } from "screens/organizer/OrganizerProfileScreen";
import { NavigationTabBar } from "components/navBarComponents/navigationTabBar";
import { BrowseScreensStack } from "../stacks/BrowseScreensStack";
import { Sizing } from "styles/index";

const NavigationTabs = createBottomTabNavigator<OrganizerTabParamList>();

export const NavigationScreens = () => {
  return (
    <ProfileContextProvider>
      <NavigationTabs.Navigator
        tabBar={(props) => <NavigationTabBar {...props} />}>
        <NavigationTabs.Screen name="Home" component={OrganizerHomeScreen} />
        <NavigationTabs.Screen name="Browse" component={BrowseScreensStack} />
        <NavigationTabs.Screen name="Wallet" component={WalletScreen} />
        <NavigationTabs.Screen name="Availability" component={Calendar} />
        <NavigationTabs.Screen
          name="Profile"
          component={OrganizerProfileScreen}
        />
      </NavigationTabs.Navigator>
    </ProfileContextProvider>
  );
};
