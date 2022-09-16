using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    #region MstProgramme
    public class MstProgramme
    {
        public int Id { get; set; }
        public string ProgrammeName { get; set; }
        public string ProgrammeCode { get; set; }
        public int FacultyId { get; set; }
        public int InstituteId { get; set; }
        public string FacultyName { get; set; }
        public string IsActiveSts { get; set; }
        public string ProgrammeDescription { get; set; }
        public int ProgrammeLevelId { get; set; }
        public string ProgrammeLevelName { get; set; }
        public string ProgrammeModeName { get; set; }
        public string ProgrammeTypeName { get; set; }
        public int ProgrammeModeId { get; set; }
        public int ProgrammeTypeId { get; set; }
        public int InstructionMediumId { get; set; }
        public string InstructionMediumName { get; set; }
        public string EvaluationName { get; set; }
        public int EvaluationId { get; set; }
        public Boolean IsCBCS { get; set; }
        public Boolean IsSepartePassingHead { get; set; }
        public int MaxMarks { get; set; }
        public int MinMarks { get; set; }
        public int MaxCredits { get; set; }
        public int MinCredits { get; set; }
        public int ProgrammeDuration { get; set; }
        public int ProgrammeValidity { get; set; }
        public int TotalParts { get; set; }
        public Boolean IsActive { get; set; }
        public Boolean IsDeleted { get; set; }
        public Int64 CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public Int64 ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public Int64 ProgrammeInstancePartTermId { get; set; }
        public String IsSeparatePassingHeadSts { get; set; }

        public Int32 DemoFacutlyProgrameId { get; set; }

        public Int32 ProgrammeId { get; set; }

        public Boolean ProgChecked { get; set; }
    }
    #endregion
}