"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const endpoints = {
  doctors: "http://localhost:5255/api/Doctors",
  enfermeros: "http://localhost:5255/api/Enfermeros",
  pacientes: "http://localhost:5255/api/Pacientes",
};

export default function GestionGeneral() {
  const router = useRouter();

  const [tipo, setTipo] = useState("doctors");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("nombre");

  const [form, setForm] = useState({});

  // 🔥 Cargar datos
  const loadData = async () => {
    const res = await fetch(endpoints[tipo]);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    loadData();
  }, [tipo]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 FILTROS AVANZADOS
  const filtered = data.filter((item) => {
    const text = search.toLowerCase();

    if (filtro === "id") {
      return item.id?.toString().includes(text);
    }

    if (filtro === "nombre") {
      return (
        (item.nombres || "").toLowerCase().includes(text) ||
        (item.apellidos || "").toLowerCase().includes(text)
      );
    }

    if (filtro === "extra") {
      return (
        (item.especialidad || "").toLowerCase().includes(text) ||
        (item.doctor || "").toLowerCase().includes(text) ||
        (item.experiencia || "").toString().toLowerCase().includes(text)
      );
    }

    return true;
  });

  // 🔥 EDITAR
  const handleEdit = (item) => {
    setForm(item);
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {
    await fetch(`${endpoints[tipo]}/${id}`, {
      method: "DELETE",
    });
    loadData();
  };

  // 🔥 UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.id) return;

    await fetch(`${endpoints[tipo]}/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({});
    loadData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6">
      <div className="max-w-7xl mx-auto">

        <button
          onClick={() => router.back()}
          className="mb-4 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded"
        >
          ← Volver
        </button>

        <h1 className="text-3xl font-bold mb-6">Gestión General</h1>

        {/* 🔽 SELECTORES */}
        <div className="flex gap-3 mb-6">
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
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
            <option value="nombre">Nombre / Apellido</option>
            <option value="extra">
              {tipo === "doctors" && "Especialidad"}
              {tipo === "enfermeros" && "Experiencia"}
              {tipo === "pacientes" && "Doctor"}
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

        {/* ✏️ FORM EDIT */}
        {form.id && (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-800 p-4 rounded mb-6 grid grid-cols-2 gap-3"
          >
            <input
              name="nombres"
              value={form.nombres || ""}
              onChange={handleChange}
              placeholder="Nombres"
              className="bg-slate-900 p-2 rounded"
            />
            <input
              name="apellidos"
              value={form.apellidos || ""}
              onChange={handleChange}
              placeholder="Apellidos"
              className="bg-slate-900 p-2 rounded"
            />

            {tipo === "doctors" && (
              <input
                name="especialidad"
                value={form.especialidad || ""}
                onChange={handleChange}
                placeholder="Especialidad"
                className="bg-slate-900 p-2 rounded"
              />
            )}

            {tipo === "enfermeros" && (
              <input
                name="experiencia"
                value={form.experiencia || ""}
                onChange={handleChange}
                placeholder="Experiencia"
                className="bg-slate-900 p-2 rounded"
              />
            )}

            <button className="bg-blue-600 p-2 rounded col-span-2">
              Guardar cambios
            </button>
          </form>
        )}

        {/* 📊 TABLA */}
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
                <tr key={item.id} className="border-t border-slate-700 text-center">

                  <td className="p-3">{item.id}</td>

                  <td className="p-3">{item.nombres}</td>

                  <td className="p-3">{item.apellidos}</td>

                  <td className="p-3">
                    {tipo === "doctors" && item.especialidad}
                    {tipo === "enfermeros" && item.experiencia}
                    {tipo === "pacientes" && item.doctor}
                  </td>

                  <td className="p-3 flex gap-2">
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
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="p-4 text-center text-slate-400">
              No hay resultados
            </p>
          )}
        </div>
      </div>
    </div>
  );
}