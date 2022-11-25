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

            List<Product> products = new()
            {
            new Product {
                Name = "shampoo",
                    Brand = "Head and Shoulders",
                    Price = 300,
                    PictureUrl = "https://i.imgur.com/TLKVqLt.jpeg",
                    Inventory = 100,
                    Description = "Anti dandruff shampoo",
                    Type = "Cosmetics"
            },
            new Product {
                Name = "Shoes",
                    Brand = "Nike",
                    Price = 3000,
                    PictureUrl = "https://i.imgur.com/TLKVqLt.jpeg",
                    Inventory = 150,
                    Description = "Sneakers",
                    Type = "Apparel"
            }
        };
            foreach (Product product in products)
            {
                _ = context.Products.Add(product);
            }
            _ = context.SaveChanges();
        }
    }
}