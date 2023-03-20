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
    public class AutoBackupController : ApiController
    {
        SqlConnection Con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();
        DateTime datetime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

        [HttpPost]
        public HttpResponseMessage AutoBackupDatabase(BackUp Obj)
        {
            try
            {
                    SqlCommand cmd = new SqlCommand("AutoBackupDatabase", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@DatabaseName", Obj.database);
                cmd.Parameters.AddWithValue("@BackupLocation", Obj.location);
                cmd.Parameters.AddWithValue("@Frequency", Obj.frequency);
                cmd.Parameters.AddWithValue("@BackupType", Obj.type);
                cmd.Parameters.AddWithValue("@BackupTime", Obj.time);
                if (Obj.day != null)
                {
                    cmd.Parameters.AddWithValue("@DayForWeeklyBackup", Obj.day);
                }
                Con.Open();
                cmd.ExecuteNonQuery();
                Con.Close();
                return Return.returnHttp("200", "AutoBackup Scheduled.", null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage DeleteSchedule(BackUp Obj)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("DeleteAutoBackup", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@DatabaseName", Obj.database);
                cmd.Parameters.AddWithValue("@Frequency", Obj.frequency);
                cmd.Parameters.AddWithValue("@BackupType", Obj.type);
                Con.Open();
                cmd.ExecuteNonQuery();
                Con.Close();
                return Return.returnHttp("200", "Schedule Deleted.", null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage GetBackupSchedules()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("GetBackupSchedules", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = cmd;
                Da.Fill(Dt);

                List<BackupSchedule> scheduleList = new List<BackupSchedule>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        BackupSchedule schedule = new BackupSchedule();
                        schedule.DB = Convert.ToString(Dt.Rows[i]["DB"]);
                        schedule.JobName = Convert.ToString(Dt.Rows[i]["JobName"]);
                        schedule.Frequency = Convert.ToString(Dt.Rows[i]["Frequency"]);
                        schedule.BackupType = Convert.ToString(Dt.Rows[i]["BackupType"]);
                        schedule.NextRunDate = Convert.ToString(Dt.Rows[i]["NextRunDate"]);
                        schedule.NextRunTime = Convert.ToString(Dt.Rows[i]["NextRunTime"]);
                        schedule.Enabled = Convert.ToString(Dt.Rows[i]["ScheduleEnabled"]);
                        scheduleList.Add(schedule);
                    }
                }
                return Return.returnHttp("200", scheduleList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage GetAutoBackupLogs()
        {
            try
            {
                SqlCommand cmd = new SqlCommand("GetAutoBackupLogs", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                Da.SelectCommand = cmd;
                Da.Fill(Dt);

                List<AutoBackupLog> scheduleList = new List<AutoBackupLog>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        AutoBackupLog schedule = new AutoBackupLog();
                        schedule.JobName = Convert.ToString(Dt.Rows[i]["Job Name"]);
                        schedule.StepName = Convert.ToString(Dt.Rows[i]["Step Name"]);
                        schedule.RunStatus = Convert.ToString(Dt.Rows[i]["Run Status"]);
                        schedule.RunDateTime = Convert.ToString(Dt.Rows[i]["Run Date/Time"]);
                        schedule.Message = Convert.ToString(Dt.Rows[i]["Message"]);
                        scheduleList.Add(schedule);
                    }
                }
                return Return.returnHttp("200", scheduleList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }
    }

}
