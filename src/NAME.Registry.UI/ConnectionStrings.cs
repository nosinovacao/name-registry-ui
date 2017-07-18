using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace NAME.Registry.Web
{
    /// <summary>
    /// The application settings.
    /// </summary>
    public class ConnectionStrings
    {
        /// <summary>
        /// Gets or sets the NAME Registry API Url.
        /// </summary>
        public string RegistryApiUrl { get; set; }
    }
}
