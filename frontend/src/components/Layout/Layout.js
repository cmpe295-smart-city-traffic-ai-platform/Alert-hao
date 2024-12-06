import NavigationBar from "../Navbar/Navbar";
import styled from "styled-components";
import Sidebar from "../Sidebar/Sidebar";

const Main = styled.main`
  width: 100vw;
  padding-top: 30px; // assuming navbar is 60px high
  overflow: auto; // to allow scrolling when content overflows
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const SidebarStyled = styled.aside`
  width: 20vw;
  height: calc(100vh - 60px); // assuming navbar is 60px high
  overflow: auto; // to allow scrolling when content overflows
`;

const Content = styled.div`
  display: flex;
  height: calc(100vh - 56px); // assuming navbar is 60px high
`;

const Layout = (props) => {
    return(
        <Container>
            <NavigationBar />
            {localStorage.getItem("email")!==null ? 
            <Content>
                    <Sidebar/>
                    <Main>{props.children}</Main>
            </Content>
                :
            <Content>
                <Main>{props.children}</Main>
            </Content>
            }
        </Container>
    );
};

export default Layout;