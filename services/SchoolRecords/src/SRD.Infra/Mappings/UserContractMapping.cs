using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SRD.Domain.User.Entities;

namespace SRD.Infra.Mappings
{
    public class UserContractMapping : IEntityTypeConfiguration<UserContact>
    {
        public void Configure(EntityTypeBuilder<UserContact> builder)
        {
            builder.ToTable("UserContact");
        }
    }
}
