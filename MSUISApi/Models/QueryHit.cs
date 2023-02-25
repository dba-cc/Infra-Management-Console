using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class QueryHit
    {
        public string ctime { get; set; }
        public string time { get; set; }

        public string query { get; set; }

        public string objectid { get; set; }

        public string dbname { get; set; }
        public Int64 execution_count { get; set; }

        public Int64 max_worker_time { get; set; }

        public Int64 last_worker_time { get; set; }

        public Int64 max_elapsed_time { get; set; }

        public Int64 last_elapsed_time { get; set; }
    }
}