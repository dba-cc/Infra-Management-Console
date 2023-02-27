using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class Permission
    {
        public string TableName { get; set; }
        public bool SELECT { get; set; }
        public bool INSERT { get; set; }
        public bool UPDATE { get; set; }
        public bool DELETE { get; set; }
        public bool ALTER { get; set; }
        public bool CONTROL { get; set; }   
    }
}