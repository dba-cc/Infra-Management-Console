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
using System.Xml.Linq;


namespace MSUISApi.Controllers
{
    public class AnalyticsController : ApiController
    {
        SqlConnection Con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();
        DateTime datetime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));



        [HttpPost]
        public HttpResponseMessage GetQueryHit([FromBody]int count)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("lasttop", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@t", count.ToString());
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<QueryHit> QueryHitList = new List<QueryHit>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        QueryHit queryhit = new QueryHit();
                        DateTime myDateTime = Convert.ToDateTime(Dt.Rows[i]["Time"]);
                        queryhit.time = myDateTime.ToString("yyyy-MM-dd HH:mm:ss");
                        queryhit.query = Convert.ToString(Dt.Rows[i]["Query"]);
                        if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["number"])))
                            queryhit.number = "NULL";
                        else
                            queryhit.number = Convert.ToString(Dt.Rows[i]["number"]);

                        if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["objectid"])))
                            queryhit.objectid = "NULL";
                        else
                            queryhit.objectid = Convert.ToString(Dt.Rows[i]["objectid"]);

                        if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["DBNAME"])))
                            queryhit.dbname = "NULL";
                        else
                            queryhit.dbname = Convert.ToString(Dt.Rows[i]["DBNAME"]);

                        queryhit.execution_count = Convert.ToInt64(Dt.Rows[i]["execution_count"]);
                        QueryHitList.Add(queryhit);
                    }
                }
                return Return.returnHttp("200", QueryHitList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage GetCredentialAnalysis()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("NoC", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<CredentialAnalysis> CredentialAnalysisList = new List<CredentialAnalysis>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        CredentialAnalysis credentialAnalysis = new CredentialAnalysis();
                        credentialAnalysis.dbname = Convert.ToString(Dt.Rows[i]["DBNAME"]);
                        credentialAnalysis.noofconnections= Convert.ToInt64(Dt.Rows[i]["Number_of_Connectons"]);
                        credentialAnalysis.loginame = Convert.ToString(Dt.Rows[i]["loginame"]);
                        CredentialAnalysisList.Add(credentialAnalysis);
                    }
                }
                return Return.returnHttp("200", CredentialAnalysisList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
    }
}