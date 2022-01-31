import Link from "next/link";
import { useEffect, useState } from "react";
import { BaseService } from "../services/base-service";

export default function Home() {
  const nivelService = new BaseService("nivel");
  const desenvolvedorService = new BaseService("desenvolvedor");

  const [niveis, setNiveis] = useState(0);
  const [devs, setDevs] = useState(0);
  useEffect(() => {
    nivelService.count().then((response) => setNiveis(+response));
    desenvolvedorService.count().then((response) => setDevs(+response));
  }, []);
  return (
    <div className="row">
      <div className="constainer-painel">
        <Link href="/nivel">
          <div className="painel">
            <div className="painel-count">{niveis}</div>
            <div className="painel-title">Niveis cadastrados</div>
          </div>
        </Link>

        <Link href="/desenvolvedor">
          <div className="painel">
            <div
              className="painel-count"
              style={{ backgroundColor: "#ffc107", color: "#333" }}
            >
              {devs}
            </div>
            <div
              className="painel-title"
              style={{ backgroundColor: "#ffd557", color: "#333" }}
            >
              Desenvolvedores cadastrados
            </div>
          </div>
        </Link>
      </div>
      <div className="header-container">
        <div className="logo" /> Dashbord do teste da Gazin Tech ♥
      </div>
    </div>
  );
}
