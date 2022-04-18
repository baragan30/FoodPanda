package com.example.foodpanda.controller;

import com.example.foodpanda.model.Food;
import com.example.foodpanda.model.FoodCategory;
import com.example.foodpanda.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @PostMapping("/newfood")
    public ResponseEntity addNewRestaurant(@RequestBody Food food){
        System.out.println(food);
        try {
            foodService.saveFood(food);
        }catch (Exception e){
            e.printStackTrace();
        }

        return ResponseEntity.ok().body("Done");
    }
    @GetMapping("/getFoodsByCategory/{category}")
    public ResponseEntity getFoodsByCategory(@PathVariable FoodCategory category) {
        System.out.println("-----------------" + category.toString());
        ResponseEntity l = null;
        try {
            l = ResponseEntity.ok().body(foodService.getFoods(category));
        }catch (Exception e){
            e.printStackTrace();
        }

        System.out.println("++++++++++++++++" + category.toString());
        return l;
    }
    @GetMapping("/getFoodsByRestaurantName/{restaurantName}")
    public ResponseEntity getFoodsByRestaurantName(@PathVariable String restaurantName) {
        List<Food> foods = null;
        try {
            foods = foodService.getFoodsByRestaurantName(restaurantName);
        }catch (Exception e){
            e.printStackTrace();
        }

        return ResponseEntity.ok().body(foods);
    }
    @GetMapping("/getFoodsByRestaurantName")
    public ResponseEntity getFoodsByRestaurantName() {
        List<Food> foods = null;
        try{
            foods = foodService.getFoodsByRestaurantName("");
        }catch (Exception e){
            e.printStackTrace();
        }

        return ResponseEntity.ok().body(foods);
    }
}
