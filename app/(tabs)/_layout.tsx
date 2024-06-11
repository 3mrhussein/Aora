import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import icons from '../../constants/icons';
import TabIcon from '@/components/TabIcon';
import useCheckSession from '@/hooks/useCheckSession';

const TabsLayout = () => {
  // useCheckSession();
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          //Tab Bar Icon Colors
          tabBarActiveTintColor: '#FFa001',
          tabBarInactiveTintColor: '#CDCDE0',
          //Tab bar Styles
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name='Home'
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='bookmark'
          options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name='bookmark'
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='create'
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name='create'
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name='profile'
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
