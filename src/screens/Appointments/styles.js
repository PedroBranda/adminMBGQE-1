import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #0B6623;
`
export const HeaderArea = styled.View`
    margin-top: 33px;
    margin-bottom: 30px;
    margin-left: 50px;
    width: 150px;
`;

export const HeaderTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 30px;
    margin-bottom: 30px;
`;

export const ListInfo = styled.View`
    flex: 1;
`;

export const EmptyHeader = styled.View`
    margin-top: 33px;
    margin-bottom: 30px;
    margin-left: 50px;
    width: 100%;
`;

export const EmptyTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #FFF;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    background-color: #0B6623;
`;

export const ListArea = styled.View`
    height: 195px;
    background-color: #FFF;
    border-radius: 30px;
    margin-left: 20px;
    margin-right: 20px;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
`;

export const InfoPlayerArea = styled.View`
    width: 300px;
    flex-direction: row;
    margin-bottom: 10px;
    align-items: center;
`;

export const InfoPlayerName = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #000;
`;

export const InfoServiceChooseArea = styled.View`
    width: 300px;
    margin-bottom: 15px;
    justify-content: space-between;
`;

export const InfoServiceArea = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const InfoService = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #000;
`;

export const InfoDateArea = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    justify-content: space-between;
`;

export const InfoDayArea = styled.View`
    align-items: center;
    justify-content: center;
    background-color: #58C878;
    width: 120px;
    height: 40px;
    border-radius: 10px;
`;

export const InfoHourArea = styled.View`
    align-items: center;
    justify-content: center;
    background-color: #58C878;
    width: 80px;
    height: 40px;
    border-radius: 10px;
`;

export const InfoDateText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;

export const CancelButton = styled.TouchableOpacity`
    background-color: #58C878;
    height: 40px;
    width: 120px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-bottom: -10px;
`;

export const CancelButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;
