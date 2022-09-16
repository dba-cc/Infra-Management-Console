using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    
    public class MstFacultyProgrammeDemo
    {

        public Int32 Id { get; set; }

        public Int32 FacultyId { get; set; }

        public Int32 ProgrammeId { get; set; }

        public string FacultyName { get; set; }

        public string ProgrammeName { get; set; }

        public Boolean IsActive { get; set; }
        public string IsActiveSts { get; set; }
        public Int64 CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public Int64 ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public Boolean IsDeleted { get; set; }

        public List<ProgData> ProgList { get; set; }

    }
    public class ProgData
    {
        public Int32 ProgrammeId { get; set; }
        public Int32 DemoFacutlyProgrameId { get; set; }
        public Boolean ProgChecked { get; set; }
    }






}