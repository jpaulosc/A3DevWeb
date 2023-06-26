import Container from "../../components/Container";
import Wrapper from "../../components/Container/Wrapper";
import { Outlet } from "react-router-dom";

function PortraitLayout() {
  return (
    <Container>
      <Wrapper className="bg-[#FDECEC] rounded-lg flex items-center flex-col w-[300px] md:w-[400px] p-7 gap-2">
        <Outlet />
      </Wrapper>
    </Container>
  );
}

export default PortraitLayout;
