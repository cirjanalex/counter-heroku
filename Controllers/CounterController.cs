using System;
using counter.Models;
using Microsoft.AspNetCore.Mvc;

namespace counter.Controllers
{
    [Route("api/[controller]")]
    public class CounterController : ControllerBase
    {
        public static int currentCounter;

        [HttpGet]        
        public CounterModel Get()
        {
            return new CounterModel() { Value = currentCounter };
        }

        [HttpPost]        
        public IActionResult Increment()
        {
            currentCounter++;
            return Ok();
        }
    }
}