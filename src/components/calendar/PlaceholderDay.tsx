import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Typography } from "styles/index";

export interface PlaceholderDayProps {
  number: number;
  key: string;
}

export const PlaceholderDay = ({ number }: PlaceholderDayProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholderNumber}>{number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: `${100 / 7}%`,
    height: `${100 / 6}%`,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderNumber: {
    ...Typography.body.x30,
    ...Typography.roboto.regular,
    color: Colors.primary.s350,
  },
});
