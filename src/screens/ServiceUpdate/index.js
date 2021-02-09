import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../context/UserContext';

import PriceModal from '../../components/PriceModal';

import {
    Container,
    BackButton,
    UpServiceHeader,
    UpServiceTitle,

    ServiceArea,
    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicePrice,

    ButtonArea,
    EditButton,
    DeleteButton,
} from './styles';

import BackIcon from '../../assets/back.svg';
import EditIcon from '../../assets/edit.svg';
import DeleteIcon from '../../assets/delete.svg';

import Api from '../../Api';
import { Alert } from 'react-native';

export default () => {
    const navigation = useNavigation();

    const [quadraInfo, setQuadraInfo] = useState('');
    const [newPrice, setNewPrice] = useState(null);
    const [showPriceModal, setShowPriceModal] = useState(false);

    const { state: user } = useContext(UserContext);

    getInfoQuadra = async () => {
        let result = await Api.LoadSportCourt(user.idCourt);
        if(result.exists)
        {
            setQuadraInfo(result.data());
        }
    }

    useEffect(() => {
        getInfoQuadra()
    }, [showPriceModal]);

    const handleBackButtonClick = () => {
        navigation.goBack();
    }

    const handleEditButtonClick = (key) => {
        setNewPrice(key);
        setShowPriceModal(true);
    }

    const handleDeleteButtonClick = async (tipo, preco) => {
        let result = await Api.deleteService(user.idCourt, tipo, preco);
        if(result)
        {
            Alert.alert(`Serviço ${tipo} R$${preco.toFixed(2)} deletado com sucesso!`);
            getInfoQuadra();
        }
    }

    return(
        <Container>
            <UpServiceHeader>
                <UpServiceTitle>Serviços Cadastrados</UpServiceTitle>
            </UpServiceHeader>
            {
                quadraInfo.servico
                &&
                <ServiceArea>
                    {
                        quadraInfo.servico.map((item, key) => (
                            <ServiceItem key = { key } >

                                <ButtonArea>
                                    <EditButton onPress = { () => handleEditButtonClick(key) } >
                                        <EditIcon width = "25" height = "25" fill = "#FFF" />
                                    </EditButton>
                                    <DeleteButton onPress = { () => handleDeleteButtonClick(item.tipo, item.preco) } >
                                        <DeleteIcon width = "25" height = "25" fill = "#FF0000" />
                                    </DeleteButton>
                                </ButtonArea>

                                <ServiceInfo>
                                    <ServiceName>Tipo: { item.tipo }</ServiceName>
                                    <ServicePrice>R$ { item.preco.toFixed(2) }</ServicePrice>
                                </ServiceInfo>
                            </ServiceItem>
                        ))
                    }
                </ServiceArea>
            }

            <BackButton onPress = { handleBackButtonClick } >
                <BackIcon width = "44" height = "44" fill = "#FFF" />
            </BackButton>

            <PriceModal
                show = { showPriceModal }
                setShow = { setShowPriceModal }
                quadraInfo = { quadraInfo }
                service = { newPrice }
            />
        </Container>
    );
}