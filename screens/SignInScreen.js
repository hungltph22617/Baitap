import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import log from '../Log';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = (props) => {
    let users = [];
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        let url_check_login = "http://192.168.0.104:3000/users" + "?username=" + username;


        fetch(url_check_login)
            .then((res) => {
                return res.json();
            })
            .then((res_login) => {
                if (res_login.length != 1) {
                    alert("Sai username hoặc lỗi trùng lặp dữ liệu");
                    return;
                } else {
                    let objU = res_login[0];
                    if (objU.password != password) {
                        alert("Sai password");
                        return;
                    } else {
                        try {
                            //await AsyncStorage.setItem('loginInfo', JSON.stringify(objU));
                            props.navigation.navigate('Home1');
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            })
            .catch(e => {
                console.error(e);
                return e;
            })
    };

    const navigateToHome = () => {
        props.navigation.navigate('Home');
    };

    return (
        <View style={styles.root}>
            <View style={{
                alignItems: 'center'
            }}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>
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
                marginTop: 10,
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
        marginTop: 50,
        width: '50%',
        height: '50%',
        resizeMode: 'contain'
    }
});
