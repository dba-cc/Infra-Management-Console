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
    public class AutoBackupController : ApiController
    {
        SqlConnection Con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();
        DateTime datetime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

        [HttpPost]
        public HttpResponseMessage AutoBackupDatabase(BackUp Obj)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("AutoBackupDatabase", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@DatabaseName", Obj.database);
                cmd.Parameters.AddWithValue("@BackupLocation", Obj.location);
                cmd.Parameters.AddWithValue("@Frequency", Obj.frequency);
                cmd.Parameters.AddWithValue("@BackupType", Obj.type);
                cmd.Parameters.AddWithValue("@BackupTime", Obj.time);
                cmd.Parameters.AddWithValue("@DayForWeeklyBackup", Obj.day);
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
