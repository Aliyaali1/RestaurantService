using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Configuration;

namespace WWWebAPI.Controllers
{
    public class OrderDatabaseController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"
                    select ID, Name, AlfredoPasta, DoublePattyBurger, FajitaPizza, MorocconSeafoodPizza, VeganBurger, FishBurger, Fries, Drinks
                    from dbo.OrderDataBase
                    ";

            DataTable table = new DataTable();

            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["iptprojectAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);


        }
    }
}