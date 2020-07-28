package com.example.demo.service;

import com.example.demo.entity.Permission;
import com.example.demo.entity.Role;
import com.example.demo.entity.Staff;
import com.example.demo.exception.RoleNotCreateByCurrentStaffException;
import com.example.demo.exception.RoleNotFoundException;
import com.example.demo.form.RoleForm;
import com.example.demo.repository.RoleRepository;
import com.example.demo.response.RoleResponse;
import com.example.demo.response.SimpleRoleResponse;
import com.example.demo.security.SecurityUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import javax.persistence.Id;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service(value = "roleService")
public class RoleServiceImpl implements RoleService {

    private RoleRepository roleRepository;
    private StaffServiceImpl staffService;
    private PermissionServiceImpl permissionService;
    private SecurityUtil securityUtil;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository,
                           SecurityUtil securityUtil,
                           StaffServiceImpl staffService,
                           PermissionServiceImpl permissionService) {

        this.roleRepository = roleRepository;
        this.securityUtil = securityUtil;
        this.staffService = staffService;
        this.permissionService = permissionService;
    }

    @Override
    public List<SimpleRoleResponse> findAll() {
        List<Role> roleList = roleRepository.findAll();
        return roleList.stream()
                .map(SimpleRoleResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    public RoleResponse findById(Integer id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RoleNotFoundException(id));
        return RoleResponse.from(role);
    }

    @Override
    public Role save(RoleForm roleForm) {
        Staff createByStaff = securityUtil.getCurrentStaff();

        Set<Permission> permissions = permissionService.findAllByIdIsIn(roleForm.getPermissions());
        return roleRepository.save(RoleForm.buildRole(roleForm.getName(), createByStaff, permissions));
    }

    @Override
    public Role update(Integer id, RoleForm roleForm) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RoleNotFoundException(id));

        if (!isAllowed(role)) {
            throw new AccessDeniedException("Access Denied !!!");
        }

        Set<Permission> permissions = permissionService.findAllByIdIsIn(roleForm.getPermissions());
        return roleRepository.save(role.updateData(
                roleForm.getName(),
                permissions));
    }

    @Override
    public void delete(Integer id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RoleNotFoundException(id));

        if (!isAllowed(role)) {
            throw new AccessDeniedException("Access Denied !!!");
        }

        roleRepository.deleteById(role.getId());
    }

    private boolean isAllowed(Role role) {
        Staff staff = securityUtil.getCurrentStaff();
        if (staff.getLevel() > role.getLevel()) {
            return true;
        }
        return staff.getLevel().equals(role.getLevel()) && role.getCreatedBy().equals(staff);
    }
}
