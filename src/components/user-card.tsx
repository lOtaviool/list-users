import { Button, Image } from "react-bootstrap";
import styled from "styled-components";
import type { User } from "../types/user.type";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  width: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 1rem;
`;

const Content = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
`;

interface Props {
  user: User;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export default function UserCard({user, onClickEdit, onClickDelete}:Props) {
    return(
        <Container>
            <div style={{display:"flex", alignItems: "center", gap:"20px", width: "100%"}}>
                <Image roundedCircle width={100} src={user?.avatar}/>
                <h3>{user?.name}</h3>
            </div>
            <Content>
                <Button onClick={onClickDelete} style={{width:'100px'}} variant="danger">
                    Deletar
                </Button>
                <Button onClick={onClickEdit} style={{width:'100px'}} variant="light">
                    Editar
                </Button>
            </Content>
        </Container>
    )
}