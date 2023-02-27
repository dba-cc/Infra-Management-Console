using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class QH_Graph
    {
        public string query { get; set; }

        public string time { get; set; }

        public Int64 execution_count { get; set; }

    }
}