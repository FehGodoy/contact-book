import * as Styled from "./styles";
import React, { useContext, useState } from "react";
import { ContatosContext } from "../../context/ContactListContext";
import { Contato, onSearchTermProp } from "../../types/global";
import { MagnifyingGlass } from "@phosphor-icons/react";

const Header = ({
  onSearchTermChange,
  onContactClick,
  modalIsOpen,
  setModalIsOpen,
}: onSearchTermProp) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { contatos } = useContext(ContatosContext);
  const [selectedContact, setSelectedContact] = useState<Contato | null>(null);

  const handleSearch = (event: { target: { value: any } }) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    onSearchTermChange(searchTerm);
  };

  const handleContactClick = (contact: Contato | null) => {
    setSelectedContact(contact);
    onContactClick(contact);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const filteredContatos = Object.values(contatos)
    .flat()
    .filter((contato) =>
      `${contato.nome} ${contato.sobrenome}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const getGrupo = (nome: string) => {
    return nome.charAt(0).toUpperCase();
  };

  const grupos: Record<string, Contato[]> = {};
  filteredContatos.forEach((contato) => {
    const grupo = getGrupo(contato.nome);
    if (grupo in grupos) {
      grupos[grupo].push(contato);
    } else {
      grupos[grupo] = [contato];
    }
  });

  return (
    <Styled.Header>
      <div className="input">
        <input
          type="text"
          name="searchContact"
          placeholder="Procurar contato..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="iconeSearch">
          <MagnifyingGlass size={24} color="#aba8a8" />
        </div>
      </div>
      {searchTerm.length > 0 && (
        <div className="boxCatSearch">
          {Object.keys(grupos).map((grupo) => (
            <div className="boxContact" key={grupo}>
              <div className="catContact">
                <h2>{grupo}</h2>
              </div>
              <ul>
                {grupos[grupo].map((contato) => (
                  <li
                    key={contato.id}
                    onClick={() => {
                      handleContactClick(contato);
                      openModal();
                    }}
                  >
                    {contato.nome} {contato.sobrenome}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {Object.keys(grupos).length === 0 && (
            <p className="nameNotSearch">Não encontrado</p>
          )}
        </div>
      )}
    </Styled.Header>
  );
};

export default Header;
