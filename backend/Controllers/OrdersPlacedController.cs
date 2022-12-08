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
using Microsoft.AspNetCore.Cors;

namespace WWWebAPI.Controllers
{
    public class OrdersPlacedController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @"
                    select OID, Price
                    from dbo.OrdersPlaced
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

        public string Post(WWWebAPI.Models.OrdersPlaced obj)
        {
            try
            {
                string query = @"
                    INSERT INTO dbo.OrdersPlaced (Price)
                    VALUES('" + obj.Price + @"')
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

        public string Put(WWWebAPI.Models.OrdersPlaced obj)
        {
            try
            {
                string query = @"
                    UPDATE dbo.OrdersPlaced
                    SET Price ='" + obj.Price + @"'
                    WHERE OID = " + obj.OID + @"
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

        [EnableCors]
        public string Delete(int id)
        {
            try
            {
                Console.WriteLine("DELETE");
                string query = @"
                    DELETE from dbo.OrdersPlaced
                    WHERE OID =" + id + @"
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