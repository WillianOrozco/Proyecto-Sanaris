using ApiSanaris.DTOs;
using ApiSanaris.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiSanaris.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HabitacionController : ControllerBase
    {
        private readonly SanarisContext _context;

        public HabitacionController(SanarisContext context)
        {
            _context = context;
        }

        // 🔹 GET: api/Habitacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HabitacionDTO>>> GetHabitaciones()
        {
            var habitaciones = await _context.Habitacions
                .Select(h => new HabitacionDTO
                {
                    Id = h.Id,
                    Area = h.Area,
                    Piso = h.Piso,
                    Numero = h.Numero,
                    Capacidad = h.Capacidad,
                    HospitalNombre = h.HospitalNavigation != null
                        ? h.HospitalNavigation.Nombres
                        : "Sin asignar",
                    HospitalId = h.HospitalNavigation != null
                        ? h.HospitalNavigation.Id
                        : 0,
                    Tipo = h.Tipo,
                    Estado = h.Estado
                })
                .ToListAsync();

            return Ok(habitaciones);
        }

        // 🔹 GET: api/Habitacion/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HabitacionDTO>> GetHabitacion(int id)
        {
            var h = await _context.Habitacions.FindAsync(id);

            if (h == null) return NotFound();

            var dto = new HabitacionDTO
            {
                Id = h.Id,
                Area = h.Area,
                Piso = h.Piso,
                Numero = h.Numero,
                Capacidad = h.Capacidad,
                HospitalNombre = h.HospitalNavigation != null
                        ? h.HospitalNavigation.Nombres
                        : "Sin asignar",
                Tipo = h.Tipo,
                Estado = h.Estado
            };

            return Ok(dto);
        }

        // 🔹 POST: api/Habitacion
        [HttpPost]
        public async Task<ActionResult> PostHabitacion(HabitacionDTO dto)
        {
            var habitacion = new Habitacion
            {
                Area = dto.Area,
                Piso = dto.Piso,
                Numero = dto.Numero,
                Capacidad = dto.Capacidad,
                Hospital = dto.HospitalId,
                Tipo = dto.Tipo,
                Estado = dto.Estado
            };

            _context.Habitacions.Add(habitacion);
            await _context.SaveChangesAsync();

            return Ok(habitacion);
        }

        // 🔹 PUT: api/Habitacion/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHabitacion(int id, HabitacionDTO dto)
        {
            if (id != dto.Id) return BadRequest();

            var habitacion = await _context.Habitacions.FindAsync(id);

            if (habitacion == null) return NotFound();

            // 🔹 actualizar campos
            habitacion.Area = dto.Area;
            habitacion.Piso = dto.Piso;
            habitacion.Numero = dto.Numero;
            habitacion.Capacidad = dto.Capacidad;
            habitacion.Hospital = dto.HospitalId;
            habitacion.Tipo = dto.Tipo;
            habitacion.Estado = dto.Estado;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // 🔹 DELETE: api/Habitacion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHabitacion(int id)
        {
            var habitacion = await _context.Habitacions.FindAsync(id);

            if (habitacion == null) return NotFound();

            _context.Habitacions.Remove(habitacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}