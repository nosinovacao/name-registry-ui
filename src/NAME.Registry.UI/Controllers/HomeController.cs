using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace NAME.Registry.Web.Controllers
{
    /// <summary>
    /// Provides the entry points for the Angular app.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    public class HomeController : Controller
    {
        /// <summary>
        /// The index page.
        /// </summary>
        /// <returns>The action result.</returns>
        public IActionResult Index()
        {
            return this.View();
        }

        /// <summary>
        /// The error page.
        /// </summary>
        /// <returns>The action result.</returns>
        public IActionResult Error()
        {
            return this.View();
        }
    }
}
