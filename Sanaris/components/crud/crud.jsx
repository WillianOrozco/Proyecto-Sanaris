"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Filters from "@/components/crud/filters";
import EditForm from "@/components/crud/editForm";
import DataTable from "@/components/crud/dataTable";
import { useFetchData } from "@/components/crud/useFetchData";

const endpoints = {
  doctors: "http://localhost:5255/api/Doctors",
  enfermeros: "http://localhost:5255/api/Enfermeros",
  pacientes: "http://localhost:5255/api/Pacientes",
};

export default function GestionGeneral() {
  const router = useRouter();

  const [tipo, setTipo] = useState("doctors");
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("nombre");
  const [form, setForm] = useState({});

  const { data, loadData } = useFetchData(tipo, endpoints);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const filtered = data.filter((item) => {
    const text = search.toLowerCase();

    if (filtro === "id") return item.id?.toString().includes(text);

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

  const handleEdit = (item) => setForm(item);

  const handleDelete = async (id) => {
    await fetch(`${endpoints[tipo]}/${id}`, { method: "DELETE" });
    loadData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
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
      <button onClick={() => router.back()} className="mb-4 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded" >
        ← Volver
      </button>

      <Filters
        tipo={tipo}
        setTipo={setTipo}
        filtro={filtro}
        setFiltro={setFiltro}
        search={search}
        setSearch={setSearch}
      />

      <EditForm
        form={form}
        tipo={tipo}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <DataTable
        filtered={filtered}
        tipo={tipo}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}