using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WWWebAPI.Models
{
    public class OrderDatabase
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int AlfredoPasta { get; set; }
        public int DoublePattyBurger { get; set; }
        public int FajitaPizza { get; set; }
        public int MorocconSeafoodPizza { get; set; }
        public int VeganBurger { get; set; }
        public int FishBurger { get; set; }
        public int Fries { get; set; }
        public int Drinks { get; set;}
    }
}