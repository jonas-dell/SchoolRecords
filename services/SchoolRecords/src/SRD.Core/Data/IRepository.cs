namespace SRD.Core.Data
{
    public interface IRepository<T> : IDisposable where T : class
    {
        IUnitOfWork UnitOfWork { get; }
    }
}
