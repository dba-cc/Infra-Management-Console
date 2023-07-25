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
        SqlConnection connection = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter adapter = new SqlDataAdapter();
        DataTable table = new DataTable();

        [HttpPost]
        public HttpResponseMessage AutoBackupDatabase(BackUp Obj)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("AutoBackupDatabase", connection);
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
                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();
                return Return.returnHttp("200", "AutoBackup Scheduled.", null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage DeleteSchedule([FromBody] String jobname)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("DeleteAutoBackup", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@jobname", jobname);
                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();
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
                SqlCommand cmd = new SqlCommand("GetBackupSchedules", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                adapter.SelectCommand = cmd;
                adapter.Fill(table);

                List<BackupSchedule> scheduleList = new List<BackupSchedule>();

                if (table.Rows.Count > 0)
                {
                    for (int i = 0; i < table.Rows.Count; i++)
                    {
                        BackupSchedule schedule = new BackupSchedule();
                        schedule.DB = Convert.ToString(table.Rows[i]["DB"]);
                        schedule.JobName = Convert.ToString(table.Rows[i]["JobName"]);
                        //schedule.Frequency = Convert.ToString(table.Rows[i]["Frequency"]);
                        //schedule.BackupType = Convert.ToString(table.Rows[i]["BackupType"]);
                        schedule.NextRunDate = Convert.ToString(table.Rows[i]["NextRunDate"]);
                        schedule.NextRunTime = Convert.ToString(table.Rows[i]["NextRunTime"]);
                        schedule.Enabled = Convert.ToString(table.Rows[i]["ScheduleEnabled"]);
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
                SqlCommand cmd = new SqlCommand("GetAutoBackupLogs", connection);
                cmd.CommandType = CommandType.StoredProcedure;
                adapter.SelectCommand = cmd;
                adapter.Fill(table);

                List<AutoBackupLog> scheduleList = new List<AutoBackupLog>();

                if (table.Rows.Count > 0)
                {
                    for (int i = 0; i < table.Rows.Count; i++)
                    {
                        AutoBackupLog schedule = new AutoBackupLog();
                        schedule.JobName = Convert.ToString(table.Rows[i]["Job Name"]);
                        schedule.StepName = Convert.ToString(table.Rows[i]["Step Name"]);
                        schedule.RunStatus = Convert.ToString(table.Rows[i]["Run Status"]);
                        schedule.RunDateTime = Convert.ToString(table.Rows[i]["Run Date/Time"]);
                        schedule.Message = Convert.ToString(table.Rows[i]["Message"]);
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
