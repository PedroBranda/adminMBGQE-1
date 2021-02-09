import React, { useState, useContext, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { UserContext } from '../../context/UserContext';

import {
    Container,
    BackButton,
    UpPeriodHeader,
    UpPeriodTitle,

    DateArea,
    DateInfo,
    DateNextArea,
    DatePrevArea,
    DateTitleArea,
    DateTitle,

    DateList,
    DateItem,
    DateItemWeekDay,
    DateItemNumber,

    TimeList,
    TimeItem,
    TimeItemText,

    DeleteButton,
    DeleteButtonText
} from './styles';

import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

import Api from '../../Api';
import { Alert } from 'react-native';

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

const days = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
];

export default () => {
    const navigation = useNavigation();

    const { state: user } = useContext(UserContext);
    const [listPeriod, setListPeriod] = useState([]);

    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState(null);   
    const [listDays, setListDays] = useState([]);
    const [listHours, setListHours] = useState([]);

    useEffect(() => {
        let unsub = Api.onPeriod(user.idCourt, setListPeriod);
        return unsub;
    }, []);

    useEffect(() => {
        let today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
        setSelectedDay(today.getDate());
    }, []);

    useEffect(() => {
        if(listPeriod)
        {
            let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
            let newListDays = [];

            for(let i = 1; i <= daysInMonth; i++)
            {
                let d = new Date(selectedYear, selectedMonth, i);
                let year = d.getFullYear();
                let month = d.getMonth() + 1;
                let day = d.getDate();
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                let selDate = `${day}/${month}/${year}`;

                let availability = listPeriod.filter(e => 
                    e.data === selDate
                );

                newListDays.push({
                    status: availability.length > 0 ? true : false,
                    weekday: days[d.getDay()],
                    number: i
                });
            }
            setListDays(newListDays);
            setSelectedDay(0);
        }
    }, [listPeriod, selectedMonth, selectedYear]);
    
    useEffect(() => {
        if(listPeriod && selectedDay > 0)
        {
            let d = new Date(selectedYear, selectedMonth, selectedDay);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            let selDate = `${day}/${month}/${year}`;

            let availability = listPeriod.filter(e => 
                e.data === selDate
            );

            if(availability.length > 0)
            {
                setListHours(availability[0].horas);
            }
            setSelectedHour(null);
        }
    }, [listPeriod, selectedDay]);

    const handleBackButtonClick = () => {
        navigation.goBack();
    }

    const handleLeftDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() - 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const handleRightDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() + 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(0);
    }

    const handleDeleteButtonClick = async () => {
        if(listPeriod.length > 0)
        {
            if(selectedDay != '' && selectedMonth != '' && selectedYear != '' && selectedHour != null)
            {
                let result = await Api.updatePeriod(user.idCourt, selectedDay, selectedMonth, selectedYear, selectedHour);
                if(result)
                {
                    Alert.alert("Hora de funcionamento deletado com sucesso!");
                    navigation.goBack();
                }
            }
            else
            {
                Alert.alert("Selecione a data e hora!");
            }            
        }
        else
        {
            Alert.alert("Não possui um periodo de funcionamento cadastrado");
        }
    }

    return (
        <Container>
            <UpPeriodHeader>
                <UpPeriodTitle>Atualizar Periodo</UpPeriodTitle>
            </UpPeriodHeader>
            
            <DateArea>
                <DateInfo>
                    <DatePrevArea onPress = { handleLeftDateClick } >
                        <NavPrevIcon width = "35" height = "35" fill = "#000" />
                    </DatePrevArea>

                    <DateTitleArea>
                        <DateTitle>{ months[selectedMonth] } { selectedYear }</DateTitle>
                    </DateTitleArea>

                    <DateNextArea onPress = { handleRightDateClick } >
                        <NavNextIcon width = "35" height = "35" fill = "#000" />
                    </DateNextArea>
                </DateInfo>

                <DateList
                    horizontal = { true }
                    showsHorizontalScrollIndicator = { false }
                >
                    {
                        listDays.map((item, key) => (
                            <DateItem
                                key = { key }
                                onPress = { () => item.status ? setSelectedDay(item.number) : null }
                                style = {{
                                    opacity: item.status ? 1 : 0.5,
                                    backgroundColor: item.number === selectedDay ? '#0B6623' : '#FFF'
                                }}
                            >
                                <DateItemWeekDay
                                    style = {{
                                        color: item.number === selectedDay ? '#FFF' : '#000'
                                    }}
                                >{ item.weekday }</DateItemWeekDay>
                                <DateItemNumber
                                    style = {{
                                        color: item.number === selectedDay ? '#FFF' : '#000'
                                    }}
                                >{ item.number }</DateItemNumber>
                            </DateItem>
                        ))
                    }
                </DateList>
            </DateArea>

            {
                selectedDay > 0 && listHours.length > 0 &&
                <DateArea>
                    <TimeList
                        horizontal = { true }
                        showsHorizontalScrollIndicator = { false }
                    >
                        {
                            listHours.map((item, key) => (
                                <TimeItem
                                    key = { key }
                                    onPress = { () => setSelectedHour(item.hora) }
                                    style = {{
                                        backgroundColor: item.hora === selectedHour ? '#0B6623' : '#FFF',
                                    }}
                                >
                                    <TimeItemText
                                        style = {{
                                            color: item.hora === selectedHour ? '#FFF' : '#000'
                                        }}
                                    >{ item.hora }</TimeItemText>
                                </TimeItem>
                            ))
                        }
                    </TimeList>
                </DateArea>
            }

            <DeleteButton onPress = { handleDeleteButtonClick } >
                <DeleteButtonText>Deletar Hora de Funcionamento</DeleteButtonText>
            </DeleteButton>

            <BackButton onPress = { handleBackButtonClick } >
                <BackIcon width = "44" height = "44" fill = "#FFF" />
            </BackButton>
        </Container>
    );
}