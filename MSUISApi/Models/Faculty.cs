using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class Faculty
    {
        public Int32 Id { get; set; }
        public string FacultyName { get; set; }

        public Boolean IsActive { get; set; }
        public Boolean IsDeleted { get; set; }

        public Int64 CreatedBy { get; set; }
        public DateTime CreatedOn { get; set;}

        public Int64 ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}