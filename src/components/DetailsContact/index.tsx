import { useState, useContext } from "react";
import { Contato, Props } from "../../types/global";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { ContatosContext } from "../../context/ContactListContext";
import Modal from "react-modal";
import { Check, X } from "@phosphor-icons/react";

const DetailsContact = ({
  contact,
  onUpdateContact,
  onDeleteContact,
  modalIsOpen,
  setModalIsOpen,
}: Props) => {
  const [phoneExist, setPhoneExist] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [handleDelete, setHandleDelete] = useState(false);
  const { contatos, setContatos } = useContext(ContatosContext);
  const [mensagem, setMensagem] = useState({
    texto: "",
    estado: false,
  });

  const closeModal = () => {
    setModalIsOpen(false);
    setIsEditing(false);
    setPhoneExist(false);
    setMensagem({ texto: "", estado: false });
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Contato>({
    defaultValues: contact,
  });
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const {
    fields: telefones,
    append: appendTelefone,
    remove: removeTelefone,
    update: updateTelefone,
  } = useFieldArray<Contato>({
    control,
    name: "telefones",
  });

  const {
    fields: cepFields,
    append: appendCep,
    update: updateCep,
    remove: removeCeps,
  } = useFieldArray<Contato>({
    control,
    name: "ceps",
  });

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/contatos/${contact.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setMensagem({ texto: "Falha ao excluir o contato", estado: true });
        throw new Error("Falha ao excluir o contato.");
      }

      const primeiraLetra = contact.nome.charAt(0).toUpperCase();
      const updatedContatos = { ...contatos };
      updatedContatos[primeiraLetra] = updatedContatos[primeiraLetra].filter(
        (contato) => contato.id !== contato.id
      );
      setContatos(updatedContatos);
      setMensagem({ texto: "Contato excluído", estado: true });
      setHandleDelete(!handleDelete);
      onDeleteContact(contact?.id);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: Contato) => {
    try {
      const hasDuplicateNumbers =
        new Set(data.telefones.map((item) => item.numero)).size !==
        data.telefones.length;

      if (hasDuplicateNumbers) {
        setPhoneExist(!phoneExist);
      }

      const response = await fetch(
        `http://localhost:3000/contatos/${contact.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        setMensagem({ texto: "Falha ao atualizar o contato", estado: true });
        throw new Error("Falha ao atualizar o contato.");
      }

      const updatedContato = await response.json();

      onUpdateContact(updatedContato);
      setIsEditing(false);

      const primeiraLetra = updatedContato.nome.charAt(0).toUpperCase();

      const updatedContatos = { ...contatos };

      if (updatedContatos[primeiraLetra]) {
        updatedContatos[primeiraLetra] = updatedContatos[primeiraLetra].map(
          (contato) =>
            contato.id === updatedContato.id ? updatedContato : contato
        );
      }
      setMensagem({ texto: "Contato editado", estado: true });
      setContatos(updatedContatos);
    } catch (error) {
      console.error(error);
    }
  };

  const buscarEndereco = (
    event: React.FocusEvent<HTMLInputElement>,
    index: number
  ) => {
    const cep = event.target.value;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        updateCep(index, { cep, logradouro: data.logradouro });
      })
      .catch((error) => console.error(error));
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="boxGeralForm">
            <Controller
              name="nome"
              control={control}
              defaultValue={contact?.nome}
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  {isEditing ? (
                    <>
                      <label> Nome: </label>
                      <input
                        type="text"
                        defaultValue={contact?.nome}
                        onChange={onChange}
                      />
                    </>
                  ) : (
                    <h2>{value}</h2>
                  )}
                  {isEditing && (
                    <>
                      {error?.type === "required" && (
                        <p>Este campo é obrigatório</p>
                      )}
                    </>
                  )}
                </>
              )}
            />
            <Controller
              name="sobrenome"
              control={control}
              defaultValue={contact?.sobrenome}
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  {isEditing ? (
                    <>
                      <label> Sobrenome: </label>
                      <input
                        type="text"
                        defaultValue={contact?.sobrenome}
                        onChange={onChange}
                      />
                    </>
                  ) : (
                    <h2>{value}</h2>
                  )}
                  {isEditing && (
                    <>
                      {error?.type === "required" && (
                        <p>Este campo é obrigatório</p>
                      )}
                    </>
                  )}
                </>
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue={contact?.email}
              rules={{ required: true, pattern: /\S+@\S+\.\S+/ }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  {isEditing ? (
                    <>
                      <label> E-mail: </label>
                      <input
                        type="email"
                        defaultValue={contact?.email}
                        onChange={onChange}
                      />
                    </>
                  ) : (
                    <p>{value}</p>
                  )}
                  {isEditing && (
                    <>
                      {error?.type === "required" && (
                        <p>Este campo é obrigatório</p>
                      )}
                      {error?.type === "pattern" && (
                        <p>O formato de e-mail é inválido</p>
                      )}
                    </>
                  )}
                </>
              )}
            />
            {isEditing && (
              <div className="boxPhoneAll">
                {telefones.map((item, index) => (
                  <div key={item.id} className="loopPhone">
                    <label> Telefone {index + 1} </label>
                    <input
                      type="text"
                      {...register(`telefones.${index}.numero`)}
                      defaultValue={item?.numero}
                    />
                    {index > 0 && (
                      <div className="buttonRemoveForm">
                        <button
                          type="button"
                          onClick={() => removeTelefone(index)}
                        >
                          Remover telefone
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendTelefone({ numero: "" })}
                >
                  Adicionar novo campo de telefone
                </button>
                {cepFields.map((field, index) => (
                  <div className="boxFieldForm" key={field.id}>
                    <label>CEP </label>
                    <input
                      type="text"
                      id={`cep${index}`}
                      placeholder="01234-567"
                      {...register(`ceps.${index}.cep`, { required: true })}
                      onBlur={(e) => buscarEndereco(e, index)}
                    />
                    {errors?.ceps?.[index]?.cep && (
                      <span>Campo obrigatório</span>
                    )}

                    <label>Endereço</label>
                    <input
                      type="text"
                      id={`logradouro${index}`}
                      value={field.logradouro}
                      {...register(`ceps.${index}.logradouro`, {
                        required: true,
                      })}
                    />
                    {errors?.ceps?.[index]?.logradouro && (
                      <span>Campo obrigatório</span>
                    )}
                    {index > 0 && (
                      <>
                        <button type="button" onClick={() => removeCeps(index)}>
                          Remover Endereço
                        </button>
                      </>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendCep({ cep: "", logradouro: "" })}
                >
                  Adicionar novo endereço
                </button>
              </div>
            )}
          </div>
          {phoneExist && (
            <span>Número de telefone duplicado, por favor remova!</span>
          )}
          {isEditing && (
            <button type="submit" className="saveEditButton">
              Salvar
            </button>
          )}
        </form>
      ) : (
        <>
          {!handleDelete && (
            <div className="boxDetails">
              <div className="infoField">
                <h1>
                  {contact.nome} {contact.sobrenome}
                </h1>
              </div>
              <div className="infoField">
                <span>E-mail:</span>
                <p>{contact.email}</p>
              </div>
              <div className="infoField">
                <span>Endereço(s)</span>
                <ul>
                  {contact?.ceps?.map((cep, index) => (
                    <li key={index}>
                      {cep.cep} - {cep.logradouro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="infoField">
                <span>Telefone(s)</span>
                <ul>
                  {contact?.telefones?.map((phone, index) => (
                    <li key={index}>{phone.numero}</li>
                  ))}
                </ul>
              </div>
              <div className="buttonsFooter">
                {!isEditing && (
                  <button onClick={handleEditClick}>Editar</button>
                )}
                <button type="button" onClick={handleDeleteClick}>
                  Excluir
                </button>
              </div>
            </div>
          )}
        </>
      )}
      <>
        <button onClick={closeModal} className="closeModal">
          Fechar
        </button>
      </>
      {mensagem.estado == true && (
        <div
          className={`boxMessage ${
            mensagem.texto == "Contato excluído" || "Contato editado"
              ? "success"
              : "error"
          }`}
        >
          <div className="boxAll">
            <div className="icone">
              {mensagem.texto == "Contato excluído" || "Contato editado" ? (
                <Check size={15} />
              ) : (
                <X size={15} />
              )}
            </div>
            <div className="mensagem">
              <span>
                {mensagem.texto === "Contato excluído"
                  ? "Contato excluído"
                  : mensagem.texto === "Contato editado"
                  ? "Contato editado"
                  : "Falha ao tentar realizar essa operação"}
              </span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DetailsContact;
