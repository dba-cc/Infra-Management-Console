using MSUISApi.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace MSUISApi.Controllers
{
    public class DatabaseController : ApiController
    {
        SqlConnection Con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();
        DateTime datetime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

        [HttpPost]
        public HttpResponseMessage GetDatabase()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("DBGet", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<Database> DatabaseList = new List<Database>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Database database = new Database();
                        database.name = Convert.ToString(Dt.Rows[i]["name"]);
                        DatabaseList.Add(database);
                    }
                }
                return Return.returnHttp("200", DatabaseList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage GetDatabasewithNOC()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("DBGet_NoC", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<Database_NOC> DatabaseList = new List<Database_NOC>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Database_NOC database = new Database_NOC();
                        database.name = Convert.ToString(Dt.Rows[i]["name"]);
                        if ("1"==(Convert.ToString(Dt.Rows[i]["noc"])))
                            database.noc = "Active";
                        else
                            database.noc = "Inactive";
                       /* database.noc = Convert.ToInt64(Dt.Rows[i]["noc"]);*/
                        DatabaseList.Add(database);
                    }
                }
                return Return.returnHttp("200", DatabaseList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
    }
}
