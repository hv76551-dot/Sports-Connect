import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Colors from './Colors';
import {font_style} from './MyStyle';

const {width} = Dimensions.get('window');

const CustomDropDown = ({
  inputTitle,
  value,
  righticon,
  options = [],
  onSelect,
  container_style,
  textstyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{alignSelf: 'center', width: '90%'}}>
      {/* DropDown Button */}
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        style={[styles.dropdownButton, container_style]}>
        {inputTitle && (
          <Text
            numberOfLines={1}
            style={[font_style.text_13_500, styles.inputTitle, textstyle]}>
            {inputTitle}
          </Text>
        )}
        <View style={styles.row}>
          <Text
            numberOfLines={1}
            style={[font_style.text_14_500, styles.selectedText, textstyle]}>
            {value}
          </Text>
          {righticon && (
            <Image
              source={righticon}
              resizeMode="contain"
              style={styles.icon}
            />
          )}
        </View>
      </Pressable>

      {/* DropDown List */}
      {isOpen && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}
                style={styles.item}>
                <Text style={styles.itemText}>{item}</Text>
              </Pressable>
            )}
            nestedScrollEnabled
          />
        </View>
      )}
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  dropdownButton: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    marginVertical: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: Colors.greytxt,
    height: 50,
    justifyContent: 'center',
    width: '100%',
  },
  inputTitle: {
    color: Colors.greytxt,
    backgroundColor: Colors.white,
    position: 'absolute',
    left: 15,
    top: -10,
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: '100%',
  },
  selectedText: {
    color: Colors.darkGrey,
    flex: 1,
    marginLeft:5
  },
  icon: {
    height: 14,
    width: 14,
    tintColor:Colors.primary
  },
  dropdownContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    width: '60%',
    maxHeight: 200,
    position: 'absolute',
    top: 55,
    zIndex: 10,
    alignSelf: 'center',
    elevation: 5,
    alignSelf: 'flex-end',
  },
  item: {
    padding: 12,
    // borderBottomWidth: 1,
    borderBottomColor: Colors.greytxt,
  },
  itemText: {
    color: Colors.blacktxt,
    fontSize: 14,
  },
});
