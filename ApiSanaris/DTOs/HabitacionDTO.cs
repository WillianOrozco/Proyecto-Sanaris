namespace ApiSanaris.DTOs
{
    public class HabitacionDTO
    {
        public int Id { get; set; }
        public int Area { get; set; }
        public int Piso { get; set; }
        public int Numero { get; set; }
        public int Capacidad { get; set; }

        public int HospitalId { get; set; }
        public string HospitalNombre { get; set; } = string.Empty;

        public string Tipo { get; set; } = string.Empty;
        public string Estado { get; set; } = string.Empty;
    }
}