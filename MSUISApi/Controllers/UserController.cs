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
    public class UserController : ApiController
    {
        SqlConnection Con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();
        DateTime datetime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));


        [HttpPost]
        public HttpResponseMessage GetUser([FromBody] String db)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("GetUser", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = cmd;
                cmd.Parameters.AddWithValue("@dbname", db);
                Da.Fill(Dt);

                List<User> UsersList = new List<User>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        User user = new User();
                        user.UserName = Convert.ToString(Dt.Rows[i]["UserName"]);
                        UsersList.Add(user);
                    }
                }
                return Return.returnHttp("200", UsersList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }


        [HttpPost]
        public HttpResponseMessage UserLogin([FromBody] String user)
        {
            try
            {
                String[] str = user.Split(' ');
                string UserName = Convert.ToString(str[0]);
                string UserPass = Convert.ToString(str[1]);
                SqlCommand cmd = new SqlCommand("UserLogin", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", UserName);
                cmd.Parameters.AddWithValue("@password", UserPass);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "Login Successful"))
                {
                    strMessage = "User Logged in Successfully.";
                } 
                else
                {
                    strMessage = "User Doesn't Exists.";
                }
                return Return.returnHttp("201", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }


        [HttpPost]
        public HttpResponseMessage GetSystemUsersDB([FromBody] String db)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("ShowUsers", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbname", db);
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<User> UsersList = new List<User>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        User user = new User();
                        user.UserName = Convert.ToString(Dt.Rows[i]["UserName"]);
                        if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["LoginName"])))
                            user.LoginName = "-";
                        else
                            user.LoginName = Convert.ToString(Dt.Rows[i]["LoginName"]);
                        user.CreatedOn = Convert.ToDateTime(Dt.Rows[i]["create_date"]);
                        UsersList.Add(user);
                    }
                }
                return Return.returnHttp("200", UsersList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage ShowSystemUsers([FromBody] String db)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("ShowSystemUsers", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbname", db);
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<User> UsersList = new List<User>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        User user = new User();
                        user.UserName = Convert.ToString(Dt.Rows[i]["UserName"]);
                        if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["LoginName"])))
                            user.LoginName = "-";
                        else
                            user.LoginName = Convert.ToString(Dt.Rows[i]["LoginName"]);
                        user.CreatedOn = Convert.ToDateTime(Dt.Rows[i]["create_date"]);
                        UsersList.Add(user);
                    }
                }
                return Return.returnHttp("200", UsersList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage CreateUserWithoutLogin([FromBody] String str)
        {
            try
            {
                string[] arr = str.Split(' ');
                SqlCommand cmd = new SqlCommand("CreateUserWithoutLogin", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", arr[0]);
                cmd.Parameters.AddWithValue("@dbname", arr[1]);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "User Created Successfully.";
                }
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage CreateUserForNewLogin ([FromBody] String str)
        {
            try
            {
                string[] arr = str.Split(' ');
                SqlCommand cmd = new SqlCommand("CreateUserForNewLogin", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", arr[0]);
                cmd.Parameters.AddWithValue("@dbname", arr[1]);
                cmd.Parameters.AddWithValue("@loginname", arr[2]);
                cmd.Parameters.AddWithValue("@password", arr[3]);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "User Created Successfully.";
                }
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage CreateUserForExistingLogin([FromBody] String str)
        {
            try
            {
                string[] arr = str.Split(' ');
                SqlCommand cmd = new SqlCommand("CreateUserForExistingLogin", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", arr[0]);
                cmd.Parameters.AddWithValue("@dbname", arr[1]);
                cmd.Parameters.AddWithValue("@loginname", arr[2]);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "User Created Successfully.";
                }
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }



        [HttpPost]
        public HttpResponseMessage CreateUser(User ObjFac)
        {
            try
            {
                string UserName = Convert.ToString(ObjFac.UserName);
                string UserPass = Convert.ToString(ObjFac.UserPass);
                SqlCommand cmd = new SqlCommand("CreateUser", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@userName", UserName);
                cmd.Parameters.AddWithValue("@userPass", UserPass);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "Your data has been added successfully.";
                }
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage EditUser(User user)
        {
            try
            {
                string UserName = Convert.ToString(user.UserName);
                string UserPass = Convert.ToString(user.UserPass);
                SqlCommand cmd = new SqlCommand("EditUser", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@userName", UserName);
                cmd.Parameters.AddWithValue("@userPass", UserPass);
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

        [HttpPost]
        public HttpResponseMessage DeleteUser([FromBody] String str)
        {
            try
            {
                String[] strarr = str.Split(' ');
                SqlCommand cmd = new SqlCommand("DeleteUserDB", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@userName", strarr[0]);
                cmd.Parameters.AddWithValue("@dbname", strarr[1]);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "Your data has been deleted successfully.";
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
