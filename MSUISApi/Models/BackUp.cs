using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class BackUp
    {
        public string name { get; set; }

        public string location { get; set; }

        public string frequency { get; set; }

        public string type { get; set; }

        public DateTime time { get; set; }

        public string day { get; set; }
    }
}