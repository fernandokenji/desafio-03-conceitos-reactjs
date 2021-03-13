import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [reposi, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((resp) => {
      setRepositories(resp.data);
    });
  }, []);

  async function handleAddRepository() {
    const resp = await api.post('repositories', {
      title: "EJC",
      url: "https://github.com/Rocketseat/umbriel",
      techs: ["Node.js", "ReactJs"],
    });

    setRepositories([...reposi, resp.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepos = reposi.filter((rep) => rep.id != id);
    setRepositories(newRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {reposi.map((reposi) => (
          <li key={reposi.id}>
            {reposi.title}
            <button onClick={() => handleRemoveRepository(reposi.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={() => handleAddRepository()}>Adicionar</button>
    </div>
  );
}

export default App;
