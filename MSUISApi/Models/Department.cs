using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class Department
    {
        public Int32 Id { get; set; }
        public string DeptName { get; set; }
        public string DeptCode { get; set; }
        public Int32 ProgrammeId { get; set; }
        public string ProgrammeName { get; set; }


    }
}