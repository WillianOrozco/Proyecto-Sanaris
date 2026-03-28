import TableRow from "./tableRow";

export default function DataTable({ filtered, tipo, handleEdit, handleDelete }) {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-700">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Nombre</th>
            <th className="p-3">Apellido</th>
            <th className="p-3">
              {tipo === "doctors" && "Especialidad"}
              {tipo === "enfermeros" && "Experiencia"}
              {tipo === "pacientes" && "Doctor"}
            </th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item) => (
            <TableRow
              key={item.id}
              item={item}
              tipo={tipo}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="p-4 text-center text-slate-400">
          No hay resultados
        </p>
      )}
    </div>
  );
}