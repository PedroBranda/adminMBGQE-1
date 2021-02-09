import React, { useContext, useState, useEffect } from 'react';

import { Alert, RefreshControl } from 'react-native';

import {
    Container,
    HeaderArea,
    HeaderTitle,
    Scroller,

    LoadingIcon,
    ListInfo,
    EmptyHeader,
    EmptyTitle,

    ListArea,
    InfoPlayerArea,
    InfoPlayerName,

    InfoServiceChooseArea,
    InfoServiceArea,
    InfoService,

    InfoDateArea,
    InfoDayArea,
    InfoHourArea,
    InfoDateText,

    CancelButton,
    CancelButtonText
} from './styles';

import { UserContext } from '../../context/UserContext';
import Api from '../../Api';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const { state: user } = useContext(UserContext);    

    const [loading, setLoading] = useState(false);
    const [listAppointments, setListAppointments] = useState([]);    
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const setIdCourt = async () => {
            let result = await Api.LoadUserAdmin(user.idAdm);
            if(result)
            {
                userDispatch({
                    type: 'setIdCourt',
                    payload: {
                        idCourt: result.data().quadras
                    }
                });
            }        
        }
        setIdCourt();
    }, []);

    const getListAppointments = async () => {
        setLoading(true);
        let result = await Api.getAppointments(user.idCourt);
        if(result)
        {
            setListAppointments(result);
        }
        setLoading(false);
    }

    useEffect(() => {
        getListAppointments();
    }, [user.idCourt]);

    const onRefresh = () => {
        setRefreshing(false);
        getListAppointments();
    }

    const handleCancelAppointments = async (listAppointments) => {
        await Api.cancelAppointments(user.idCourt, listAppointments);
        getListAppointments();
        Alert.alert("Agendamento cancelado!");
    }

    return(
        <Container>
            <HeaderArea>
                <HeaderTitle>Agendamentos</HeaderTitle>
            </HeaderArea>

            {
                loading
                &&
                <LoadingIcon size = "large" color = "#FFF" />
            }
            
                <ListInfo>
                    {
                        listAppointments && listAppointments.length > 0 ?
                        <Scroller
                            refreshControl = 
                            {
                                <RefreshControl refreshing = { refreshing } onRefresh = { onRefresh } />
                            }
                        >    
                            {
                                listAppointments.map((item, key) => (
                                    <ListArea key = { key } >
                                        <InfoPlayerArea>
                                            <InfoPlayerName>{ item.jogadorNome }</InfoPlayerName>
                                        </InfoPlayerArea>
            
                                        <InfoServiceChooseArea>
                                            <InfoServiceArea>
                                                <InfoService>Quadra: { item.servico.tipo }</InfoService>
                                                <InfoService>R$ { item.servico.preco.toFixed(2) }</InfoService>
                                            </InfoServiceArea>
                                        
                                            <InfoDateArea>
                                                <InfoDayArea>
                                                    <InfoDateText>{ item.data }</InfoDateText>
                                                </InfoDayArea>
            
                                                <InfoHourArea>
                                                    <InfoDateText>{ item.hora }</InfoDateText>
                                                </InfoHourArea>
                                            </InfoDateArea>
            
                                        </InfoServiceChooseArea>
            
                                        <CancelButton onPress = { () => handleCancelAppointments(item) } >
                                            <CancelButtonText>Cancelar</CancelButtonText>
                                        </CancelButton>
                                    </ListArea>
                                ))
                            }                           
                        </Scroller>
                        :
                        <EmptyHeader>
                            <EmptyTitle>Não possui nenhum agendamento!</EmptyTitle>
                        </EmptyHeader>
                    }                    
                </ListInfo>                   
            
        </Container>
    );
}