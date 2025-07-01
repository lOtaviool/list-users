
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import UserList from './components/user-list';
import styled from 'styled-components';

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
          <h1>Lista de Usuários do Git</h1>
        </div>
        <br />
        <UserList/>
      </Container>
    </QueryClientProvider>
  )
}

export default App
