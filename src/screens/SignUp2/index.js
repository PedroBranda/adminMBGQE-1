import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import InputInfo from '../../components/InputInfo';
import InputNumber from '../../components/InputNumber';
import InputCep from '../../components/InputCep';
import InputNumberStreet from '../../components/InputNumberStreet';
import InputUF from '../../components/InputUF';

import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import { 
    Container,
    HeaderArea,
    HeaderTitle,
    
    Scroller,

    InputArea,
    DateArea,
    DateText,

    InputAreaInfo,

    CustomButton,
    CustomButtonText
} from './styles';

import CalenderIcon from '../../assets/Images/calender.svg';

import { UserContext } from '../../context/UserContext';
import Api from '../../Api';
import { cepMask } from '../../Mask';
import cep from 'cep-promise';
import { Alert } from 'react-native';

export default () => {
    const navigation = useNavigation();
    
    const [visible, setVisible] = useState(false);
    const [dateField, setDateField] = useState('');

    const [cpfField, setCPFField] = useState('');
    const [cnpjField, setCNPJField] = useState('');

    const [cepField, setCepField] = useState('');
    const [streetField, setStreetField] = useState('');
    const [neighborhoodField, setNeighborhoodField] = useState('');
    const [numberField, setNumberField] = useState('');
    const [stateField, setStateField] = useState('');
    const [cityField, setCityField] = useState('');

    const { state: user } = useContext(UserContext);

    const handlePicker = (date) => {
        let dateFormat = moment(date).format('DD/MM/YYYY');
        setVisible(false);
        setDateField(dateFormat);
    }

    const showPicker = () => {
        setVisible(true);
    }

    const hidePicker = () => {
        setVisible(false);
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
                Alert.alert("CEP informado ?? inv??lido!");
            });
    }

    const handleSignUpClick = async () => {
        if(dateField != '' && cpfField != '' && cnpjField != '' && cepField != '' && streetField != '' && neighborhoodField != '' && numberField != '' && cityField != '' && stateField != '')
        {
            if(cpfField.length === 11 && (cepField.length === 9 || cepField.length === 8))
            {
                let verifyDateBirth = await Api.verifyDateBirth(dateField);
                if(verifyDateBirth)
                {
                    let verifyCPF = await Api.verifyCPF(cpfField);
                    if(verifyCPF)
                    {
                        let result = await Api.SignUp2(user.idAdm, dateField, cpfField, cnpjField, cepField, streetField, neighborhoodField, numberField, cityField, stateField);
                        if(result)
                        {                
                            navigation.reset({
                                routes: [{name: 'CreateSC'}]
                            });
                        }
                    }
                    else
                    {
                        Alert.alert("CPF inv??lido!");
                    }
                }  
                else
                {
                    Alert.alert("Usu??rios com menos que 18 anos n??o podem se cadastrar!");
                }                                            
            }
            else
            {
                Alert.alert("O n??mero de caracteres do CPF ou Cep est??o incorretos!");
            }            
        }
        else
        {
            Alert.alert("Preencha todos os dados!");
        }
    }

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle>Cadastro</HeaderTitle>
            </HeaderArea>
            <Scroller>
                <InputArea>
                    <DateArea onPress = { showPicker } >
                        <CalenderIcon width = "24" height = "24" fill = "#000" />                        

                        {
                            dateField === '' ?
                            <DateText>Data de Nascimento</DateText>
                            :
                            <DateText>{ dateField }</DateText>
                        }

                        <DateTimePicker
                            isVisible = { visible }
                            onConfirm = { handlePicker }
                            onCancel = { hidePicker }
                            mode = { 'date' }
                        />
                    </DateArea>

                    <InputNumber
                        placeholder = "CPF"
                        value = { cpfField }
                        onChangeText = { t => setCPFField(t) }
                        maxLength = { 11 }
                        minLength = { 11 }
                        error = { "Este campo ?? obrigat??rio!" }
                    />

                    <InputNumber
                        placeholder = "CNPJ"
                        value = { cnpjField }
                        onChangeText = { t => setCNPJField(t) }
                        error = { "Este campo ?? obrigat??rio!" }
                    />
                                
                    <InputCep
                        placeholder = "Cep"
                        value = { cepMask(cepField) }
                        onChangeText = { t => setCepField(t) }
                        onEndEditing = { () => fetchCep() }
                        maxLength = { 9 }
                        minLength = { 9 }
                        error = { "Este campo ?? obrigat??rio!" }
                    />

                    <InputAreaInfo>
                        <InputInfo
                            placeholder = { streetField != '' ? streetField : "Rua" }
                            value = { streetField }
                            onChangeText = { t => setStreetField(t) }
                            error = { "Este campo ?? obrigat??rio!" }
                        />

                        <InputNumberStreet
                            placeholder = "N??"
                            value = { numberField }
                            onChangeText = { t => setNumberField(t) }
                            error = { "Este campo ?? obrigat??rio!" }
                        />
                    </InputAreaInfo>

                    <InputInfo
                        placeholder = { neighborhoodField != '' ? neighborhoodField : "Bairro" }
                        value = { neighborhoodField }
                        onChangeText = { t => setNeighborhoodField(t) }
                        error = { "Este campo ?? obrigat??rio!" }
                    />   

                    <InputAreaInfo>
                        <InputInfo
                            placeholder = { cityField != '' ? cityField : "Cidade" }
                            value = { cityField }
                            onChangeText = { t => setCityField(t) }
                            error = { "Este campo ?? obrigat??rio!" }
                        />

                        <InputUF
                            placeholder = { stateField != '' ? stateField : "Estado" }
                            value = { stateField }
                            onChangeText = { t => setStateField(t) }
                            error = { "Este campo ?? obrigat??rio!" }
                        />
                    </InputAreaInfo>
                    <CustomButton onPress = { handleSignUpClick } >
                        <CustomButtonText>Cadastrar</CustomButtonText>
                    </CustomButton>
                </InputArea>
            </Scroller>
        </Container>
    );
}