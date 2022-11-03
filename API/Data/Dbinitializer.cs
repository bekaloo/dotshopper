using System.Collections.Generic;
using System.Linq;
using API.Entities;

namespace API.Data
{
    public static class Dbinitializer
    {
        public static void Initialize(StoreContext context)
        {
            if (context.Products.Any())
            {
                return;
            }

            var products = new List<Product>{
            new Product {
                Name = "shampoo",
                    Brand = "Head and Shoulders",
                    Price = 300,
                    PictureUrl = "shampoo.get.com",
                    Inventory = 100,
                    Description = "Anti dandruff shampoo",
                    Type = "Cosmetics"
            },
            new Product {
                Name = "Shoes",
                    Brand = "Nike",
                    Price = 3000,
                    PictureUrl = "Nike.get.com",
                    Inventory = 150,
                    Description = "Sneakers",
                    Type = "Apparel"
            }
        };
        foreach (var  product in products)
        {
            context.Products.Add(product);
        }
        context.SaveChanges();
        }
    }
}