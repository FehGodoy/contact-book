import { useContext, useState } from "react";
import { ContatosContext } from "../../context/ContactListContext";
import AddContact from "../AddContact";
import { Contato } from "../../types/global";
import * as Styled from "./styles";

const ListContacts = (props: {
  searchTerm: string;
  onContactClick: (contact: Contato | null) => void;
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
}) => {
  const { searchTerm } = props;
  const { contatos } = useContext(ContatosContext);
  const [selectedContact, setSelectedContact] = useState<Contato | null>(null);
  const [addContactButton, setAddContactButton] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleContactClick = (contact: Contato | null) => {
    props.onContactClick(contact);
    setSelectedContact(contact);
  };

  const openModal = () => {
    props.setModalIsOpen(true);
  };

  return (
    <Styled.List>
      {!addContactButton ? (
        searchTerm.length === 0 &&
        Object.keys(contatos).map((letra) => (
          <div className="boxContact" key={letra}>
            <div className="catContact">
              <h2>{letra}</h2>
            </div>
            <ul>
              {contatos[letra].map((contato) => (
                <li
                  key={contato.id}
                  onClick={() => {
                    handleContactClick(contato);
                    openModal();
                  }}
                >
                  {contato?.nome} {contato?.sobrenome}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <AddContact />
      )}
      <button
        onClick={() => setAddContactButton(!addContactButton)}
        className="addContact"
      >
        {!addContactButton ? "Adicionar contato" : "Cancelar"}
      </button>
    </Styled.List>
  );
};

export default ListContacts;
