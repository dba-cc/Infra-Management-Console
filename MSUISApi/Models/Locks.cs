using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class Locks
    {
        public string HostName { get; set; }

        public string Login { get; set; }

        public int spid { get; set; }

        public string Database { get; set; }

        public int TableID { get; set; }

        public string TableName { get; set; }

        public string LockType { get; set; }

        public string LockMode { get; set; }

        public string Status { get; set; }

        public int LockCount { get; set; }
    }
}