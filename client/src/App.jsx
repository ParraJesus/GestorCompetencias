import "./App.css";
import { ProfesorCardClosed } from "./components/ProfesorCard";

function App() {
  return (
    <div className="App">
      <h1>hola, mundo</h1>
      <h2>hola, mundo</h2>
      <p>hola, mundo</p>
      <p className="texto-mayor">hola, mundo</p>
      <p className="texto-menor">hola, mundo</p>
      <div className="container">
        <ProfesorCardClosed
          nombre={"Melissa"}
          apellido={"Gugu"}
          documento={"1100000000"}
          tipoDocumento={"CC"}
          tipoDocente={"Planta"}
          ultimoTitulo={"Doctorado"}
          id={"001"}
          nombreUsuario={"mgu"}
          correoInstitucional={"mgo@unicauca.edu.co"}
        />
      </div>
    </div>
  );
}

export default App;
