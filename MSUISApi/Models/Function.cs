using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace MSUISApi.Models
{
    public class Function
    {
        public string randomString(int len)
        {
            const string valid = "abcdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            for (int i = 0; i < len; i++)
            {
                res.Append(valid[rnd.Next(61)]);
            }
            return res.ToString();
        }
    }
}