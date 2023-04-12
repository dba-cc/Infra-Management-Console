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
        public HttpResponseMessage GetDBWithStates()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("GetDBWithStates", Con);
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
                        database.noc = Convert.ToString(Dt.Rows[i]["state_desc"]);
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
        public HttpResponseMessage StartDB([FromBody] String str)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("DBON", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbName", str);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "True"))
                {
                    strMessage = "Database Started Successfully.";
                } else if (string.Equals(strMessage, "False"))
                {
                    strMessage = "Database failed to start.";
                }
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage StopDB([FromBody] String str)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("DBOff", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbName", str);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "True"))
                {
                    strMessage = "Database Stopped Successfully.";
                }
                else if (string.Equals(strMessage, "False"))
                {
                    strMessage = "Database failed to stop.";
                }
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage RestartDB([FromBody] String str)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("DBRestart", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbName", str);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "True"))
                {
                    strMessage = "Database Restarted Successfully.";
                }
                else if (string.Equals(strMessage, "False"))
                {
                    strMessage = "Database failed to Restart.";
                }
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage CreateDatabase([FromBody] String str)
        {
            try
            {             
                SqlCommand cmd = new SqlCommand("DBCreate", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbName",str);                
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "Database Created Successfully.";
                }
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage BackupDatabase(RB DbData)
        {
            try
            {
                String dbname = Convert.ToString(DbData.FrDbName);
                String newdbname = Convert.ToString(DbData.ToDbName);
                String location = Convert.ToString(DbData.bkLocation);
                SqlCommand cmd = new SqlCommand("BackupDb", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbname", dbname);
                cmd.Parameters.AddWithValue("@newdbname", newdbname);
                cmd.Parameters.AddWithValue("@path", location);
                cmd.Parameters.Add("@message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@message"].Direction = ParameterDirection.Output;
                Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@message"].Value);
                Con.Close();
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
        [HttpPost]
        public HttpResponseMessage DB_Disc(Database obj)
        {
            try
            {
                string dbname = Convert.ToString(obj.name);
                SqlCommand cmd = new SqlCommand("DB_Disc", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbname", dbname);
                Da.SelectCommand = cmd;
                Da.Fill(Dt);
                List<DB_Disc_Mode> Disclist = new List<DB_Disc_Mode>();
                DB_Disc_Mode ob = new DB_Disc_Mode();
                ob.Table = Convert.ToInt32(Dt.Rows[0]["Number of Tables"]);
                ob.SP = Convert.ToInt32(Dt.Rows[0]["Number of Stored Procedures"]);
                ob.Index = Convert.ToInt32(Dt.Rows[0]["Number of User-Created Indexes"]);
                ob.Fbak = Convert.ToString(Dt.Rows[0]["Last Full Backup"]);
                ob.Pbak = Convert.ToString(Dt.Rows[0]["Last Partial Backup"]);
                ob.owner = Convert.ToString(Dt.Rows[0]["Database Owner"]);
                ob.Coll = Convert.ToString(Dt.Rows[0]["Database Collation"]);
                ob.size = Convert.ToString(Dt.Rows[0]["Database Size"]);
                Disclist.Add(ob);
                Con.Close();

                return Return.returnHttp("200", Disclist, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
    }
}
