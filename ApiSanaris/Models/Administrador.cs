using System;
using System.Collections.Generic;

namespace ApiSanaris.Models;

public partial class Administrador
{
    public int Id { get; set; }

    public string Nombres { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public string Correo { get; set; } = null!;
}
