export default function TableRow({ item, tipo, handleEdit, handleDelete }) {
  return (
    <tr className="border-t border-slate-700 text-center">
      <td className="p-3">{item.id}</td>
      <td className="p-3">{item.nombres}</td>
      <td className="p-3">{item.apellidos}</td>

      <td className="p-3">
        {tipo === "doctors" && item.especialidad}
        {tipo === "enfermeros" && item.experiencia}
        {tipo === "pacientes" && item.descripcion}
      </td>

      <td className="p-3 flex gap-2 justify-center">
        <button
          onClick={() => handleEdit(item)}
          className="bg-yellow-500 px-3 py-1 rounded"
        >
          Editar
        </button>

        <button
          onClick={() => handleDelete(item.id)}
          className="bg-red-600 px-3 py-1 rounded"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}