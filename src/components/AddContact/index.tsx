import * as Styled from "./styles";
import { useForm, useFieldArray } from "react-hook-form";
import { FormData } from "../../types/global";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Check, X } from "@phosphor-icons/react";

const AddContact = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(true);
  const [mensagem, setMensagem] = useState({
    texto: "",
    estado: false,
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      telefones: [{ numero: "" }],
      ceps: [{ cep: "", logradouro: "" }],
    },
  });

  const {
    fields: telefones,
    append: appendTelefone,
    remove: removeTelefone,
  } = useFieldArray({
    control,
    name: "telefones",
  });

  const {
    fields: cepFields,
    append: appendCep,
    update: updateCep,
    remove: removeCeps,
  } = useFieldArray({
    control,
    name: "ceps",
  });

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

  const onSubmit = (data: FormData) => {
    // Verificar se já existe um contato com o mesmo nome
    setIsLoading(true);
    fetch("http://localhost:3000/contatos")
      .then((response) => response.json())
      .then((contatos) => {
        const contatoExistente = contatos.find(
          (contato: any) =>
            contato.nome.toLowerCase() === data.nome.toLowerCase()
        );

        if (contatoExistente) {
          setMensagem({ texto: "Contato já existente", estado: true });
          setIsLoading(false);
          return;
        }

        // Se o contato não existir, enviar os dados do formulário para a API

        fetch("http://localhost:3000/contatos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            setMensagem({ texto: "Contato salvo", estado: true });
            setTimeout(() => {
              setFormOpen(false);
            }, 3000);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  return (
    <Styled.mainForm>
      {formOpen && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="boxFieldForm">
              <label>Nome</label>
              <input
                type="text"
                id="nome"
                placeholder="Felipe"
                {...register("nome", { required: true })}
              />
              {errors.nome && <span>Campo obrigatório</span>}
            </div>
            <div className="boxFieldForm">
              <label>Sobrenome</label>
              <input
                type="text"
                id="sobrenome"
                placeholder="Godoy"
                {...register("sobrenome", { required: true })}
              />
              {errors.sobrenome && <span>Campo obrigatório</span>}
            </div>
            <div className="boxFieldForm">
              <label>E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="felipe@exemplo.com.br"
                {...register("email", { required: true })}
              />
              {errors.sobrenome && <span>Campo obrigatório</span>}
            </div>
            <div className="boxFieldForm">
              <label>Aniversário</label>
              <input
                type="date"
                id="aniversario"
                {...register("aniversario")}
              />
            </div>
            {telefones.map((field, index) => (
              <div className="boxFieldForm" key={field.id}>
                <label>Telefone {index === 0 ? "Principal" : index + 1}</label>
                <input
                  type="text"
                  id={`numero${index}`}
                  placeholder="(00) 00000-0000"
                  {...register(`telefones.${index}.numero`, { required: true })}
                />
                {errors?.telefones?.[index]?.numero && (
                  <span>Campo obrigatório</span>
                )}
                {index > 0 && (
                  <div className="buttonRemoveForm">
                    <button type="button" onClick={() => removeTelefone(index)}>
                      Remover telefone
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              className="buttonAddField"
              onClick={() => appendTelefone({ numero: "" })}
            >
              Adicionar novo campo de telefone
            </button>
            {cepFields.map((field, index) => (
              <div className="boxFieldForm" key={field.id}>
                <label>CEP {index !== 0 ? index + 1 : ""}</label>
                <input
                  type="text"
                  id={`cep${index}`}
                  placeholder="01234-567"
                  {...register(`ceps.${index}.cep`, { required: true })}
                  onBlur={(e) => buscarEndereco(e, index)}
                />
                {errors?.ceps?.[index]?.cep && <span>Campo obrigatório</span>}

                <label>Endereço {index === 0 ? "Principal" : index + 1}</label>
                <input
                  type="text"
                  id={`logradouro${index}`}
                  value={field.logradouro}
                  placeholder="Avenida Paulista"
                  {...register(`ceps.${index}.logradouro`, { required: true })}
                />
                {errors?.ceps?.[index]?.logradouro && (
                  <span>Campo obrigatório</span>
                )}
                {index > 0 && (
                  <div className="buttonRemoveForm">
                    <button type="button" onClick={() => removeCeps(index)}>
                      Remover Endereço
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendCep({ cep: "", logradouro: "" })}
              className="buttonAddField"
            >
              Adicionar novo endereço
            </button>
            {errorMessage && <span>{errorMessage}</span>}
            <button type="submit">
              {isLoading ? (
                <>
                  <ClipLoader size={10} color={"#ffffff"} loading={true} />
                  <span>Salvar</span>
                </>
              ) : (
                <span>Salvar</span>
              )}
            </button>
          </form>
          {mensagem.estado == true && (
            <div
              className={`boxMessage ${
                mensagem.texto == "Contato salvo" ? "success" : "error"
              }`}
            >
              <div className="boxAll">
                <div className="icone">
                  {mensagem.texto == "Contato salvo" ? (
                    <Check size={15} />
                  ) : (
                    <X size={15} />
                  )}
                </div>
                <div className="mensagem">
                  <span>
                    {mensagem.texto == "Contato salvo"
                      ? "Contato salvo"
                      : "Contato Existente"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Styled.mainForm>
  );
};

export default AddContact;
