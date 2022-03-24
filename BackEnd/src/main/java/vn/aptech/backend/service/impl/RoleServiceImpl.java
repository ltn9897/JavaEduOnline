package vn.aptech.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aptech.backend.entity.AppRole;
import vn.aptech.backend.repository.RoleRepository;
import vn.aptech.backend.service.RoleService;

import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository repository;

    @Override
    public Optional<AppRole> findByName(String name) {
        return repository.findByName(name);
    }
}
