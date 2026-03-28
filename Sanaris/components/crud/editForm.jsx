export default function EditForm({
  form,
  tipo,
  handleChange,
  handleSubmit,
}) {
  if (!form.id) return null;

  const InputField = ({ label, name, type = "text" }) => (
    <div className="flex flex-col">
      <label className="text-sm text-slate-300 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={form[name] || ""}
        onChange={handleChange}
        className="bg-slate-900 p-2 rounded"
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 p-4 rounded mb-6 grid grid-cols-2 gap-4"
    >
      {/* 🔹 CAMPOS GENERALES */}
      <div className="flex flex-col">
        <label className="text-sm text-slate-300 mb-1">ID</label>
        <input
          name="id"
          value={form.id || ""}
          disabled
          className="bg-slate-700 p-2 rounded"
        />
      </div>

      <InputField label="Nombres" name="nombres" />
      <InputField label="Apellidos" name="apellidos" />
      <InputField label="Edad" name="edad" type="number" />

      {/* 🔹 DOCTOR */}
      {tipo === "doctors" && (
        <>
          <InputField label="Especialidad" name="especialidad" />
          <InputField label="Años de experiencia" name="experiencia" type="number" />
          <InputField label="Hospital" name="hospital" type="number"/>
        </>
      )}

      {/* 🔹 ENFERMERO */}
      {tipo === "enfermeros" && (
        <>
          <InputField label="Años de experiencia" name="experiencia" type="number" />
          <InputField label="Hospital" name="hospitalId" />
        </>
      )}

      {/* 🔹 PACIENTE */}
      {tipo === "pacientes" && (
        <>
          <InputField label="Fecha de nacimiento" name="fNacimiento" type="date" />
          <InputField label="Descripción" name="descripcion" />
          <InputField label="Doctor asignado" name="doctor" />
          <InputField label="Habitación" name="habitacion" type="number" />
        </>
      )}

      {/* 🔹 BOTÓN */}
      <button className="bg-blue-600 p-2 rounded col-span-2 mt-2">
        Guardar cambios
      </button>
    </form>
  );
}