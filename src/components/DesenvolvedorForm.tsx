import { useEffect, useState } from "react";
import { BaseService } from "../services/base-service";
import BaseForm from "./BaseForm";
import { INivel } from "./NivelForm";

export default function DesenvolvedorForm(props: DesenvolvedorProps) {
  const [resource, setResource] = useState(props.resource);
  const [nivelList, setNivelList] = useState<INivel[]>([]);

  const nivelService = new BaseService("nivel");

  /* onInit() */
  useEffect(() => {
    loadNiveis();
  }, []);

  useEffect(() => {}, [resource]);

  useEffect(() => {
    setIdade();
  }, [resource.dataNascimento]);

  const submit = () => {
    if (resource)
      props.service.save(resource).then((response) => {
        props.cancelFunction();
      });
  };

  const loadNiveis = () => {
    nivelService.findAll().then((response) => {
      if (response && Array.isArray(response)) setNivelList(response);
    });
  };

  const setIdade = () => {
    if (resource.dataNascimento) {
      const nascimento = new Date(resource.dataNascimento);
      const hoje = new Date();

      const diferencaDias =
        (hoje.getTime() - nascimento.getTime()) / (1000 * 60 * 60 * 24);

      setResource({ ...resource, idade: Math.floor(diferencaDias / 365) });
    }
  };

  return (
    <>
      <BaseForm
        resource={props.resource}
        titleRegister={props.titleRegister}
        titleEdition={props.titleEdition}
        cancelFunction={props.cancelFunction}
        submitFunction={submit}
      >
        {/* Nome */}
        <div className="col-md-12">
          <span>Nome</span>
          <input
            type="text"
            value={resource?.nome}
            onChange={(e) => {
              setResource({ ...resource, nome: e.target.value });
            }}
            placeholder="Digite o nome do Dev"
          />
        </div>

        {/* Hobby */}
        <div className="col-md-12">
          <span>Hobby</span>
          <input
            type="text"
            value={resource?.hobby}
            onChange={(e) => {
              setResource({ ...resource, hobby: e.target.value });
            }}
            placeholder="Digite o hobby do Dev"
          />
        </div>

        {/* Data nascimento */}
        <div className="col-md-6">
          <span>Data nascimento</span>
          <input
            type="date"
            value={resource?.dataNascimento}
            onChange={(e) => {
              setResource({ ...resource, dataNascimento: e.target.value });
            }}
            placeholder="Digite a data de nascimento do Dev"
          />
        </div>

        {/* Idade */}
        <div className="col-md-2">
          <span>Idade</span>
          <input
            type="number"
            disabled={true}
            value={resource?.idade}
            placeholder="Idade do Dev"
          />
        </div>

        {/* nivel */}
        <div className="col-md-6">
          <span>Nível</span>
          <select
            className="custonSelect"
            value={resource?.nivelId}
            onChange={(e) => {
              setResource({ ...resource, nivelId: +e.target.value });
            }}
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
          <select
            className="custonSelect"
            value={resource?.sexo}
            onChange={(e) => {
              setResource({ ...resource, sexo: e.target.value });
            }}
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
