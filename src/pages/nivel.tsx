import { useEffect, useState } from "react";
import AlertMessage from "../core/AlertMessage";
import NivelForm, { INivel } from "../components/NivelForm";
import BaseTable from "../core/BaseTable";
import { BaseService } from "../services/base-service";

export default function Nivel() {
  const rows = [
    {
      label: "#",
      value: "id",
      width: "70px",
    },
    {
      label: "Nível",
      value: "nivel",
    },
    {
      label: "DEVS",
      value: "desenvolvedores",
      type: "array",
      width: "50px",
    },
  ];
  const defaultStateRows = {
    nivel: "",
  };
  const service = new BaseService("nivel");

  const [register, setRegister] = useState(false);
  const [list, setList] = useState([]);
  const [resourcesSize, setResourcesSize] = useState(0);
  const [resourceSelected, setResourceSelected] =
    useState<INivel>(defaultStateRows);
  const [query, setQuery] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  /* Params */
  const [sortOrder, setSortOrder] = useState("ASC");
  const [sortField, setSortField] = useState("id");
  const [showDeleted, setShowDeleted] = useState(undefined);
  const [pageSize, setPageSize] = useState(5);
  const [offset, setOffset] = useState(undefined);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    searchResources();
  }, [pageSize, pageNumber, sortField, sortOrder, query]);

  useEffect(() => {
    if (!register) searchResources();
  }, [register]);

  const searchResources = () => {
    let params: Record<string, string | number> = {};
    params["relations"] = '["desenvolvedores"]';
    if (sortOrder) params["sortOrder"] = sortOrder;
    if (sortField) params["sortField"] = sortField;
    if (showDeleted) params["showDeleted"] = showDeleted;
    if (pageSize) params["pageSize"] = pageSize;
    if (offset) params["offset"] = offset;
    if (pageNumber) params["pageNumber"] = pageNumber;
    if (query && query !== "") params["query"] = query;

    service.count(params).then((response) => {
      setResourcesSize(+response);
    });
    service.findAll(params).then((response) => {
      setList(response);
    });
  };

  const setDefaultResource = () => {
    setResourceSelected(defaultStateRows);
  };

  const deleteDto = (dto) => {
    if (dto && dto?.id) {
      service
        .softDelete(dto)
        .then((response) => {
          searchResources();
          if (response && !response.error) {
            sendMessage({
              message: `Item #${dto.id} desativado com sucesso`,
            });
          } else {
            sendMessage({
              message: `Erro ao desativar o item #${dto.id}: ${response.error}`,
              type: "error",
            });
          }
        })
        .catch((err) => {});
    }
  };

  const sendMessage = (props) => {
    setMessageType(props.type ?? "success");
    setMessage(props.message);
  };

  return (
    <>
      <AlertMessage message={message} type={messageType} />

      {!register && (
        <BaseTable
          resources={list}
          rows={rows}
          resourcesSize={resourcesSize}
          title="Lista de Níveis"
          buttonLabel="Adicionar nível"
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
          search={query}
          setSearch={setQuery}
        />
      )}
      {register && (
        <NivelForm
          resource={resourceSelected}
          titleRegister="Cadastro de nível"
          titleEdition="Editar nível"
          cancelFunction={() => {
            setDefaultResource();
            setRegister(false);
          }}
          service={service}
          sendMessage={sendMessage}
        />
      )}
    </>
  );
}
