import { useEffect, useState } from "react";
import { BaseService } from "../services/base-service";
import BaseForm from "../core/BaseForm";
import { INivel } from "./NivelForm";

export default function DesenvolvedorForm(props: DesenvolvedorProps) {
  const [resource, setResource] = useState(props.resource);
  const [nivelList, setNivelList] = useState<INivel[]>([]);
  const [focuseds, setFocuseds] = useState({});
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);

  const nivelService = new BaseService("nivel");

  /* onInit() */
  useEffect(() => {
    loadNiveis();
  }, []);

  useEffect(() => {
    validateForm();
  }, [resource]);

  const validateForm = () => {
    setValid(true);
    let errors = {};

    if (!resource.nome || resource.nome.length < 7)
      errors["nome"] = "Informe um nome com pelo menos 7 caracteres";
    if (!resource.sexo || resource.sexo.length < 3)
      errors["sexo"] = "Selecione um sexo";
    if (!resource.nivelId || isNaN(resource.nivelId))
      errors["nivelId"] = "Selecione um nível";
    if (!resource.hobby || resource.hobby.length < 7)
      errors["hobby"] = "Informe um hobby com mais de 7 caracteres";
    if (!resource.dataNascimento)
      errors["dataNascimento"] = "Informe sua data de nascimento";

    setErrors(errors);
    if (Object.keys(errors).length > 0) setValid(false);
  };

  useEffect(() => {
    if (resource.dataNascimento) {
      const nascimento = new Date(resource.dataNascimento);
      const hoje = new Date();

      const diferencaDias =
        (hoje.getTime() - nascimento.getTime()) / (1000 * 60 * 60 * 24);

      setResource({ ...resource, idade: Math.floor(diferencaDias / 365) });
    }
  }, [resource.dataNascimento]);

  const submit = () => {
    if (resource)
      props.service.save(resource).then((response) => {
        if (response.id) {
          props.sendMessage({
            type: "success",
            message: `Desenvolvedor '#${response.id} - ${response.nome}'  salvo com sucesso`,
          });
          props.cancelFunction();
        }
      });
  };

  const setFocus = (name) => {
    let focused = focuseds;
    focused[name] = true;
    setFocuseds(focused);
    validateForm();
  };

  const loadNiveis = () => {
    nivelService.findAll().then((response) => {
      if (response && Array.isArray(response)) setNivelList(response);
    });
  };

  return (
    <>
      <BaseForm
        resource={props.resource}
        titleRegister={props.titleRegister}
        titleEdition={props.titleEdition}
        cancelFunction={props.cancelFunction}
        submitFunction={submit}
        valid={valid}
      >
        {/* Nome */}
        <div className="col-md-12">
          <span>Nome </span>
          <br />
          <span className="text-danger mb-2">
            {" "}
            {focuseds["nome"] ? errors["nome"] : ""}
          </span>
          <input
            type="text"
            value={resource?.nome}
            onChange={(e) => {
              setResource({ ...resource, nome: e.target.value });
            }}
            placeholder="Digite o nome do Dev"
            onFocus={() => setFocus("nome")}
          />
        </div>

        {/* Hobby */}
        <div className="col-md-12">
          <span>Hobby</span>
          <br />
          <span className="text-danger mb-2">
            {" "}
            {focuseds["hobby"] ? errors["hobby"] : ""}
          </span>
          <input
            type="text"
            value={resource?.hobby}
            onChange={(e) => {
              setResource({ ...resource, hobby: e.target.value });
            }}
            placeholder="Digite o hobby do Dev"
            onFocus={() => setFocus("hobby")}
          />
        </div>

        {/* Data nascimento */}
        <div className="col-md-6">
          <span>Data nascimento</span> <br />
          <span className="text-danger mb-2">
            {" "}
            {focuseds["dataNascimento"] ? errors["dataNascimento"] : ""}
          </span>
          <input
            type="date"
            value={resource?.dataNascimento}
            onChange={(e) => {
              setResource({ ...resource, dataNascimento: e.target.value });
            }}
            placeholder="Digite a data de nascimento do Dev"
            onFocus={() => setFocus("dataNascimento")}
          />
        </div>

        {/* Idade */}
        <div className="col-md-2">
          <span>Idade</span>
          <br />
          <span className="text-danger mb-2">
            {" "}
            {focuseds["idade"] ? errors["idade"] : ""}
          </span>
          <input
            type="number"
            disabled={true}
            value={resource?.idade}
            placeholder="Idade do Dev"
            onFocus={() => setFocus("idade")}
          />
        </div>

        {/* nivel */}
        <div className="col-md-6">
          <span>Nível</span>
          <br />
          <span className="text-danger mb-2">
            {" "}
            {focuseds["nivelId"] ? errors["nivelId"] : ""}
          </span>
          <select
            className="custonSelect"
            value={resource?.nivelId}
            onChange={(e) => {
              setResource({ ...resource, nivelId: +e.target.value });
            }}
            onFocus={() => setFocus("nivelId")}
          >
            <option></option>
            {nivelList?.map((nivel) => {
              return (
                <option key={nivel.id} value={nivel.id}>
                  {nivel.nivel}
                </option>
              );
            })}
          </select>
        </div>
        {/* sexo */}
        <div className="col-md-6">
          <span>Sexo</span>
          <br />
          <span className="text-danger mb-2">
            {" "}
            {focuseds["sexo"] ? errors["sexo"] : ""}
          </span>
          <select
            className="custonSelect"
            value={resource?.sexo}
            onChange={(e) => {
              setResource({ ...resource, sexo: e.target.value });
            }}
            onFocus={() => setFocus("sexo")}
          >
            <option></option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="outro">Outro</option>
          </select>
        </div>
      </BaseForm>
    </>
  );
}

interface DesenvolvedorProps {
  resource: IDesenvolvedor | null;
  titleRegister?: string;
  titleEdition?: string;
  cancelFunction: void | any;
  service: BaseService<string>;
  sendMessage: void | any;
}

export interface IDesenvolvedor {
  id?: number;
  nome: string;
  dataNascimento: string;
  hobby: string;
  idade: number | string;
  sexo: string;
  nivelId: number;
  criadoEm?: string;
  atualizadoEm?: string;
  desativadoEm?: string;
}
