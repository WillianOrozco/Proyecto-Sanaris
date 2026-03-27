using System;
using System.Collections.Generic;

namespace ApiSanaris.Models;

public partial class EnfermeroPaciente
{
    public int Id { get; set; }

    public int Paciente { get; set; }

    public int Enfermero { get; set; }

    public virtual Enfermero EnfermeroNavigation { get; set; } = null!;

    public virtual Paciente PacienteNavigation { get; set; } = null!;
}
