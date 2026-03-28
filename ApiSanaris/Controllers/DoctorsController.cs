using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiSanaris.Models;
using ApiSanaris.DTOs;

namespace ApiSanaris.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorsController : ControllerBase
    {
        private readonly SanarisContext _context;

        public DoctorsController(SanarisContext context)
        {
            _context = context;
        }

        // 🔍 GET: api/doctors
        [HttpGet]
        public async Task<ActionResult> GetDoctors()
        {
            var doctors = await _context.Doctors
                .Include(d => d.HospitalNavigation)
                .Select(d => new DoctorDTO
                {
                    Id = d.Id,
                    Nombres = d.Nombres,
                    Apellidos = d.Apellidos,
                    Edad = d.Edad,
                    Especialidad = d.Especialidad,
                    Experiencia = d.Experiencia,
                    HospitalNombre = d.HospitalNavigation.Nombres,
                    HospitalId = d.HospitalNavigation.Id
                })
                .ToListAsync();

            return Ok(doctors);
        }

        // 🔍 GET: api/doctors/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetDoctor(int id)
        {
            var doctor = await _context.Doctors
                .Include(d => d.HospitalNavigation)
                .Where(d => d.Id == id)
                .Select(d => new DoctorDTO
                {
                    Id = d.Id,
                    Nombres = d.Nombres,
                    Apellidos = d.Apellidos,
                    Edad = d.Edad,
                    Especialidad = d.Especialidad,
                    Experiencia = d.Experiencia,
                    HospitalNombre = d.HospitalNavigation.Nombres,
                    HospitalId = d.HospitalNavigation.Id
                })
                .FirstOrDefaultAsync();

            if (doctor == null)
                return NotFound();

            return Ok(doctor);
        }

        // ➕ POST: api/doctors
        [HttpPost]
        public async Task<IActionResult> CreateDoctor(DoctorPostDTO dto)
        {
            var doctor = new Doctor
            {
                Nombres = dto.Nombres,
                Apellidos = dto.Apellidos,
                Edad = dto.Edad,
                Hospital = dto.HospitalId,
                Especialidad = dto.Especialidad,
                Experiencia = dto.Experiencia
            };

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return Ok(doctor);
        }

        // ✏️ PUT: api/doctors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, DoctorPostDTO dto)
        {
            var doctor = await _context.Doctors.FindAsync(id);

            if (doctor == null)
                return NotFound();

            doctor.Nombres = dto.Nombres;
            doctor.Apellidos = dto.Apellidos;
            doctor.Edad = dto.Edad;
            doctor.Hospital = dto.HospitalId;
            doctor.Especialidad = dto.Especialidad;
            doctor.Experiencia = dto.Experiencia;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ❌ DELETE: api/doctors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);

            if (doctor == null)
                return NotFound();

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}