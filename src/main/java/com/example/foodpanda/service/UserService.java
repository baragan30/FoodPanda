package com.example.foodpanda.service;

import com.example.foodpanda.model.Restaurant;
import com.example.foodpanda.model.User;
import com.example.foodpanda.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getuserByUsername(String username) throws Exception{
        return userRepository.findUserByUsername(username).get(0);
    }

    public List<User> getALL(){
        return userRepository.findAll();
    }

    @Transactional
    public void saveuser(User user){
        userRepository.save(user);
    }



    @Transactional
    public void deleteuser(User user){
        userRepository.delete(user);
    }

    @Transactional
    public void deleteAll(){
        userRepository.deleteAll();
    }
}
