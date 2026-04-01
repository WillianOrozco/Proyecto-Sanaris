using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiSanaris.Models;

namespace ApiSanaris.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HabitacionController : ControllerBase
    {
        private readonly SanarisContext _context;

        public HabitacionController(SanarisContext context)
        {
            _context = context;
        }

        // GET: api/habitacion
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.Habitacions.ToListAsync());
        }

        // GET: api/habitacion/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var habitacion = await _context.Habitacions.FindAsync(id);
            if (habitacion == null) return NotFound();
            return Ok(habitacion);
        }

       // POST: api/habitacion
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] HabitacionDTO habitacion)
        {
            var nueva = new Habitacion
            {
                Area      = habitacion.Area,
                Piso      = habitacion.Piso,
                Numero    = habitacion.Numero,
                Capacidad = habitacion.Capacidad,
                Hospital  = habitacion.Hospital,
                Tipo      = habitacion.Tipo,
                Estado    = habitacion.Estado,
            };
            _context.Habitacions.Add(nueva);
            await _context.SaveChangesAsync();
            return Ok(nueva);
        }

        // PUT: api/habitacion/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] HabitacionDTO habitacion)
        {
            var existente = await _context.Habitacions.FindAsync(id);
            if (existente == null) return NotFound();

            existente.Area      = habitacion.Area;
            existente.Piso      = habitacion.Piso;
            existente.Numero    = habitacion.Numero;
            existente.Capacidad = habitacion.Capacidad;
            existente.Hospital  = habitacion.Hospital;
            existente.Tipo      = habitacion.Tipo;
            existente.Estado    = habitacion.Estado;

            await _context.SaveChangesAsync();
            return Ok(existente);
        }

        // DELETE: api/habitacion/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var habitacion = await _context.Habitacions.FindAsync(id);
            if (habitacion == null) return NotFound();
            _context.Habitacions.Remove(habitacion);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }

    public class HabitacionDTO
    {   
        public int Area      { get; set; }
        public int Piso      { get; set; }
        public int Numero    { get; set; }
        public int Capacidad { get; set; }
        public int Hospital  { get; set; }
        public string Tipo   { get; set; } = null!;
        public string Estado { get; set; } = null!;
    }
}