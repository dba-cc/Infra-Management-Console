using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class User
    {
        public Int32 Id { get; set; }
        public string UserName { get; set; }
        public string UserPass { get; set; }
        public DateTime CreatedOn { get; set; }

    }
}