// 🔹 Input separado (NO se recrea en cada render)
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col">
    <label className="text-sm text-slate-300 mb-1">{label}</label>
    <input
      name={name}
      type={type}
      value={value ?? ""}
      onChange={onChange}
      className="bg-slate-900 p-2 rounded"
    />
  </div>
);

export default function EditForm({
  form,
  tipo,
  handleChange,
  handleSubmit,
}) {
  if (!form?.id) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 p-4 rounded mb-6 grid grid-cols-2 gap-4"
    >
      {/* 🔹 ID */}
      <div className="flex flex-col">
        <label className="text-sm text-slate-300 mb-1">ID</label>
        <input
          name="id"
          value={form.id ?? ""}
          disabled
          className="bg-slate-700 p-2 rounded"
        />
      </div>

      {/* 🔹 CAMPOS GENERALES */}
      <InputField label="Nombres" name="nombres" value={form.nombres} onChange={handleChange} />
      <InputField label="Apellidos" name="apellidos" value={form.apellidos} onChange={handleChange} />
      <InputField label="Edad" name="edad" type="number" value={form.edad} onChange={handleChange} />

      {/* 🔹 DOCTOR */}
      {tipo === "doctors" && (
        <>
          <InputField label="Especialidad" name="especialidad" value={form.especialidad} onChange={handleChange} />
          <InputField label="Años de experiencia" name="experiencia" type="number" value={form.experiencia} onChange={handleChange} />
          <InputField label="Hospital ID" name="hospitalId" type="number" value={form.hospitalId} onChange={handleChange} />
        </>
      )}

      {/* 🔹 ENFERMERO */}
      {tipo === "enfermeros" && (
        <>
          <InputField label="Años de experiencia" name="experiencia" type="number" value={form.experiencia} onChange={handleChange} />
          <InputField label="Hospital ID" name="hospitalId" type="number" value={form.hospitalId} onChange={handleChange} />
        </>
      )}

      {/* 🔹 PACIENTE */}
      {tipo === "pacientes" && (
        <>
          <InputField label="Fecha de nacimiento" name="fNacimiento" type="date" value={form.fNacimiento} onChange={handleChange} />
          <InputField label="Descripción" name="descripcion" value={form.descripcion} onChange={handleChange} />
          <InputField label="Doctor asignado" name="doctorId" value={form.doctorId} onChange={handleChange} />
          <InputField label="Habitación" name="habitacion" type="number" value={form.habitacion} onChange={handleChange} />
        </>
      )}

      {/* 🔹 BOTÓN */}
      <button className="bg-blue-600 p-2 rounded col-span-2 mt-2">
        Guardar cambios
      </button>
    </form>
  );
}