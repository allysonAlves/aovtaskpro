import styled from '@emotion/styled'
import { Button, createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
    palette: {
      mode: 'dark'
    } 
  })

const LoginContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
`

const Login = ({onLogin}) => {

  return (
    <ThemeProvider theme={theme}>
        <LoginContainer>
            <Button onClick={onLogin} variant='contained' color='inherit'>Efetuar Login</Button>
        </LoginContainer>
    </ThemeProvider>
  )
}

export default Login