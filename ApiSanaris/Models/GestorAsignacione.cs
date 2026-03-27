using System;
using System.Collections.Generic;

namespace ApiSanaris.Models;

public partial class GestorAsignacione
{
    public int Id { get; set; }

    public string Estrategia { get; set; } = null!;

    public int Solicitud { get; set; }

    public int Habitacion { get; set; }

    public DateTime FechaEjecucion { get; set; }

    public string? Alerta { get; set; }

    public virtual Habitacion HabitacionNavigation { get; set; } = null!;

    public virtual Solicitud SolicitudNavigation { get; set; } = null!;
}
