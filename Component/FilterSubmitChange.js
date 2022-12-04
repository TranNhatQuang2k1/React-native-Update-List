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
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useEffect, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
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
const HorizontalitemCard = ({containerStyle, item}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        ...containerStyle,
        borderWidth: 0.8,
        borderColor: 'gray',
      }}>
      <Image
        source={{
          uri:
            item?.image === ''
              ? 'https://media.istockphoto.com/id/1181154281/vi/vec-to/d%E1%BA%A5u-ch%E1%BA%A5m-than-d%E1%BA%A5u-c%E1%BA%A3nh-b%C3%A1o-nguy-hi%E1%BB%83m-c%E1%BA%A3nh-b%C3%A1o-kh%E1%BA%A9n-c%E1%BA%A5p-d%E1%BA%A5u-hi%E1%BB%87u-c%E1%BA%A3nh-b%C3%A1o-minh-h%E1%BB%8Da-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng.jpg?s=1024x1024&w=is&k=20&c=2KewaiQBQX0QkUfEzEhqh32V84Z_S_eZ3ZB0XpZXXm0='
              : item.image,
        }}
        resizeMode="cover"
        style={{
          width: 130,
          height: 130,
          // marginBottom: 10,
          // backgroundColor: 'transparent',
        }}
        imageStyle={{
          backgroundColor: 'transparent',
        }}
      />
      <View
        style={{
          flex: 1,
          // marginLeft: 10,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
          }}>
          {item?.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: 'black',
          }}>
          {item?.errorDescription}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: 'black',
          }}>
          {item?.sku}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
          }}>
          {item.color}
        </Text>
      </View>
      <Image
        source={{
          uri: 'https://png.pngtree.com/png-vector/20190328/ourlarge/pngtree-edit-icon-design--essential-icon-vector-design-png-image_877474.jpg',
        }}
        resizeMode="cover"
        style={{
          width: 50,
          height: 50,
        }}
      />
    </TouchableOpacity>
  );
};
const FilterSubmitChange = ({
  filterSharevalue3,
  filterSharevalue4,
  height,
  bottom,
  item,
  setSubmit,
  handleRefresh,
}) => {
  const filterModalContainer = useAnimatedStyle(() => {
    return {
      opacity: interpolate(filterSharevalue3.value, [height, 0], [0, 1]),
      transform: [
        {
          translateY: filterSharevalue3.value,
        },
      ],
    };
  });
  const filterModalBg = useAnimatedStyle(() => {
    return {
      opacity: interpolate(filterSharevalue4.value, [height, 0], [0, 1]),
    };
  });
  const filterModalContent = useAnimatedStyle(() => {
    return {
      opacity: interpolate(filterSharevalue4.value, [height, 0], [0, 1]),
      transform: [
        {
          translateY: filterSharevalue4.value,
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
              backgroundColor: '#FFFFFF',
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
                Update Changes
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
                filterSharevalue4.value = withTiming(height, {
                  duration: 500,
                });
                filterSharevalue3.value = withDelay(
                  500,
                  withTiming(height, {duration: 100}),
                );
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              // backgroundColor: 'red',
              width: '100%',
              height: '100%',
              bottom: 10,
            }}>
            <View style={{flex: 1}}>
              <FlatList
                data={item}
                scrollEnabled={true}
                keyExtractor={item1 => `Data-${item1.id}`}
                contentContainerStyle={{
                  marginTop: 10,
                  paddingHorizontal: 10,
                }}
                renderItem={({item, index}) => (
                  <HorizontalitemCard
                    item={item}
                    containerStyle={{
                      marginVertical: 12,
                      marginTop: index == 0 ? 10 : 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#FFF',
                    }}
                  />
                )}
              />
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  // height: 50,
                  // backgroundColor: 'red',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginBottom: 20,
                  marginTop: 25,
                }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 25,
                    backgroundColor: '#42C6A5',
                    width: 120,
                    height: 50,
                    justifyContent: 'center',
                    textAlign: 'center',
                    borderColor: 'green',
                    borderWidth: 1,
                    // marginLeft: 120,
                    // position: 'absolute',
                  }}
                  onPress={() => {
                    setSubmit(true);
                    handleRefresh();
                    filterSharevalue4.value = withTiming(height, {
                      duration: 500,
                    });
                    filterSharevalue3.value = withDelay(
                      500,
                      withTiming(height, {duration: 100}),
                    );
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontStyle: 'italic',
                      fontWeight: '600',
                    }}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
export default FilterSubmitChange;
