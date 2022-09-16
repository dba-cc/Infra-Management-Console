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
    public class ProgrammeController : ApiController
    {
        SqlConnection Con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();
        //Validation validation = new Validation(); TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        DateTime datetime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));


        [HttpPost]

        public HttpResponseMessage ProgGet(Programme ObjProg)
        {
            //Department dept = new Department();
            try
            {
                SqlCommand cmd = new SqlCommand("ProgrammeGet", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ProgrammeId", ObjProg.Id);
                Da.SelectCommand = cmd;
                Da.Fill(Dt);
                List<Programme> ObjListProg = new List<Programme>();
                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Department Dept = new Department();
                        ObjProg.Id = Convert.ToInt32(Dt.Rows[i]["Id"]);
                        ObjProg.ProgrammeName = Convert.ToString(Dt.Rows[i]["ProgrammeName"]);
                        ObjProg.ProgrammeCode = Convert.ToString(Dt.Rows[i]["ProgrammeCode"]);
                        ObjListProg.Add(ObjProg);

                    }
                }
                return Return.returnHttp("200", ObjListProg, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]

        public HttpResponseMessage ProgrammeAdd(Programme ObjProg)
        {
            //Department dept = new Department();
            try
            {
                Int32 Id = Convert.ToInt32(ObjProg.Id);
                string ProgrammeName = Convert.ToString(ObjProg.ProgrammeName);
                string ProgrammeCode = Convert.ToString(ObjProg.ProgrammeCode);
                SqlCommand cmd = new SqlCommand("ProgrammeAdd", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", ObjProg.Id);
                cmd.Parameters.AddWithValue("ProgrammeName", ObjProg.ProgrammeName);
                cmd.Parameters.AddWithValue("ProgrammeCode", ObjProg.ProgrammeCode);


                //cmd.Parameters.AddWithValue("@UserTime", datetime);
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
        public HttpResponseMessage ProgrammeUpdate(Programme Obj)
        {
            try
            {
                Int32 Id = Convert.ToInt32(Obj.Id);
                string ProgrammeName = Convert.ToString(Obj.ProgrammeName);
                string ProgrammeCode = Convert.ToString(Obj.ProgrammeCode);
                


                SqlCommand cmd = new SqlCommand("ProgrammeUpdate", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@ProgrammeName", ProgrammeName);
                cmd.Parameters.AddWithValue("@ProgrammeCode", ProgrammeCode);
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
        public HttpResponseMessage ProgrammeDelete(Programme ObjProg)
        {
            try
            {
                Int32 Id = Convert.ToInt32(ObjProg.Id);



                SqlCommand cmd = new SqlCommand("ProgrammeDelete", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);
                // cmd.Parameters.AddWithValue("@FacultyName", FacultyName);

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