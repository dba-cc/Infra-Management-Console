using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class Company
    {
        public Int32 Id { get; set; }
        public string CompanyName { get; set; }

        public string CompanyAddress { get; set; }

        public Boolean IsActive { get; set; }
        public Boolean IsDeleted { get; set; }

        public Int64 CreatedBy { get; set; }
        public DateTime CreatedOn { get; set;}

        public Int64 ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}