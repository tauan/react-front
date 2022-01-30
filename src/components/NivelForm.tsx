import { useState } from "react";
import { BaseService } from "../services/base-service";
import BaseForm from "./BaseForm";

export default function NivelForm(props: NivelProps) {
  const [resource, setResource] = useState(props.resource);

  const submit = () => {
    if (resource)
      props.service.save(resource).then((response) => {
        if (response.id) {
          props.sendMessage({
            message: `Nível '#${response.id} - ${response.nivel}'  salvo com sucesso`,
          });
          props.cancelFunction();
        }
      });
  };

  const setNivel = (nivel) => {
    setResource({ ...resource, nivel });
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
        <input
          type="text"
          value={resource?.nivel}
          onChange={(e) => {
            setNivel(e.target.value);
          }}
          placeholder="Digite o nome do nível desejado"
        />
      </BaseForm>
    </>
  );
}

interface NivelProps {
  resource: INivel | null;
  titleRegister?: string;
  titleEdition?: string;
  cancelFunction: void | any;
  service: BaseService<string>;
  sendMessage: void | any;
}

export interface INivel {
  id?: number;
  nivel: string;
  criadoEm?: string;
  atualizadoEm?: string;
  desativadoEm?: string;
}
