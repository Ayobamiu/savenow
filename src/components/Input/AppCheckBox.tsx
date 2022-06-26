import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { deepEqual } from "../../utilities/deepEqual";
import copyToClipboard from "../../utilities/copyToClipboard";
import showToast from "../../utilities/showToast";

type ItemProp = { label: string; value?: string };
type Props = {
  title?: string;
  options?: ItemProp[];
  defaultSelect?: ItemProp;
  onPress?: (item: ItemProp) => void;
};
const AppCheckBox: FC<Props> = ({ options, defaultSelect, onPress, title }) => {
  const [selected, setSelected] = useState<ItemProp | undefined>(defaultSelect);

  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      {title && <Text style={styles.radioTitle}>{title}</Text>}

      {options?.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.row}
            key={index}
            onPress={() => {
              setSelected(item);
              onPress && onPress(item);
            }}
            onLongPress={() => {
              copyToClipboard(item.label);
              showToast("Copied to Clipboard!");
            }}
          >
            <View style={[styles.unchecked]}>
              {deepEqual(selected, item) && (
                <View
                  style={[
                    styles.checked,
                    { backgroundColor: Colors[colorScheme].tabIconSelected },
                  ]}
                />
              )}
            </View>
            <Text style={styles.radioText}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AppCheckBox;

const styles = StyleSheet.create({
  checked: {
    width: 16,
    height: 16,

    borderRadius: 16 / 2,
  },
  unchecked: {
    width: 20,
    height: 20,
    borderColor: "#445974",
    borderWidth: 1,
    borderRadius: 20 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  container: { marginVertical: 12 },
  radioText: {
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 14.52,
    marginLeft: 8,
    flex: 1,
  },
  radioTitle: {
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
});
