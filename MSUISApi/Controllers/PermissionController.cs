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
        public HttpResponseMessage GetTablePermissionsByDBRoles([FromBody] String perm)
        {
            try
            {
                String[] str = perm.Split(',');
                SqlCommand cmd = new SqlCommand("GetDBRolePermission", Con);
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
        public HttpResponseMessage GetDBRoles([FromBody] String db)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("GetDBRoles", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbname", db);
                Da.SelectCommand = cmd;
                Da.Fill(Dt);

                List<DBRole> roleList = new List<DBRole>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        DBRole role = new DBRole();
                        role.Role = Convert.ToString(Dt.Rows[i]["role_name"]);
                        role.Users = Convert.ToString(Dt.Rows[i]["member_names"]);
                        roleList.Add(role);
                    }
                }
                return Return.returnHttp("200", roleList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage GetPossibleRoles([FromBody] String db)
        {
            try
            {
                SqlCommand cmd = new SqlCommand("GetPossibleRoles", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@dbname", db);
                Da.SelectCommand = cmd;
                Da.Fill(Dt);

                List<DBRole> roleList = new List<DBRole>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        DBRole role = new DBRole();
                        role.Role = Convert.ToString(Dt.Rows[i]["Role"]);
                        roleList.Add(role);
                    }
                }
                return Return.returnHttp("200", roleList, null);
            }
            catch (Exception e)
            {
                return Return.returnHttp("201", e.Message, null);
            }
        }

        [HttpPost]
        public HttpResponseMessage GrantDBRole([FromBody] String data)
        {
            try
            {
                String[] str = data.Split(' ');
                string databaseName = Convert.ToString(str[0]);
                string roleName = Convert.ToString(str[1]);
                string userName = Convert.ToString(str[2]);

                SqlCommand cmd = new SqlCommand("GrantDatabaseRoleToUser", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@userName", userName);
                cmd.Parameters.AddWithValue("@databaseName", databaseName);
                cmd.Parameters.AddWithValue("@roleName", roleName);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
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
        public HttpResponseMessage DropUserFromRole([FromBody] String data)
        {
            try
            {
                String[] str = data.Split(' ');
                string databaseName = Convert.ToString(str[0]);
                string roleName = Convert.ToString(str[1]);
                string userName = Convert.ToString(str[2]);

                SqlCommand cmd = new SqlCommand("RevokeDatabaseRoleToUser", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@userName", userName);
                cmd.Parameters.AddWithValue("@databaseName", databaseName);
                cmd.Parameters.AddWithValue("@roleName", roleName);
                cmd.Parameters.Add("@Message", SqlDbType.NVarChar, 500);
                cmd.Parameters["@Message"].Direction = ParameterDirection.Output; Con.Open();
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
        public HttpResponseMessage GetSPDBRolesPermissions([FromBody] String perm)
        {
            try
            {
                String[] str = perm.Split(',');
                SqlCommand cmd = new SqlCommand("GetSPDBRolesPermissions", Con);
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
