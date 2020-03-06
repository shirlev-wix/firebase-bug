/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import * as firebase from 'firebase';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const firebaseConfig = {
  apiKey: "AIzaSyALvn4ZwZG0Fwp2WjGYIISXTb73OyWNR1I",
  authDomain: "fir-bug-ee9d1.firebaseapp.com",
  databaseURL: "https://fir-bug-ee9d1.firebaseio.com",
  projectId: "fir-bug-ee9d1",
  storageBucket: "fir-bug-ee9d1.appspot.com",
  messagingSenderId: "601523201922",
  appId: "1:601523201922:web:3bb41f4f80e81790b3d19b"
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      connection: 'not connected'
    }
  }
  async componentDidMount() {
    const {token} = await this.fetchFireBaseToken();

    if (token) {
      try {

        await firebase.initializeApp(firebaseConfig);
        firebase.auth().signInWithCustomToken(token)
          .then(() => {
            console.log('connected to firebase!');
            this.setState({connection: 'connected'});
          })
          .catch((error) => {
            console.log(error);
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/invalid-custom-token') {
              console.log('The token you provided is not valid.');
            } else {
              console.log(error);
            }
          });

      } catch (e) {
        console.log(e);
      }


    }

  }

  fetchFireBaseToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/init');
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.message)
      }
      return body;
    } catch (e) {
     console.error(e);
     return {};
    }
  }


  render() {
    return (
      <>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView>
          <Text>{`firebase is ${this.state.connection}`}</Text>
        </SafeAreaView>
      </>
    );
  }
}

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content"/>
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header/>
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions/>
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions/>
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks/>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
