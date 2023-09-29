using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using SRD.Domain.Test.Repositories;
using SRD.Domain.User.Repositories;
using SRD.Infra.Context;
using SRD.Infra.Test.Repositories;
using SRD.Infra.User.Repositories;

namespace SRD.API.Configuration
{
    public static class DepencyInjectionConfig
    {
        public static void AddDependencyInjectConfiguration(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ITestRepository,TestRepository>();
            services.AddScoped<DataContext>();
        }
    }
}
