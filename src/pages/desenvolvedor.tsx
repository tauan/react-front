import { useEffect, useState } from "react";
import AlertMessage from "../components/AlertMessage";
import DesenvolvedorForm, {
  IDesenvolvedor,
} from "../components/DesenvolvedorForm";
import Table from "../components/Table";
import { BaseService } from "../services/base-service";

export default function Desenvolvedor() {
  const rows = [
    {
      label: "#",
      value: "id",
      width: "70px",
    },
    {
      label: "Nome",
      value: "nome",
    },
    {
      label: "Sexo",
      value: "sexo",
    },
    {
      label: "Data de nacimento",
      value: "dataNascimento",
      type: "date",
    },
    {
      label: "Idade",
      value: "idade",
    },
    {
      label: "Hobby",
      value: "hobby",
    },
  ];
  const defaultStateRows = {
    nome: "",
    dataNascimento: "",
    hobby: "",
    idade: "",
    sexo: "",
    nivelId: undefined,
  };
  const service = new BaseService("desenvolvedor");

  const [register, setRegister] = useState(false);
  const [list, setList] = useState([]);
  const [resourcesSize, setResourcesSize] = useState(0);
  const [resourceSelected, setResourceSelected] =
    useState<IDesenvolvedor>(defaultStateRows);
  const [message, setMessage] = useState("");

  /* Params */
  const [sortOrder, setSortOrder] = useState("ASC");
  const [sortField, setSortField] = useState("id");
  const [showDeleted, setShowDeleted] = useState(undefined);
  const [pageSize, setPageSize] = useState(5);
  const [offset, setOffset] = useState(undefined);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    searchResources();
  }, [pageSize, pageNumber]);

  useEffect(() => {
    if (!register) searchResources();
  }, [register]);

  const searchResources = () => {
    let params: Record<string, string | number> = {};

    if (sortOrder) params["sortOrder"] = sortOrder;
    if (sortField) params["sortField"] = sortField;
    if (showDeleted) params["showDeleted"] = showDeleted;
    if (pageSize) params["pageSize"] = pageSize;
    if (offset) params["offset"] = offset;
    if (pageNumber) params["pageNumber"] = pageNumber;

    service.count(params).then((response) => {
      setResourcesSize(+response);
    });
    service.findAll(params).then((response) => {
      setList(response);
    });
  };

  const deleteDto = (dto) => {
    searchResources();
    setMessage(`Item #${dto.id} desativado com sucesso`);
    setTimeout(() => {
      setMessage(undefined);
    }, 5000);
  };

  const setDefaultResource = () => {
    setResourceSelected(defaultStateRows);
  };

  return (
    <>
      <AlertMessage message={message} />
      {!register && (
        <Table
          resources={list}
          rows={rows}
          resourcesSize={resourcesSize}
          title="Lista de Desenvolvedores"
          buttonLabel="Adicionar desenvolvedor"
          offset={offset}
          pageNumber={pageNumber}
          pageSize={pageSize}
          setOffset={setOffset}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          setShowDeleted={setShowDeleted}
          setSortField={setSortField}
          setSortOrder={setSortOrder}
          showDeleted={showDeleted}
          sortField={sortField}
          sortOrder={sortOrder}
          setRegister={setRegister}
          setResourceSelected={setResourceSelected}
          deleteFunction={deleteDto}
        />
      )}
      {register && (
        <DesenvolvedorForm
          resource={resourceSelected}
          titleRegister="Cadastro de desenvolvedor"
          titleEdition="Editar desenvolvedor"
          cancelFunction={() => {
            setDefaultResource();
            setRegister(false);
          }}
          service={service}
        />
      )}
    </>
  );
}
