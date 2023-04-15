using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class DB_Disc_Mode
    {
        public int Table { get; set; }
        public int SP { get; set; }
        public int Index { get; set; }
        public int Users { get; set; }
        public string Fbak { get; set; }
        public string Pbak { get; set; }
        public string owner { get; set; }
        public string Coll { get; set; }   
        public string datasize { get; set; }   
        public string logsize { get; set; }   
    }
}