import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';

import { UserContext } from '../context/UserContext';

import Api from '../Api';

import ExpandIcon from '../assets/expand.svg';
import LockIcon from '../assets/lock.svg';

export default ({ show, setShow }) => {

    const { state: user } = useContext(UserContext);

    const [newPasswordField, setNewPasswordField] = useState('');
    const [currentPasswordField, setCurrentPasswordField] = useState('');

    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){2})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/; 

    const handleCloseButton = () => {
        setShow(false);
    }

    const handlePasswordUpdate = async () => {
        if(newPasswordField != '' && currentPasswordField)
        {
            if(newPasswordField.length < 6)
            {
                Alert.alert("A senha precisa ter no mínimo 6 caracteres");
            }
            else if(!regex.exec(newPasswordField))
            {
                Alert.alert("A senha deve conter no mínimo 1 caratere em maiúsculo, 2 números e 1 catectere especial!");
            }
            else
            {
                let result = await Api.updatePassword(user.idAdm, newPasswordField, currentPasswordField);
                if(result)
                {
                    setShow(false);
                }
            }
        }
        else
        {
            Alert.alert("Preencha a senha");
        }
    }

    return(
        <Modal
            transparent = { true }
            visible = { show }
            animationType = 'slide'
        >
            <ModalArea>

                    <CloseButton onPress = { handleCloseButton } >
                        <ExpandIcon width = "40" height = "40" fill = "#FFF" />
                    </CloseButton>

                    <ModalItem>
                        <InputArea >
                            <LockIcon width = "24" height = "24" fill = "#FFF" />
                            <InputText
                                placeholder = "Digite sua senha atual"
                                placeholderTextColor = "#FFF"
                                value = { currentPasswordField }
                                onChangeText = { t => setCurrentPasswordField(t) }
                                secureTextEntry = { true }
                            >

                            </InputText>
                        </InputArea>
                    </ModalItem>

                    <ModalItem>                        
                        <InputArea >
                            <LockIcon width = "24" height = "24" fill = "#FFF" />
                             <InputText
                                placeholder = "Digite sua nova senha"
                                placeholderTextColor = "#FFF"
                                value = { newPasswordField }
                                onChangeText = { t => setNewPasswordField(t) }
                                secureTextEntry = { true }
                            >

                            </InputText>
                        </InputArea>
                    </ModalItem>
                    
                <ButtonNewPassword onPress = { handlePasswordUpdate } >
                    <ButtonNewPasswordText>Alterar Senha</ButtonNewPasswordText>
                </ButtonNewPassword>
            </ModalArea> 

        </Modal>
    );
}

const Modal = styled.Modal``;

const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

const ModalArea = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.75);
`;

const ModalItem = styled.View`
    background-color: rgba(0, 0, 0, 0.25);    
    height: 60px;
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
`;

const InputArea = styled.View`
    width: 100%;
    height: 60px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-left: 15px;
`;

const InputText = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #FFF;
    margin-left: 5px;
`;

const ButtonNewPassword = styled.TouchableOpacity`
    background-color: rgba(0, 0, 0, 0.25);
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 20px;    
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 10px;
`;

const ButtonNewPasswordText = styled.Text`
    color: #FFF;
    font-size: 16px;
    font-weight: bold;
`;
