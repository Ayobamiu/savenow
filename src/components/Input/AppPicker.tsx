/** @format */

import React, {FC, useState} from 'react';
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ChevronDown, CloseSquare, Plus, TimeSquare} from 'react-native-iconly';
import useColorScheme from '../../hooks/useColorScheme';
import AppButton from '../Buttons/AppButton';
import AppTextInput from './AppTextInput';
import FuzzySearch from 'fuzzy-search'; // Or: var FuzzySearch = require('fuzzy-search');
import {useTheme} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface ListData {
  _id: string;
  label: string;
}

type Props = {
  defaultSelected?: ListData[];
  data?: ListData[];
  onSelect?: (value: ListData | ListData[]) => void;
  title?: string;
  placeholder?: string;
  multiple?: boolean;
};

const AppPicker: FC<Props> = ({
  data,
  onSelect,
  placeholder,
  multiple,
  defaultSelected,
  title,
}) => {
  const {colors} = useTheme();

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<ListData[]>(
    defaultSelected ? defaultSelected : [],
  );
  const [searchQuery, setSearchQuery] = useState('');
  const searcher = new FuzzySearch(data, ['label'], {
    caseSensitive: false,
  });
  let searchResult = data;
  if (searchQuery) {
    searchResult = searcher.search(searchQuery);
  }

  return (
    <View style={{marginVertical: 12}}>
      {title && (
        <Text
          style={{
            fontWeight: '500',
            fontSize: 10,
            lineHeight: 12,
            marginBottom: 12,
          }}>
          {title}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            borderRadius: 20,
          },
        ]}>
        {selected.length > 0 ? (
          <View style={{width: '90%', flexDirection: 'row', flexWrap: 'wrap'}}>
            {selected.map((i, index) => (
              <View key={index}>
                {multiple ? (
                  <Pressable
                    style={{
                      backgroundColor: colors.background,
                      paddingHorizontal: 10,
                      margin: 2,
                      borderRadius: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      elevation: 1,
                    }}
                    onPress={() => {
                      onSelect &&
                        onSelect(selected.filter(x => x._id !== i._id));
                      setSelected(yy => yy.filter(x => x._id !== i._id));
                    }}>
                    <Text
                      style={[styles.placeHolderText, {color: Colors.dark}]}>
                      {i.label}
                    </Text>
                    <CloseSquare
                      color={Colors.dark}
                      style={{marginLeft: 5}}
                      size="small"
                    />
                  </Pressable>
                ) : (
                  <Text style={[styles.placeHolderText, {color: Colors.dark}]}>
                    {i.label}
                  </Text>
                )}
              </View>
            ))}
          </View>
        ) : (
          <Text style={[styles.placeHolderText, {color: Colors.dark}]}>
            {placeholder}
          </Text>
        )}
        <ChevronDown color={Colors.dark} />
      </TouchableOpacity>
      <Modal visible={showModal} presentationStyle="formSheet">
        <View
          style={{
            width: '100%',
            flex: 1,
            padding: 15,
            paddingVertical: 30,
          }}>
          <View>
            <Button
              title={multiple ? 'Done' : 'Close'}
              onPress={() => {
                if (multiple) {
                  onSelect && onSelect(selected);
                }
                setShowModal(false);
              }}
            />
            <AppTextInput
              placeholder="Search"
              onChangeText={text => setSearchQuery(text)}
              clearButtonMode="always"
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchResult}
            extraData={searchQuery}
            keyExtractor={i => i._id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  if (multiple) {
                    if (selected.find(x => x._id === item._id)) {
                      setSelected(yy => yy.filter(x => x._id !== item._id));
                    } else {
                      setSelected(exi => [...exi, item]);
                    }
                  } else {
                    onSelect && onSelect(item);
                    setShowModal(false);
                    setSelected([item]);
                  }
                }}>
                <Text style={[styles.placeHolderText, {color: Colors.dark}]}>
                  {item.label}
                </Text>
                {selected.find(x => x._id === item._id) && (
                  <Plus color="green" size={20} />
                )}
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (
              <View style={{height: 0.5, backgroundColor: 'grey'}} />
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default AppPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    padding: 7,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'space-between',
    elevation: 1,
    borderWidth: 1,
  },
  placeHolderText: {
    fontSize: 16,
  },
});
