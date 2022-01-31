import { useEffect, useState } from "react";
import { BaseService } from "../services/base-service";
import BaseForm from "../core/BaseForm";

export default function NivelForm(props: NivelProps) {
  const [resource, setResource] = useState(props.resource);
  const [focuseds, setFocuseds] = useState({});
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [resource]);

  const submit = () => {
    if (resource)
      props.service.save(resource).then((response) => {
        if (response.id) {
          props.sendMessage({
            type: "success",
            message: `Nível '#${response.id} - ${response.nivel}'  salvo com sucesso`,
          });
          props.cancelFunction();
        }
      });
  };

  const validateForm = () => {
    setValid(true);
    let errors = {};

    if (!resource.nivel || resource.nivel.length < 5)
      errors["nivel"] = "Informe um nível com pelo menos 5 caracteres";
    setErrors(errors);
    if (Object.keys(errors).length > 0) setValid(false);
  };

  const setFocus = (name) => {
    let focused = focuseds;
    focused[name] = true;
    setFocuseds(focused);
    validateForm();
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
        valid={valid}
      >
        <div className="col-md-12">
          <span>Nível</span>
          <br />
          <span className="text-danger mb-2">
            {" "}
            {focuseds["nivel"] ? errors["nivel"] : ""}
          </span>
          <input
            type="text"
            value={resource?.nivel}
            onChange={(e) => {
              setNivel(e.target.value);
            }}
            required
            placeholder="Digite o nome do nível desejado"
            onFocus={() => setFocus("nivel")}
          />
        </div>
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
