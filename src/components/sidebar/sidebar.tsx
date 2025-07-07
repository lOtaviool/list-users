import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100vh;
  padding: 1rem;
  background-color: #fff;
  position: fixed;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled(Link)`
  margin-bottom: 1rem;
  text-decoration: none;
  color: #333;

  &:hover {
    font-weight: bold;
    background-color:rgb(249, 249, 249);
    padding: 1px 3px;
    border-radius: 2px;
    border-left: 3px solid #333;
  }
`;

const Head = styled.div`
    display: flex;
    padding: 5px;
    gap: 4px;
    align-itens: center;
    justify-content: center;
`

export default function Sidebar() {
  return (
    <SidebarContainer style={{}}>
        <Head >
            <Image roundedCircle width={50} src="https://images.seeklogo.com/logo-png/27/2/github-logo-png_seeklogo-273183.png"/>
            <span style={{fontFamily:"monospace", fontSize: '28px'}}>GitHub Studio</span>
        </Head>
        <br />
        <NavItem to="/user-list">Lista de Usuários</NavItem>
        <NavItem to="/user-details">Usuário GitHub</NavItem>
    </SidebarContainer>
  );
}
