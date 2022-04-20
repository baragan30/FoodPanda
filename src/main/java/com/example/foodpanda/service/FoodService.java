package com.example.foodpanda.service;

import com.example.foodpanda.model.Food;
import com.example.foodpanda.model.FoodCategory;
import com.example.foodpanda.model.Restaurant;
import com.example.foodpanda.repository.FoodRepository;
import com.example.foodpanda.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodService {
    private final FoodRepository foodRepository;

    @Autowired
    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public List<Food> getFoods(FoodCategory category) {
        return foodRepository.findFoodByCategory(category);
    }
    public List<Food> findFoodByCategoryAndByRestaurantID(FoodCategory foodCategory,Long restaurantId){
        return foodRepository.findFoodByCategoryAndByRestaurantID(foodCategory,restaurantId);
    }

    public List<Food> getALL(){
        return foodRepository.findAll();
    }

    public List<Food> getFoodsByRestaurantName(String restaurantName) {
        return foodRepository.getFoodsByRestaurantName(restaurantName).stream().sorted(new FoodCompareUsingRestaurantName()).collect(Collectors.toList());
    }

    @Transactional
    public void saveFood(Food food){
        foodRepository.save(food);
    }

    @Transactional
    public void deleteFood(Food food){
        foodRepository.delete(food);
    }

    @Transactional
    public void deleteAll(){
        foodRepository.deleteAll();
    }


}

class FoodCompareUsingRestaurantName implements Comparator<Food>{
    @Override
    public int compare(Food o1, Food o2) {
        String restaurant1Name =  o1.getRestaurant().getName();
        String restaurant2Name =  o2.getRestaurant().getName();
        return restaurant1Name.compareTo(restaurant2Name);
    }
}
