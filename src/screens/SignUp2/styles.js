import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #0B6623;
    flex: 1;
`;

export const Scroller = styled.ScrollView`
    background-color: #0B6623;
    flex: 1;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

export const DateArea = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    background: #FFF;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;

export const DateText = styled.Text`
    flex: 1;
    font-size: 16px;
    color: #0B6623;
    margin-left: 10px;
`;

export const InputAreaInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #58C878
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;
`;