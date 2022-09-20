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
        public HttpResponseMessage GetTable(Database db)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("tableget", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbname", db.name);
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<Database> TableList = new List<Database>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Database table = new Database();
                        table.name = Convert.ToString(Dt.Rows[i]["table_name"]);
                        TableList.Add(table);
                    }
                }
                return Return.returnHttp("200", TableList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
    }
}
