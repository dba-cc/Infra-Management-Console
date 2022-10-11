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
                String[] str = perm.Split(' ');
                SqlCommand cmd = new SqlCommand("GetPermissionsByUser", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", str[0]);
                //cmd.Parameters.AddWithValue("@tablename", perm.TableName);
                cmd.Parameters.AddWithValue("@databasename", str[1]);
                Da.SelectCommand = cmd;
                Da.Fill(Dt);

                List<Permission> permissionsList = new List<Permission>();

                if (Dt.Rows.Count > 0)
                {
                    for (int i = 0; i < Dt.Rows.Count; i++)
                    {
                        Permission permission = new Permission();
                        //permission.UserName = Convert.ToString(Dt.Rows[i]["UserName"]);
                        permission.TableName = Convert.ToString(Dt.Rows[i]["TableName"]);
                        //permission.DatabaseName = Convert.ToString(Dt.Rows[i]["DatabaseName"]);
                        permission.ReadPerm = Convert.ToBoolean(Dt.Rows[i]["ReadPerm"]);
                        permission.WritePerm = Convert.ToBoolean(Dt.Rows[i]["WritePerm"]);
                        permission.AlterPerm = Convert.ToBoolean(Dt.Rows[i]["AlterPerm"]);
                        //permission.CreatedOn = Convert.ToDateTime(Dt.Rows[i]["CreatedOn"]);
                        //permission.ModifiedOn = Convert.ToDateTime(Dt.Rows[i]["ModifiedOn"]);
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
        public HttpResponseMessage GrantPermission(Permission Obj)
        {
            try
            {
                string UserName = Convert.ToString(Obj.UserName);
                string TableName = Convert.ToString(Obj.TableName);
                bool ReadPerm = Convert.ToBoolean(Obj.ReadPerm);
                bool WritePerm = Convert.ToBoolean(Obj.WritePerm);
                bool AlterPerm = Convert.ToBoolean(Obj.AlterPerm);

                SqlCommand cmd = new SqlCommand("GrantPermission", Con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@username", UserName);
                cmd.Parameters.AddWithValue("@tablename", TableName);
                cmd.Parameters.AddWithValue("@readPermission", ReadPerm);
                cmd.Parameters.AddWithValue("@writePermission", WritePerm);
                cmd.Parameters.AddWithValue("@alterPermission", AlterPerm);
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
