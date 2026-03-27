using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiSanaris.Models;

namespace ApiSanaris.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HospitalController : ControllerBase
    {
        private readonly SanarisContext _context;

        public HospitalController(SanarisContext context)
        {
            _context = context;
        }

        // GET: api/hospital
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.Hospitals.ToListAsync());
        }

        // GET: api/hospital/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var hospital = await _context.Hospitals.FindAsync(id);
            if (hospital == null) return NotFound();

            return Ok(hospital);
        }

        // POST: api/hospital
        [HttpPost]
        public async Task<IActionResult> Post(Hospital hospital)
        {
            _context.Hospitals.Add(hospital);
            await _context.SaveChangesAsync();

            return Ok(hospital);
        }

        // PUT: api/hospital/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Hospital hospital)
        {
            if (id != hospital.Id) return BadRequest();

            _context.Entry(hospital).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(hospital);
        }

        // DELETE: api/hospital/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var hospital = await _context.Hospitals.FindAsync(id);
            if (hospital == null) return NotFound();

            _context.Hospitals.Remove(hospital);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}