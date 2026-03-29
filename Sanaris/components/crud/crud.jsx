"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Activity } from "lucide-react";

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
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
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

  const handleEdit = (item) => {
    //console.log(item);
    setForm(item)
  };

  const handleDelete = async (id) => {
    await fetch(`${endpoints[tipo]}/${id}`, { method: "DELETE" });
    loadData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${endpoints[tipo]}/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({});
    loadData();
  };

  const tipoLabel = {
    doctors: "Médicos",
    enfermeros: "Enfermeros",
    pacientes: "Pacientes",
  };

  return (
    <div
      className="min-h-screen text-white p-6"
      style={{
        background: "linear-gradient(160deg, hsl(215, 65%, 18%), hsl(215, 55%, 30%), hsl(175, 40%, 35%))",
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">SANARIS</h1>
            <p className="text-white/60 text-sm">Gestión de Personal — Clínica Siloé</p>
          </div>
        </div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          ← Volver
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {Object.entries(tipoLabel).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTipo(key)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: tipo === key ? "hsl(175, 45%, 45%)" : "rgba(255,255,255,0.1)",
              color: "white",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div
        className="rounded-2xl p-6 space-y-6"
        style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(10px)" }}
      >
        <Filters
          tipo={tipo}
          setTipo={setTipo}
          filtro={filtro}
          setFiltro={setFiltro}
          search={search}
          setSearch={setSearch}
          setForm={setForm}
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

      <p className="text-center text-white/30 text-xs mt-8">
        © 2026 SANARIS — ITM Medellín
      </p>
    </div>
  );
}