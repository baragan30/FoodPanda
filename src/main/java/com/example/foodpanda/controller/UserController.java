package com.example.foodpanda.controller;

import com.example.foodpanda.model.FoodCategory;
import com.example.foodpanda.model.Restaurant;
import com.example.foodpanda.model.User;
import com.example.foodpanda.service.RestaurantService;
import com.example.foodpanda.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/")
public class UserController {
    @Autowired
    UserService userService ;

    private User user = null;

    @PostMapping("/newUser")
    public ResponseEntity addNewUser(@RequestBody User user){
        userService.saveuser(user);
        return ResponseEntity.ok().body("Done");
    }
    @GetMapping("/userLogin/{username}/{password}")
    public ResponseEntity logIn(@PathVariable String username, @PathVariable String password){
        try{
            user = userService.getuserByUsername(username);
            if(user.getPassword().equals(password))
                return ResponseEntity.ok().body(user);
        }catch (Exception e){

        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username or password are incorrect");
    }

    @GetMapping("curentUser")
    public ResponseEntity getCurentUser(){
        return ResponseEntity.ok().body(user);
    }
}
