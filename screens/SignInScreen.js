import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import log from '../Log';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = (props) => {
    let users = [];
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation('');

    // Function to fetch data from the API
    // async function fetchData() {
    //     try {
    //         const response = await fetch('http://localhost:3000/users');
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         log.error('Fetch data failed ' + error);
    //         return null;
    //     }
    // }

    // Call the fetchData function and store the result in a variable
    // async function storeData() {
    //     users = await fetchData();
    // }

    // storeData();

    const doLogin = () => {
        // Kiểm tra dữ liệu gồm username và password
        if (username.length == 0) {
            alert('Username is required');
            return;
        }

        if (password.length == 0) {
            alert('Password is required');
            return;
        }

        // Tạo đối tượng lưu giữ thông tin login
        // let request = { username: username, password: password };

        // log.info('authInfo: ' + JSON.stringify(request));

        // if (users) {
        //     const authInfo = users.find((user) => user.userName === request.username);

        //     if (!authInfo) {
        //         Alert.alert('Notification', 'Cant find user infomation', [{ text: 'Cancel', onPress: () => log.error('Cant find user ' + request.username) }]);
        //     } else {
        //         if (!(authInfo.password === request.password)) {
        //             Alert.alert('Notification', 'Password is not correct', [{ text: 'Cancel', onPress: () => log.error('Password is not correct for ' + request.username) }]);
        //         } else {
        //             Alert.alert('Notification', 'Login successfull ' + request.username, [
        //                 { text: 'OK', onPress: () => navigateToHome() },
        //                 { text: 'Cancel', onPress: () => log.info('Press Cancel') }
        //             ]);
        //         }
        //     }
        // }
        let url_check_login = "http://localhost:3000/users" + username;
        fetch(url_check_login)
            .then((res) => {
                return res.json();
            })
            .then(async (res_login) => {
                if (res_login.length != 1) {
                    Alert.alert("Sai username");
                    return;
                } else {
                    let objU = res_login[0];
                    if (objU.password != password) {
                        Alert.alert("Sai password");
                        return;
                    } else {
                        try {
                            await AsyncStorage.setItem('loginInfo', objU)
                            props.navigation.navigate('Home');
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            })
    };

    const navigateToHome = () => {
        props.navigation.navigate('Home');
    };

    return (
        <View style={styles.root}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            {/* <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false} />
            <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} /> */}
            <TextInput placeholder='usesname' style={{
                borderWidth: 1,
                marginBottom: 10,
                padding: 10,
                borderRadius: 5
            }} onChangeText={(txt) => { setUsername(txt) }}>
            </TextInput>
            <TextInput placeholder='password' style={{
                borderWidth: 1,
                padding: 10,
                borderRadius: 5
            }} onChangeText={(txt) => { setPassword(txt) }} secureTextEntry={true}>
            </TextInput>
            <TouchableHighlight style={{
                marginTop:10,
                backgroundColor: '#3B71F3',
                width: '100%',
                padding: 15,
                marginVertical: 5,
                alignItems: 'center',
                borderRadius: 5
            }} onPress={doLogin}>
                <Text style={{
                    color: 'white'
                }}>Login</Text>
            </TouchableHighlight>

            <CustomButton btnLabel={'Back to Home'} onPress={navigateToHome} />
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    root: {
        padding: 20
    },
    logo: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain'
    }
});
