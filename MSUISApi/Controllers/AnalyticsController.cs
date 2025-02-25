﻿using MSUISApi.Models;
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



        /*[HttpPost]
        public HttpResponseMessage GetQueryHit([FromBody]String timeFormat_time)
        {
            try
            {
                int page = Convert.ToInt32(timeFormat_time.Split(' ')[3]);
                int pageSize = 100; // Number of items per page
                int startIndex = (page - 1) * pageSize;
                int endIndex = startIndex + pageSize - 1;

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
                    for (int i = startIndex; i <= endIndex && i < Dt.Rows.Count; i++)
                    {
                        QueryHit queryhit = new QueryHit();
                        DateTime myDateTime = Convert.ToDateTime(Dt.Rows[i]["Time"]);
                        queryhit.time = myDateTime.ToString("yyyy-MM-dd HH:mm:ss");
                        queryhit.query = Convert.ToString(Dt.Rows[i]["Query"]);

                        if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["Object Name"])))
                            queryhit.objectid = "Query";
                        else
                            queryhit.objectid = Convert.ToString(Dt.Rows[i]["Object Name"]);

                        *//*if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["DBNAME"])))
                            queryhit.dbname = "Query";
                        else
                            queryhit.dbname = Convert.ToString(Dt.Rows[i]["DBNAME"]);*//*

                        queryhit.execution_count = Convert.ToInt64(Dt.Rows[i]["execution_count"]);
                        queryhit.max_worker_time = Convert.ToInt64(Dt.Rows[i]["max_worker_time"]);
                        queryhit.last_worker_time = Convert.ToInt64(Dt.Rows[i]["last_worker_time"]);
                        queryhit.max_elapsed_time = Convert.ToInt64(Dt.Rows[i]["max_elapsed_time"]);
                        queryhit.last_elapsed_time = Convert.ToInt64(Dt.Rows[i]["last_elapsed_time"]);
                        QueryHitList.Add(queryhit);
                    }
                }

                int totalPages = (int)Math.Ceiling((double)Dt.Rows.Count / pageSize);
                var pagedResult = new
                {
                    totalPages = totalPages,
                    currentPage = page,
                    pageSize = pageSize,
                    totalResults = Dt.Rows.Count,
                    data = QueryHitList
                };

                return Return.returnHttp("200", pagedResult, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }*/
        [HttpPost]
        public HttpResponseMessage GetQueryHit([FromBody] String timeFormat_time)
        {
            try
            {
                int page = Convert.ToInt32(timeFormat_time.Split(' ')[3]);
                int pageSize = 7000; // Number of items per page
                int startIndex = (page - 1) * pageSize;
                int endIndex = startIndex + pageSize - 1;

                String timeFormat = timeFormat_time.Split(' ')[0];
                String time = timeFormat_time.Split(' ')[1];
                String db = timeFormat_time.Split(' ')[2];
                SqlCommand cmd = new SqlCommand("lasttopv2", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@TimeFormat", timeFormat);
                cmd.Parameters.AddWithValue("@t", time);
                cmd.Parameters.AddWithValue("@db", db);
                Da.SelectCommand = cmd;
                cmd.CommandTimeout = 0;
                Da.Fill(Dt);

                List<QueryHit> QueryHitList = new List<QueryHit>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = startIndex; i <= endIndex && i < Dt.Rows.Count; i++)
                    {
                        QueryHit queryhit = new QueryHit();
                        DateTime myDateTime1 = Convert.ToDateTime(Dt.Rows[i]["CTime"]);
                        queryhit.ctime = myDateTime1.ToString("yyyy-MM-dd HH:mm:ss.fff");
                        DateTime myDateTime = Convert.ToDateTime(Dt.Rows[i]["Time"]);
                        queryhit.time = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");
                        queryhit.query = Convert.ToString(Dt.Rows[i]["Query"]);

                        if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["Object Name"])))
                            queryhit.objectid = "Query";
                        else
                            queryhit.objectid = Convert.ToString(Dt.Rows[i]["Object Name"]);

                        if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["DBName"])))
                            queryhit.dbname = "Query";
                        else
                            queryhit.dbname = Convert.ToString(Dt.Rows[i]["DBName"]);

                        queryhit.execution_count = Convert.ToInt64(Dt.Rows[i]["execution_count"]);
                        queryhit.max_worker_time = Convert.ToInt64(Dt.Rows[i]["max_worker_time"]);
                        queryhit.last_worker_time = Convert.ToInt64(Dt.Rows[i]["last_worker_time"]);
                        queryhit.max_elapsed_time = Convert.ToInt64(Dt.Rows[i]["max_elapsed_time"]);
                        queryhit.last_elapsed_time = Convert.ToInt64(Dt.Rows[i]["last_elapsed_time"]);
                        QueryHitList.Add(queryhit);
                    }
                }

                int totalPages = (int)Math.Ceiling((double)Dt.Rows.Count / pageSize);
                var pagedResult = new
                {
                    totalPages = totalPages,
                    currentPage = page,
                    pageSize = pageSize,
                    totalResults = Dt.Rows.Count,
                    data = QueryHitList
                };

                return Return.returnHttp("200", pagedResult, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage GetQueryHitWithAbsRange([FromBody] String timeFormat_time)
        {
            try
            {
                int page = Convert.ToInt32(timeFormat_time.Split(' ')[3]);
                int pageSize = 70; // Number of items per page
                int startIndex = (page - 1) * pageSize;
                int endIndex = startIndex + pageSize - 1;

                String timeFormat = timeFormat_time.Split(' ')[0];
                String time = timeFormat_time.Split(' ')[1];
                String db = timeFormat_time.Split(' ')[2];
                SqlCommand cmd = new SqlCommand("lasttopv2absoluterange", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@from", timeFormat);
                cmd.Parameters.AddWithValue("@to", time);
                cmd.Parameters.AddWithValue("@db", db);
                Da.SelectCommand = cmd;
                cmd.CommandTimeout = 0;
                Da.Fill(Dt);

                List<QueryHit> QueryHitList = new List<QueryHit>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = startIndex; i <= endIndex && i < Dt.Rows.Count; i++)
                    {
                        QueryHit queryhit = new QueryHit();
                        DateTime myDateTime1 = Convert.ToDateTime(Dt.Rows[i]["CTime"]);
                        queryhit.ctime = myDateTime1.ToString("yyyy-MM-dd HH:mm:ss.fff");
                        DateTime myDateTime = Convert.ToDateTime(Dt.Rows[i]["Time"]);
                        queryhit.time = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");
                        queryhit.query = Convert.ToString(Dt.Rows[i]["Query"]);

                        if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["Object Name"])))
                            queryhit.objectid = "Query";
                        else
                            queryhit.objectid = Convert.ToString(Dt.Rows[i]["Object Name"]);

                        if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["DBName"])))
                            queryhit.dbname = "Query";
                        else
                            queryhit.dbname = Convert.ToString(Dt.Rows[i]["DBName"]);

                        queryhit.execution_count = Convert.ToInt64(Dt.Rows[i]["execution_count"]);
                        queryhit.max_worker_time = Convert.ToInt64(Dt.Rows[i]["max_worker_time"]);
                        queryhit.last_worker_time = Convert.ToInt64(Dt.Rows[i]["last_worker_time"]);
                        queryhit.max_elapsed_time = Convert.ToInt64(Dt.Rows[i]["max_elapsed_time"]);
                        queryhit.last_elapsed_time = Convert.ToInt64(Dt.Rows[i]["last_elapsed_time"]);
                        QueryHitList.Add(queryhit);
                    }
                }

                int totalPages = (int)Math.Ceiling((double)Dt.Rows.Count / pageSize);
                var pagedResult = new
                {
                    totalPages = totalPages,
                    currentPage = page,
                    pageSize = pageSize,
                    totalResults = Dt.Rows.Count,
                    data = QueryHitList
                };

                return Return.returnHttp("200", pagedResult, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage GetEventSPWithAbsRange([FromBody] String timeFormat_time)
        {
            try
            {
                int page = Convert.ToInt32(timeFormat_time.Split(',')[3]);
                int pageSize = 70; // Number of items per page
                int startIndex = (page - 1) * pageSize;
                int endIndex = startIndex + pageSize - 1;

                String timeFormat = timeFormat_time.Split(',')[0];
                String time = timeFormat_time.Split(',')[1];
                String db = timeFormat_time.Split(',')[2];
                SqlCommand cmd = new SqlCommand("EventSPabsoluterange", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@from", timeFormat);
                cmd.Parameters.AddWithValue("@to", time);
                cmd.Parameters.AddWithValue("@db", db);
                Da.SelectCommand = cmd;
                cmd.CommandTimeout = 0;
                Da.Fill(Dt);

                List<Events> EventsList = new List<Events>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = startIndex; i <= endIndex && i < Dt.Rows.Count; i++)
                    {
                        Events eventObj = new Events();
                        DateTime myDateTime = Convert.ToDateTime(Dt.Rows[i]["collect_system_time"]);
                        eventObj.SystemTime = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");
                        eventObj.ObjectName = Convert.ToString(Dt.Rows[i]["object_name"]);
                        eventObj.Statement = Convert.ToString(Dt.Rows[i]["statement"]);
                        eventObj.UserName = Convert.ToString(Dt.Rows[i]["username"]);
                        eventObj.Duration = Convert.ToInt64(Dt.Rows[i]["duration"]);
                        eventObj.CpuTime = Convert.ToInt64(Dt.Rows[i]["cpu_time"]);
                        eventObj.LogicalReads = Convert.ToInt64(Dt.Rows[i]["logical_reads"]);
                        eventObj.PhysicalReads = Convert.ToInt64(Dt.Rows[i]["physical_reads"]);
                        eventObj.Writes = Convert.ToInt64(Dt.Rows[i]["writes"]);                        
                        EventsList.Add(eventObj);
                    }
                }

                int totalPages = (int)Math.Ceiling((double)Dt.Rows.Count / pageSize);
                var pagedResult = new
                {
                    totalPages = totalPages,
                    currentPage = page,
                    pageSize = pageSize,
                    totalResults = Dt.Rows.Count,
                    data = EventsList
                };

                return Return.returnHttp("200", pagedResult, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage GetEventAdhocWithAbsRange([FromBody] String timeFormat_time)
        {
            try
            {
                int page = Convert.ToInt32(timeFormat_time.Split(',')[2]);
                int pageSize = 70; // Number of items per page
                int startIndex = (page - 1) * pageSize;
                int endIndex = startIndex + pageSize - 1;

                String timeFormat = timeFormat_time.Split(',')[0];
                String time = timeFormat_time.Split(',')[1];                
                SqlCommand cmd = new SqlCommand("EventAdhocabsoluterange", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@from", timeFormat);
                cmd.Parameters.AddWithValue("@to", time);
                Da.SelectCommand = cmd;
                cmd.CommandTimeout = 0;
                Da.Fill(Dt);

                List<Events> EventsList = new List<Events>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = startIndex; i <= endIndex && i < Dt.Rows.Count; i++)
                    {
                        Events eventObj = new Events();
                        DateTime myDateTime = Convert.ToDateTime(Dt.Rows[i]["collect_system_time"]);
                        eventObj.SystemTime = myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");                     
                        eventObj.Statement = Convert.ToString(Dt.Rows[i]["sql_text"]);
                        eventObj.UserName = Convert.ToString(Dt.Rows[i]["username"]);
                        eventObj.Duration = Convert.ToInt64(Dt.Rows[i]["duration"]);
                        eventObj.CpuTime = Convert.ToInt64(Dt.Rows[i]["cpu_time"]);
                        eventObj.LogicalReads = Convert.ToInt64(Dt.Rows[i]["logical_reads"]);
                        eventObj.PhysicalReads = Convert.ToInt64(Dt.Rows[i]["physical_reads"]);
                        eventObj.Writes = Convert.ToInt64(Dt.Rows[i]["writes"]);
                        eventObj.Spills = Convert.ToInt64(Dt.Rows[i]["spills"]);
                        EventsList.Add(eventObj);
                    }
                }

                int totalPages = (int)Math.Ceiling((double)Dt.Rows.Count / pageSize);
                var pagedResult = new
                {
                    totalPages = totalPages,
                    currentPage = page,
                    pageSize = pageSize,
                    totalResults = Dt.Rows.Count,
                    data = EventsList
                };

                return Return.returnHttp("200", pagedResult, null);
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

        [HttpPost]
        public HttpResponseMessage GetQHGraph([FromBody] String var)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("lasttop_graph", Con);
                String timeFormat = var.Split(',')[0];
                String db = var.Split(',')[1];
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@var", timeFormat);
                cmd.Parameters.AddWithValue("@db", db);
                cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = cmd;
                cmd.CommandTimeout = 0;

                Da.Fill(Dt);

                List<QH_Graph> qhgraphList = new List<QH_Graph>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        QH_Graph qhgraph = new QH_Graph();
                        qhgraph.query = Convert.ToString(Dt.Rows[i]["Query"]);
                        DateTime myDateTime = Convert.ToDateTime(Dt.Rows[i]["Date"]);
                        qhgraph.time= myDateTime.ToString("yyyy-MM-dd HH:mm:ss.fff");
                        qhgraph.execution_count = Convert.ToInt64(Dt.Rows[i]["EXCount"]);
                        qhgraphList.Add(qhgraph);
                    }
                }
                return Return.returnHttp("200", qhgraphList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage GetEarliestDate()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("Earliest_Accessible", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                Da.SelectCommand = cmd;
                Da.Fill(Dt);

                String date = Convert.ToString(Dt.Rows[0][0]);
                Con.Close();

                return Return.returnHttp("200", date, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
        [HttpPost]
        public HttpResponseMessage GetEarliestAdhocDate()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("Earliest_Accessible_Adhoc", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                Da.SelectCommand = cmd;
                Da.Fill(Dt);

                String date = Convert.ToString(Dt.Rows[0][0]);
                Con.Close();

                return Return.returnHttp("200", date, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
        [HttpPost]
        public HttpResponseMessage GetEarliestSPDate()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("Earliest_Accessible_SP", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                Da.SelectCommand = cmd;
                Da.Fill(Dt);

                String date = Convert.ToString(Dt.Rows[0][0]);
                Con.Close();

                return Return.returnHttp("200", date, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage GetIndexPercentage([FromBody] String db)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("IndexPercentagev2", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbname", db);
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<Indexing> IndexingList = new List<Indexing>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Indexing IndexingObj = new Indexing();
                        
                        IndexingObj.tablename = Convert.ToString(Dt.Rows[i]["tableName"]);
                        IndexingObj.columnname = Convert.ToString(Dt.Rows[i]["columnName"]);
                        IndexingObj.indexname = Convert.ToString(Dt.Rows[i]["indexname"]);
                        //IndexingObj.seeks = Convert.ToInt32(Dt.Rows[i]["TotalUsage"]);
                        object seeksNull = Dt.Rows[i]["TotalUsage"];
                        if (!(seeksNull is DBNull))
                            IndexingObj.seeks = Convert.ToInt32(seeksNull);
                        object seekPer = Dt.Rows[i]["SeekPercentage"];
                        if (!(seekPer is DBNull))
                            IndexingObj.SeekPercentage = Convert.ToSingle(seekPer);
                        IndexingList.Add(IndexingObj);
                    }
                }
                return Return.returnHttp("200", IndexingList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage GetIndexSuggestions([FromBody] String db)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("IndexSuggestions", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbname", db);
                Da.SelectCommand = cmd;

                Da.Fill(Dt);

                List<Indexing> IndexingList = new List<Indexing>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Indexing IndexingObj = new Indexing();

                        IndexingObj.tablename = Convert.ToString(Dt.Rows[i]["Tablename"]);
                        //IndexingObj.equalitycol = Convert.ToString(Dt.Rows[i]["eql_col"]);
                        if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["eql_col"])))
                            IndexingObj.equalitycol = "---";
                        else
                            IndexingObj.equalitycol = Convert.ToString(Dt.Rows[i]["eql_col"]);

                        //IndexingObj.inequalitycol = Convert.ToString(Dt.Rows[i]["ineql_col"]);
                        if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["ineql_col"])))
                            IndexingObj.inequalitycol = "---";
                        else
                            IndexingObj.inequalitycol = Convert.ToString(Dt.Rows[i]["ineql_col"]);
                        
                        //IndexingObj.includedcol = Convert.ToString(Dt.Rows[i]["incl_col"]);
                        if (string.IsNullOrEmpty(Convert.ToString(Dt.Rows[i]["incl_col"])))
                            IndexingObj.includedcol = "---";
                        else
                            IndexingObj.includedcol = Convert.ToString(Dt.Rows[i]["incl_col"]);

                        IndexingObj.seeks = Convert.ToInt32(Dt.Rows[i]["seeks"]);
                        IndexingObj.Index_Advantage = Convert.ToSingle(Dt.Rows[i]["Index_Advantage"]);
                        IndexingObj.Percent_Red = Convert.ToSingle(Dt.Rows[i]["Per_Red"]);
                        IndexingList.Add(IndexingObj);
                    }
                }
                return Return.returnHttp("200", IndexingList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage CreateIndex(Indexer inObj)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("IndexCreate", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbName", inObj.dbName);
                cmd.Parameters.AddWithValue("@indexName", inObj.indexname);
                cmd.Parameters.AddWithValue("@whereCols", inObj.whereCols);
                cmd.Parameters.AddWithValue("@includeCols", inObj.includedcol);
                cmd.Parameters.AddWithValue("@tableName", inObj.tablename);
                cmd.Parameters.AddWithValue("@onlineFlag", inObj.onlineFlag);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output;
                Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage DeleteIndex(Indexer inObj)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("IndexDelete", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbName", inObj.dbName);
                cmd.Parameters.AddWithValue("@indexName", inObj.indexname);
                cmd.Parameters.AddWithValue("@tableName", inObj.tablename);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output;
                Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
    }
}