import React from 'react';
import styled from 'styled-components/native';

import HomeIcon from '../assets/home.svg';
import TodayIcon from '../assets/today.svg';
import AccountIcon from '../assets/account.svg';
import WindowIcon from '../assets/window_icon.svg';

const TabArea = styled.View`
    height: 60px;
    background-color: #000;
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default ({ state, navigation }) => {    
    
    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return(
        <TabArea>
            <TabItem onPress = { () => goTo('Appointments') } >
                <TodayIcon style = {{ opacity: state.index === 0 ? 1 : 0.5 }} width = "30" height = "30" fill = "#FFF" />
            </TabItem>

            <TabItem onPress = { () => goTo('OperationWindow') } >
                <WindowIcon style = {{ opacity: state.index === 1 ? 1 : 0.5 }} width = "30" height = "30" fill = "#FFF" />
            </TabItem>

            <TabItem onPress = { () => goTo('SCProfile') } >
                <HomeIcon style = {{ opacity: state.index === 2 ? 1 : 0.5 }} width = "30" height = "30" fill = "#FFF" />
            </TabItem>

            <TabItem onPress = { () => goTo('ADMProfile') } >
                <AccountIcon style = {{ opacity: state.index === 3 ? 1 : 0.5 }} width = "30" height = "30" fill = "#FFF" />
            </TabItem>
        </TabArea>
    );
}