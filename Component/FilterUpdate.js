import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const {width} = Dimensions.get('window');
const TextButton = ({
  contentContainerStyle,
  disabled,
  label,
  labelStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        ...contentContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}>
      <Text
        style={{
          color: 'white',
          ...labelStyle,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
const FilterUpdate = ({
  filterSharevalue1,
  filterSharevalue2,
  height,
  bottom,
  item,
  onPress,
  color1,
}) => {
  const [name, setName] = useState('');
  const [sku, setSKU] = useState('');
  const idColor = useRef();
  useEffect(() => {
    setName(item.name);
    setSKU(item.sku);
  }, [item]);
  const filterModalContainer = useAnimatedStyle(() => {
    return {
      opacity: interpolate(filterSharevalue1.value, [height, 0], [0, 1]),
      transform: [
        {
          translateY: filterSharevalue1.value,
        },
      ],
    };
  });
  const filterModalBg = useAnimatedStyle(() => {
    return {
      opacity: interpolate(filterSharevalue2.value, [height, 0], [0, 1]),
    };
  });
  const filterModalContent = useAnimatedStyle(() => {
    return {
      opacity: interpolate(filterSharevalue2.value, [height, 0], [0, 1]),
      transform: [
        {
          translateY: filterSharevalue2.value,
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 0,
          height: height,
          width: width,
          //   backgroundColor: '#FFF',
        },
        filterModalContainer,
      ]}>
      <Animated.View
        style={[
          {
            flex: 1,
            height: height,
            width: width,
            backgroundColor: 'transparent',
          },
          filterModalBg,
        ]}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: bottom,
              height: height * 0.9,
              width: width,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: '#FFF',
            },
            filterModalContent,
          ]}>
          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              paddingHorizontal: 12,
              //   alignItems:'flex-end',
              justifyContent: 'space-between',
              //   backgroundColor:'red',
              height: 30,
            }}>
            <View
              style={{
                width: 180,
                // height:60,
                // backgroundColor: 'red',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  color: 'green',
                  alignItems: 'center',
                }}>
                Update
              </Text>
            </View>
            <TextButton
              label="Cancel"
              contentContainerStyle={{
                width: 60,
                backgroundColor: null,
              }}
              labelStyle={{
                color: 'green',
              }}
              onPress={() => {
                setName('');
                setSKU('');
                filterSharevalue2.value = withTiming(height, {
                  duration: 500,
                });
                filterSharevalue1.value = withDelay(
                  500,
                  withTiming(height, {duration: 100}),
                );
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 10,
              alignItems: 'center',
              // justifyContent: 'center',
              //   backgroundColor: 'red',
            }}>
            <View
              style={{
                // backgroundColor: '#fff',
                borderRadius: 40,
                height: 75,
                padding: 10,
                marginTop: -10,
                backgroundColor: 'transparent',
              }}>
              <TextInput
                style={styles.inputPass}
                secureTextEntry={false}
                multiline={true}
                value={name}
                maxLength={50}
                placeholder="name"
                autoFocus={false}
                textAlign={'center'}
                keyboardType={'name-phone-pad'}
                placeholderTextColor="#000"
                onChangeText={text => setName(text)}
              />
            </View>

            <View
              style={{
                borderRadius: 40,
                height: 75,
                padding: 8,
                marginTop: 0,
                backgroundColor: 'transparent',
              }}>
              <TextInput
                style={styles.inputPass}
                secureTextEntry={false}
                multiline={true}
                value={sku}
                maxLength={20}
                placeholder="sku"
                autoFocus={false}
                textAlign={'center'}
                keyboardType={'numeric'}
                placeholderTextColor="#000"
                paddingHorizontal={10}
                onChangeText={text => setSKU(text)}
              />
            </View>

            <View
              style={{
                position: 'relative',
                // backgroundColor: 'red',
                borderRadius: 20,
                // alignItems: 'center',
                justifyContent: 'center',
                // height: 90,
                width: '100%',
                paddingHorizontal: 18,
                marginTop: 20,
                // backgroundColor: 'red',
              }}>
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={color1}
                search
                maxHeight={300}
                labelField="name"
                valueField="id"
                placeholder={'Chọn màu'}
                searchPlaceholder="Search..."
                value={item?.color != null ? item.color : null}
                onChange={item1 => {
                  idColor.current = item1.id;
                  console.log(idColor.current);
                }}
              />
            </View>

            <TouchableOpacity
              style={{
                // backgroundColor: '#FF814C',
                backgroundColor: 'green',
                width: 150,
                height: 48,
                justifyContent: 'center',
                borderRadius: 28,
                marginTop: 18,
              }}
              onPress={() => {
                if (name === '') {
                  Alert.alert('Tên sản phẩm là bắt buộc', 'Cảnh Báo', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ]);
                } else if (sku === '') {
                  Alert.alert('SKU là bắt buộc', 'Cảnh Báo', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ]);
                } else {
                  if (
                    item.name != name ||
                    item.sku != sku ||
                    item.color != idColor.current
                  ) {
                    item.color = idColor.current;
                    item.name = name !== '' ? name : item.name;
                    item.sku = sku !== '' ? sku : item.sku;
                    onPress(item);
                  }
                  filterSharevalue2.value = withTiming(height, {
                    duration: 500,
                  });
                  filterSharevalue1.value = withDelay(
                    500,
                    withTiming(height, {duration: 100}),
                  );
                  setName('');
                  setSKU('');
                  idColor.current = null;
                  Keyboard.dismiss();
                }
              }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 18,
                  color: '#212525',
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

    alignItems: 'center',
    borderRadius: 5,
  },
  inputPass: {
    justifyContent: 'center',
    width: 350,
    color: '#000',
    textAlign: 'center',
    // paddingHorizontal: 5,
    height: '100%',
    backgroundColor: '#9292',
    borderRadius: 20,
    marginTop: 5,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 25,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default FilterUpdate;
