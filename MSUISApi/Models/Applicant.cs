using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class Applicant
    {
        public int ApplicantRegistrationId { get; set; }
        public String UserName { get; set; }
        public String Password { get; set; }
        public String LastName { get; set; }
        public String FirstName { get; set; }
        public String MiddleName { get; set; }
        public String Gender { get; set; }
        public int ReligionId { get; set; }
        public String MaritalStatus { get; set; }
        public int MotherTongueId { get; set; }
        public int CommunicationLanguageId { get; set; }
        public DateTime DOB { get; set; }
        public int BloodGroupId { get; set; }
        public int HeightInCms { get; set; }
        public int WeightInKgs { get; set; }
        public bool IsMajorThelesamiaStatus { get; set; }
        public bool IsNRI { get; set; }
        public int CountryIdOfCitizenship { get; set; }
        public String PassportNumber { get; set; }
        public int AadharNumber { get; set; }
        public String NameOnAadhar { get; set; }
        public String PermanentAddress { get; set; }
        public int PermanentCityId { get; set; }
        public int PermanentPincode { get; set; }
        public String CurrentAddress { get; set; }
        public int CurrentCityId { get; set; }
        public int CurrentPincode { get; set; }
        public String NameOfFather { get; set; }
        public String NameOfMother { get; set; }
        public int SocialCategoryId { get; set; }
        public String GuardianName { get; set; }
        public String GuardianContactNo { get; set; }
        public String FamilyAnnualIncome { get; set; }
        public String OccupationIdOfFather { get; set; }
        public String OccupationIdOfMother { get; set; }
        public String OccupationIdOfGuardian { get; set; }
        public String GuardianAnnualIncome { get; set; }
        public String EmailId { get; set; }
        public String MobileNo { get; set; }
        public int OptionalMobileNo { get; set; }
        public bool IsSmsPermissionGiven { get; set; }
        public bool IsLocalToVadodara { get; set; }
    }
}