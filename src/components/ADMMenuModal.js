import React, { useState } from 'react';
import styled from 'styled-components/native';

import { useNavigation } from '@react-navigation/native';

import ExpandIcon from '../assets/expand.svg';
import PasswordModal from './PasswordModal';

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
    background-color: rgba(0, 0, 0, 0.75);
    align-items: flex-end;
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
    background-color: rgba(255, 255, 255, 0.5);
    height: 40px;
    width: 70%;
    border-radius: 10px;
    margin-left: 10px;
    margin-top: 20px;
    justify-content: center;
    align-items: flex-end;
`;

const CustomButtonText = styled.Text`
    color: #000;
    font-size: 16px;
    font-weight: bold;
    padding: 5px;
`;