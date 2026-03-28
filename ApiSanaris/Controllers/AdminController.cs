using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiSanaris.Models;
using ApiSanaris.DTOs;

namespace ApiSanaris.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly SanarisContext _context;

        public AdminController(SanarisContext context)
        {
            _context = context;
        }

        // 🔍 GET: api/administradores
        [HttpGet]
        public async Task<ActionResult> GetAdministradores()
        {
            var data = await _context.Administradors
                .Select(a => new AdminDTO
                {
                    Id = a.Id,
                    Nombres = a.Nombres,
                    Apellidos = a.Apellidos,
                    Correo = a.Correo
                })
                .ToListAsync();

            return Ok(data);
        }

        // 🔍 GET: api/administradores/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetAdministrador(int id)
        {
            var admin = await _context.Administradors
                .Where(a => a.Id == id)
                .Select(a => new AdminDTO
                {
                    Id = a.Id,
                    Nombres = a.Nombres,
                    Apellidos = a.Apellidos,
                    Correo = a.Correo
                })
                .FirstOrDefaultAsync();

            if (admin == null)
                return NotFound();

            return Ok(admin);
        }

        // ➕ POST: api/administradores
        [HttpPost]
        public async Task<IActionResult> CreateAdministrador(AdminDTO dto)
        {
            var admin = new Administrador
            {
                Nombres = dto.Nombres,
                Apellidos = dto.Apellidos,
                Correo = dto.Correo
            };

            _context.Administradors.Add(admin);
            await _context.SaveChangesAsync();

            return Ok(admin);
        }

        // ✏️ PUT: api/administradores/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAdministrador(int id, AdminDTO dto)
        {
            var admin = await _context.Administradors.FindAsync(id);

            if (admin == null)
                return NotFound();

            admin.Nombres = dto.Nombres;
            admin.Apellidos = dto.Apellidos;
            admin.Correo = dto.Correo;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ❌ DELETE: api/administradores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdministrador(int id)
        {
            var admin = await _context.Administradors.FindAsync(id);

            if (admin == null)
                return NotFound();

            _context.Administradors.Remove(admin);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}