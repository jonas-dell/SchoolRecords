using Microsoft.Extensions.DependencyInjection;
using SRD.Domain.User.Repositories;
using SRD.Infra.Context;
using SRD.Infra.User.Repositories;

namespace SRD.API.Configuration
{
    public static class DepencyInjectionConfig
    {
        public static void AddDependencyInjectConfiguration(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<DataContext>();
        }
    }
}
