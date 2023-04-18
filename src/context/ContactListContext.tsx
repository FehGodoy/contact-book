import { createContext, SetStateAction, useEffect, useState } from "react";
import {
  ContactProviderProps,
  Contato,
  ContatosContextData,
} from "../types/global";

export const ContatosContext = createContext<ContatosContextData>({
  contatos: {},
  setContatos: (value: SetStateAction<{ [key: string]: Contato[] }>) => {},
});

const ContactProvider = ({ children }: ContactProviderProps) => {
  const [contatos, setContatos] = useState<{ [key: string]: Contato[] }>({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/contatos");
      const apiContacts: Contato[] = await response.json();

      const sortedContatos = apiContacts.sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );

      const groupedContatos = sortedContatos.reduce<{
        [key: string]: Contato[];
      }>((acc, contato) => {
        const primeiraLetra = contato.nome?.charAt(0)?.toUpperCase();
        if (primeiraLetra) {
          if (!acc[primeiraLetra]) {
            acc[primeiraLetra] = [];
          }
          acc[primeiraLetra].push(contato);
        }
        return acc;
      }, {});

      setContatos(groupedContatos);
    }
    fetchData();
  }, []);
  return (
    <ContatosContext.Provider value={{ contatos, setContatos }}>
      {children}
    </ContatosContext.Provider>
  );
};

export default ContactProvider;
