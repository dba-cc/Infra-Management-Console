using MSUISApi.Models;
using Newtonsoft.Json;
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
    public class PermissionController : ApiController
    {
        SqlConnection Con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["MSUISConnectionString"].ConnectionString);
        SqlDataAdapter Da = new SqlDataAdapter();
        DataTable Dt = new DataTable();
        DateTime datetime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.Now.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

        [HttpPost]
        public HttpResponseMessage GetPermissionsByUser([FromBody] String perm)
        {
            try
            {
                String[] str = perm.Split(',');
                SqlCommand cmd = new SqlCommand("GetPermissions", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", str[0]);
                cmd.Parameters.AddWithValue("@databasename", str[1]);
                Da.SelectCommand = cmd;
                Da.Fill(Dt);

                List<Permission> permissionsList = new List<Permission>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Permission permission = new Permission();
                        permission.TableName = Convert.ToString(Dt.Rows[i]["TableName"]);
                        permission.SELECT = Convert.ToBoolean(Dt.Rows[i]["SELECT"]);
                        permission.INSERT = Convert.ToBoolean(Dt.Rows[i]["INSERT"]);
                        permission.UPDATE = Convert.ToBoolean(Dt.Rows[i]["UPDATE"]);
                        permission.DELETE = Convert.ToBoolean(Dt.Rows[i]["DELETE"]);
                        permission.ALTER = Convert.ToBoolean(Dt.Rows[i]["ALTER"]);
                        permission.CONTROL = Convert.ToBoolean(Dt.Rows[i]["CONTROL"]);
                        permissionsList.Add(permission);
                    }
                }
                return Return.returnHttp("200", permissionsList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage UpdateTablePermissions(TablePermission Obj)
        {
            try
            {

                string UserName = Convert.ToString(Obj.user);
                string DatabaseName = Convert.ToString(Obj.database);
                string table = Convert.ToString(Obj.table);

                SqlCommand cmd = new SqlCommand("UpdateTablePermissions", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@user", UserName);
                cmd.Parameters.AddWithValue("@database", DatabaseName);
                cmd.Parameters.AddWithValue("@table", table);
                cmd.Parameters.AddWithValue("@select", Obj.SELECT.HasValue ? Obj.SELECT : null);
                cmd.Parameters.AddWithValue("@alter", Obj.ALTER.HasValue ? Obj.ALTER : null);
                cmd.Parameters.AddWithValue("@insert", Obj.INSERT.HasValue ? Obj.INSERT : null);
                cmd.Parameters.AddWithValue("@update", Obj.UPDATE.HasValue ? Obj.UPDATE : null);
                cmd.Parameters.AddWithValue("@delete", Obj.DELETE.HasValue ? Obj.DELETE: null);
                cmd.Parameters.AddWithValue("@control", Obj.CONTROL.HasValue ? Obj.CONTROL : null);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "Permission Granted.";
                }
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }


        [HttpPost]
        public HttpResponseMessage GetDBPermissions([FromBody] String perm)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("GetDBPermissions", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", perm);
                Da.SelectCommand = cmd;
                Da.Fill(Dt);

                List<DBPermission> permissionsList = new List<DBPermission>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        DBPermission permission = new DBPermission();
                        permission.UserName = Convert.ToString(Dt.Rows[i]["UserName"]);
                        permission.DatabaseName = Convert.ToString(Dt.Rows[i]["DatabaseName"]);
                        permission.ConnectDB = Convert.ToBoolean(Dt.Rows[i]["ConnectDB"]);
                        permission.CreateProcedure = Convert.ToBoolean(Dt.Rows[i]["CreateProcedure"]);
                        permission.CreateTable = Convert.ToBoolean(Dt.Rows[i]["CreateTable"]);
                        permission.CreateView = Convert.ToBoolean(Dt.Rows[i]["CreateView"]);
                        permission.ExecutePerm = Convert.ToBoolean(Dt.Rows[i]["ExecutePerm"]);
                        permission.ViewDefinition = Convert.ToBoolean(Dt.Rows[i]["ViewDefinition"]);
                        permission.ReadPerm = Convert.ToBoolean(Dt.Rows[i]["ReadPerm"]);
                        permission.WritePerm = Convert.ToBoolean(Dt.Rows[i]["WritePerm"]);
                        permission.AlterPerm = Convert.ToBoolean(Dt.Rows[i]["AlterPerm"]);
                        permission.ReferencesPerm = Convert.ToBoolean(Dt.Rows[i]["ReferencesPerm"]);
                        permissionsList.Add(permission);
                    }
                }
                return Return.returnHttp("200", permissionsList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage GrantDBPermissions(DBPermission dBPermission)
        {
            try
            {
                string UserName = Convert.ToString(dBPermission.UserName);
                string DatabaseName = Convert.ToString(dBPermission.DatabaseName);
                bool ConnectDB = Convert.ToBoolean(dBPermission.ConnectDB);
                bool CreateProcedure = Convert.ToBoolean(dBPermission.CreateProcedure);
                bool CreateTable = Convert.ToBoolean(dBPermission.CreateTable);
                bool CreateView = Convert.ToBoolean(dBPermission.CreateView);
                bool ExecutePerm = Convert.ToBoolean(dBPermission.ExecutePerm);
                bool ViewDefinition = Convert.ToBoolean(dBPermission.ViewDefinition);
                bool ReadPerm = Convert.ToBoolean(dBPermission.ReadPerm);
                bool WritePerm = Convert.ToBoolean(dBPermission.WritePerm);
                bool AlterPerm = Convert.ToBoolean(dBPermission.AlterPerm);
                bool ReferencesPerm = Convert.ToBoolean(dBPermission.ReferencesPerm);

                SqlCommand cmd = new SqlCommand("GrantDBPermissions", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", UserName);
                cmd.Parameters.AddWithValue("@database", DatabaseName);
                cmd.Parameters.AddWithValue("@connect", ConnectDB);
                cmd.Parameters.AddWithValue("@create_procedure", CreateProcedure);
                cmd.Parameters.AddWithValue("@create_table", CreateTable);
                cmd.Parameters.AddWithValue("@create_view", CreateView);
                cmd.Parameters.AddWithValue("@execute", ExecutePerm);
                cmd.Parameters.AddWithValue("@view_definition", ViewDefinition);
                cmd.Parameters.AddWithValue("@read", ReadPerm);
                cmd.Parameters.AddWithValue("@write", WritePerm);
                cmd.Parameters.AddWithValue("@alter", AlterPerm);
                cmd.Parameters.AddWithValue("@references", ReferencesPerm);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "Permission Granted.";
                }
                return Return.returnHttp("200", strMessage.ToString(), null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }


        [HttpPost]
        public HttpResponseMessage GetStoredProcedurePermissions([FromBody] String perm)
        {
            try
            {
                String[] str = perm.Split(',');
                SqlCommand cmd = new SqlCommand("GetStoredProcedurePermissions", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@user", str[0]);
                cmd.Parameters.AddWithValue("@database", str[1]);
                Da.SelectCommand = cmd;
                Da.Fill(Dt);

                List<SPPermission> permissionsList = new List<SPPermission>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        SPPermission permission = new SPPermission();
                        permission.SPName = Convert.ToString(Dt.Rows[i]["PROCEDURE_NAME"]);
                        permission.EXECUTE = Convert.ToBoolean(Dt.Rows[i]["EXECUTE"]);
                        permission.ALTER = Convert.ToBoolean(Dt.Rows[i]["ALTER"]);
                        permission.VIEWDEFINITION = Convert.ToBoolean(Dt.Rows[i]["VIEW DEFINITION"]);
                        permission.CONTROL = Convert.ToBoolean(Dt.Rows[i]["CONTROL"]);
                        permissionsList.Add(permission);
                    }
                }
                return Return.returnHttp("200", permissionsList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage UpdateStoredProcedurePermissions(SPPermission Obj)
        {
            try
            {
                string UserName = Convert.ToString(Obj.user);
                string DatabaseName = Convert.ToString(Obj.database);
                string SPName = Convert.ToString(Obj.SPName);

                SqlCommand cmd = new SqlCommand("UpdateStoredProcedurePermissions", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@user", UserName);
                cmd.Parameters.AddWithValue("@database", DatabaseName);
                cmd.Parameters.AddWithValue("@storedProcedure", SPName);
                cmd.Parameters.AddWithValue("@execute", Obj.EXECUTE.HasValue ? Obj.EXECUTE : null);
                cmd.Parameters.AddWithValue("@alter", Obj.ALTER.HasValue ? Obj.ALTER : null);
                cmd.Parameters.AddWithValue("@viewDefinition", Obj.VIEWDEFINITION.HasValue ? Obj.VIEWDEFINITION : null);
                cmd.Parameters.AddWithValue("@control", Obj.CONTROL.HasValue ? Obj.CONTROL : null);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
                cmd.ExecuteNonQuery();
                string strMessage = Convert.ToString(cmd.Parameters["@Message"].Value);
                Con.Close();
                if (string.Equals(strMessage, "TRUE"))
                {
                    strMessage = "Permission Granted.";
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
