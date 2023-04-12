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
    public class SettingsController : ApiController
    {
        SqlConnection Con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();
        DateTime datetime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));


        [HttpPost]
        public HttpResponseMessage checklogin([FromBody] string logindetail)
        {
            try
            {
                string user = logindetail.Split(' ')[0];
                string pass = logindetail.Split(' ')[1];
                SqlCommand cmd = new SqlCommand("Checklogin", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@user", user);
                cmd.Parameters.AddWithValue("@pass", pass);
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
        public HttpResponseMessage trigger_status()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("trigger_status_db", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                Da.SelectCommand = cmd;
                Da.Fill(Dt);

                // Retrieve the boolean value from the first row and first column of the DataTable object
                Boolean status = !Convert.ToBoolean(Dt.Rows[0][0]);
                Con.Close();

                return Return.returnHttp("200", status, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage trigger_toggle([FromBody] int trig)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("DeletionProtectionTriggers", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                //string a;
                Da.SelectCommand = cmd;
                //Con.Open();

                cmd.Parameters.AddWithValue("@trig_db", Convert.ToBoolean(trig));
                //cmd.Parameters.AddWithValue("@message", Convert.ToString(trig));
                cmd.Parameters.Add("@message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                // a = Convert.ToString(Dt.Rows[0][0]);
                string strMessage = Convert.ToString(cmd.Parameters["@message"].Value);
                Con.Close();
                //string strMessage = 
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
        [HttpPost]
        public HttpResponseMessage default_loc(def_loc obj)
        {
            try
            {
                string typ = Convert.ToString(obj.typ);
                SqlCommand cmd = new SqlCommand("default_locGet", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@typ", typ);
                Da.SelectCommand = cmd;
                Da.Fill(Dt);
                String rloc = Convert.ToString(Dt.Rows[0]["location"]);
                Con.Close();

                return Return.returnHttp("200", rloc, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
 
        [HttpPost]
        public HttpResponseMessage update_loc(def_loc def_l)
        {
            try
            {
                string loc = Convert.ToString(def_l.loc);
                string typ = Convert.ToString(def_l.typ);
                SqlCommand cmd = new SqlCommand("Update_defaultloc", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@loc", loc);
                cmd.Parameters.AddWithValue("@typ", typ);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "Your data has been updated successfully.";
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