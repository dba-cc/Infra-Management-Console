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
        public HttpResponseMessage GetQueryHit([FromBody]String timeFormat_time)
        {
            try
            {
                String timeFormat = timeFormat_time.Split(' ')[0];
                String time = timeFormat_time.Split(' ')[1];
                String db = timeFormat_time.Split(' ')[2];
                SqlCommand cmd = new SqlCommand("lasttopv2", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@TimeFormat", timeFormat);
                cmd.Parameters.AddWithValue("@t", time);
                cmd.Parameters.AddWithValue("@db", db);
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
                        
                        if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["Object Name"])))
                            queryhit.objectid = "Query";
                        else
                            queryhit.objectid = Convert.ToString(Dt.Rows[i]["Object Name"]);

                        /*if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["DBNAME"])))
                            queryhit.dbname = "Query";
                        else
                            queryhit.dbname = Convert.ToString(Dt.Rows[i]["DBNAME"]);*/

                        queryhit.execution_count = Convert.ToInt64(Dt.Rows[i]["execution_count"]);
                        queryhit.max_worker_time = Convert.ToInt64(Dt.Rows[i]["max_worker_time"]);
                        queryhit.last_worker_time = Convert.ToInt64(Dt.Rows[i]["last_worker_time"]);
                        queryhit.max_elapsed_time = Convert.ToInt64(Dt.Rows[i]["max_elapsed_time"]);
                        queryhit.last_elapsed_time = Convert.ToInt64(Dt.Rows[i]["last_elapsed_time"]);
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