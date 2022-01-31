export class BaseService<T> {
  constructor(private endpoint: T) {}

  async count(params?) {
    return await fetch(
      `http://localhost:4000/${this.endpoint}/count${this.getQueryString(
        params
      )}`,
      params
    )
      .then((response) => response.json())
      .catch((err) => {
        return;
      })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        alert("Erro");
        console.log(e);
      });
  }

  async findAll(params?) {
    return await fetch(
      `http://localhost:4000/${this.endpoint}${this.getQueryString(params)}`
    )
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
        return;
      })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        alert("Erro 2");
        console.log(e);
      });
  }

  async save(dto) {
    return await fetch(
      `http://localhost:4000/${this.endpoint}${dto?.id ? "/" + dto?.id : ""}`,
      {
        method: dto?.id ? "PATCH" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
      }
    )
      .then((response) => response.json())
      .catch((err) => {})
      .then((response) => {
        return response;
      })
      .catch((e) => {
        alert("Erro");
        console.log(e);
      });
  }

  async softDelete(dto) {
    if (dto?.id) {
      return await fetch(`http://localhost:4000/${this.endpoint}/${dto.id}`, {
        method: "DELETE",
        body: JSON.stringify(dto),
      }).then((response) => response.json());
    }
  }

  private getQueryString(params) {
    let queryText: string = "";
    if (params) {
      Object.keys(params)?.forEach((param, index) => {
        if (index === 0) {
          queryText = `?${param}=${params[param]}`;
        } else {
          queryText = `${queryText}&${param}=${params[param]}`;
        }
      });
    }

    return queryText;
  }
}
