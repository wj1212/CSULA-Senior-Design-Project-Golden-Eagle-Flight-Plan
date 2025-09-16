import React, { useEffect } from 'react';
import {View, Text, Button} from 'react-native';
//AuthSession is an expo library that handles
//OAuth/OpenID flows 
//can manage tokens, redirections, and communication
// with external login
import * as AuthSession from 'expo-auth-session';

//TS type helper from react navigation
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';


//properties will include navigation, or methods to move between screens

type Properties = StackScreenProps<RootStackParamList, 'Login'>;

export default function LoginPage({navigation}: Properties){
  //setting up the Microsoft OAuth request 
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      //client id from azure app 
      clientId: 'your-microsoft-client-id',
      //generates URI that micrsft will redirect after login
      
      redirectUri: AuthSession.makeRedirectUri(),

      scopes: ['openid', 'profile', 'email'],

      //returns id token containing user info
      //contains verified idenity credentials
      responseType: 'id_token',
    
    },
    {
      authorizationEndpoint: 'https://login.microsoftonline.com/calstatela.edu/oauth2/v2.0/authorize',
    }
  );



  useEffect(() => {
    if (response?.type === 'success'){
      navigation.replace('Register');
    }



  }, [response]// run 'useEffect' when response changes 



);

return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
    
    <Text style={{ fontSize: 28, marginBottom: 30 }}>Login</Text>

    <Button
      title="Login with Microsoft"
      disabled={!request} 
      // Prevent clicking button before AuthSession request is ready
      onPress={() => promptAsync()}
      // promptAsync launches the Microsoft login flow in a browser
    />

    <View style={{ height: 20 }} />

    <Button
    title="Regular Log in" 
    onPress={() => navigation.replace('RegLogin')}

    />

    <View style={{ height: 20 }} />
   

    <Button
      title="Register"
      onPress={() => navigation.replace('Register')}
     
    />
  </View>
);
}
