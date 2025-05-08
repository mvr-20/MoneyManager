import { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import { useQuery } from '@tanstack/react-query'; // Import useQuery from react-query
import { ThemeProvider } from 'styled-components'; // Assuming you are using styled-components
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // Import Devtools
import { useUsuariosStore } from './store/UsuariosStore'; // Adjust path as needed
import { AuthContextProvider } from './context/AuthContent'; // Adjust path as needed
import { ThemeContext } from './context/ThemeContext'; //If you have this context
import { SpinnerLoader } from './components/moleculas/SpinnerLoader'; // Adjust path
import { Sidebar } from './components/organismos/sidebar/Sidebar'; // Adjust path
import { Menuambur } from './components/organismos/Menuambur'; // Adjust path
import { MyRoutes } from './routers/routes'; // Adjust path
import { Login } from './pages/Login'; // Adjust path
import { Dark, Light } from './styles/themes'; // Adjust path
import { Device } from './styles/breakpoints'; // Adjust path
import styled from 'styled-components'; // Import styled

function App() {
  const { mostrarUsuarios, datausuarios } = useUsuariosStore();
  const { pathname } = useLocation();
  const theme = datausuarios?.tema === '0' ? 'light' : 'dark';
  const themeStyle = theme === 'light' ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { isLoading, error } = useQuery({
    queryKey: ['mostrar usuarios'],
    queryFn: mostrarUsuarios,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (error) {
    return <h1>Error...</h1>; 
  }

  return (
    <ThemeContext.Provider value={{ theme }}>
      <ThemeProvider theme={themeStyle}>
        <AuthContextProvider>
          {pathname !== '/login' ? ( 
            <Container className={sidebarOpen ? 'active' : ''}>
              <ContentSidebar>
                <Sidebar
                  state={sidebarOpen}
                  setState={() => setSidebarOpen(!sidebarOpen)}
                />
              </ContentSidebar>
              <ContentMenuambur>
                <Menuambur />
              </ContentMenuambur>

              <ContainerBody>
                <MyRoutes />
              </ContainerBody>
            </Container>
          ) : (
            <Login />
          )}

          <ReactQueryDevtools initialIsOpen={true} />
        </AuthContextProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background: ${({ theme }) => theme.bgtotal};
  transition: all 0.2s ease-in-out;

  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
  }
`;

const ContentSidebar = styled.div`
  display: none;
  @media ${Device.tablet} {
    display: initial;
  }
`;

const ContentMenuambur = styled.div`
  display: block;
  position: absolute;
  left: 20px;
  @media ${Device.tablet} {
    display: none;
  }
`;

const ContainerBody = styled.div`
  grid-column: 1;
  width: 100%;
  @media ${Device.tablet} {
    grid-column: 2;
  }
`;

export default App;