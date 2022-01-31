import styles from "../styles/BaseForm.module.css";
import { iconCheck } from "./Icons";
export default function BaseForm(props: BaseFormProps) {
  return (
    <div className={styles.container}>
      <h1 className="mb-4">
        {props.resource?.id
          ? props.titleEdition ?? "Editando"
          : props.titleRegister ?? "Cadastrando"}{" "}
        {props.resource?.id && `(#${props.resource?.id})`}
      </h1>
      <form className={styles.formContainer}>
        <div className="row">{props.children}</div>
        <div className="row mt-3">
          <div className={styles.buttonsContainer}>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => props.cancelFunction()}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={props.submitFunction}
              disabled={!props.valid}
            >
              <span className="h5">{iconCheck} </span> Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

interface BaseFormProps {
  titleEdition?: string;
  titleRegister?: string;
  children: any;
  resource: Record<string, any>;
  cancelFunction: void | any;
  submitFunction: void | any;
  valid: boolean | undefined;
}
