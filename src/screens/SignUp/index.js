import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

import { 
    Container,
    Scroller,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import InputText from '../../components/InputText';
import InputNumber from '../../components/InputNumber';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PhoneIcon from '../../assets/phone.svg';
import PersonIcon from '../../assets/person.svg';

import { phoneMask } from '../../Mask';
import Api from '../../Api';
import { Alert } from 'react-native';

export default () => {
    const navigation = useNavigation();
    const { dispatch: userDispatch } = useContext(UserContext);

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [phoneField1, setPhoneField1] = useState('');
    const [phoneField2, setPhoneField2] = useState('');

    const regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){2})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/; 

    const handleNextClick = async () => {
        if(nameField != '' && emailField != '' && passwordField != '' && phoneField1 != '')
        {
            if(passwordField.length < 6)
            {
                Alert.alert("A senha precisa ter no mínimo 6 caracteres");
            }
            else if(!regex.exec(passwordField))
            {
                Alert.alert("A senha deve conter no mínimo 1 caratere em maiúsculo, 2 números e 1 catectere especial!");
            }
            else
            {
                if(phoneField1.length === 14 || phoneField2 === 14)
                {
                    let result = await Api.SignUp(nameField, emailField, passwordField, phoneField1, phoneField2);
                    console.log('result 2: ', result);
                    if(result)
                    {
                        userDispatch({
                            type: 'setIdAdm',
                            payload: {
                                idAdm: result
                            }
                        });
                        navigation.navigate("SignUp2");
                    }
                }
                else
                {
                    Alert.alert("O número do telefone informado não possui o tamanho correto!");
                } 
            }           
        }
        else
        {
            alert("Preencha os campos!");
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }

    return(
        <Container>
            <Scroller>
                <InputArea>
                    <InputText
                        IconSvg = { PersonIcon }
                        placeholder = "Digite seu nome"
                        value = { nameField }
                        onChangeText = { t => setNameField(t) }
                    />

                    <InputText
                        IconSvg = { EmailIcon }
                        placeholder = "Digite seu e-mail"
                        value = { emailField }
                        onChangeText = { t => setEmailField(t) }
                    />

                    <InputText 
                        IconSvg = { LockIcon }
                        placeholder = "Digite sua senha"
                        value = { passwordField }
                        onChangeText = { t => setPasswordField(t) }
                        password = { true }
                    />

                    <InputNumber 
                        IconSvg = { PhoneIcon }
                        placeholder = "(XX) 9XXXX-XXXX"
                        value = { phoneMask(phoneField1) }
                        onChangeText = { t => setPhoneField1(t) }
                        maxLength = { 14 }
                        minLength = { 14 }
                    />

                    <InputNumber 
                        IconSvg = { PhoneIcon }
                        placeholder = "(XX) 9XXXX-XXXX (Opcional)"
                        value = { phoneMask(phoneField2) }
                        onChangeText = { t => setPhoneField2(t) }
                        maxLength = { 14 }
                        minLength = { 14 }
                    />
                    
                    <CustomButton onPress = { handleNextClick } >
                        <CustomButtonText>Prosseguir</CustomButtonText>
                    </CustomButton>
                </InputArea>

                <SignMessageButton onPress = { handleMessageButtonClick } >
                    <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                    <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
                </SignMessageButton>
            </Scroller>            
        </Container>
    );
}