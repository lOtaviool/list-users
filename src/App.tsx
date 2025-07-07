
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import styled from 'styled-components';
import UserList from './components/user-list/user-list';

const Container = styled.div`
  margin: 10px;
  width: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem;
`;

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <div>
          <h1 role='app-info'>Lista de Usuários do Git</h1>
        </div>
        <br />
        <UserList/>
      </Container>
    </QueryClientProvider>
  )
}

export default App
