using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class Indexing
    {
        public string tablename { get; set; }

        public string equalitycol { get; set; }

        public string inequalitycol { get; set; }

        public string includedcol { get; set; }

        public Int32 seeks { get; set; }
        public Int32 system_scans { get; set; }
        public float Index_Advantage { get; set; }
        public float SeekPercentage { get; set; }
        
    }
}