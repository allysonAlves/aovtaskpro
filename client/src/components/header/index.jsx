import React, { useContext } from 'react'
import styled from '@emotion/styled'
import {Avatar, Card} from '@mui/material';
import { authContext } from '../../context/AuthProvider';

const HeaderContainer = styled.div`
  margin-top: 5px;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;    
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

const Header = () => {
  const { userData } = useContext(authContext);

  return (
    <HeaderContainer>
      <HeaderCard elevation={5}>
        <span>{`Olá, ${userData?.firstName} ${userData?.lastName}`}</span>
        <Avatar>{userData?.firstName.toUpperCase().slice(0,2)}</Avatar>
      </HeaderCard>      
    </HeaderContainer>
  )
}

export default Header