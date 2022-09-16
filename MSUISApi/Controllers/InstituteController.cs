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
    public class InstituteController : ApiController
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

                List<Institute> ObjListIns = new List<Institute>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Institute objIns = new Institute();
                        objIns.Id = Convert.ToInt32(Dt.Rows[i]["Id"]);
                        objIns.InstituteName = Convert.ToString(Dt.Rows[i]["InstituteName"]);
                        objIns.IsActive = Convert.ToBoolean(Dt.Rows[i]["IsActive"]);
                        objIns.IsDeleted = Convert.ToBoolean(Dt.Rows[i]["IsDeleted"]);

                        ObjListIns.Add(objIns);


                    }
                }
                return Return.returnHttp("200", ObjListIns, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]

        public HttpResponseMessage InstituteAdd(Institute objIns)
        {
            try
            {
                Int32 Id = Convert.ToInt32(objIns.Id);
                string InstituteName = Convert.ToString(objIns.InstituteName);
                Int64 userId = 1234;

                SqlCommand cmd = new SqlCommand("InstituteAdd", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@InstituteName", InstituteName);
                cmd.Parameters.AddWithValue("@UserId", userId);
                cmd.Parameters.AddWithValue("@UserTime", dateTime);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; 
                Con.Open();
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
        public HttpResponseMessage InstituteEdit(Institute ObjIns)
        {
            try
            {
                Int32 Id = Convert.ToInt32(ObjIns.Id);
                string InstituteName = Convert.ToString(ObjIns.InstituteName);
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
        public HttpResponseMessage InstituteDelete(Institute ObjIns)
        {
            try
            {
                Int32 Id = Convert.ToInt32(ObjIns.Id);
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

                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "Your data has been Deleted successfully.";
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