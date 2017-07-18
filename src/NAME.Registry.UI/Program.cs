using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace NAME.Registry.Web
{
    /// <summary>
    /// The application main entry point.
    /// </summary>
    public class Program
    {
        /// <summary>
        /// The application main entry point.
        /// </summary>
        /// <param name="args">The arguments.</param>
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
             .UseKestrel()
             .UseContentRoot(Directory.GetCurrentDirectory())
             .UseIISIntegration()
             .UseStartup<Startup>()
             .Build();

            host.Run();
        }
    }
}
