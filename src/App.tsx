
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import styled from 'styled-components';;
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
import { Router } from './router';


const Layout = styled.div`
  display: flex;  
  background-color: #fff;
`;

const PageContainer = styled.div`
  flex: 1;
  padding: 1rem 0.5rem;
  margin-left: 300px;
`;

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Layout>
        <Sidebar />
        <PageContainer>
          <Router/>
        </PageContainer>
      </Layout>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
