import React, { useState } from 'react';
import Swal from 'sweetalert2';
import md5 from 'md5';

const random = md5(Math.floor(Math.random() * 6) + 1);
var today = new Date();
var currentDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(); 

const Add = ({ employees, setEmployees, setIsAdding }) => {
  const [token, setToken] = useState('');
  const [data, setData] = useState('');
  const [horaEntr, setHoraEntr] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    const id = employees.length + 1;
    const newEmployee = {
      id,
      token,
      data,
      horaEntr,
    };

    employees.push(newEmployee);
    localStorage.setItem('employees_data', JSON.stringify(employees));
    setEmployees(employees);
    setIsAdding(false);

    setToken(random);
    setData(currentDate);
    setHoraEntr(today.getHours() + ':' + today.getMinutes());

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `Adicionado com Sucesso !`,
      showConfirmButton: false,
      timer: 1500,
    });
  };


  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Adicionar </h1>
        <label htmlFor="token">Token</label>
        <input
          id="token"
          type="text"
          name="token"
          defaultValue={random}
          onMouseOver={e => setToken(e.target.defaultValue)}
        />
        <label htmlFor="data">Data</label>
        <input
          id="data"
          type="date"
          name="data"
          defaultValue={currentDate}
          onMouseOver={e => setData(e.target.defaultValue)}
        />
        <label htmlFor="horaEntr">Hora Entrada</label>
        <input
          id="horaEntr"
          type="time"
          name="horaEntr"
          defaultValue={today.getHours() + ':' + today.getMinutes()}
          onMouseOver={e => setHoraEntr(e.target.defaultValue)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
