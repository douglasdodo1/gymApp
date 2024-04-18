import { GluestackUIProvider} from '@gluestack-ui/themed';
import AppNavigator from './app/navigation/AppNavigator';
import { Db } from './app/db/Db';
import { insertType } from './app/db/type/insert';
import { readType } from './app/db/type/read';
import { useEffect, useState } from 'react';

export default function App() {
 
  useEffect(()=>{
    Db();
    insertType();
    readType();
  },[]);
  
  return (
    <GluestackUIProvider>
      <AppNavigator/>
    </GluestackUIProvider>
  );
}




