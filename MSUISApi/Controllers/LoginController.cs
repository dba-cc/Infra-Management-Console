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
    public class LoginController : ApiController
    {
        SqlConnection Con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();
        DateTime datetime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

        [HttpPost]
        public HttpResponseMessage GetLogin()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("GetLogin", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<Login> LoginList = new List<Login>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Login login = new Login();
                        login.name = Convert.ToString(Dt.Rows[i]["name"]);
                        LoginList.Add(login);
                    }
                }
                return Return.returnHttp("200", LoginList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }


        [HttpPost]
        public HttpResponseMessage ShowLogin()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("ShowLogin", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<Login> LoginList = new List<Login>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Login login = new Login();
                        login.name = Convert.ToString(Dt.Rows[i]["name"]);
                        login.create_date = Convert.ToDateTime(Dt.Rows[i]["create_date"]);
                        login.modify_date = Convert.ToDateTime(Dt.Rows[i]["modify_date"]);
                        LoginList.Add(login);
                    }
                }
                return Return.returnHttp("200", LoginList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage ShowSystemLogin()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("ShowSystemLogin", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<Login> LoginList = new List<Login>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Login login = new Login();
                        login.name = Convert.ToString(Dt.Rows[i]["name"]);
                        login.create_date = Convert.ToDateTime(Dt.Rows[i]["create_date"]);
                        login.modify_date = Convert.ToDateTime(Dt.Rows[i]["modify_date"]);
                        LoginList.Add(login);
                    }
                }
                return Return.returnHttp("200", LoginList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage CreateLogin([FromBody] String str)
        {
            try
            {
                string[] arr = str.Split(' ');
                SqlCommand cmd = new SqlCommand("CreateLogin", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@loginname", arr[0]);
                cmd.Parameters.AddWithValue("@password", arr[1]);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "Login Created Successfully.";
                }
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage EditLogin([FromBody] String str)
        {
            try
            {
                string[] arr = str.Split(' ');
                SqlCommand cmd = new SqlCommand("EditLogin", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@loginname", arr[0]);
                cmd.Parameters.AddWithValue("@password", arr[1]);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "Login Updated Successfully.";
                }
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage DeleteLogin([FromBody] String str)
        {
            try
            {
                string[] arr = str.Split(' ');
                SqlCommand cmd = new SqlCommand("DeleteLogin", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@loginname", arr[0]);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "Login Deleted Successfully.";
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
