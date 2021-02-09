import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #0B6623;
    flex: 1;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const ProfileArea = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const MenuButton = styled.TouchableOpacity`
    position: absolute;
    right: 20px;
    top: 30px;
`;

export const UserInfoArea = styled.View`
    flex-direction: row;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
`;

export const AvatarArea = styled.View`
    border-width: 5px;
    border-color: #FFF;
    border-radius: 20px;
`;

export const UserAvatarUpdate = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
    width: 150px;
    height: 150px;
    border-radius: 20px;
`;

export const UserInfo = styled.View`
    flex: 1;
    margin-top: 25px;
    justify-content: flex-start;
`;

export const UserInfoName = styled.Text`
    color: #FFF;
    font-size: 20px;
    font-weight: bold;
    margin-left: 30px;
    align-items: center;
    margin-top: 15px;
`;

export const CustomButtomArea = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 50px;
    width: 200px;
    background-color: #58C878;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;