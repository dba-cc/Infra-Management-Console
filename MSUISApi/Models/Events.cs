using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class Events
    {
        public string SystemTime { get; set; }
        public string ObjectName { get; set; }
        public string Statement { get; set; }
        public string UserName { get; set; }
        public Int64 Duration { get; set; }
        public Int64 CpuTime { get; set; }
        public Int64 LogicalReads { get; set; }
        public Int64 PhysicalReads { get; set; }
        public Int64 Writes { get; set; }
        public Int64 Spills { get; set; }
    }
}