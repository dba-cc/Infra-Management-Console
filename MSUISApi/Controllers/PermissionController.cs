using MSUISApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Configuration;
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
        public HttpResponseMessage UpdateTablePermissions(List<TablePermission> Obj)
        {
            try
            {

                string UserName, DatabaseName, TableName;
                DataTable paramSets = new DataTable();

                DataColumn username = new DataColumn("username", typeof(string));
                username.MaxLength = 255;
                paramSets.Columns.Add(username);

                DataColumn databasename = new DataColumn("databasename", typeof(string));
                databasename.MaxLength = 255;
                paramSets.Columns.Add(databasename);

                DataColumn tablename = new DataColumn("tablename", typeof(string));
                tablename.MaxLength = 255;
                paramSets.Columns.Add(tablename);

                DataColumn selectbit = new DataColumn("selectbit", typeof(bool));
                paramSets.Columns.Add(selectbit);

                DataColumn insertbit = new DataColumn("insertbit", typeof(bool));
                paramSets.Columns.Add(insertbit);

                DataColumn updatebit = new DataColumn("updatebit", typeof(bool));
                paramSets.Columns.Add(updatebit);

                DataColumn deletebit = new DataColumn("deletebit", typeof(bool));
                paramSets.Columns.Add(deletebit);

                DataColumn alterbit = new DataColumn("alterbit", typeof(bool));
                paramSets.Columns.Add(alterbit);

                DataColumn controlbit = new DataColumn("controlbit", typeof(bool));
                paramSets.Columns.Add(controlbit);


                SqlCommand cmd = new SqlCommand("UpdateTablePermissions", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                foreach (TablePermission tablePermission in Obj)
                {
                    UserName = Convert.ToString(tablePermission.user);
                    DatabaseName = Convert.ToString(tablePermission.database);
                    TableName = Convert.ToString(tablePermission.table);
                    paramSets.Rows.Add(UserName, DatabaseName, TableName, tablePermission.SELECT.HasValue ? tablePermission.SELECT : null, tablePermission.INSERT.HasValue ? tablePermission.INSERT : null, tablePermission.UPDATE.HasValue ? tablePermission.UPDATE : null, tablePermission.DELETE.HasValue ? tablePermission.DELETE : null, tablePermission.ALTER.HasValue ? tablePermission.ALTER : null, tablePermission.CONTROL.HasValue ? tablePermission.CONTROL : null);
                }

                SqlParameter param = cmd.Parameters.AddWithValue("@set", paramSets);
                param.SqlDbType = SqlDbType.Structured;
                param.TypeName = "TableSet";

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
        public HttpResponseMessage UpdateStoredProcedurePermissions(List<SPPermission> Obj)
        {
            try
            {
                string UserName, DatabaseName, SPName;
                DataTable paramSets = new DataTable();

                DataColumn username = new DataColumn("username", typeof(string));
                username.MaxLength = 255;
                paramSets.Columns.Add(username);

                DataColumn databasename = new DataColumn("databasename", typeof(string));
                databasename.MaxLength = 255;
                paramSets.Columns.Add(databasename);

                DataColumn storedprocedure = new DataColumn("storedprocedure", typeof(string));
                storedprocedure.MaxLength = 255;
                paramSets.Columns.Add(storedprocedure);

                DataColumn executebit = new DataColumn("executebit", typeof(bool));
                paramSets.Columns.Add(executebit);

                DataColumn alterbit = new DataColumn("alterbit", typeof(bool));
                paramSets.Columns.Add(alterbit);

                DataColumn viewdefinitionbit = new DataColumn("viewdefinitionbit", typeof(bool));
                paramSets.Columns.Add(viewdefinitionbit);

                DataColumn controlbit = new DataColumn("controlbit", typeof(bool));
                paramSets.Columns.Add(controlbit);


                SqlCommand cmd = new SqlCommand("UpdateStoredProcedurePermissionsTEST", Con);
                cmd.CommandType = CommandType.StoredProcedure;

                foreach (SPPermission sPPermission in Obj)
                {
                    UserName = Convert.ToString(sPPermission.user);
                    DatabaseName = Convert.ToString(sPPermission.database);
                    SPName = Convert.ToString(sPPermission.SPName);
                    paramSets.Rows.Add(UserName, DatabaseName, SPName, sPPermission.EXECUTE.HasValue ? sPPermission.EXECUTE : null, sPPermission.ALTER.HasValue ? sPPermission.ALTER : null, sPPermission.VIEWDEFINITION.HasValue ? sPPermission.VIEWDEFINITION : null, sPPermission.CONTROL.HasValue ? sPPermission.CONTROL : null);
                }

                SqlParameter param = cmd.Parameters.AddWithValue("@set", paramSets);
                param.SqlDbType = SqlDbType.Structured;
                param.TypeName = "SPSet";

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
