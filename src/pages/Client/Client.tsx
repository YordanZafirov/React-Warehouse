import { useState } from "react";

import ClientForm from "./ClientForm";
import ListClients from "./ListClients";
import Button, { ButtonDiv } from "../../components/common/Button";
// import { PageContainer } from "../../common/Page.style";

const Client = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div>
      <ButtonDiv>
        <Button color={toggle ? "blue" : "yellow"} onClick={handleToggle}>
          {toggle ? "List Clients" : "Add Client"}
        </Button>
      </ButtonDiv>

      {toggle ? <ClientForm /> : <ListClients />}
    </div>
  );
};

export default Client;
