using System;
using System.Collections.Generic;

namespace ApiSanaris.Models;

public partial class Doctor
{
    public int Id { get; set; }

    public string Nombres { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public int Edad { get; set; }

    public int Hospital { get; set; }

    public string Especialidad { get; set; } = null!;

    public int Experiencia { get; set; }

    public virtual ICollection<Cronograma> Cronogramas { get; set; } = new List<Cronograma>();

    public virtual Hospital HospitalNavigation { get; set; } = null!;

    public virtual ICollection<Paciente> Pacientes { get; set; } = new List<Paciente>();
}
