using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiSanaris.Models;
using ApiSanaris.DTOs;

namespace ApiSanaris.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PacientesController : ControllerBase
    {
        private readonly SanarisContext _context;

        public PacientesController(SanarisContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var data = await _context.Pacientes
                .Include(p => p.DoctorNavigation)
                .Select(p => new PacienteDTO
                {
                    Id = p.Id,
                    Nombres = p.Nombres,
                    Apellidos = p.Apellidos,
                    FNacimiento = p.FNacimiento,
                    Edad = p.Edad,
                    Descripcion = p.Descripcion,
                    Doctor = p.DoctorNavigation != null
                        ? p.DoctorNavigation.Nombres
                        : "Sin asignar",
                    DoctorId = p.DoctorNavigation != null
                        ? p.DoctorNavigation.Id
                        : null,
                    Habitacion = p.Habitacion
                })
                .ToListAsync();

            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Create(PacientePostDTO dto)
        {
            var entity = new Paciente
            {
                Nombres = dto.Nombres,
                Apellidos = dto.Apellidos,
                FNacimiento = dto.FNacimiento,
                Edad = dto.Edad,
                Descripcion = dto.Descripcion,
                Doctor = dto.DoctorId,
                Habitacion = dto.Habitacion
            };

            _context.Pacientes.Add(entity);
            await _context.SaveChangesAsync();

            return Ok(entity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PacientePostDTO dto)
        {
            var entity = await _context.Pacientes.FindAsync(id);

            if (entity == null) return NotFound();

            entity.Nombres = dto.Nombres;
            entity.Apellidos = dto.Apellidos;
            entity.FNacimiento = dto.FNacimiento;
            entity.Edad = dto.Edad;
            entity.Descripcion = dto.Descripcion;
            entity.Doctor = dto.DoctorId;
            entity.Habitacion = dto.Habitacion;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _context.Pacientes.FindAsync(id);

            if (entity == null) return NotFound();

            _context.Pacientes.Remove(entity);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}