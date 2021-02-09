import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
    width: 30%;
    height: 60px;
    background: #FFF;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #0B6623;
    margin-left: 10px;
`;

export default ({ IconSvg, placeholder, value, onChangeText }) => {
    return(
        <InputArea>
            {
                IconSvg != null 
                ? 
                    <IconSvg width = "24" height = "24" fill = "#0B6623" />
                :
                    null
            }
            
            <Input
                placeholder = { placeholder }
                placeholderTextColor = "#0B6623"
                value = { value }
                onChangeText = { onChangeText }
                keyboardType = 'numeric'
            />
        </InputArea>
    );
}