using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using API.Data;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {

        private readonly StoreContext context;
        public ProductsController(StoreContext context)
        {
            this.context = context;

        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await context.Products.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            Product product = await context.Products.FindAsync(id);
            return product != null ? (ActionResult<Product>)Ok(product) : (ActionResult<Product>)NotFound();

        }
    }
}