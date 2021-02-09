import React, { useState } from 'react';
import styled from 'styled-components/native';

import ExpandIcon from '../assets/expand.svg';

import InputNumber from './InputNumber';

import Api from '../Api';
import { Alert } from 'react-native';

export default ({ show, setShow, quadraInfo, service }) => {

    const [newPriceField, setNewPriceField] = useState('');

    const handleCloseButtonClick = () => {
        setShow(false);
    }

    const handleNewPriceClick = async () => {
        const newPriceNumber = Number(newPriceField);
        const tipo = quadraInfo.servico[service].tipo;
        const preco = quadraInfo.servico[service].preco;
        if(newPriceNumber > 0)
        {
            let result = await Api.updatePrice(quadraInfo.idQuadra, tipo, preco, newPriceNumber);
            if(result)
            {
                Alert.alert(`Serviço ${tipo} R$${preco.toFixed(2)} foi alterado para ${tipo} R$${newPriceNumber.toFixed(2)}.`);
                setShow(false);
            }
        }
        else
        {
            Alert.alert("Preencha o campo corretamente!")
        }
    }

    return (
        <Modal
            transparent = { true }
            visible = { show }
            animationType = "fade"
        >
            <ModalArea>
                <CloseButton onPress = { handleCloseButtonClick } >
                    <ExpandIcon width = "40" height = "40" fill = "#FFF" />
                </CloseButton>

                {
                    service != null &&
                    <InputArea>
                        <InputNumber
                            placeholder = "Novo preço"
                            value = { newPriceField }
                            onChangeText = { t => setNewPriceField(t) }
                        />

                        <CustomButton onPress = { handleNewPriceClick } >
                            <CustomButtonText>Registrar Novo Preço</CustomButtonText>
                        </CustomButton>
                    </InputArea>
                }
            </ModalArea>
        </Modal>
    );
}

const Modal = styled.Modal``;

const ModalArea = styled.View`
    flex: 1;
    background-color: #0B6623;
    align-items: center;
    justify-content: center;
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
`;

const InputArea = styled.View`
    width: 100%;
    padding: 40px;
`;

const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #58C878;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
`;

const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;
`;
