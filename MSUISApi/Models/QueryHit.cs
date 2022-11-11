using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class QueryHit
    {
        public string time { get; set; }

        public string query { get; set; }

        public string number { get; set; }

        public string objectid { get; set; }

        public string dbname { get; set; }

        public Int64 execution_count { get; set; }
    }
}