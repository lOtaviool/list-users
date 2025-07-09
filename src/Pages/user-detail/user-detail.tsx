import styled from "styled-components";
import { useGetUserDetail } from "../../hooks/user";
import { Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  align-items: center;
  display: grid;
  padding: 0 20px;
`;

const Content = styled.div`
  justify-content: space-between;
  margin-bottom: 2rem;
  width: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem;
`;

const Details = styled.div`
  width: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;

  span{
    font-family: monospace;
  }
`;


export default function UserDetails(){
    const [value, setValue] = useState('');
    const [userName, setUserName] = useState('');
    const {data, isLoading} = useGetUserDetail(userName);

    const handleGetUserDetail = ()=>{
        setUserName(value);
    }

    return(
        <Container>
            <Content>
                <Form.Label>Nome de usuário</Form.Label>
                <div style={{display: "flex", gap: "5px"}}>
                    <Form.Control
                    placeholder="Digite o aqui"
                    data-testid="input-text"
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                    value={value}
                    />
                    <Button data-testid="submit-button" style={{width:'100px'}} variant="dark" onClick={() => handleGetUserDetail()}>
                        <i className="bi bi-search"></i> Buscar
                    </Button>
                </div>
            </Content>
            <Content style={{alignItems: "center", justifyContent: 'center'}}>
                {isLoading && <Spinner animation="border" />}
                {(!data && !isLoading) && <h4>Nenhum dado encontrado! :(</h4>}
                {data && <div>
                    <h4>Detalhes do Usuário</h4>
                    <br />
                    <Details>
                        <div style={{display: 'grid'}}>
                            <span>Nome: {data.name || "--"}</span>
                            <span>Id: {data.id || "--"}</span>
                            <span>Login: {data.login || "--"}</span>
                            <span>Email: {data.email || "--"}</span>
                            <span>Url: {data.url || "--"}</span>
                        </div>
                        <div style={{display: 'grid'}}>
                            <span>Nº de repositórios: {data.public_repos || "--"}</span>
                            <span>Repositórios: {data.repos_url || "--"}</span>
                            <span>Organizações: {data.organizations_url || "--"}</span>
                        </div>
                        <div style={{display: 'grid'}}>
                            <span>Tipo de conta: {data.type || "--"}</span>
                            <span>Avatar: {data.avatar_url || "--"}</span>
                            <span>Visibilidade: {data.user_view_type || "--"}</span>
                        </div>
                    </Details>
                </div> }
            </Content>
        </Container>
    )
}