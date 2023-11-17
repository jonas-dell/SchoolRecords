using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using SRD.Application.Services;
using SRD.Domain.Perfil.Repositories;
using SRD.Domain.User.Repositories;
using SRD.Infra.Context;
using SRD.Infra.Perfil.Repositories;
using SRD.Infra.User.Repositories;

namespace SRD.API.Configuration
{
    public static class DepencyInjectionConfig
    {
        public static void AddDependencyInjectConfiguration(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IPerfilRepository, PerfilRepository>();
            services.AddScoped<IJobExperienceRepository, JobExperienceRepository>();
            services.AddScoped<IAcademicEducationRepository, AcademicEducationRepository>();
            services.AddScoped<IUserPostRepository, UserPostRepository>();
            services.AddScoped<IContactRepository, ContactRepository>();
            services.AddScoped<IForgotPasswordRepository, ForgotPasswordRepository>();
            services.AddScoped<DataContext>();
            services.AddScoped<ConsultaCepService>();
            services.AddTransient<IEmailService, EmailService>();
        }
    }
}
