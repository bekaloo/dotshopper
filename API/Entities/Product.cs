namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public string Brand { get; set; }
        public string Description { get; set; }
        public int Inventory { get; set; }
        public long Price { get; set; }
    }
}

// DbContext manages connection with our database -- it can have one or more DbSet 
// DbSet represent Tables inside our database
// The database is queried using LINQ queries
// An example of a query ==> context.set.method ===> context.Products.ToList()  this LINQ query may translate to SELECT * from Products