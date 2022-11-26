import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {
  const id = selectedEmployee.id;

  const [horaSaida, setHoraSaida] = useState(selectedEmployee.horaSaida);
  const [custo, setCusto] = useState(selectedEmployee.custo);
  const [token, setToken] = useState(selectedEmployee.token);
  const [data, setData] = useState(selectedEmployee.data);
  const [horaEntr, setHoraEntr] = useState(selectedEmployee.horaEntr);
  

  const handleUpdate = e => {
    e.preventDefault();
    console.log(horaSaida.replace(/\D/g, ""), horaEntr.replace(/\D/g, ""))
    var custo = (horaSaida.replace(/\D/g, "") - horaEntr.replace(/\D/g, ""));
    custo = 10 * (custo/100);
    setCusto(custo);
    const employee = {
      id,
      horaSaida,
      token,
      data,
      horaEntr,
      custo
    };

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        employees.splice(i, 1, employee);
        break;
      }
    }

    localStorage.setItem('employees_data', JSON.stringify(employees));
    setEmployees(employees);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Marcar Hora de Saida</h1>
        <label htmlFor="token">Token</label>
        <input
          id="token"
          type="text"
          name="token"
          defaultValue={token}
          readOnly
          onMouseOver={e => setToken(e.target.defaultValue)}
        />
        <label htmlFor="data">Data</label>
        <input
          id="data"
          type="date"
          name="data"
          readOnly
          defaultValue={data}
          onMouseOver={e => setData(e.target.defaultValue)}
        />
        <label htmlFor="horaEntr">Hora Entrada</label>
        <input
          id="horaEntr"
          type="time"
          name="horaEntr"
          readOnly
          defaultValue={horaEntr}
          onMouseOver={e => setHoraEntr(e.target.defaultValue)}
        />
        <label htmlFor="horaSaida">Hora de Saida</label>
        <input
          id="horaSaida"
          type="time"
          name="horaSaida"
          value={horaSaida}
          onChange={e => setHoraSaida(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
