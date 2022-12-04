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
  Animated,
} from 'react-native';
import 'react-native-gesture-handler';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {Dimensions} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import FilterUpdate from './Component/FilterUpdate';
import FilterSubmitChange from './Component/FilterSubmitChange';
import BASE_URL_PRODUCT from './config';
const BASE_URL_COLOR = 'https://hiring-test.stag.tekoapis.net/api/colors';
const page = [
  {
    id: 0,
    label: 'PAGE 1',
  },
  {
    id: 1,
    label: 'PAGE 2',
  },
  {
    id: 2,
    label: 'PAGE 3',
  },
];
const {width, height} = Dimensions.get('window');
const pages = page.map(page1 => ({
  ...page1,
  ref: React.createRef(),
}));
const TabIndiCator = ({measureLayout, scrollX}) => {
  const inputRange = pages.map((_, i) => i * width);
  const tabIndiCatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 5,
        height: 2,
        width: 130,
        borderRadius: 12,
        backgroundColor: '#42C6A5',
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};
const Tabs = ({scrollX, onTabPress}) => {
  const [measureLayout, setmeasureLayout] = useState([]);
  const containerRef = React.useRef();
  useEffect(() => {
    let ml = [];
    Update = [];
    pages.forEach(page1 => {
      page1?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({x, y, width, height});
          if (ml.length === pages.length) {
            setmeasureLayout(ml);
          }
        },
      );
    });
  }, [containerRef.current]);
  return (
    <View
      ref={containerRef}
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      {measureLayout.length > 0 && (
        <TabIndiCator measureLayout={measureLayout} scrollX={scrollX} />
      )}
      {pages.map((item, index) => {
        return (
          <TouchableOpacity
            key={`Tab-${index}`}
            ref={item.ref}
            style={{
              flex: 1,
              paddingHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'red',
            }}
            onPress={() => {
              onTabPress(index);
              Update = [];
            }}>
            <Text
              style={{
                fontSize: height > 800 ? 18 : 17,
              }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
var Update = [];
const Page = ({data, COLORS}) => {
  const filterSharevalue1 = useSharedValue(height);
  const filterSharevalue2 = useSharedValue(height);
  const filterSharevalue3 = useSharedValue(height);
  const filterSharevalue4 = useSharedValue(height);
  const [item1, setItem1] = useState([]);
  const [submit, setSubmit] = useState(false);
  const data1 = useRef(data);
  const onChange = data2 => {
    Update.push(data2);
    // console.log(Update);
  };
  const handleRefresh = () => {
    if (submit) {
      data1.current.forEach(ele => {
        console.log(ele);
        Update.forEach(update => {
          if (ele.id === update.id) {
            ele = update;
          }
        });
      });
      setSubmit(false);
      Update = [];
    }
  };
  // useEffect(() => {
  //   console.log(data1.current);
  // }, [data1.current]);
  const HorizontalitemCard = ({containerStyle, item, onPress}) => {
    useEffect(() => {
      COLORS.forEach(ele => {
        if (ele.id === item.color) {
          setColor(ele.name);
        }
      });
    }, [item]);
    const [color, setColor] = useState('');
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          ...containerStyle,
          borderWidth: 0.8,
          borderColor: 'gray',
        }}
        onPress={onPress}>
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
            {color}
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
  return (
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
          data={data1.current}
          extraData={Update}
          scrollEnabled={true}
          keyExtractor={item => `Data-${item.id}`}
          onRefresh={handleRefresh()}
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
              onPress={() => {
                setItem1(item);
                filterSharevalue1.value = withTiming(0, {duration: 100});
                filterSharevalue2.value = withTiming(0, {duration: 500});
              }}
            />
          )}
        />
        <FilterUpdate
          filterSharevalue1={filterSharevalue1}
          filterSharevalue2={filterSharevalue2}
          height={450}
          bottom={160}
          item={item1}
          onPress={onChange}
          color1={COLORS}
        />

        <FilterSubmitChange
          filterSharevalue3={filterSharevalue3}
          filterSharevalue4={filterSharevalue4}
          height={600}
          bottom={100}
          item={Update}
          setSubmit={setSubmit}
          handleRefresh={handleRefresh}
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
              backgroundColor: 'gray',
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
              filterSharevalue3.value = withTiming(0, {duration: 100});
              filterSharevalue4.value = withTiming(0, {duration: 500});
            }}>
            <Text
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                // marginLeft: 18,
                fontSize: 14,
                fontStyle: 'italic',
                fontWeight: '600',
                color: COLORS.black,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const App = () => {
  const [loading, setLoading] = useState(true);
  const data = useRef([]);
  const COLORS = useRef([]);
  const [data1, setData1] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await fetch(BASE_URL_PRODUCT, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.status === 200) {
            console.log(response.status);
            return response.json();
          } else {
            console.log(response.status);
          }
        })
        .then(response => {
          data.current = response;
          // console.log(data);
        })
        .catch(error => {
          console.log(error);
        });

      await fetch(BASE_URL_COLOR, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          if (response.status === 200) {
            console.log(response.status);
            return response.json();
          } else {
            console.log(response.status);
            return response.json();
          }
        })
        .then(response => {
          COLORS.current = response;
        })
        .catch(error => {
          console.log(error);
        });
      setLoading(false);
    }
    fetchData();
  }, []);
  const scrollX = React.useRef(
    new Animated.Value(0, {useNativeDriver: true}),
  ).current;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onTabPress = React.useCallback(tabIndex => {
    flatListRef?.current?.scrollToOffset({
      offset: tabIndex * width,
    });
  });
  const flatListRef = useRef();
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={'green'} />
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            height: 60,
            //  backgroundColor: 'red',
          }}>
          <Tabs scrollX={scrollX} onTabPress={onTabPress} />
        </View>
        <Animated.FlatList
          useNativeDrive={true}
          ref={flatListRef}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={width}
          decelerationRate="fast"
          keyboardDismissMode="on-drag"
          showsHorizontalScrollIndicator={false}
          data={pages}
          keyExtractor={item => `Tabs-${item.id}`}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDrive: false},
          )}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: width,
                }}>
                {index == 0 && (
                  <Page
                    data={data.current.splice(0, 10)}
                    COLORS={COLORS.current}
                  />
                )}
                {index == 1 && (
                  <Page
                    data={data.current.splice(0, 10)}
                    COLORS={COLORS.current}
                  />
                )}
                {index == 2 && (
                  <Page data={data.current.splice(0)} COLORS={COLORS.current} />
                )}
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
