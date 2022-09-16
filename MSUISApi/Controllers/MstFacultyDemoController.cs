//using MSUIS_TokenManager.App_Start;
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
//using MSUISApi.BAL;

namespace MSUISApi.Controllers
{
    public class MstFacultyDemoController : ApiController
    {
        SqlConnection Con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();
        //Validation validation = new Validation();

        TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        DateTime datetime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));


        [HttpPost]
        public HttpResponseMessage DemoFacultyProgrammeGet()
        {
            try
            {
                 

                SqlCommand Cmd = new SqlCommand("PartTermReport", Con);
                Cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = Cmd;

                Da.Fill(Dt);


                List<MstFacultyDemo> ObjLstFacProg = new List<MstFacultyDemo>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        MstFacultyDemo objFacProg = new MstFacultyDemo();

                        objFacProg.FId = Convert.ToInt32(Dt.Rows[i]["Id"]);
                        //objFacProg.FacultyId = Convert.ToInt32(Dt.Rows[i]["FacultyId"]);
                        objFacProg.Fname = Convert.ToString(Dt.Rows[i]["Fname"]);
                        //objFacProg.ProgrammeId = Convert.ToInt32(Dt.Rows[i]["ProgrammeId"]);
                        //objFacProg.ProgrammeName = Convert.ToString(Dt.Rows[i]["ProgrammeName"]);
                        //objFacProg.preferenceNo = Convert.ToInt32(Dt.Rows[i]["preferenceNo"]);
                        //objFacProg.IsActive = Convert.ToBoolean(Dt.Rows[i]["IsActive"]);
                        //objFacProg.IsDeleted = Convert.ToBoolean(Dt.Rows[i]["IsDeleted"]);
                        ObjLstFacProg.Add(objFacProg);
                    }
                }
                return Return.returnHttp("200", ObjLstFacProg, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }




        


        #region DemoFacultyProgramme Add
        [HttpPost]
        public HttpResponseMessage DemoFacultyProgrammeAdd(MstFacultyDemo DFP)
        {
            
            
                try
                {
                // dynamic Jsondata = Faculty;

                //Int64 Id = Convert.ToInt64(Jsondata.Id);
                Int32 FacultyId = Convert.ToInt32(DFP.FId);
                //Int32 ProgrammeId = Convert.ToInt32(DFP.ProgrammeId);
                //Int32 preferenceNo = Convert.ToInt32(DFP.preferenceNo);
                Int64 UserId = 1234;
                    //for Testing
                    //Int64 UserId = Convert.ToInt64(res.ToString());

                    SqlCommand cmd = new SqlCommand("DemoFacultyProgrammeAdd", Con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@FacultyId", FacultyId);
                   // cmd.Parameters.AddWithValue("@ProgrammeId", ProgrammeId);
                    //cmd.Parameters.AddWithValue("@preferenceNo", preferenceNo);
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
                        strMessage = "Your data has been added successfully.";
                    }

                    return Return.returnHttp("200", strMessage.ToString(), null);
                }

                catch (Exception e)
                {
                    return Return.returnHttp("201", e.Message, null);
                }
            
        }
        #endregion

        #region DemoFacultyProgramme Edit
        [HttpPost]
        public HttpResponseMessage DemoFacultyProgrammeEdit(MstFacultyDemo DFP)
        {


            try
            {
                // dynamic Jsondata = Faculty;

                Int32 Id = Convert.ToInt32(DFP.FId);
                //Int32 FacultyId = Convert.ToInt32(DFP.FacultyId);
               // Int32 ProgrammeId = Convert.ToInt32(DFP.ProgrammeId);
               // Int32 preferenceNo = Convert.ToInt32(DFP.preferenceNo);
                Int64 UserId = 1234;
                //for Testing
                //Int64 UserId = Convert.ToInt64(res.ToString());

                SqlCommand cmd = new SqlCommand("DemoFacultyProgrammeEdit", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);
               // cmd.Parameters.AddWithValue("@FacultyId", Id);
               // cmd.Parameters.AddWithValue("@ProgrammeId", ProgrammeId);
               // cmd.Parameters.AddWithValue("@preferenceNo", preferenceNo);
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
                    strMessage = "Your data has been added successfully.";
                }

                return Return.returnHttp("200", strMessage.ToString(), null);
            }

            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }

        }
        #endregion

        #region DemoFacultyProgrammeDelete
        [HttpPost]
        public HttpResponseMessage DemoFacultyProgrammeDelete(MstFacultyDemo DFP)
        {
            try
            {
                Int32 Id = DFP.FId;
                Int64 UserId = 1234;

                SqlCommand cmd = new SqlCommand("DemoFacultyProgrammeDelete", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);
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
                    strMessage = "Your data has been deleted successfully.";
                }

                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }

        }
        #endregion

        //#region FeeConfigurationMulti1Edit
        [HttpPost]
        public HttpResponseMessage EditDemoFacultyProgramme(JObject jsonObject)
        {
            MstFacultyDemo MFD = new MstFacultyDemo();

            dynamic jsonData = jsonObject;
            try
            {
                SqlTransaction ST;

                Int32 Id = 0;
                String StrMsg = null;
                String StrMsg1 = null;
                var Data1 = jsonData.Data1;
                DataTable apadd = new DataTable();
                apadd.Columns.Add(new DataColumn("FacultyId", typeof(Int32)));
                apadd.Columns.Add(new DataColumn("ProgrammeId", typeof(Int32)));
                apadd.Columns.Add(new DataColumn("preferenceNo", typeof(Int32)));
                apadd.Columns.Add(new DataColumn("IsActive", typeof(Boolean)));
                apadd.Columns.Add(new DataColumn("CreatedBy", typeof(Int64)));
                apadd.Columns.Add(new DataColumn("CreatedOn", typeof(DateTime)));
                apadd.Columns.Add(new DataColumn("IsDeleted", typeof(Boolean)));


                foreach (var Data in Data1)
                {
                    Int32 FacultyId = Convert.ToInt32(Data.FacultyId);
                    Int32 ProgrammeId = Convert.ToInt32(Data.ProgrammeId);
                    Int32 preferenceNo = Convert.ToInt32(Data.preferenceNo);
                    apadd.Rows.Add(FacultyId, ProgrammeId,preferenceNo, "True", 0, datetime, "False");
                    Id = FacultyId;

                    //return Return.returnHttp("201", "Hii", null);
                }
                Con.Open();
                ST = Con.BeginTransaction();
                try
                {
                    SqlCommand cmd = new SqlCommand("DemoFacultyProgrammeDeleteById", Con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = ST;
                    cmd.Parameters.AddWithValue("@FacultyId", Id);
                    cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                    cmd.Parameters["@Message"].Direction = ParameterDirection.Output;
                    cmd.ExecuteNonQuery();
                    StrMsg = Convert.ToString(cmd.Parameters["@Message"].Value);

                    SqlCommand cmd1 = new SqlCommand("DemoFacultyProgrammeAddMulti", Con);
                    cmd1.CommandType = CommandType.StoredProcedure;
                    cmd1.Transaction = ST;
                    cmd1.Parameters.AddWithValue("@DemoFacutlyProgrameAdd", apadd);
                    cmd1.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                    cmd1.Parameters["@Message"].Direction = ParameterDirection.Output;
                    cmd1.ExecuteNonQuery();
                    StrMsg1 = Convert.ToString(cmd1.Parameters["@Message"].Value);


                    ST.Commit();
                    return Return.returnHttp("200", StrMsg.ToString() + "=====" + StrMsg1.ToString(), null);
                }
                catch (SqlException sqlError)
                {
                    ST.Rollback();
                    String strMessageErr = Convert.ToString(sqlError);
                    return Return.returnHttp("201", strMessageErr, null);
                }
                // return Return.returnHttp("201", "Hii", null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
            finally
            {
                Con.Close();
            }
        }
        //#endregion


    }
}