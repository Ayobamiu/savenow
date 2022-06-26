import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";

type Props = {
  options?: { label: string; value?: string }[];
};
const AppRadio: FC<Props> = ({ options }) => {
  const [selected, setSelected] = useState<number[]>([]);
  return (
    <View style={styles.container}>
      <Text style={styles.radioTitle}>App radio</Text>

      {options?.map((i, index) => (
        <TouchableOpacity
          style={styles.row}
          key={index}
          onPress={() => {
            if (selected.includes(index)) {
              setSelected((i) => i.filter((x) => x !== index));
            } else {
              setSelected((i) => [...i, index]);
            }
          }}
        >
          <View
            style={[
              styles.unchecked,
              selected.includes(index) && { backgroundColor: "#445974" },
            ]}
          />
          <Text style={styles.radioText}>{i.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AppRadio;

const styles = StyleSheet.create({
  unchecked: {
    width: 15,
    height: 15,
    borderColor: "#445974",
    borderWidth: 1,
    borderRadius: 5,
  },
  container: { marginVertical: 12 },
  radioText: {
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 14.52,
    marginLeft: 8,
  },
  radioTitle: {
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 12,
    marginBottom: 12,
  },
  row: { flexDirection: "row", marginVertical: 10 },
});
