using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class CredentialAnalysis
    {
        public string dbname { get; set; }

        public Int64 noofconnections { get; set; }

        public string loginame { get; set; }
    }
}