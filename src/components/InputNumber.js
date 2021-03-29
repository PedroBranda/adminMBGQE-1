import React, { useState } from 'react';
import styled from 'styled-components/native';
import Colors from '../assets/Themes/Colors';

const Area = styled.View`
    margin-bottom: 10px;
`;

const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background: #FFF;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: ${ Colors.primary };
    margin-left: 10px;
`;

const TextError = styled.Text`
    color: ${ Colors.textError };
    font-size: 14px;
`;

export default ({ IconSvg, placeholder, value, onChangeText, maxLength, minLength, error }) => {

    const [focused, setFocused] = useState(false);

    return(
        <Area>
            <InputArea>
                {
                    IconSvg != null 
                    ? 
                        <IconSvg width = "24" height = "24" fill = { Colors.primary } />
                    :
                        null
                }
                
                <Input
                    placeholder = { placeholder }
                    placeholderTextColor = { Colors.primary }
                    value = { value }
                    onChangeText = { onChangeText }
                    maxLength = { maxLength }
                    minLength = { minLength }
                    keyboardType = 'numeric'
                    onFocus = { () => {
                        setFocused(true);
                    }}
                />
            </InputArea>
            {
                focused &&
                <TextError>{ error }</TextError>
            }
        </Area>        
    );
}