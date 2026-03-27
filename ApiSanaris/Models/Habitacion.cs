using System;
using System.Collections.Generic;

namespace ApiSanaris.Models;

public partial class Habitacion
{
    public int Id { get; set; }

    public int Area { get; set; }

    public int Piso { get; set; }

    public int Numero { get; set; }

    public int Capacidad { get; set; }

    public int Hospital { get; set; }

    public string Tipo { get; set; } = null!;

    public string Estado { get; set; } = null!;

    public virtual ICollection<Cronograma> Cronogramas { get; set; } = new List<Cronograma>();

    public virtual ICollection<GestorAsignacione> GestorAsignaciones { get; set; } = new List<GestorAsignacione>();

    public virtual Hospital HospitalNavigation { get; set; } = null!;

    public virtual ICollection<Paciente> Pacientes { get; set; } = new List<Paciente>();
}
