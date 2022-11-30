import React from 'react';

const Table = ({ employees, handleEdit, handleDelete }) => {
  employees.forEach((employee, i) => {
    employee.id = i + 1;
  });

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>ID</th>
            <th className="text-center">Token</th>
            <th>Data</th>
            <th>Hora de Entrada</th>
            <th>Hora de Saída</th>
            <th>Custo</th>
            <th colSpan={2} className="text-center">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id}>
                <td>{i + 1}</td>
                <td>{employee.token}</td>
                <td>{employee.data}</td>
                <td>{employee.horaEntr}</td>
                <td>{employee.horaSaida}</td>
                <td>{formatter.format(employee.custo)}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="button muted-button"
                  >
                    Marcar hora de saida
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="button muted-button"
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>Sem registros</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
