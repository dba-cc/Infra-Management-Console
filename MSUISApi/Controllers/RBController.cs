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
    public class RBController : ApiController
    {
        SqlConnection Con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();
        DateTime datetime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));



        [HttpPost]
        public HttpResponseMessage RbFCGet([FromBody] String s)
        {
            try
            {
                string path=s.Split(' ')[0];
                int type= Convert.ToInt32(s.Split(' ')[1]);
                SqlCommand cmd = new SqlCommand("FCGet", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Path", path);
                cmd.Parameters.AddWithValue("@type", type);
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<FC> FCList = new List<FC>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        FC fc = new FC();
                        fc.DbName = Convert.ToString(Dt.Rows[i]["FileNames"]);
                        FCList.Add(fc);
                    }
                }
                return Return.returnHttp("200", FCList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }


        [HttpPost]
        public HttpResponseMessage RestoreBackup(RB rb)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("RestoreBackup_", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbFromName", rb.FrDbName);
                cmd.Parameters.AddWithValue("@dbToName", rb.ToDbName);
                cmd.Parameters.AddWithValue("@bkLocation", rb.bkLocation);
                cmd.Parameters.AddWithValue("@type", rb.type);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output;
                Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
    }
}