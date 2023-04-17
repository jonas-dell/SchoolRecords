using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SRD.API.Configuration;
using SRD.Infra.Context;
using System;

namespace SRD.API
{
    public class Startup : IStartup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var applicationAssembly = AppDomain.CurrentDomain.Load("SRD.Application");
            var domainAssembly = AppDomain.CurrentDomain.Load("SRD.Domain");
            var infraAssembly = AppDomain.CurrentDomain.Load("SRD.Infra");

            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnectionString"));
            });

            services.AddControllers();
            
            services.AddEndpointsApiExplorer();
            
            services.AddSwaggerGen();

            services.AddAuthentication(IISDefaults.AuthenticationScheme);

            services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy", builder =>
                {
                    builder.WithOrigins("https://localhost:4200", "http://localhost:4200");
                    builder.AllowAnyMethod();
                    builder.AllowAnyHeader();
                    builder.AllowCredentials();
                });
            });

            services.AddMediatRApi(applicationAssembly, domainAssembly, infraAssembly);

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddDependencyInjectConfiguration();

            services.AddSwaggerConfiguration();
        }

        public void Configure(WebApplication app, IWebHostEnvironment environment)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("MyPolicy");
            
            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwaggerConfiguration();
        }
    }

    public interface IStartup
    {
        IConfiguration Configuration { get; }
        void ConfigureServices(IServiceCollection services);
        void Configure(WebApplication app, IWebHostEnvironment environment);
    }

    public static class StartupExtensions
    {
        public static WebApplicationBuilder UseStartup<TStartup>(this WebApplicationBuilder webApplicationBuilder)
            where TStartup : IStartup
        {
            var startup = Activator.CreateInstance(typeof(TStartup), webApplicationBuilder.Configuration) as IStartup ?? throw new ArgumentException("Startup.cs does not exists");

            startup.ConfigureServices(webApplicationBuilder.Services);

            var app = webApplicationBuilder.Build();
            startup.Configure(app, app.Environment);
            app.Run();

            return webApplicationBuilder;
        }
    }
}
