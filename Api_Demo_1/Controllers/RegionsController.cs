using Api_Demo_1.Data;
using Api_Demo_1.Model.Domain;
using Api_Demo_1.Model.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Demo_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionsController : ControllerBase
    {

        private readonly NzWalksDbContext dbContext;
        public RegionsController(NzWalksDbContext dbContext)
        {
            this.dbContext = dbContext;
        }



        [HttpGet]
        public IActionResult GetAll()
        {
            //without using DTO
            //var regions = dbContext.Regions.ToList();
            //return Ok(regions);

            var regionDomain = dbContext.Regions.ToList();

            var regionDto = new List<RegionDTO>();

            foreach (var region in regionDomain)
            {
                regionDto.Add(new RegionDTO()
                {
                    Id = region.Id,
                    Name = region.Name,
                    Code = region.Code,
                    RegionImageUrl = region.RegionImageUrl,
                });
            }
            return Ok(regionDto);



        }


        [HttpGet]
        [Route("{code}")]
        public IActionResult GetAllById( string code)
        {
           //var region=dbContext.Regions.Find(id);
           var region=dbContext.Regions.FirstOrDefault(x => x.Code == code );
            if (region == null)
            {
                return NotFound();
            }
            return Ok(region);
        }


        [HttpPost]
        public IActionResult Create(AddRegion addregion)
        {
            var addregiondomain = new Region
            {
                Code = addregion.Code,
                RegionImageUrl = addregion.RegionImageUrl,
                Name = addregion.Name,
            };

            dbContext.Regions.Add(addregiondomain);
            dbContext.SaveChanges();

            var regionDto = new RegionDTO
            {
                Code = addregiondomain.Code,
                RegionImageUrl = addregiondomain.RegionImageUrl,
                Name = addregiondomain.Name,
            };
            return CreatedAtAction(nameof(GetAllById), new {id=addregiondomain.Id},regionDto);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult Update(Guid id,UpdateDto update)
        {
            var reg = dbContext.Regions.Find(id);

            if(reg is null)
            {
                return NotFound();
            }
            reg.Name= update.Name;
            reg.RegionImageUrl= update.RegionImageUrl;
            reg.Code = update.Code;

            dbContext.SaveChanges();

            return Ok(reg);
        }


        [HttpPatch]
        [Route("{id:guid}")]
        public IActionResult Patch(Guid id, UpdateDto update)
        {
            var reg = dbContext.Regions.Find(id);

            if (reg == null)
            {
                return NotFound();
            }

            // only the name field will change 
            if (!string.IsNullOrEmpty(update.Name))
            {
                reg.Name = update.Name;
            }

          
           
             dbContext.SaveChanges();
         

            return Ok(reg);
        }


        [HttpDelete]
        [Route("{id:guid}")]

        public IActionResult Delete(Guid id)
        {
            var regions = dbContext.Regions.Find(id);


            if (regions is null)
            {
                return NotFound();
            }
            dbContext.Regions.Remove(regions);
            dbContext.SaveChanges();
            return Ok();


        }
    }
}
