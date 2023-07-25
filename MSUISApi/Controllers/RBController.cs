using MSUISApi.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Net.Http;
using System.Web.Http;


namespace MSUISApi.Controllers
{
    public class RestoreBackupController : ApiController
    {
        SqlConnection connection = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter adapter = new SqlDataAdapter();
        DataTable table = new DataTable();

        [HttpPost]
        public HttpResponseMessage GetBackupFilesFromDirectory([FromBody] String s)
        {
            try
            {
                string path=s.Split('|')[0];
                bool type = Convert.ToBoolean(s.Split('|')[1]);
                SqlCommand cmd = new SqlCommand("GetBackupFilesFromDirectory", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Path", path);
                cmd.Parameters.AddWithValue("@type", type);
                adapter.SelectCommand = cmd;

                adapter.Fill(table);

                List<FC> FCList = new List<FC>();

                if (table.Rows.Count > 0)
                {
                    for (int i = 0; i < table.Rows.Count; i++)
                    {
                        FC fc = new FC();
                        fc.DbName = Convert.ToString(table.Rows[i]["FileNames"]);
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
                SqlCommand cmd = new SqlCommand("RestoreBackup_", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbFromName", rb.FrDbName);
                cmd.Parameters.AddWithValue("@dbToName", rb.ToDbName);
                cmd.Parameters.AddWithValue("@bkLocation", rb.bkLocation);
                cmd.Parameters.AddWithValue("@type", rb.type);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output;
                connection.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                connection.Close();
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
    }
}