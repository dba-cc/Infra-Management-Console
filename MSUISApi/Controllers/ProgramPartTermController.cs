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
    public class ProgramPartTermController : ApiController
    {
        SqlConnection Con = new
        SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();

        TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        DateTime dateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(),
        TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

        [HttpPost]

        public HttpResponseMessage ProgramPartTermMapGet()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("ProgramPartTermMap", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<ProgramPartTerm> objListProgTerm = new List<ProgramPartTerm>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        ProgramPartTerm objProgPartTerm = new ProgramPartTerm();
                        objProgPartTerm.Id = Convert.ToInt32(Dt.Rows[i]["id"]);
                        objProgPartTerm.ProgramPartTermName = Convert.ToString(Dt.Rows[i]["ProgramPartTermName"]);
                        objProgPartTerm.FacId = Convert.ToInt32(Dt.Rows[i]["FacId"]);
                        objProgPartTerm.FacultyName = Convert.ToString(Dt.Rows[i]["FacultyName"]);
                        objProgPartTerm.InsId = Convert.ToInt32(Dt.Rows[i]["InsId"]);
                        objProgPartTerm.InstituteName = Convert.ToString(Dt.Rows[i]["InstituteName"]);
                        objProgPartTerm.ProgId = Convert.ToInt32(Dt.Rows[i]["ProgId"]);
                        objProgPartTerm.ProgramName = Convert.ToString(Dt.Rows[i]["ProgramName"]);
                        objProgPartTerm.SpecId = Convert.ToInt32(Dt.Rows[i]["SpecId"]);
                        objProgPartTerm.SpecificationName = Convert.ToString(Dt.Rows[i]["SpecificationName"]);

                        // objProgPartTerm.IsActive = Convert.ToBoolean(Dt.Rows[i]["IsActive"]);
                        //objProgPartTerm.IsDeleted = Convert.ToBoolean(Dt.Rows[i]["IsDeleted"]);

                        objListProgTerm.Add(objProgPartTerm);

                    }


                }
                return Return.returnHttp("200", objListProgTerm, null);
            }

            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }



        }

        [HttpPost]
        public HttpResponseMessage ProgramPartTermAdd(ProgramPartTerm ObjPPT)
        {
            try
            {
                Int32 Id = Convert.ToInt32(ObjPPT.Id);
                string ProgramPartTermName = Convert.ToString(ObjPPT.ProgramPartTermName);
                Int32 FacId = Convert.ToInt32(ObjPPT.FacId);
                Int32 InsId = Convert.ToInt32(ObjPPT.InsId);
                Int32 ProgId = Convert.ToInt32(ObjPPT.ProgId);
                Int32 SpecId = Convert.ToInt32(ObjPPT.SpecId);



                Int64 UserId = 1234;
                SqlCommand cmd = new SqlCommand("ProgramPartTermAdd", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@ProgramPartTermName", ProgramPartTermName);
                cmd.Parameters.AddWithValue("@FacId", FacId);
                cmd.Parameters.AddWithValue("@InsId", InsId);
                cmd.Parameters.AddWithValue("@ProgId", ProgId);
                cmd.Parameters.AddWithValue("@SpecId", SpecId);
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
        public HttpResponseMessage ProgramPartTermEdit(ProgramPartTerm objPartEdit)
        {
            try
            {
                Int32 Id = Convert.ToInt32(objPartEdit.Id);
                string ProgramPartTermName = Convert.ToString(objPartEdit.ProgramPartTermName);

                Int32 FacId = Convert.ToInt32(objPartEdit.FacId);
                string FacultyName = Convert.ToString(objPartEdit.FacultyName);

                Int32 ProgId = Convert.ToInt32(objPartEdit.ProgId);
                string ProgramName = Convert.ToString(objPartEdit.ProgramName);

                Int32 InsId = Convert.ToInt32(objPartEdit.InsId);
                string InstituteName = Convert.ToString(objPartEdit.InstituteName);

                Int32 SpecId = Convert.ToInt32(objPartEdit.SpecId);
                string SpecificationName = Convert.ToString(objPartEdit.SpecificationName);

                Int64 UserId = 1234;

                SqlCommand cmd = new SqlCommand("ProgramPartTermEdit", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@ProgramPartTermName", ProgramPartTermName);
                cmd.Parameters.AddWithValue("@FacId", FacId);
                cmd.Parameters.AddWithValue("@ProgId", ProgId);
                cmd.Parameters.AddWithValue("@InsId", InsId);
                cmd.Parameters.AddWithValue("@SpecId", SpecId);
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
        public HttpResponseMessage ProgramPartTermDelete(ProgramPartTerm objProgDel)
        {
            try
            {
                Int32 Id = Convert.ToInt32(objProgDel.Id);
                Int64 UserId = 1234;

                SqlCommand cmd = new SqlCommand("ProgramPartTermDelete", Con);
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