using System;
using System.Collections.Generic;

namespace ApiSanaris.Models;

public partial class Paciente
{
    public int Id { get; set; }

    public string Nombres { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public DateOnly FNacimiento { get; set; }

    public int Edad { get; set; }

    public string? Descripcion { get; set; }

    public int? Doctor { get; set; }

    public int? Habitacion { get; set; }

    public virtual Doctor? DoctorNavigation { get; set; }

    public virtual ICollection<EnfermeroPaciente> EnfermeroPacientes { get; set; } = new List<EnfermeroPaciente>();

    public virtual Habitacion? HabitacionNavigation { get; set; }

    public virtual ICollection<Solicitud> Solicituds { get; set; } = new List<Solicitud>();
}
