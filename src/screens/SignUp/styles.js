import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../assets/Themes/Colors';

export const Container = styled.SafeAreaView`
    background-color: ${ Colors.primary };
    flex: 1;
`;

export const HeaderArea = styled.View`
    margin-top: 33px;
    margin-left: 50px;
    width: 150px;
`;

export const HeaderTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
`;

export const Scroller = styled.ScrollView`
    background-color: ${ Colors.primary };
    flex: 1;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: ${ Colors.secundary };
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
`;

export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #FFF;
`;

export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #FFF;
    font-weight: bold;
    margin-left: 5px;
`;