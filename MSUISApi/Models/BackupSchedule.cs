using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class BackupSchedule
    {
        public string DB { get; set; }
        public string JobName { get; set; }
        public string Frequency { get; set; }
        public string BackupType { get; set; }
        public string NextRunDate { get; set; }
        public string NextRunTime { get; set; }
        public string Enabled { get; set; }

    }
}