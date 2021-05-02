import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import { AddIdea } from "components/Ideas/AddIdea";
import { IdeaList } from "components/Ideas/IdeaList";
import { StackScreenProps } from "@react-navigation/stack";
import { OrganizerTabParamList } from "common/types/navigationTypes";

export interface AddIdeasProps
  extends StackScreenProps<OrganizerTabParamList, "Add Ideas"> {}

export const AddIdeasScreen = ({ navigation }: AddIdeasProps) => {
  const [data, setData] = useState<object[]>([]);

  const submitHandler = (value: string) => {
    setData((prevTodo) => {
      return [
        // need a more scalable solution than Math.random() for keys, this is just a placeholder
        {
          value: value,
          key: Math.random().toString(),
        },
        ...prevTodo,
      ];
    });
  };

  return (
    <View>
      <Text style={styles.primary}>IDEAS</Text>
      <Text style={styles.detail}>
        "Ideas" are how Organizers share their current interests with the
        community
      </Text>
      <AddIdea submitHandler={submitHandler} />
      <View>
        <StatusBar barStyle="light-content" backgroundColor="midnightblue" />
      </View>

      <Text style={styles.primary}>My Ideas</Text>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => <IdeaList item={item} />}
        />
      </View>

      <Text style={styles.detail}>
        Need to add UPDATE and DELETE functionality. See:
        https://dev.to/reenydavidson/building-a-to-do-list-with-react-native-and-styled-components-2148
      </Text>
      <Button
        title="Go back to Menu"
        onPress={() => navigation.popToTop()}
        color="#05269f"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  primary: {
    fontSize: 30,
    margin: 20,
  },
  detail: {
    fontSize: 15,
    margin: 25,
  },
});
