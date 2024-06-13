import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import images from '@/constants/images';
import FormField from '@/components/FormField/FormField';
import CustomButton from '@/components/CustomButton/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '@/api/user';
const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { username, email, password } = form;
  const submit = async () => {
    if (!username || !email || !password)
      Alert.alert('Please fill all required fields');
    else {
      setIsSubmitting(true);
      await createUser(form.email, form.password, form.username)
        .then((res) => {
          router.replace('/home');
        })
        .catch((e) => {
          Alert.alert('Error Happened');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };
  return (
    <View className='bg-primary w-full min-h-full px-4 justify-center'>
      <Image
        source={images.logo}
        resizeMode='contain'
        className=' w-[115px] h-[35px] '
      />

      <Text className='text-2xl text-white font-psemibold mt-10'>
        Sign Up to Aora
      </Text>

      <FormField
        title='Username'
        value={form.username}
        onChangeText={(text) => {
          setForm({ ...form, username: text });
        }}
        otherStyles='mt-10'
        // placehodler={'Username'}
      />
      <FormField
        title='Email'
        value={form.email}
        onChangeText={(text) => {
          setForm({ ...form, email: text });
        }}
        otherStyles='mt-7'
        keyboardType='email-address'
        // placehodler={'Email'}
      />

      <FormField
        title='Password'
        value={form.password}
        onChangeText={(text) => {
          setForm({ ...form, password: text });
        }}
        otherStyles='mt-7'
        // placehodler={'Passowrd'}
      />

      <CustomButton
        title='Sign Up'
        onPress={submit}
        containerStyles={'mt-7'}
        isLoading={isSubmitting}
        textStyles={''}
      />

      <View className='justify-center pt-5 flex-row gap-2'>
        <Text className='text-lg text-gray-100 font-pregular'>
          Have an account already?{' '}
        </Text>
        <Link
          href={'sign-in'}
          className='text-lg font-psemibold text-secondary-100'
        >
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
