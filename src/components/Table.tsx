import ConvertDateToString from "../../utils/dateToString";
import styles from "../styles/Table.module.css";
import { iconEdit, iconDelete } from "./Icons";

export default function Table(props?: IProps) {
  const pages: number[] = [];

  for (let i = 1; i < props.resourcesSize / props.pageSize + 1; i++) {
    pages.push(i);
  }

  const nextPage = () => {
    if (props.pageNumber * props.pageSize < props.resourcesSize) {
      props.setPageNumber(props.pageNumber + 1);
    }
  };
  const previousPage = () => {
    if (props.pageNumber > 1) props.setPageNumber(props.pageNumber - 1);
  };

  const editLine = (dto) => {
    props.setResourceSelected(dto);
    props.setRegister(true);
  };

  const deleteLine = (dto) => {
    props.deleteFunction(dto);
  };

  const generateHeaders = () => {
    return props.rows.map((row) => {
      return <th key={row.value}>{row.label}</th>;
    });
  };

  const generateTableRows = () => {
    return props.resources?.map((resource) => {
      return (
        <tr key={resource.id}>
          {props.rows.map((row) => {
            return (
              <td
                key={resource[row.value]}
                style={row.width ? { width: row.width } : {}}
              >
                {row.type === "date"
                  ? ConvertDateToString(resource[row.value])
                  : resource[row.value]}
              </td>
            );
          })}
          {generateTableButtons(resource)}
        </tr>
      );
    });
  };

  const generateTableButtons = (dto) => {
    return (
      <td>
        <a className={styles.buttonForm} onClick={() => editLine(dto)}>
          {iconEdit}
        </a>
        <a className={styles.buttonForm} onClick={() => deleteLine(dto)}>
          {iconDelete}
        </a>
      </td>
    );
  };

  const addDto = () => {
    props.setRegister(true);
  };

  const handlerSearch = (search) => {
    console.log(search);
  };

  const toglePageSize = (size) => {
    props.setPageSize(size);
    props.setPageNumber(1);
  };

  return (
    <>
      <h2 className="mb-4 mt-4">{props?.title ?? "Lista de informações"}</h2>
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <div className="row">
            <div className="col-md-6 col-6">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Insira sua busca"
                  onChange={(e) => handlerSearch(e.target.value)}
                />
              </div>
            </div>
            <div
              className="col-md-6 col-6 d-flex justify-content-end"
              style={{ height: 40 }}
            >
              <button
                type="button"
                className="btn btn-primary align-end"
                onClick={addDto}
              >
                <span className="h5">+</span> {props.buttonLabel ?? "Adicionar"}
              </button>
            </div>
          </div>
        </div>
        <table>
          <thead className={styles.colsContainer}>
            <tr>
              {generateHeaders()}
              <th className="th-opcoes">Opções</th>
            </tr>
          </thead>
          <tbody>{generateTableRows()}</tbody>
        </table>
      </div>
      <div className={styles.footer}>
        <div className="row">
          <div className="col-md-4 d-flex">
            <span>
              Exibindo{" "}
              {props.resourcesSize < props.pageSize
                ? props.resourcesSize
                : props.pageSize}{" "}
              de {props.resourcesSize}{" "}
            </span>
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <a onClick={previousPage}>{props.pageNumber !== 1 ? "<" : ""}</a>
            {pages.map((page) => {
              return (
                <a
                  key={page}
                  className={
                    page === props.pageNumber
                      ? styles.numberPaginatorActive
                      : styles.numberPaginator
                  }
                  onClick={() => props.setPageNumber(page)}
                >
                  {" "}
                  {page}{" "}
                </a>
              );
            })}
            <a onClick={nextPage}>
              {+props.pageNumber < +pages[pages.length - 1] ? ">" : ""}
            </a>
          </div>
          <div className="col-md-4 d-flex justify-content-end ">
            <span>Resultados por pagina</span>
            <select
              className="ml-3"
              onChange={(e) => toglePageSize(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

interface IProps {
  title: string;
  resources: Record<string, string | number>[];
  resourcesSize: number;
  rows: { value: string; label: string; type?: string; width?: string }[];
  buttonLabel?: string;
  pageNumber: number;
  setPageNumber: void | any;
  sortOrder: string;
  setSortField: void | any;
  sortField: string;
  setSortOrder: void | any;
  showDeleted: boolean;
  setShowDeleted: void | any;
  pageSize: number;
  setPageSize: void | any;
  offset: number;
  setOffset: void | any;
  setRegister: void | any;
  setResourceSelected: void | any;
  deleteFunction: void | any;
}
