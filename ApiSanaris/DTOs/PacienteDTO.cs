namespace ApiSanaris.DTOs
{
    public class PacienteDTO
    {
        public int Id { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public DateOnly FNacimiento { get; set; }
        public int Edad { get; set; }
        public string? Descripcion { get; set; }
        public string? Doctor { get; set; }
        public int? DoctorId { get; set; }
        public int? Habitacion { get; set; }
    }
}
