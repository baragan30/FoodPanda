package com.example.foodpanda.service;

import com.example.foodpanda.model.Restaurant;
import com.example.foodpanda.model.User;
import com.example.foodpanda.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getuserByUsername(String username,String password) throws Exception{
        User user = userRepository.findUserByUsername(username).get(0);
        if(user.getPassword().equals(encodePassword(password)))
            return user;
        else
            throw new Exception("Password or username are incorrect");
    }

    public List<User> getALL(){
        return userRepository.findAll();
    }

    @Transactional
    public void saveuser(User user) throws NoSuchAlgorithmException {
        user.setPassword(encodePassword(user.getPassword()));
        userRepository.save(user);
    }

    public String encodePassword(String password) throws NoSuchAlgorithmException
    {
        //we will use MD5 encryption technique???
        String encryptedPassword = null;

        MessageDigest messageDigest = MessageDigest.getInstance("MD5");
        messageDigest.update(password.getBytes());

        byte[] bytes = messageDigest.digest();

        StringBuilder sb = new StringBuilder();
        for (byte aByte : bytes)
        {
            sb.append(Integer.toString((aByte & 0xff) + 0x100, 16).substring(1));
        }

        encryptedPassword = sb.toString();

        return encryptedPassword;
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
