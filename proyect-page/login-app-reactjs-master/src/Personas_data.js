import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './person_data.css'; // Importa el archivo CSS

function Personas(props) {
  const [personData, setPersonData] = useState([]);
  const [newNames, setNewNames] = useState({}); // Objeto para almacenar los nuevos nombres por ID


  useEffect(() => {
    // Reemplaza 'localhost' con la dirección IP de tu servidor Flask
    const serverIp = '192.168.20.2'; // Ejemplo: '192.168.1.100'

    // Realiza una solicitud GET al servidor Flask para obtener los datos de las personas
    axios.get(`http://${serverIp}:8000/api/get_person_data`)
      .then(response => {
        setPersonData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleUpdatePerson = (id) => {
    const serverIp = '192.168.20.2'; // Ejemplo: '192.168.1.100'
    
    // Obtén el nuevo nombre de la persona según su ID desde el estado newNames
    const newName = newNames[id];

    // Realiza una solicitud PUT para actualizar el nombre de la persona con el ID proporcionado
    axios.put(`http://${serverIp}:8000/api/get_person_data`, {
      id: id,
      nombre: newName,
    })
      .then(response => {
        // Actualiza la lista de personas después de la modificación
        axios.get(`http://${serverIp}:8000/api/get_person_data`)
          .then(response => {
            setPersonData(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeletePerson = (id) => {
    const serverIp = '192.168.20.2'; // Ejemplo: '192.168.1.100'
    axios.delete(`http://${serverIp}:8000/api/get_person_data`, {
      data: { id: id },
    })
      .then(response => {
        // Actualiza la lista de personas después de la eliminación
        axios.get(`http://${serverIp}:8000/api/get_person_data`)
          .then(response => {
            setPersonData(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleNewNameChange = (id, value) => {
    // Actualiza el estado newNames con el nuevo nombre para la persona correspondiente
    setNewNames(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="App Personas">
      <h1>Personas en la Base de Datos:</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Foto</th>
            <th>Actualizar Nombre</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {personData.map((person, index) => (
            <tr key={index}>
              <td>{person.id}</td>
              <td>{person.nombre}</td>
              <td>
                {person.image && (
                  <img
                    src={`data:image/jpeg;base64,${person.image}`}
                    alt={`Foto de ${person.nombre}`}
                    style={{ width: '100px', height: 'auto' }}
                  />
                )}
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Nuevo Nombre"
                  value={newNames[person.id] || ''}
                  onChange={(e) => handleNewNameChange(person.id, e.target.value)}
                />
                <button onClick={() => handleUpdatePerson(person.id)}>Actualizar</button>
              </td>
              <td>
                <button onClick={() => handleDeletePerson(person.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Personas;
