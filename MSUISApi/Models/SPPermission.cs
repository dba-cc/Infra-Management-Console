using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class SPPermission
    {
        public Int32 UserPermId { get; set; }
        public string UserName { get; set; }
        public string DatabaseName { get; set; }
        public string SPName { get; set; }
        public bool ReadPerm { get; set; }
        public bool ExecutePerm { get; set; }
        public bool AlterPerm { get; set; }
        public bool FullAccessPerm { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }   
    }
}