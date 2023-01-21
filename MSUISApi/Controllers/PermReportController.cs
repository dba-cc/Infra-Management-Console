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
    public class PermReportController : ApiController
    {
        SqlConnection Con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();
        DateTime datetime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));



        [HttpPost]
        public HttpResponseMessage PermReport([FromBody]  String sr)
        {
            try
            {
                /*PermReportDb pr = new PermReportDb();*/
                /*string DbName = Convert.ToString(sr);*/
                SqlCommand cmd = new SqlCommand("PermReport_Db", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbName", sr);
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<PermReportDb> PermList = new List<PermReportDb>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        PermReportDb pr = new PermReportDb();
                        pr.username = Convert.ToString(Dt.Rows[i]["User Name"]);
                        pr.usertype = Convert.ToString(Dt.Rows[i]["User Type"]);
                        pr.permission = Convert.ToString(Dt.Rows[i]["Permission"]);
                        pr.permissionstate = Convert.ToString(Dt.Rows[i]["Permission State"]);
                        pr.Class = Convert.ToString(Dt.Rows[i]["Class"]);
                        pr.objectname = Convert.ToString(Dt.Rows[i]["OBJECT NAME"]);
                        pr.modifydate = Convert.ToString(Dt.Rows[i]["Modify Date"]);
                        PermList.Add(pr);
                    }
                }
                return Return.returnHttp("200", PermList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
    }
}
