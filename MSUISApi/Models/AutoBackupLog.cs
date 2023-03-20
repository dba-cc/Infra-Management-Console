using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class AutoBackupLog
    {
        public string JobName { get; set; }
        public string StepName { get; set; }
        public string RunStatus { get; set; }
        public string RunDateTime { get; set; }
        public string Message { get; set; }

    }
}