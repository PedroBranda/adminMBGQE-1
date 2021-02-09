import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
    width: 65%;
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

export default ({ placeholder, value, onChangeText }) => {
    return(
        <InputArea>
            <Input
                placeholder = { placeholder }
                placeholderTextColor = "#0B6623"
                valur = { value }
                onChangeText = { onChangeText }
            />
        </InputArea>
    );
}