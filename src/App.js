import React,{useEffect, useState} from "react";

import "./styles.css";

import api from "./services/api"

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('')
  const [techs, setTechs] = useState([]);
  const [tech, setTech] = useState('');

  async function handleGetListRepositories(){
    const response = await api.get('repositories')
    setRepositories(response.data)
  }

  useEffect(()=>{
    handleGetListRepositories()
  },[])

  async function handleAddRepository() {
    const data = {
      title,
      url,
      techs
    }
    const response = await api.post('repositories',data)
    setRepositories([...repositories,response.data])
  }

  async function handleRemoveRepository(id) {
    const filteredRepositories = repositories.filter((repository) => repository.id !== id);

    setRepositories(filteredRepositories);
     await api.delete(`repositories/${id}`)
  }

  function handleTech(){
    if(techs.length > 0){
      setTechs([...techs, tech])
    }
    if(techs.length === 0){
      setTechs([tech])
    }
    setTech("")
  }

  return (
    <div>
      <form onSubmit={handleAddRepository}>
        <label htmlFor="title">Titulo</label>
        <input 
          id="title" 
          type="text" 
          value={title} 
          onChange={(event)=>{setTitle(event.target.value)}}
          />
        <label htmlFor="title">URL</label>
        <input 
          id="title" 
          type="text" 
          value={url} 
          onChange={(event)=>{setUrl(event.target.value)}}
          />
        <label htmlFor="title">Tecnologias</label>
        <ul>
          {techs.map(technology => {
            return (
              <li key={technology}> {technology} </li>
            )
          })}
        </ul>
        <input 
          id="title" 
          type="text" 
          value={tech} 
          onChange={(event)=>{setTech(event.target.value)}}
          />
        <button className="techs" type="button" onClick={handleTech}>Adicionar tecnologia</button>

        <button type="submit">Adicionar</button>
      </form>
      <ul data-testid="repository-list">
        {repositories.length > 0 && repositories.map(repository => {
          return(
            <li key={repository.id}>
              {repository.title}
            
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
          </li>
          )
          
          })}
       
      </ul>

    </div>
  );
}

export default App;
