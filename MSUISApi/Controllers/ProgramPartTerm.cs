using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{ 
    public class ProgramPartTerm
    {
        public Int32 Id { get; set; }
        public string ProgramPartTermName { get; set; }
        
        public Int32 FacId { get; set; }
        public string FacultyName { get; set; }

        public Int32 ProgId { get; set; }
        public string ProgramName { get; set; }

        public Int32 InsId { get; set; }
        public string InstituteName { get; set; }

        public Int32 SpecId { get; set; }
        public string SpecificationName { get; set; }

        public Boolean IsActive { get; set; }
        public Boolean IsDeleted { get; set; }

        public Int64 CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }

        public Int64 ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }

    }
}