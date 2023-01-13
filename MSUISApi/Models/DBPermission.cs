using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class DBPermission
    {
        public Int32 UserPermId { get; set; }
        public string UserName { get; set; }
        public string DatabaseName { get; set; }
        public bool ConnectDB { get; set; }
        public bool CreateProcedure { get; set; }
        public bool CreateTable { get; set; }
        public bool CreateView { get; set; }
        public bool ExecutePerm { get; set; }
        public bool ViewDefinition { get; set; }
        public bool ReadPerm { get; set; }
        public bool WritePerm { get; set; }
        public bool AlterPerm { get; set; }
        public bool ReferencesPerm { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }   
    }
}