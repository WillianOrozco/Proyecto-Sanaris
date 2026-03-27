using System;
using System.Collections.Generic;

namespace ApiSanaris.Models;

public partial class Enfermero
{
    public int Id { get; set; }

    public string Nombres { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public int Edad { get; set; }

    public int Experiencia { get; set; }

    public int Hospital { get; set; }

    public virtual ICollection<EnfermeroPaciente> EnfermeroPacientes { get; set; } = new List<EnfermeroPaciente>();

    public virtual Hospital HospitalNavigation { get; set; } = null!;
}
