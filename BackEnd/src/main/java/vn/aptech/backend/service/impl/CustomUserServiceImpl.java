package vn.aptech.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vn.aptech.backend.dto.CustomUserDetails;
import vn.aptech.backend.entity.AppUser;
import vn.aptech.backend.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = repository.findByUsernameAndDeletedDateIsNull(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (appUser.getRole() != null) {
            authorities.add(new SimpleGrantedAuthority(appUser.getRole().getName()));
        } else {
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        }
        CustomUserDetails customUserDetails = this.customUserDetailsBuilder(appUser, authorities);
        return customUserDetails;
    }

    public CustomUserDetails customUserDetailsBuilder(AppUser appUser, List<GrantedAuthority> authorities) {
        String role ="";
        if(appUser.getRole()==null){
            role = "ROLE_USER";
        }else {
            role = appUser.getRole().getName();
        }
        return new CustomUserDetails(appUser.getId(), new User(appUser.getUsername(), appUser.getPassword(),
                appUser.isEnabled(), true, true, true, authorities),
                role, appUser.getEmail(),
                appUser.getAvatarImage(), appUser.getPhone(), appUser.getAddress());
    }
}
