using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiSanaris.Models;
using ApiSanaris.DTOs;

namespace ApiSanaris.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnfermerosController : ControllerBase
    {
        private readonly SanarisContext _context;

        public EnfermerosController(SanarisContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var data = await _context.Enfermeros
                .Include(e => e.HospitalNavigation)
                .Select(e => new EnfermeroDTO
                {
                    Id = e.Id,
                    Nombres = e.Nombres,
                    Apellidos = e.Apellidos,
                    Edad = e.Edad,
                    Experiencia = e.Experiencia,
                    HospitalNombre = e.HospitalNavigation.Nombres
                })
                .ToListAsync();

            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Create(EnfermeroPostDTO dto)
        {
            var entity = new Enfermero
            {
                Nombres = dto.Nombres,
                Apellidos = dto.Apellidos,
                Edad = dto.Edad,
                Experiencia = dto.Experiencia,
                Hospital = dto.Hospital
            };

            _context.Enfermeros.Add(entity);
            await _context.SaveChangesAsync();

            return Ok(entity);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, EnfermeroPostDTO dto)
        {
            var entity = await _context.Enfermeros.FindAsync(id);

            if (entity == null) return NotFound();

            entity.Nombres = dto.Nombres;
            entity.Apellidos = dto.Apellidos;
            entity.Edad = dto.Edad;
            entity.Experiencia = dto.Experiencia;
            entity.Hospital = dto.Hospital;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entity = await _context.Enfermeros.FindAsync(id);

            if (entity == null) return NotFound();

            _context.Enfermeros.Remove(entity);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}