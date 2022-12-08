using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Configuration;
using WWWebAPI.Models;
using System.Diagnostics;
using System.Web.Http.Cors;
//using Microsoft.AspNetCore.Cors;
namespace WWWebAPI.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class MenuDetailsController : ApiController
    {
        
        public HttpResponseMessage Get()
        {
            string query = @"
                    select ID, FoodName, Price, ImageURL, amount
                    from dbo.MenuDetails
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

        public string Post(WWWebAPI.Models.MenuDetails obj)
        {
            try
            {
                string query = @"
                    INSERT INTO dbo.MenuDetails (FoodName, Price, ImageURL, amount)
                    VALUES('" + obj.FoodName + @"', '" + obj.Price + @"', '" + obj.ImageURL + @"' , '" + obj.amount + @"')
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

                return "Added Successfully";
            }

            catch (Exception)
            {
                return "Unsuccesful!";
            }

        }



        public string Put(WWWebAPI.Models.MenuDetails obj)
        {
            try
            {
                string query = @"
                    UPDATE dbo.MenuDetails
                    SET Price ='" + obj.Price + @"'
                    WHERE ID = " + obj.ID + @"
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

                return "Updated Successfully";
            }

            catch (Exception)
            {
                return "Unsuccesful!";
            }

        }
        
        public string Delete(int ID)
        {
            try
            {
                string query = @"
                    DELETE from dbo.MenuDetails
                    WHERE ID =" + ID + @"
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

                return "Deleted Successfully";
            }

            catch (Exception)
            {
                return "Failed Delete!";
            }

        }
    }


}
