using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class PermReportDb
    {
        public string DbName { get; set; }
        public string username { get; set; }

        public string usertype { get; set; }

        public string permission { get; set; }

        public string permissionstate { get; set; }

        public string Class { get; set; }

        public string objectname { get; set; }

        public string modifydate { get; set; }
    }
}