namespace ApiSanaris.DTOs
{
    public class EnfermeroPostDTO
    {
        public int Id { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public int Edad { get; set; }
        public int Experiencia { get; set; }

        public int Hospital { get; set; }
    }
}