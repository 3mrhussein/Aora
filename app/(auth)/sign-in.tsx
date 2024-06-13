import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import images from '@/constants/images';
import FormField from '@/components/FormField/FormField';
import CustomButton from '@/components/CustomButton/CustomButton';
import { Link, router } from 'expo-router';
import { signIn } from '@/api/login';
import useUser from '@/hooks/useUser';
import { getCurrentUser } from '@/api/user';
const SignIn = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useUser();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { email, password } = form;
  const submit = async () => {
    if (!email || !password)
      Alert.alert('Please enter your email and password');
    else {
      try {
        setIsSubmitting(true);
        await signIn(email, password);
        setUser(await getCurrentUser());
        setIsLoggedIn(true);
        router.replace('/home');
      } catch (err) {
        console.log(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn && user) router.replace('/home');
  }, []);
  return (
    <>
      <View className=' h-full bg-primary justify-center'>
        <Image
          source={images.logo}
          resizeMode='contain'
          className=' w-[115px] h-[35px]'
        />

        <Text className='text-2xl text-white font-psemibold mt-10'>
          Log in to Aora
        </Text>

        <FormField
          title='Email'
          value={form.email}
          onChangeText={(e) => {
            setForm({ ...form, email: e });
          }}
          otherStyles='mt-7'
          keyboardType='email-address'
          placeholder={'Email'}
        />

        <FormField
          title='Password'
          value={form.password}
          onChangeText={(e) => {
            setForm({ ...form, password: e });
          }}
          otherStyles='mt-7'
          placeholder={'Passowrd'}
        />

        <CustomButton
          title='Sign In'
          onPress={submit}
          containerStyles={'mt-7'}
          isLoading={isSubmitting}
          textStyles={''}
        />

        <View className='justify-center pt-5 flex-row gap-2'>
          <Text className='text-lg text-gray-100 font-pregular'>
            Don't have account?
          </Text>
          <Link
            href={'sign-up'}
            className='text-lg font-psemibold text-secondary-100'
          >
            Sign Up
          </Link>
        </View>
      </View>
    </>
  );
};

export default SignIn;
