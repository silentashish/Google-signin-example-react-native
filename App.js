/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
// import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
// 427422276732-8dspbt4lo2m80ldrqs8mlcskh0l76i2d.apps.googleusercontent.com
type Props = {};
export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
    };
  }
  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '547866353125-a8rc02q8vprrou52lalhefrtkdgg13si.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '',
      //It is mandatory to call this method before attempting to call signIn()
      //scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      //webClientId:'AAAAY4RaXHw:APA91bG38gNOuYxXOcpufwzhnz-mbkqKyg2Ts25Qot8OhPXxBE-iCIwYjAjv1vBu5yUJt8VYi1ZFozp6ErCQnOBk4sUtRGk7UfV9tdtPYVkI4Lz_WjMZRFdWMKYIiTCMEDAxfiRlOgu3',
        // '427422276732-vs8r5b2ijk0ko2lq0d9s7ocq14saqp8d.apps.googleusercontent.com',
    });
  }
  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };
  _getCurrentUser = async () => {
    //May be called eg. in the componentDidMount of your main component.
    //This method returns the current user
    //if they already signed in and null otherwise.
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      console.error(error);
    }
  };
  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  _revokeAccess = async () => {
    //Remove your application from the user authorized applications.
    try {
      await GoogleSignin.revokeAccess();
      console.log('deleted');
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 312, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={this._signIn}
        />
      </View>
    );
  }
}
// export default class App extends Component<Props> {
//   componentDidMount() {
//         GoogleSignin.configure({
//             // scopes: CONFIG.GOOGLE_SERVICE.SCOPES,
//             webClientId: "427422276732-8dspbt4lo2m80ldrqs8mlcskh0l76i2d.apps.googleusercontent.com",
//             forceConsentPrompt: true, // if you want to show the authorization prompt at each login
//         });
//     }
//     // signIn = async () => {
//     //     try {
//     //       await GoogleSignin.hasPlayServices();
//     //       const userInfo = await GoogleSignin.signIn();
//     //       this.setState({ userInfo });
//     //     } catch (error) {
//     //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//     //         // user cancelled the login flow
//     //         console.log('Sign in cancelled');
//     //       } else if (error.code === statusCodes.IN_PROGRESS) {
//     //         console.log('Sign in in progress');
//     //         // operation (f.e. sign in) is in progress already
//     //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//     //         // play services not available or outdated
//     //         console.log('no play service ');
//     //       } else {
//     //         // some other error happened
//     //         console.log('Other error');
//     //       }
//     //     }
//     //   };
//
//   googleSignInHandler = () => {
//         console.log("google sign in...");
//         GoogleSignin.hasPlayServices()
//         .then(res => {
//             GoogleSignin.signIn()
//             .then(res => {
//                 console.log(res);
//             })
//             .catch(err => {
//                 console.log(error.code);
//             });
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }
//
//   render() {
//     return (
//       <View>
//         <View>
//           <LoginButton
//             onLoginFinished={
//               (error, result) => {
//                 if (error) {
//                   console.log("login has error: " + result.error);
//                 } else if (result.isCancelled) {
//                   console.log("login is cancelled.");
//                 } else {
//                   AccessToken.getCurrentAccessToken().then(
//                     (data) => {
//                       console.log(data.accessToken.toString())
//                       console.log("login done");
//                     }
//                   )
//                 }
//               }
//             }
//             onLogoutFinished={() => console.log("logout.")}/>
//         </View>
//         <View>
//           <GoogleSigninButton
//               style={{ width: 48, height: 48 }}
//               size={GoogleSigninButton.Size.Icon}
//               color={GoogleSigninButton.Color.Dark}
//               onPress={this.googleSignInHandler}
//           />
//         </View>
//     </View>
//
//
//         // <View>
//         //   <GoogleSigninButton
//         //     style={{ width: 192, height: 48 }}
//         //     size={GoogleSigninButton.Size.Wide}
//         //     color={GoogleSigninButton.Color.Dark}
//         //     onPress={this._signIn}/>
//         //     // disabled={this.state.isSigninInProgress} />
//         // </View>
//
//
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
