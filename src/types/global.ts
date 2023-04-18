export interface ContactProviderProps {
  children: React.ReactNode;
}

export interface Contato {
  id: number;
  nome: string;
  sobrenome: string;
  aniversario: string;
  telefones: {
    numero: string;
  }[];
  ceps: {
    cep: string;
    logradouro: string;
  }[];
  email: string;
}
type SetContatosType = (value: { [key: string]: Contato[] }) => void;

export interface ContatosContextData {
  contatos: { [key: string]: Contato[] };
  setContatos: SetContatosType;
}

export interface Props {
  contact: Contato;
  onUpdateContact: (updatedContact: Contato) => void;
  onDeleteContact?: (contactId: number) => void;
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
}

export interface onSearchTermProp {
  onSearchTermChange: (searchTerm: string) => void;
  onContactClick: (contact: Contato | null) => void;
  modalIsOpen: boolean;
  setModalIsOpen: (isOpen: boolean) => void;
}

export interface FormData {
  nome: string;
  sobrenome: string;
  email: string;
  aniversario: Date;
  telefones: {
    numero: string;
  }[];
  ceps: {
    cep: string;
    logradouro: string;
  }[];
}
