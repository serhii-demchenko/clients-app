import { FunctionComponent, MouseEvent, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IClientFull, IClient } from "../../services/api";
import { ClientContext } from "../clients/ClientsProvider";
import Button from "../UI/Button";
import ModalInput from "./ModalInput";
import { ModalContext } from "./ModalProvider";

interface IModalProps {
  client: IClientFull | null;
}

const Modal: FunctionComponent<IModalProps> = ({ client }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IClient>();
  const { closeModal } = useContext(ModalContext);
  const { addClient, updateClient } = useContext(ClientContext);

  useEffect(() => {
    if (client) {
      const { firstName, lastName, phone, avatarUrl } = client;
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      phone && setValue("phone", phone);
      avatarUrl && setValue("avatarUrl", avatarUrl);
    }
  }, [client, setValue]);

  const onSubmit = (data: IClient) => {
    if (client) updateClient({ id: client.id, ...data });
    else addClient(data);

    closeModal();
  };

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) closeModal();
  };

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-50 flex items-center justify-center"
      onClick={handleBackdropClick}>
      <div className="shadow-md bg-white rounded-md p-4 max-h-screen overflow-y-auto">
        <form
          className="flex flex-col space-y-2 "
          onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-medium">
            {client ? "Edit client" : "Add client"}
          </h2>
          <ModalInput
            name="firstName"
            label="First name *"
            register={register}
            required
          />
          {errors?.firstName && (
            <p className="text-sm text-red-500">First name field is required</p>
          )}
          <ModalInput
            name="lastName"
            label="Last name *"
            register={register}
            required
          />
          {errors?.lastName && (
            <p className="text-sm text-red-500">Last name field is required</p>
          )}
          <ModalInput name="phone" label="Phone" register={register} />
          <ModalInput name="avatarUrl" label="Avatar URL" register={register} />
          <div></div>
          <div className="flex justify-around">
            <Button type="submit" label="Ok" />
            <Button label="Cansel" onClick={() => closeModal()} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
