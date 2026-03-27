using System;
using System.Collections.Generic;

namespace ApiSanaris.Models;

public partial class Solicitud
{
    public int Id { get; set; }

    public string Tipo { get; set; } = null!;

    public int IdPaciente { get; set; }

    public int Prioridad { get; set; }

    public string? Descripcion { get; set; }

    public DateTime FechaHora { get; set; }

    public virtual ICollection<GestorAsignacione> GestorAsignaciones { get; set; } = new List<GestorAsignacione>();

    public virtual Paciente IdPacienteNavigation { get; set; } = null!;
}
