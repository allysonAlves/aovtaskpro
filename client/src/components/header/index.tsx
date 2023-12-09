import React, { useContext } from 'react'
import styled from '@emotion/styled'
import {Avatar, Card} from '@mui/material';
import { authContext } from '../../context/AuthProvider';
import {PowerSettingsNew} from '@mui/icons-material';

const HeaderContainer = styled.div`
  margin-top: 5px;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center; 
  color: #f6f6f6;
`

const HeaderCard = styled(Card)`
&&{
    width: 95%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 15px;            
  }
`

const LogoutIcon = styled(PowerSettingsNew)`
  margin-left: 10px;
  color: black;
  transition: 1s ease-out;
  cursor: pointer;
  &:hover{
    color: orange;
  }
`

const Header = () => {
  const { userData } = useContext(authContext);

  return (
    <HeaderContainer>
      <HeaderCard elevation={5}>
        <span>{`Olá, ${userData?.firstName} ${userData?.lastName}`}</span>
        <LogoutIcon/>
      </HeaderCard>      
    </HeaderContainer>
  )
}

export default Header