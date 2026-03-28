namespace ApiSanaris.DTOs
{
    public class DoctorDTO
    {
        public int Id { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public int Edad { get; set; }
        public string Especialidad { get; set; }
        public int Experiencia { get; set; }

        public string HospitalNombre { get; set; }
        public int HospitalId { get; set; }
    }
}
