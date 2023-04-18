import { useState } from "react";
import ContactProvider from "../../context/ContactListContext";
import Header from "../Header";
import ListContacts from "../ListContacts";
import * as Styled from "./styles";
import DetailsContact from "../DetailsContact";
import { Contato } from "../../types/global";
import background from "../../assets/background.jpg";

const MainPhone = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contato | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const handleContactClick = (contact: Contato | null) => {
    setSelectedContact(contact);
  };

  const handleUpdateContact = (updatedContact: Contato) => {
    setSelectedContact(updatedContact);
  };

  console.log("MAINN: ", modalIsOpen);

  return (
    <ContactProvider>
      <Styled.Main>
        <div className="container">
          <div className="boxLeftBackground">
            <img src={background} alt="Background" />
          </div>
          <div className="boxRightContact">
            <Header
              onSearchTermChange={handleSearchTermChange}
              onContactClick={handleContactClick}
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
            />
            <ListContacts
              searchTerm={searchTerm}
              onContactClick={handleContactClick}
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
            />
            {selectedContact && (
              <DetailsContact
                contact={selectedContact}
                onUpdateContact={handleUpdateContact}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
              />
            )}
          </div>
        </div>
      </Styled.Main>
    </ContactProvider>
  );
};

export default MainPhone;
