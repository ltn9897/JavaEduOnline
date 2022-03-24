package vn.aptech.backend.service;

import vn.aptech.backend.entity.AppRole;

import java.util.Optional;

public interface RoleService {
    Optional<AppRole> findByName(String name);
}
