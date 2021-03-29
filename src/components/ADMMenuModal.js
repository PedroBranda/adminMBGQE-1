import React, { useState } from 'react';
import styled from 'styled-components/native';

import { useNavigation } from '@react-navigation/native';

import ExpandIcon from '../assets/Images/expand.svg';
import PasswordModal from './PasswordModal';

import Colors from '../assets/Themes/Colors';

export default ({ show, setShow }) => {

    const navigation = useNavigation();

    const [showModalPassword, setShowModalPassword] = useState(false);

    const handleCloseButtonCLick = () => {
        setShow(false);
    }

    const handleAddressUpdateClick = () => {
        setShow(false);
        navigation.navigate('ADMAddressUpdate');
    }

    const handlePhoneUpdateClick = () => {
        setShow(false);
        navigation.navigate('ADMPhoneUpdate');
    }

    const handlePasswordChangeClick = () => {
        setShowModalPassword(true);
    }

    return (
        <Modal
            transparent = { true }
            visible = { show }
            animationType = 'fade'
        >
            <ModalArea>
                <CloseButton onPress = { handleCloseButtonCLick } >
                    <ExpandIcon width = "40" heigth = "40" fill = "#FFF" />
                </CloseButton>

                <CustomButton onPress = { handleAddressUpdateClick } >
                    <CustomButtonText>Atualizar Endereço</CustomButtonText>
                </CustomButton>

                <CustomButton onPress = { handlePhoneUpdateClick } >
                    <CustomButtonText>Atualizar Telefone</CustomButtonText>
                </CustomButton>

                <CustomButton onPress = { handlePasswordChangeClick } >
                    <CustomButtonText>Alterar Senha</CustomButtonText>
                </CustomButton>
            </ModalArea>

            <PasswordModal
                show = { showModalPassword }
                setShow = { setShowModalPassword }
            />
        </Modal>
    );
}

const Modal = styled.Modal``;

const ModalArea = styled.View`
    flex: 1;
    background-color: #000;
    align-items: center;
    justify-content: center;
`;

const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
`;

const CustomButton = styled.TouchableOpacity`
    background-color: ${Colors.secundary};
    height: 40px;
    width: 70%;
    border-radius: 30px;
    margin-left: 10px;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
`;

const CustomButtonText = styled.Text`
    color: #FFF;
    font-size: 16px;
    font-weight: bold;
    padding: 5px;
`;