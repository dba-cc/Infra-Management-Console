using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace MSUISApi.Models
{
    public class ReturnObject
    {
        public string response_code;
        public object obj;
        public object token;
    }
    public class Return
    {
        public static HttpResponseMessage returnHttp(string response_code, Object obj, string token)
        {
            try
            {
                var javaScriptSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                ReturnObject ro = new ReturnObject();
                ro.response_code = response_code;
                ro.obj = obj;
                ro.token = token;
                javaScriptSerializer.MaxJsonLength = System.Int32.MaxValue;
                string json = javaScriptSerializer.Serialize(ro);
                return new HttpResponseMessage()
                {
                    Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json")
                };
            }
            catch
            {
                var javaScriptSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                ReturnObject ro = new ReturnObject();
                ro.response_code = "201";
                ro.obj = "There was an error parsing the Data. Please try again.";
                ro.token = "201";
                string json = javaScriptSerializer.Serialize("Parse error");
                return new HttpResponseMessage()
                {
                    Content = new StringContent(json, System.Text.Encoding.UTF8, "application/json")
                };
            }
        }
    }
}