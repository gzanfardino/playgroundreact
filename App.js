import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { StyleSheet, FlatList, Text, View , Image, Button, TextInput } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { render } from 'react-dom';

const data = {
  content: {
    body: [
      {
      "id": 2,
      "title": "McDonald's",
      "img": "https://...",
      "created_at": "2019-09-16 00:00:00"
      },
      {
      "id": 1,
      "title": "Burger King",
      "img": "https://...",
      "created_at": "2019-09-16 00:00:00"
      },
      ]
      
  }
};

const initialState = {
  isLoggedIn: false,
  userId: '',
  token: '',
  expiresOn: '',
  data: '',
};


function LoginScreen({ navigation }, props) {
  const [email, setEMail] = useState('email');
  const [password, setPassword] = useState('password');

  const handlePress = () => {
    var ooo = {
      email,
      password
    }
    console.log("{"+JSON.stringify(ooo)+"}" );
    fetch('https://playground.alfonsiasno.delivery/api/auth/login', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify(ooo) 
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log('response object:',responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
    navigation.navigate("Partners");
  }

  

  return (
    <View style={loginStyles.container}>
      <Image 
        source={{width: 200, height: 200, uri: "https://playground.alfonsino.delivery/logo.png"}} 
      />  
      <TextInput
        style={{ marginBottom: 15, height: 35, width: 160, borderColor: 'gray', borderWidth: 1 }}
        textAlign={'center'}
        placeholder={"email"}
        onChangeText={(text)=>setEMail(text)}
      />
      <TextInput
        style={{  marginBottom: 15, height: 35, width: 160, borderColor: 'gray', borderWidth: 1 }}
        textAlign={'center'}
        placeholder={"password"}
        onChangeText={(text)=>setPassword(text)}
      />
      <Button title="Login" onPress={handlePress}/>
    </View>
  );
};


class PartnersScreen extends Component {
  constructor(props){
    super(props)
    this.navigation
    this.state = {
      isLoading: true,
      dataSource: []
    }
  };

  componentDidMount() {
    fetch('https://playground.alfonsino.delivery/api/partners?skip=0&per_page=8')
      .then( response => response.json() )
      .then( responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        })
      })
      .catch(error => console.log(error));
  }
  
  
  _renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <Image 
          source={{uri: "https://picsum.photos/id/23/200/200"}}
          style={{width: 75, height: 75, margin:4}} 
        />  
        <View style={{justifyContent: 'center', paddingLeft: 10}}>
          <Text style={{fontSize: 20, fontWeight: "bold"}}>{item.title}</Text>
        </View>
      </View>
    )
  }
  
  render(){
    let {dataSource, isLoading} = this.state;
    const { navigation } = this.props;
    const handlePress = () => {
      navigation.navigate("CreaPartner");
    }
    return (
      
      <View style={partnersStyles.container}>
        <FlatList
          style={{marginBottom: 100}}
          data={dataSource}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        
        <View style={{marginLeft: 200, margin:40}}>
          <Button   title="Crea Partner" onPress={handlePress}/>
        </View>
      </View>
    );
  }
}

function CreaPartnerScreen({ navigation }) {
  const [title, setTitle] = useState('partnerTitle');

  
  const handlePress = () => {
    var test = {
      title
    }
    console.log(JSON.stringify(test));
    fetch('https://playground.alfonsino.delivery/api/partners', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify(test) 
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log('response object:',responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
    navigation.navigate("Partners");
  }

  return (
    <View style={loginStyles.container}>
      <TextInput
        style={{ marginTop: 150, height: 35, width: 250, marginBottom: 50, borderColor: 'gray', borderWidth: 1 }}
        textAlign={'center'}
        placeholder={"New Partner Title"}
        onChangeText={(text)=>setTitle(text)}
      />
      <Button title="Crea Partner" onPress={handlePress}/>
      
    </View>
  );
}

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Partners" component={PartnersScreen} />
        <Stack.Screen name="CreaPartner" component={CreaPartnerScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flex:1,
    padding: 5,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
});

const loginStyles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop:  90,
    paddingBottom: 180
  },
});


const partnersStyles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    borderTopWidth: 2,
    borderTopColor: '#eee',
    padding:  24,
    paddingTop: 60,
    justifyContent: "space-between"
  },
});


