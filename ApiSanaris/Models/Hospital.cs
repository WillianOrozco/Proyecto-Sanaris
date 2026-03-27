using System;
using System.Collections.Generic;

namespace ApiSanaris.Models;

public partial class Hospital
{
    public int Id { get; set; }

    public string Nombres { get; set; } = null!;

    public int FFundacion { get; set; }

    public int NEmpleados { get; set; }

    public string Direccion { get; set; } = null!;

    public int CPisos { get; set; }

    public int NHabitaciones { get; set; }

    public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();

    public virtual ICollection<Enfermero> Enfermeros { get; set; } = new List<Enfermero>();

    public virtual ICollection<Habitacion> Habitacions { get; set; } = new List<Habitacion>();
}
