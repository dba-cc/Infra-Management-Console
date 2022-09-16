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
    public class Institute1Controller : ApiController
    {
        SqlConnection Con = new
        SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();

        TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        DateTime dateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(),
            TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

        [HttpPost]

        public HttpResponseMessage InstituteGet()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("InstituteGet", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<Institute1> ObjListIns1 = new List<Institute1>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Institute1 objIns1 = new Institute1();
                        objIns1.Id = Convert.ToInt32(Dt.Rows[i]["id"]);
                        objIns1.InstituteName = Convert.ToString(Dt.Rows[i]["InstituteName"]);
                        objIns1.IsActive = Convert.ToBoolean(Dt.Rows[i]["IsActive"]);
                        objIns1.IsDeleted = Convert.ToBoolean(Dt.Rows[i]["IsDeleted"]);

                        ObjListIns1.Add(objIns1);
                    }
                }
                return Return.returnHttp("200", ObjListIns1,null);
            }

            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }

        }

        [ HttpPost ]

        public HttpResponseMessage InstituteAdd(Institute1 ObjIns1)
        {
            try
            {
                Int32 Id = Convert.ToInt32(ObjIns1.Id);
                string InstituteName = Convert.ToString(ObjIns1.InstituteName);
                Int64 UserId = 1234;

                SqlCommand cmd = new SqlCommand("InstituteAdd", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@InstituteName", InstituteName);
                cmd.Parameters.AddWithValue("@UserId", UserId);
                cmd.Parameters.AddWithValue("@UserTime", dateTime);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);

                cmd.Parameters["@Message"].Direction = ParameterDirection.Output;

                Con.Open();

                cmd.ExecuteNonQuery();

                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);

                Con.Close();

                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "Your Data Has Been Added Successfully";
                }

                return Return.returnHttp("200", strMessage.ToString(), null);
            }

            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [ HttpPost ]

        public HttpResponseMessage InstituteEdit1(Institute1 ObjIns1)
        {
            try
            {
                Int32 Id = Convert.ToInt32(ObjIns1.Id);
                string InstituteName = Convert.ToString(ObjIns1.InstituteName);
                Int64 UserId = 1234;

                SqlCommand cmd = new SqlCommand("InstituteEdit", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@InstituteName", InstituteName);
                cmd.Parameters.AddWithValue("@UserId", UserId);
                cmd.Parameters.AddWithValue("@UserTime", dateTime);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);

                cmd.Parameters["@Message"].Direction = ParameterDirection.Output;

                Con.Open();
                cmd.ExecuteNonQuery();

                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);

                Con.Close();

                if(string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "Data has been updated successfully";
                }
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [ HttpPost ]

        public HttpResponseMessage InstituteDelete(Institute1 objIns1)
        {
            try
            {
                Int32 Id = Convert.ToInt32(objIns1.Id);
                Int64 UserId = 1234;

                SqlCommand cmd = new SqlCommand("InstituteDelete", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@UserId", UserId);
                cmd.Parameters.AddWithValue("@UserTime", dateTime);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);

                cmd.Parameters["@Message"].Direction = ParameterDirection.Output;

                Con.Open();

                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);

                Con.Close();

                if(string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "Data Has been deleted successfully";
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