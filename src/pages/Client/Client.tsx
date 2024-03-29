import { useState } from "react";

import ClientForm from "./ClientForm/ClientForm";
import ListClients from "./ListClients/ListClients";
import Button, { ButtonDiv } from "../../components/button/Button";
import useClient from "../../hooks/Client/Client.hook";
import Loader from "../../components/loader/Loader";
import useToken from "../../hooks/Token/Token.hook";

const Client = () => {
  const { isLoading } = useClient();
  const [toggle, setToggle] = useState(false);
  const decodedToken = useToken();

  if (decodedToken === null) {
    return <Loader />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div>
      {decodedToken?.role === "VIEWER" ? (
        <ListClients />
      ) : (
        <div>
          <ButtonDiv>
            <Button color={toggle ? "blue" : "yellow"} onClick={handleToggle}>
              {toggle ? "List Clients" : "Add Client"}
            </Button>
          </ButtonDiv>
          {toggle ? <ClientForm /> : <ListClients />}
        </div>
      )}
    </div>
  );
};

export default Client;
