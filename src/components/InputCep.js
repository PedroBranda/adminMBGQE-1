import React, { useState } from 'react';
import styled from 'styled-components/native';
import Colors from '../assets/Themes/Colors';

const Area = styled.View``;

const InputArea = styled.View`
    width: 50%;
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

const TextError = styled.Text``;

export default ({ IconSvg, placeholder, value, onChangeText, onEndEditing, maxLength, minLength, error }) => {

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
                    onEndEditing = { onEndEditing }
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