import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import icons from '@/constants/icons';
import { FormFieldProps } from './FormField.types';
const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  onChangeText,
  otherStyles,
  keyboardType,
  icon,
  onIconPress,
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);
  const handleOnChangeText = (e) => {
    setCurrentValue(e);
    if (onChangeText) onChangeText(e);
  };
  return (
    <View className={`space-y-2  ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className='flex justify-start flex-row w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary-100 items-center'>
        <TextInput
          className='flex-1 text-left text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleOnChangeText}
          keyboardType={keyboardType}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />
        {title === 'Password' && (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          >
            <Image
              resizeMode='contain'
              source={!showPassword ? icons.eye : icons.eyeHide}
              className='w-6 h-6'
            />
          </TouchableOpacity>
        )}
        {icon && (
          <TouchableOpacity onPress={onIconPress}>
            <Image resizeMode='contain' className='w-6 h-6' source={icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
