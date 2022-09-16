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

//Get
/*namespace MSUISApi.Controllers 
{
    public class FacultyController : ApiController
    {
        SqlConnection Con = new
            SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();

        TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        DateTime dateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(),
            TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

        [HttpPost]
            
        public HttpResponseMessage FacultyGet()
        { 
            try
            {
                SqlCommand cmd = new SqlCommand("FacultyGet", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<Faculty> ObjListFac = new List<Faculty>();

                if(Dt.Rows.Count > 0)
                {
                    for(int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Faculty objFac = new Faculty();
                        objFac.Id = Convert.ToInt32(Dt.Rows[i]["Id"]);
                        objFac.FacultyName = Convert.ToString(Dt.Rows[i]["FacultyName"]);
                        objFac.IsActive = Convert.ToBoolean(Dt.Rows[i]["IsActive"]);
                        objFac.IsDeleted = Convert.ToBoolean(Dt.Rows[i]["IsDeleted"]);

                        ObjListFac.Add(objFac);


                    }
                }
                return Return.returnHttp("200", ObjListFac, null);
            }
            catch(Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
    }
}*/

namespace MSUISApi.Controllers
{
    public class FacultyController : ApiController
    {
        SqlConnection Con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();
        //Validation validation = new Validation(); TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        DateTime datetime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));[HttpPost]
        
        
        public HttpResponseMessage FacultyGet()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("FacultyGet", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = cmd;
                Da.Fill(Dt);
                List<Faculty> ObjListFac = new List<Faculty>(); if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Faculty ObjFac = new Faculty();
                        ObjFac.Id = Convert.ToInt32(Dt.Rows[i]["Id"]);
                        ObjFac.FacultyName = Convert.ToString(Dt.Rows[i]["FacultyName"]);
                        ObjFac.IsActive = Convert.ToBoolean(Dt.Rows[i]["IsActive"]);
                        ObjFac.IsDeleted = Convert.ToBoolean(Dt.Rows[i]["IsDeleted"]); ObjListFac.Add(ObjFac);
                    }
                }
                return Return.returnHttp("200", ObjListFac, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
        [HttpPost]
        public HttpResponseMessage FacultyAdd(Faculty ObjFac)
        {
            try
             {
                Int32 Id = Convert.ToInt32(ObjFac.Id);
                string FacultyName = Convert.ToString(ObjFac.FacultyName);
                Int64 UserId = 1234; 
                SqlCommand cmd = new SqlCommand("FacultyAdd", Con);
                cmd.CommandType = CommandType.StoredProcedure; 
                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@FacultyName", FacultyName);
                cmd.Parameters.AddWithValue("@UserId", UserId);
                cmd.Parameters.AddWithValue("@UserTime", datetime);
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
        public HttpResponseMessage FacultyEdit(Faculty ObjFac)
        {
            try
            {
                Int32 Id = Convert.ToInt32(ObjFac.Id);
                string FacultyName = Convert.ToString(ObjFac.FacultyName);
                Int64 UserId = 1234;


                SqlCommand cmd = new SqlCommand("FacultyEdit", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@FacultyName", FacultyName);
                cmd.Parameters.AddWithValue("@UserId", UserId);
                cmd.Parameters.AddWithValue("@UserTime", datetime);
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
        public HttpResponseMessage FacultyDelete(Faculty ObjFac)
        {
            try
            {
                Int32 Id = Convert.ToInt32(ObjFac.Id);
                //string FacultyName = Convert.ToString(ObjFac.FacultyName);
                Int64 UserId = 1234;


                SqlCommand cmd = new SqlCommand("FacultyDelete", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);
               // cmd.Parameters.AddWithValue("@FacultyName", FacultyName);
                cmd.Parameters.AddWithValue("@UserId", UserId);
                cmd.Parameters.AddWithValue("@UserTime", datetime);
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

