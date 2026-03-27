using System;
using System.Collections.Generic;

namespace ApiSanaris.Models;

public partial class Cronograma
{
    public int Id { get; set; }

    public DateOnly Fecha { get; set; }

    public TimeOnly HoraInicio { get; set; }

    public TimeOnly HoraFin { get; set; }

    public string Procedimiento { get; set; } = null!;

    public int Responsable { get; set; }

    public int Espacio { get; set; }

    public virtual Habitacion EspacioNavigation { get; set; } = null!;

    public virtual Doctor ResponsableNavigation { get; set; } = null!;
}
