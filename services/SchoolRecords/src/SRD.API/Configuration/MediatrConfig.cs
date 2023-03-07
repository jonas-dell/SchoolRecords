using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace SRD.API.Configuration
{
    public static class MediatrConfig
    {
        public static void AddMediatRApi(this IServiceCollection services,params Assembly[] assemblies)
        {
            services.AddMediatR(assemblies);
        }
    }
}
