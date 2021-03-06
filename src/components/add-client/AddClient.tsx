import { FunctionComponent, useContext } from "react";
import { ClientContext } from "../clients/ClientsProvider";
import { ModalContext } from "../modal/ModalProvider";
import Button from "../UI/Button";

const AddClient: FunctionComponent = () => {
  const { openModal } = useContext(ModalContext);
  const { error } = useContext(ClientContext);
  return (
    <div className="ml-auto">
      {!error && (
        <Button
          variant="outlined"
          label="Add client"
          onClick={() => {
            openModal();
          }}
        />
      )}
    </div>
  );
};

export default AddClient;
