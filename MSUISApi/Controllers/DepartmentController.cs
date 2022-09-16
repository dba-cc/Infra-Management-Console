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
    public class DepartmentController : ApiController
    {
        SqlConnection Con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();
        //Validation validation = new Validation(); TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        DateTime datetime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
        
        
        [HttpPost]       
        
        public HttpResponseMessage DeptGet(Department ObjDept)
        {
            //Department dept = new Department();
            try
            {
                SqlCommand cmd = new SqlCommand("DepartmentGet", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@ProgrammeId", ObjDept.ProgrammeId);
                Da.SelectCommand = cmd;
                Da.Fill(Dt);
                List<Department> ObjListDept = new List<Department>(); 
                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Department Dept = new Department();
                        Dept.Id = Convert.ToInt32(Dt.Rows[i]["Id"]);
                        Dept.DeptName = Convert.ToString(Dt.Rows[i]["DeptName"]);
                        Dept.DeptCode = Convert.ToString(Dt.Rows[i]["DeptCode"]);
                        Dept.ProgrammeId = Convert.ToInt32(Dt.Rows[i]["ProgrammeId"]);
                        Dept.ProgrammeName = Convert.ToString(Dt.Rows[i]["ProgrammeName"]);

                        ObjListDept.Add(Dept);

                    }
                }
                return Return.returnHttp("200", ObjListDept, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage DeptAdd(Department ObjDept)
        {
            try
             {
                Int32 Id = Convert.ToInt32(ObjDept.Id);
                string DeptName = Convert.ToString(ObjDept.DeptName);
                string DeptCode = Convert.ToString(ObjDept.DeptCode);
                Int32 ProgrammeId = Convert.ToInt32(ObjDept.ProgrammeId);
                //Int64 UserId = 1234; 
                SqlCommand cmd = new SqlCommand("DepartmentAdd", Con);
                cmd.CommandType = CommandType.StoredProcedure; 
                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@DeptName", DeptName);
                cmd.Parameters.AddWithValue("@DeptCode", DeptCode);
                cmd.Parameters.AddWithValue("@ProgrammeId", ProgrammeId);
                //cmd.Parameters.AddWithValue("@UserId", UserId);
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
        public HttpResponseMessage DepartmentUpdate(Department ObjDept)
        {
            try
            {
                Int32 Id = Convert.ToInt32(ObjDept.Id);
                string DeptName = Convert.ToString(ObjDept.DeptName);
                string DeptCode = Convert.ToString(ObjDept.DeptCode);


                SqlCommand cmd = new SqlCommand("DepartmentUpdate", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@DeptName", DeptName);
                cmd.Parameters.AddWithValue("@DeptCode", DeptCode);
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
        public HttpResponseMessage DepartmentDelete(Department ObjDept)
        {
            try
            {
                Int32 Id = Convert.ToInt32(ObjDept.Id);
               


                SqlCommand cmd = new SqlCommand("DepartmentDelete", Con);
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


        [HttpPost]

        public HttpResponseMessage ProgGet()
        {
            //Department dept = new Department();
            try
            {
                SqlCommand cmd = new SqlCommand("ProgrammeGet", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("@ProgrammeId", ObjProg.Id);
                Da.SelectCommand = cmd;
                Da.Fill(Dt);
                List<Programme> ObjListProg = new List<Programme>();
                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Programme Prog = new Programme();
                        Prog.ProgrammeId = Convert.ToInt32(Dt.Rows[i]["Id"]);
                        Prog.ProgrammeName = Convert.ToString(Dt.Rows[i]["ProgrammeName"]);
                        Prog.ProgrammeCode = Convert.ToString(Dt.Rows[i]["ProgrammeCode"]);
                        ObjListProg.Add(Prog);

                    }
                }
                return Return.returnHttp("200", ObjListProg, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
    }
}

