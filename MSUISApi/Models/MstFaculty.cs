using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    
    #region MstFaculty
    public class MstFaculty
    {
        public Int32 Id { get; set; }
        public String FacultyName { get; set; }
        public String FacultyCode { get; set; }
        public String FacultyAddress { get; set; }
        public string InstituteName { get; set; }
        public Int32 InstituteId { get; set; }
        public string InstituteCode { get; set; }
        public String CityName { get; set; }
        public Int32? Pincode { get; set; }
        public string FacultyContactNo { get; set; }
        public string FacultyFaxNo { get; set; }
        public String FacultyEmail { get; set; }
        public String FacultyUrl { get; set; }
        public Boolean IsActive { get; set; }
        public string IsActiveSts { get; set; }
        public Int64 CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public Int64 ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public Boolean IsDeleted { get; set; }
    }
    #endregion
}