using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await RetrieveBasket();
            return MapBasket(basket);
        }



        [HttpPost]

        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            Basket basket = await RetrieveBasket();
            basket ??= CreateBasket();

            Product product = await _context.Products.FindAsync(productId);

            if (product == null)
            {
                return BadRequest(new ProblemDetails { Title = "Product Not Found" });
            }

            basket.AddItem(product, quantity);

            bool result = await _context.SaveChangesAsync() > 0;
            // add item
            // save changes
            return result ? CreatedAtRoute("GetBasket", MapBasket(basket)) : BadRequest(new ProblemDetails { Title = "Problem saving data" });
        }



        [HttpDelete]

        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // get basket
            Basket basket = await RetrieveBasket();

            if (basket == null)
            {
                return NotFound();
            }

            basket.RemoveItem(productId, quantity);
            bool result = await _context.SaveChangesAsync() > 0;
            return result ? Ok() : BadRequest(error: new ProblemDetails { Title = "Problem removing item from the basket" });
        }


        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(bitems => bitems.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            string buyerId = Guid.NewGuid().ToString();

            CookieOptions cookieOptions = new() { IsEssential = true, Expires = DateTime.Now.AddDays(30), SameSite = SameSiteMode.None, Secure = true };

            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            Basket basket = new() { BuyerId = buyerId };
            _ = _context.Baskets.Add(basket);

            return basket;
        }

        private static BasketDto MapBasket(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity

                }).ToList()
            };
        }
    }
}