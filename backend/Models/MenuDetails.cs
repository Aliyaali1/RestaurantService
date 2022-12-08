using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WWWebAPI.Models
{
    public class MenuDetails
    {
        public int ID { get; set; }
        public string FoodName { get; set; }
        public int Price { get; set; }
        public string ImageURL { get; set; }
        public int amount { get; set; }
    }
}