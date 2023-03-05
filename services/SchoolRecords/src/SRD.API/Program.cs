using Microsoft.AspNetCore.Builder;
using SRD.API;

var builder = WebApplication.CreateBuilder(args)
    .UseStartup<Startup>();

