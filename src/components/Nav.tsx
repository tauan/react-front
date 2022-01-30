import Link from "next/link";

export default function Nav({ pathRoute }) {
  const routes: IRoute[] = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/desenvolvedor",
      label: "Desenvolvedor",
    },
    {
      path: "/nivel",
      label: "Nível",
    },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        ♥ GAZIN TECH ♥
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {routes?.map((route) => {
            return (
              <Link href={route.path} key={route.path}>
                <a
                  className={`nav-item nav-link ${
                    route.path === pathRoute ? "active" : ""
                  }`}
                >
                  {route.label}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

interface IRoute {
  path: string;
  label: string;
}
