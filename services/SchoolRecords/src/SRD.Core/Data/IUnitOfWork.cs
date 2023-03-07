namespace SRD.Core.Data
{
    public interface IUnitOfWork
    {
        Task<bool> Commit();
    }
}
