using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {

        public int Id { get; set; }
        public int Quantity { get; set; }
        // Navigation Properties
        public int ProductId { get; set; }
        public Product Product { get; set; }

        // Fully defining relationship between a basket and a basket item 
        // so that orphan basket items won't exist(basket items will be removed if their corresponding basket has been removed)
        public int BasketId { get; set; }
        public Basket Basket { get; set; }


    }
}