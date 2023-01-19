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
    public class LockAnalysisController : ApiController
    {
        SqlConnection Con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();
        DateTime datetime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

        [HttpPost]
        public HttpResponseMessage GetLock()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("LockB", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<Locks> LockList = new List<Locks>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Locks locksobj = new Locks();
                        locksobj.HostName = Convert.ToString(Dt.Rows[i]["HostName"]);
                        locksobj.Login = Convert.ToString(Dt.Rows[i]["Login"]);
                        locksobj.spid = Convert.ToInt32(Dt.Rows[i]["spid"]);
                        locksobj.Database = Convert.ToString(Dt.Rows[i]["Database"]);
                        locksobj.TableID = Convert.ToInt32(Dt.Rows[i]["TableID"]);
                        locksobj.TableName = Convert.ToString(Dt.Rows[i]["Table Name"]);
                        locksobj.LockType = Convert.ToString(Dt.Rows[i]["Lock Type"]);
                        locksobj.LockMode = Convert.ToString(Dt.Rows[i]["Lock Mode"]);
                        locksobj.Status = Convert.ToString(Dt.Rows[i]["Status"]);
                        locksobj.LockCount = Convert.ToInt32(Dt.Rows[i]["Lock Count"]);
                        LockList.Add(locksobj);
                    }
                }
                return Return.returnHttp("200", LockList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
        public HttpResponseMessage KillSession([FromBody] string lockObj)
        {
            try
            {
                int sessionId = Convert.ToInt32(lockObj);
                SqlCommand cmd = new SqlCommand("KillSession", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@sid", sessionId);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = lockObj + " has been successfully killed.";
                }
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
    }
}


