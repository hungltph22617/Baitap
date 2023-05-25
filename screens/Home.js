import { Button, Text, View } from 'react-native';
import React from 'react';

const Home = ({ navigation }) => {
    // Hàm điều hướng
    const navigateToLogin = () => {
        navigation.navigate('Login');
    };
    return <View style={{
        alignItems:'center',
        marginTop:300
    }}>
        <Text>Chào mừng bạn đến với màn hình chào</Text>
    </View>
};

export default Home;
