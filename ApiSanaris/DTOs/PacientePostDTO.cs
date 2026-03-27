namespace ApiSanaris.DTOs
{
    public class PacientePostDTO
    {
        public int Id { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public DateOnly FNacimiento { get; set; }
        public int Edad { get; set; }
        public string? Descripcion { get; set; }
        public int? Doctor { get; set; }
        public int? Habitacion { get; set; }
    }
}
