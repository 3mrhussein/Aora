import { Image, Text, View } from 'react-native';
//color and focused is being returned by callback function of the tabBarIcon
import React from 'react';
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className='items-center justify-center gap-2 mt-2'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;
