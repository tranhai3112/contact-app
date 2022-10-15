import React from 'react';
import queryClient from './client';
import {QueryClientProvider} from 'react-query'
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/navigation/Drawer/DrawerNavigation';
import {default as mapping} from './mapping.json'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheetContainer from './src/components/container/BottomSheet/Navigator/BottomSheetContainer';
import BottomSheetContactSelect from './src/components/container/BottomSheet/SelectContact/BottomSheetContactSelect';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {
  const data = async () => {
    const s = await AsyncStorage.getAllKeys()
    console.log('asyn storage', s);
  }
  React.useEffect(() => {
    data()
  },[])
  return (

  <ApplicationProvider {...eva} theme={eva.light} customMapping={mapping}>
    <QueryClientProvider client={queryClient}>
      <NavigationContainer >
        <GestureHandlerRootView style={{flex:1}}>
          <DrawerNavigation />
          <BottomSheetContainer/>
          <BottomSheetContactSelect/>
        </GestureHandlerRootView>
      </NavigationContainer>
    </QueryClientProvider>
  </ApplicationProvider>
  )
}