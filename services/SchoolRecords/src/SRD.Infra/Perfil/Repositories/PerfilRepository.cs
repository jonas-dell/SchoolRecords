﻿using SRD.Core.Data;
using SRD.Domain.Perfil.Repositories;
using SRD.Infra.Context;


namespace SRD.Infra.Perfil.Repositories
{
    public class PerfilRepository : IPerfilRepository
    {
        private readonly DataContext _context;

        public PerfilRepository(DataContext dataContext)
        {
            _context = dataContext;
        }
        public IUnitOfWork UnitOfWork => _context;

        public void Insert(Domain.Perfil.Entities.Perfil perfil)
        {
            _context.Perfis.Add(perfil);
        }
        public void Update(Domain.Perfil.Entities.Perfil perfil)
        {


            _context.Perfis.Update(perfil);
        }

        
        public IList<Domain.Perfil.Entities.Perfil> GetAll()
        {
            return _context.Perfis.ToList();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public Domain.Perfil.Entities.Perfil? GetById(int id)
        {
            return _context.Perfis.FirstOrDefault(p => p.Id == id);
        }
        public Domain.Perfil.Entities.Perfil? GetByPerfilName(string perfilName)
        {
            return _context.Perfis.Where(x => x.PerfilName == perfilName).FirstOrDefault();
        }
        
        
    }
}
