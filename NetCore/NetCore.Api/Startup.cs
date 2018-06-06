using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NetCore.Api.Security;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace NetCore.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            Env = env;
        }

        private IConfiguration Configuration { get; }
        
        private IHostingEnvironment Env { get; }
    
        
        public void ConfigureServices(IServiceCollection services )
        {
            services.AddMvc(x =>
            {
                x.OutputFormatters.Remove(new XmlDataContractSerializerOutputFormatter());
            }).AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.None;
                options.SerializerSettings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
                options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
                options.SerializerSettings.Converters.Add(new StringEnumConverter());
                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            });

            services.AddCors();

            var apiJwtToken = new ApiJwtToken();
            
            Configuration.GetSection(nameof(ApiJwtToken)).Bind(apiJwtToken);

            services.AddSingleton(apiJwtToken);
            
            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(x =>
            {
                x.TokenValidationParameters = apiJwtToken.TokenValidationParameters;
            });

            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("Auth",
                    policy =>
                    {
                        policy.RequireAuthenticatedUser().Build();
                    });
                
                auth.AddPolicy("Admin",
                    policy =>
                    {
                        policy.RequireAuthenticatedUser().RequireClaim("profile", "Admin").Build();
                    });
            });
        }

        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseCors(x =>
            {
                x.AllowAnyHeader();
                x.AllowAnyMethod();
                x.AllowAnyOrigin();
                x.AllowCredentials();
            });

            app.UseAuthentication();
            
            app.UseMvc();
        }
    }
}