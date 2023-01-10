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
        public HttpResponseMessage AutoBackupDatabase([FromBody] String Obj)
        {
            try
            {
                String[] str = Obj.Split(' ');
                string name = Convert.ToString(str[0]);
                string location = Convert.ToString(str[1]);
                string frequency = Convert.ToString(str[2]);
                string type = Convert.ToString(str[3]);
                DateTime time = DateTime.Parse(str[4]);
                string day = Convert.ToString(str[5]);

                SqlCommand cmd = new SqlCommand("AutoBackupDatabase", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@DatabaseName", name);
                cmd.Parameters.AddWithValue("@BackupLocation", location);
                cmd.Parameters.AddWithValue("@Frequency", frequency);
                cmd.Parameters.AddWithValue("@BackupType", type);
                cmd.Parameters.AddWithValue("@BackupTime", time);
                cmd.Parameters.AddWithValue("@DayForWeeklyBackup", day);
                cmd.ExecuteNonQuery();
                Con.Close();
                return Return.returnHttp("200", "AutoBackup Scheduled.", null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
    }
}
