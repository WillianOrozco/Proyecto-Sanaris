export default function Filters({
  tipo,
  setTipo,
  filtro,
  setFiltro,
  search,
  setForm,
  setSearch,
}) {
  return (
    <div className="flex gap-3 mb-6">
      <select
        value={tipo}
        onChange={(e) => {
          setTipo(e.target.value);
          setForm({}); // 👈 cerrar form
        }}
        className="bg-slate-800 p-2 rounded"
      >
        <option value="doctors">Doctores</option>
        <option value="enfermeros">Enfermeros</option>
        <option value="pacientes">Pacientes</option>
      </select>

      <select
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="bg-slate-800 p-2 rounded"
      >
        <option value="id">ID</option>
        <option value="nombre">Nombre</option>
        <option value="extra">
          {tipo === "doctors" && "Especialidad"}
          {tipo === "enfermeros" && "Experiencia"}
          {tipo === "pacientes" && "Descripcion"}
        </option>
      </select>

      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 bg-slate-800 p-2 rounded"
      />
    </div>
  );
}