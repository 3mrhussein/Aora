import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';

const SearchInput = ({
  title,
  value,
  placehodler,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2  ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>
        {title}
      </Text>
      <View className='flex justify-start flex-row w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary-100 items-center'>
        <TextInput
          className='flex-1 text-left text-white font-psemibold text-base'
          value={value}
          placeholder={placehodler}
          placeholderTextColor='#7b7b8b'
          onChange={handleChangeText}
          secureTextEntry={
            title === 'Password' && !showPassword
          }
        />
        {title === 'Password' && (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          >
            <Image
              resizeMode='contain'
              source={
                !showPassword ? icons.eye : icons.eyeHide
              }
              className='w-6 h-6'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchInput;
