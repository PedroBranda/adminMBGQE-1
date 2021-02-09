import React, { useState, useContext, useEffect } from 'react';

import InputText from '../../components/InputText';
import InputInfo from '../../components/InputInfo';
import InputNumber from '../../components/InputNumber';
import InputCep from '../../components/InputCep';
import InputNumberStreet from '../../components/InputNumberStreet';
import InputUF from '../../components/InputUF';

import { useNavigation } from '@react-navigation/native';
import cep from 'cep-promise';

import {
    Container,
    Scroller,
    InputAreaAddress,
    InputArea,
    InputAreaInfo,

    CustomButton,
    CustomButtonText
} from './styles';

import PhoneIcon from '../../assets/phone.svg';

import { UserContext } from '../../context/UserContext';

import Api from '../../Api';

import { phoneSCMask, cepMask } from '../../Mask';
import { Alert } from 'react-native';

export default () => {

    const navigation = useNavigation();
    const { state: user } = useContext(UserContext);
    const { dispatch: userDispatch } = useContext(UserContext);

    const [nameField, setNameField] = useState('');
    const [phoneField, setphoneField] = useState('');
    const [cepField, setCepField] = useState('');
    const [streetField, setStreetField] = useState('');
    const [neighborhoodField, setNeighborhoodField] = useState('');
    const [numberField, setNumberField] = useState('');
    const [stateField, setStateField] = useState('');
    const [cityField, setCityField] = useState('');

    const handleSignUpClick = async () => {
        if( nameField != '' && 
            phoneField != '' &&
            cepField != '' &&
            streetField != '' &&
            numberField != '' &&
            neighborhoodField != '' &&
            cityField != '' &&
            stateField != '')
        {
            if(phoneField.length === 13 && (cepField.length === 9 || cepField === 8))
            {
                let result = await Api.createSportCourts(
                    user.idAdm, 
                    nameField, 
                    phoneField, 
                    cepField, 
                    streetField,  
                    numberField,
                    neighborhoodField,
                    cityField,
                    stateField);
    
                if(result)
                {
                    userDispatch({
                        type: 'setIdCourt',
                        payload: {
                            idCourt: result.id 
                        }
                    });
                    navigation.reset({
                        routes: [{name: 'MainTab'}]
                    });
                }
            }
            else
            {
                Alert.alert("Os números do telefone ou do CEP estão com os tamanhos errados!");
            }
        }
        else
        {
            Alert.alert("Preencha todos os campos!");
        }           
    }   

    const fetchCep = async () => {
        await cep(cepField)
            .then(result => {
                setStateField(result.state);
                setCityField(result.city);
                setNeighborhoodField(result.neighborhood);
                setStreetField(result.street);
            })
            .catch(() => {
                Alert.alert("CEP informado é inválido!");
            });
    }

    return(
        <Container>
            <Scroller>
                <InputArea>
                    <InputText
                        placeholder = "Nome da Quadra"
                        value = { nameField }
                        onChangeText = { t => setNameField(t) }
                    />

                    <InputNumber
                        IconSvg = { PhoneIcon }
                        placeholder = "(42) XXXX-XXXX"
                        value = { phoneSCMask(phoneField) }
                        onChangeText = { t => setphoneField(t) }
                        maxLength = { 13 }    
                        minLength = { 13 }   
                    />

                    <InputCep
                        placeholder = "Cep"
                        value = { cepMask(cepField) }
                        onChangeText = { t => setCepField(t) }
                        onEndEditing = { () => fetchCep() }
                        maxLength = { 9 }
                        minLength = { 9 }
                    />
                    <InputAreaAddress>
                        <InputText
                            placeholder = { streetField != '' ? streetField : "Rua" }
                            value = { streetField }
                            onChangeText = { t => setStreetField(t) }
                        />
                            
                        <InputAreaInfo>
                            <InputInfo
                                placeholder = { neighborhoodField != '' ? neighborhoodField : "Bairro" }
                                value = { neighborhoodField }
                                onChangeText = { t => setNeighborhoodField(t) }
                            />   

                            <InputNumberStreet
                                placeholder = "Nº"
                                value = { numberField }
                                onChangeText = { t => setNumberField(t) }
                            />
                        </InputAreaInfo>
                        <InputAreaInfo>
                            <InputInfo
                                placeholder = { cityField != '' ? cityField : "Cidade" }
                                value = { cityField }
                                onChangeText = { t => setCityField(t) }
                            />

                            <InputUF
                                placeholder = { stateField != '' ? stateField : "Estado" }
                                value = { stateField }
                                onChangeText = { t => setStateField(t) }
                            />
                        </InputAreaInfo>                 

                        <CustomButton onPress = { handleSignUpClick } >
                            <CustomButtonText>CADASTRAR QUADRA</CustomButtonText>
                        </CustomButton>
                    </InputAreaAddress>

                </InputArea>          

            </Scroller>
        </Container>
    );
}