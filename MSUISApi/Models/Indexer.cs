using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MSUISApi.Models
{
    public class Indexer
    {
        public string dbName { get; set; }
        public string tablename { get; set; }
        public string whereCols { get; set; }       
        public string includedcol { get; set; }
        public string indexname { get; set; }
        public string onlineFlag { get; set; }
        
    }
}