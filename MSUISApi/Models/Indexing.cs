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
        public string columnname { get; set; }
        public string indexname { get; set; }
        public Int32 seeks { get; set; }
        public float Index_Advantage { get; set; }
        public float SeekPercentage { get; set; }
        public float Percent_Red { get; set; }
        
    }
}